import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: String,
    from:Object,
    socketId:String,
    time:String,
    date:String,
    to:String
})

const Message = mongoose.model('Message', messageSchema);

export default  Message