import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    offer: {
        type: Number,
        required: true
    },
    whatsApp: {
        type: String,
    },
    Message: {
        type: String,
    },
    read:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
