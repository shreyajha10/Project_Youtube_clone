import express from 'express';
import { getAllVideo, getAllVideoByUserId, getVideoById,  uploadVideo } from '../Controllers/Video.controllers.js';
import {authenticateToken}  from '../middleware/authentication.js';

const router = express.Router();


router.post('/video',authenticateToken,uploadVideo);
router.get('/allVideo',getAllVideo);
router.get('/getVideoById/:id',getVideoById);
router.get('/:userId/channel',getAllVideoByUserId);
export default router;