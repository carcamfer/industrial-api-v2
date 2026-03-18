import { Router } from 'express';
import { chat, contact } from '../controllers/chatController.js';

const router = Router();

router.post('/chat', chat);
router.post('/contact', contact);

export default router;
