import express from "express";
import { createMessage, deleteMessage, markAsRead, getCountReadFalseMessages, getMessages } from "../controller/message.controller.js";


const router = express.Router();

router.post('/create', createMessage);
router.get('/get-messages', getMessages);
router.delete('/delete/:id', deleteMessage);
router.put('/mark-as-read/:id', markAsRead);
router.get('/get-count-read-false-messages', getCountReadFalseMessages);

export default router;