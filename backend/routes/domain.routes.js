import express from 'express';
import { createDomain, updateDomain, getDomains, getDomainByName, deleteDomain, getExtensions } from '../controller/domain.controller.js';


const router = express.Router();

router.post('/create', createDomain);
router.put('/update', updateDomain);
router.get('/get-domain', getDomains);
router.get('/get-domain/:name', getDomainByName)
router.delete('/delete/:name', deleteDomain)
router.get('/get-extensions', getExtensions);


export default router;