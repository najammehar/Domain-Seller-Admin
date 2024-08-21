import express from "express";
import { createOffer, deleteOffer, markAsRead, getCountReadFalseOffers } from "../controller/offer.controller.js";
import { getOffers } from "../controller/offer.controller.js";


const router = express.Router();

router.post('/create', createOffer);
router.get('/get-offers', getOffers);
router.delete('/delete/:id', deleteOffer);
router.put('/mark-as-read/:id', markAsRead);
router.get('/get-count-read-false-offers', getCountReadFalseOffers);

export default router;