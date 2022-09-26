const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true        
    },
    photo: {
        type: Array,
        required: false,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
    myLikesSend: {
        type: Array,
        required: true
    },
    likedMe: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("userInfo", itemModel)

