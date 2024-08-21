import Message from "../model/message.model.js";

export const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getMessages = async (req, res) => {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const messages = await Message.find()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
        const total = await Message.countDocuments();
        res.status(200).json({success: true, messages, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page)});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        await Message.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Message deleted successfully'});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}

export const markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findById(id);
        message.read = true;
        await message.save();
        res.status(200).json({success: true, message: 'Message marked as read successfully'});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}

export const getCountReadFalseMessages = async (req, res) => {
    try {
        const count = await Message.countDocuments({ read: false });
        res.status(200).json({success: true, count});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}

