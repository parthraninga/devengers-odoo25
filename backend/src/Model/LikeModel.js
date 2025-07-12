const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'items',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Compound index to ensure a user can like an item only once
likeSchema.index({ item: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("likes", likeSchema);