import { Router } from 'express';
import { renderDashboard } from '../controllers/dashboardController.js';

const router = Router();

router.get('/', renderDashboard);

export default router;
