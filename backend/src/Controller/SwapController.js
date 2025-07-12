const SwapModel = require("../Model/SwapModel");
const ItemModel = require("../Model/ItemModel");
const UserModel = require("../Model/UserModel");

// createSwapRequest
// getAllSwaps
// getSwapById
// updateSwapStatus
// addSwapRating
// getUserSwapHistory


const SwapController = {
    // Create a new swap request
    createSwapRequest: async (req, res) => {
        try {
            const { type, itemGivenId, itemReceivedId } = req.body;
            const requesterId = req.user.id;

            // Validate request type
            if (!type || !['swap', 'redeem'].includes(type)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid swap type"
                });
            }

            // For swap type, both items are required
            if (type === 'swap' && (!itemGivenId || !itemReceivedId)) {
                return res.status(400).json({
                    success: false,
                    message: "Both items are required for a swap"
                });
            }

            // For redeem type, only itemReceived is required
            if (type === 'redeem' && !itemReceivedId) {
                return res.status(400).json({
                    success: false,
                    message: "Item to redeem is required"
                });
            }

            let itemGiven = null;
            let itemReceived = null;
            let receiver = null;
            let pointsUsed = 0;

            // Verify itemGiven ownership if it's a swap
            if (type === 'swap') {
                itemGiven = await ItemModel.findById(itemGivenId);
                if (!itemGiven) {
                    return res.status(404).json({
                        success: false,
                        message: "Given item not found"
                    });
                }
                
                if (itemGiven.owner.toString() !== requesterId) {
                    return res.status(403).json({
                        success: false,
                        message: "You don't own this item"
                    });
                }

                if (itemGiven.status !== 'active') {
                    return res.status(400).json({
                        success: false,
                        message: "Given item is not available for swap"
                    });
                }
            }

            // Verify itemReceived availability
            itemReceived = await ItemModel.findById(itemReceivedId);
            if (!itemReceived) {
                return res.status(404).json({
                    success: false,
                    message: "Requested item not found"
                });
            }

            if (itemReceived.status !== 'active') {
                return res.status(400).json({
                    success: false,
                    message: "Requested item is not available"
                });
            }

            // Get receiver id
            receiver = itemReceived.owner;

            // For redemptions, check if user has enough points
            if (type === 'redeem') {
                const requester = await UserModel.findById(requesterId);
                if (requester.points < itemReceived.pointsValue) {
                    return res.status(400).json({
                        success: false,
                        message: "Insufficient points for redemption"
                    });
                }
                pointsUsed = itemReceived.pointsValue;
            }

            // Create swap request
            const newSwap = new SwapModel({
                type,
                itemGiven: type === 'swap' ? itemGivenId : null,
                itemReceived: itemReceivedId,
                requester: requesterId,
                receiver,
                pointsUsed
            });

            await newSwap.save();

            // Update items status to pending
            if (type === 'swap') {
                await ItemModel.findByIdAndUpdate(itemGivenId, { status: 'pending' });
            }
            await ItemModel.findByIdAndUpdate(itemReceivedId, { status: 'pending' });

            res.status(201).json({
                success: true,
                message: "Swap request created successfully",
                data: newSwap
            });
        } catch (error) {
            console.error("Error creating swap request:", error);
            res.status(500).json({
                success: false,
                message: "Failed to create swap request",
                error: error.message
            });
        }
    },

    // Get all swaps with filters
    getAllSwaps: async (req, res) => {
        try {
            const { status, type } = req.query;
            const filter = {};

            // Apply filters
            if (status && status !== 'all') {
                filter.status = status;
            }
            if (type && type !== 'all') {
                filter.type = type;
            }

            // For admin, show all swaps
            // For regular users, show only their swaps
            if (req.user.role !== 'admin') {
                filter.$or = [
                    { requester: req.user.id },
                    { receiver: req.user.id }
                ];
            }

            const swaps = await SwapModel.find(filter)
                .populate({
                    path: 'itemGiven',
                    select: 'title images pointsValue'
                })
                .populate({
                    path: 'itemReceived',
                    select: 'title images pointsValue'
                })
                .populate({
                    path: 'requester',
                    select: 'name profilePic'
                })
                .populate({
                    path: 'receiver',
                    select: 'name profilePic'
                })
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                count: swaps.length,
                data: swaps
            });
        } catch (error) {
            console.error("Error fetching swaps:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch swaps",
                error: error.message
            });
        }
    },

    // Get swap by ID
    getSwapById: async (req, res) => {
        try {
            const swap = await SwapModel.findById(req.params.id)
                .populate({
                    path: 'itemGiven',
                    select: 'title description images pointsValue condition'
                })
                .populate({
                    path: 'itemReceived',
                    select: 'title description images pointsValue condition'
                })
                .populate({
                    path: 'requester',
                    select: 'name profilePic rating'
                })
                .populate({
                    path: 'receiver',
                    select: 'name profilePic rating'
                });

            if (!swap) {
                return res.status(404).json({
                    success: false,
                    message: "Swap not found"
                });
            }

            // Check if user is involved in this swap or is admin
            if (
                req.user.role !== 'admin' &&
                swap.requester._id.toString() !== req.user.id &&
                swap.receiver._id.toString() !== req.user.id
            ) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized access"
                });
            }

            res.status(200).json({
                success: true,
                data: swap
            });
        } catch (error) {
            console.error("Error fetching swap:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch swap",
                error: error.message
            });
        }
    },

    // Update swap status
    updateSwapStatus: async (req, res) => {
        try {
            const { status } = req.body;
            
            // Validate status
            if (!status || !['approved', 'completed', 'rejected'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status"
                });
            }

            const swap = await SwapModel.findById(req.params.id);
            
            if (!swap) {
                return res.status(404).json({
                    success: false,
                    message: "Swap not found"
                });
            }

            // Check if user is receiver or admin
            if (
                req.user.role !== 'admin' &&
                swap.receiver.toString() !== req.user.id
            ) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized access"
                });
            }

            // Handle different status updates
            if (status === 'approved') {
                // Only pending swaps can be approved
                if (swap.status !== 'pending') {
                    return res.status(400).json({
                        success: false,
                        message: "Only pending swaps can be approved"
                    });
                }
                
                // Update swap status
                swap.status = 'approved';
                await swap.save();

            } else if (status === 'completed') {
                // Only approved swaps can be completed
                if (swap.status !== 'approved') {
                    return res.status(400).json({
                        success: false,
                        message: "Only approved swaps can be completed"
                    });
                }
                
                // Update swap status
                swap.status = 'completed';
                swap.completedAt = Date.now();
                await swap.save();

                // Update items status
                if (swap.type === 'swap') {
                    // For swaps, both items change owners
                    if (swap.itemGiven) {
                        await ItemModel.findByIdAndUpdate(swap.itemGiven, { 
                            status: 'swapped',
                            owner: swap.receiver
                        });
                    }
                    
                    await ItemModel.findByIdAndUpdate(swap.itemReceived, { 
                        status: 'swapped',
                        owner: swap.requester
                    });
                    
                    // Award points to both users
                    const pointsAwarded = 50; // Base points for completing a swap
                    await UserModel.findByIdAndUpdate(swap.requester, { 
                        $inc: { points: pointsAwarded } 
                    });
                    await UserModel.findByIdAndUpdate(swap.receiver, { 
                        $inc: { points: pointsAwarded } 
                    });
                    
                } else {
                    // For redemptions
                    // Mark item as swapped and change owner
                    await ItemModel.findByIdAndUpdate(swap.itemReceived, { 
                        status: 'swapped',
                        owner: swap.requester
                    });
                    
                    // Deduct points from requester
                    await UserModel.findByIdAndUpdate(swap.requester, { 
                        $inc: { points: -swap.pointsUsed } 
                    });
                }

            } else if (status === 'rejected') {
                // Only pending or approved swaps can be rejected
                if (!['pending', 'approved'].includes(swap.status)) {
                    return res.status(400).json({
                        success: false,
                        message: "This swap cannot be rejected"
                    });
                }
                
                // Update swap status
                swap.status = 'rejected';
                await swap.save();

                // Restore items to active status
                if (swap.itemGiven) {
                    await ItemModel.findByIdAndUpdate(swap.itemGiven, { status: 'active' });
                }
                await ItemModel.findByIdAndUpdate(swap.itemReceived, { status: 'active' });
            }

            res.status(200).json({
                success: true,
                message: `Swap ${status} successfully`,
                data: swap
            });
        } catch (error) {
            console.error("Error updating swap status:", error);
            res.status(500).json({
                success: false,
                message: "Failed to update swap status",
                error: error.message
            });
        }
    },

    // Add rating to a completed swap
    addSwapRating: async (req, res) => {
        try {
            const { rating, comment } = req.body;
            
            // Validate rating
            if (!rating || rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid rating. Must be between 1-5"
                });
            }

            const swap = await SwapModel.findById(req.params.id);
            
            if (!swap) {
                return res.status(404).json({
                    success: false,
                    message: "Swap not found"
                });
            }

            // Check if swap is completed
            if (swap.status !== 'completed') {
                return res.status(400).json({
                    success: false,
                    message: "Only completed swaps can be rated"
                });
            }

            // Check if user is involved in this swap
            if (
                swap.requester.toString() !== req.user.id &&
                swap.receiver.toString() !== req.user.id
            ) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized access"
                });
            }

            // Check if already rated
            if (swap.rating) {
                return res.status(400).json({
                    success: false,
                    message: "This swap has already been rated"
                });
            }

            // Update swap with rating
            swap.rating = rating;
            swap.ratingComment = comment;
            await swap.save();

            // Update the other user's average rating
            const ratedUserId = swap.requester.toString() === req.user.id 
                ? swap.receiver 
                : swap.requester;
            
            // Get all ratings for this user from completed swaps
            const userSwaps = await SwapModel.find({
                status: 'completed',
                rating: { $exists: true },
                $or: [
                    { requester: ratedUserId },
                    { receiver: ratedUserId }
                ]
            });
            
            // Calculate average rating
            if (userSwaps.length > 0) {
                const totalRating = userSwaps.reduce((sum, s) => sum + s.rating, 0);
                const averageRating = totalRating / userSwaps.length;
                
                // Update user's rating
                await UserModel.findByIdAndUpdate(ratedUserId, { 
                    rating: parseFloat(averageRating.toFixed(1)) 
                });
            }

            res.status(200).json({
                success: true,
                message: "Rating added successfully",
                data: swap
            });
        } catch (error) {
            console.error("Error adding rating:", error);
            res.status(500).json({
                success: false,
                message: "Failed to add rating",
                error: error.message
            });
        }
    },

    // Get user's swap history
    getUserSwapHistory: async (req, res) => {
        try {
            const userId = req.params.userId || req.user.id;
            
            const swaps = await SwapModel.find({
                $or: [
                    { requester: userId },
                    { receiver: userId }
                ]
            })
            .populate({
                path: 'itemGiven',
                select: 'title images pointsValue'
            })
            .populate({
                path: 'itemReceived',
                select: 'title images pointsValue'
            })
            .populate({
                path: 'requester',
                select: 'name profilePic'
            })
            .populate({
                path: 'receiver',
                select: 'name profilePic'
            })
            .sort({ createdAt: -1 });

            // Format response for frontend compatibility
            const formattedSwaps = swaps.map(swap => {
                const isRequester = swap.requester._id.toString() === userId;
                const partner = isRequester ? swap.receiver : swap.requester;
                
                return {
                    id: swap._id,
                    type: swap.type,
                    status: swap.status,
                    itemGiven: swap.type === 'redeem' ? null : (isRequester ? {
                        title: swap.itemGiven?.title || '',
                        image: swap.itemGiven?.images?.[0]?.url || '',
                        points: swap.itemGiven?.pointsValue || 0
                    } : {
                        title: swap.itemReceived?.title || '',
                        image: swap.itemReceived?.images?.[0]?.url || '',
                        points: swap.itemReceived?.pointsValue || 0
                    }),
                    itemReceived: isRequester ? {
                        title: swap.itemReceived?.title || '',
                        image: swap.itemReceived?.images?.[0]?.url || '',
                        points: swap.itemReceived?.pointsValue || 0
                    } : (swap.type === 'redeem' ? null : {
                        title: swap.itemGiven?.title || '',
                        image: swap.itemGiven?.images?.[0]?.url || '',
                        points: swap.itemGiven?.pointsValue || 0
                    }),
                    partner: partner?.name || 'Unknown',
                    date: swap.createdAt,
                    rating: swap.rating,
                    pointsUsed: swap.pointsUsed
                };
            });

            // Calculate statistics
            const totalSwaps = swaps.length;
            const completedSwaps = swaps.filter(s => s.status === 'completed').length;
            const pointsEarned = swaps.reduce((total, swap) => {
                if (swap.status === 'completed') {
                    // Points earned from swaps
                    if (swap.type === 'swap') {
                        return total + 50; // Base points per swap
                    }
                    // Points spent on redemptions (negative)
                    if (swap.type === 'redeem' && swap.requester._id.toString() === userId) {
                        return total - swap.pointsUsed;
                    }
                }
                return total;
            }, 0);
            
            const itemsSaved = completedSwaps * 2; // Each swap saves 2 items from landfill
            
            // Calculate average rating
            const ratedSwaps = swaps.filter(s => s.status === 'completed' && s.rating);
            const averageRating = ratedSwaps.length > 0
                ? parseFloat((ratedSwaps.reduce((sum, s) => sum + s.rating, 0) / ratedSwaps.length).toFixed(1))
                : 0;

            res.status(200).json({
                success: true,
                stats: {
                    totalSwaps,
                    pointsEarned,
                    itemsSaved,
                    averageRating
                },
                data: formattedSwaps
            });
        } catch (error) {
            console.error("Error fetching swap history:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch swap history",
                error: error.message
            });
        }
    }
};

module.exports = SwapController;