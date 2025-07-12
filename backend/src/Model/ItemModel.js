const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['dresses', 'tops', 'pants', 'shoes', 'accessories', 'outerwear', 'activewear', 'undergarments']
        },
        size: {
            type: String,
            required: true,
            enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
        },
        condition: {
            type: String,
            required: true,
            enum: ['New', 'Like New', 'Excellent', 'Good', 'Fair']
        },
        brand: {
            type: String,
            trim: true
        },
        color: {
            type: String,
            enum: ['Black', 'White', 'Gray', 'Brown', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Multicolor']
        },
        tags: [{
            type: String,
            trim: true
        }],
        images: [{
            url: {
                type: String,
                required: true
            },
            public_id: String
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['active', 'swapped', 'pending', 'inactive'],
            default: 'active'
        },
        pointsValue: {
            type: Number,
            default: function() {
                // Calculate points value based on condition
                const conditionPoints = {
                    'New': 100,
                    'Like New': 80,
                    'Excellent': 60,
                    'Good': 40,
                    'Fair': 20
                };
                return conditionPoints[this.condition] || 50;
            }
        },
        location: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("items", itemSchema);