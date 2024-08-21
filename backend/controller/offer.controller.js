import Offer from "../model/offer.model.js";

export const createOffer = async (req, res) => {
    try {
        const { name, email, domain, offer, whatsApp, Message } = req.body;
        const newOffer = new Offer({ name, email, domain, offer, whatsApp, Message });
        await newOffer.save();
        res.status(201).json(newOffer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getOffers = async (req, res) => {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const offers = await Offer.find()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
        const total = await Offer.countDocuments();
        res.status(200).json({success: true, offers, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page)});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}

export const deleteOffer = async (req, res) => {
    const { id } = req.params;
    try {
        await Offer.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Offer deleted successfully'});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}

export const markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const offer = await Offer.findById(id);
        offer.read = true;
        await offer.save();
        res.status(200).json({success: true, message: 'Offer marked as read successfully'});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}

export const getCountReadFalseOffers = async (req, res) => {
    try {
        const count = await Offer.countDocuments({ read: false });
        res.status(200).json({success: true, count});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}