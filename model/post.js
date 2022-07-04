const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    likes:{
        type: Number,
        default: 0
    }
});


module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);