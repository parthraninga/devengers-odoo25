const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const swapSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['swap', 'redeem'],
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'completed', 'rejected'],
            default: 'pending'
        },
        itemGiven: {
            type: Schema.Types.ObjectId,
            ref: 'items'
        },
        itemReceived: {
            type: Schema.Types.ObjectId,
            ref: 'items'
        },
        requester: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        pointsUsed: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        ratingComment: {
            type: String
        },
        completedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("swaps", swapSchema);