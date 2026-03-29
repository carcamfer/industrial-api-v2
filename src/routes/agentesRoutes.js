import { Router } from 'express';
import * as ctrl from '../controllers/agentesController.js';

const router = Router();

// Views
router.get('/', ctrl.renderCatalog);
router.get('/agents/:id', ctrl.renderAgentDetail);
router.get('/tools/:id', ctrl.renderToolDetail);

// API
router.get('/api/agents', ctrl.apiGetAgents);
router.get('/api/agents/:id', ctrl.apiGetAgent);
router.get('/api/tools', ctrl.apiGetTools);
router.get('/api/tools/:id', ctrl.apiGetTool);
router.get('/api/communication-rules', ctrl.apiGetRules);
router.get('/api/event-standard', ctrl.apiGetEventStandard);
router.get('/api/demo/tool/:toolId', ctrl.apiGetToolDemo);
router.get('/api/demo/:agentId', ctrl.apiGetDemoScript);

export default router;
