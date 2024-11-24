import express from 'express';
import { addComment, getCommentByVideoId } from '../Controllers/Comment.controllers.js';
import { authenticateToken } from '../middleware/authentication.js';

const router = express.Router();


router.post('/comment',authenticateToken,addComment);
router.get('/comment/:videoId',getCommentByVideoId);


export default router;