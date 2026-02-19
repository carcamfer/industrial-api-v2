import { Router } from 'express';
import {
  ingestEvent,
  queryEvents
} from '../controllers/eventsController.js';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';

const router = Router();

router.post('/', apiKeyAuth(['events:write']), ingestEvent);
router.get('/', apiKeyAuth(['events:read']), queryEvents);

export default router;
