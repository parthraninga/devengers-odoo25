const mongoose = require("mongoose");
const Schema = mongoose.Schema; 


const userSchema = new Schema({
    //  Fields 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    mobile: {
        type: String, 
        unique: true,
        sparse: true // Allows NULL values (not all users may have a mobile number)
    }, 
    isVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        sparse: true
    },
    age: {
        type: Number,
        required: true
    }, 
    gender: {
        type: String
    }, 
    bio: {
        type: String,
        default: "Hey there! I am using ReWear."
    }, 
    location: {
        type: String,
        default: "Not specified"
    },
    isActive: {
        type: Boolean,
        default: true
    },  
    role: { // works like roleId
        type: Schema.Types.ObjectId,
        ref: "role" // table name 'role' 
    }, 
    refreshToken: {
        type: String,
        default: null
    }, 
    profilePic: {
        url: String, 
        cloudinaryId: String, // public_Id from cloudinary
        uploadAt: {
            type: Date,
            default: Date.now
        }
    }, 
    gallery: [
        {
            url: String, 
            cloudinaryId: String, 
            uploadAt: {
                type: Date, 
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
}); 

module.exports = mongoose.model("users", userSchema);