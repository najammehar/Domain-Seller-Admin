import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    extension:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    autoRenewal:{
        type: Boolean,
        required: true,
        default: false
    },
    renewalPrice:{
        type: Number,
    },
    registrationDate:{
        type: Date,
        required: true
    },
    expirationDate:{
        type: Date,
        required: true
    },
    isFeatured:{
        type: Boolean,
        default: false
    },
    urlToBuy:{
        type: String,
        required: true
    }
}, {timestamps: true});

export const Domain = mongoose.model('Domain', domainSchema);