const mongoose = require('mongoose');

const PrivateMessageSchema = new mongoose.Schema({
    from_user: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
   },

    to_user: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
   },
    
    message: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    date_sent: {
        type: Date,
        default: Date.now,
    }

});


const PrivateMessage = mongoose.model("PrivateMessage", PrivateMessageSchema);
module.exports = PrivateMessage;