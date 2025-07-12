const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        sender: {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "users",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
        content: {
            type: String,
            required: true,
        },
        room: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("messages", messageSchema);
