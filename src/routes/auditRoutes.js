import { Router } from 'express';
import { renderAuditReport } from '../controllers/auditController.js';

const router = Router();
router.get('/', renderAuditReport);

export default router;
