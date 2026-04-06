import {
  getAllAgents, getAgentById, resolveToolsForAgent,
  getAllTools, getToolById, getRules, getEventStandard, getAgentsByToolId, getRulesForTool
} from '../services/agentDataService.js';
import { buildScript, buildToolDemo, deriveToolAlarm } from '../services/agentDemoService.js';

// ── View controllers ──────────────────────────────────────────

export function renderCatalog(req, res) {
  const agents = getAllAgents();
  const toolNamesMap = {};
  for (const a of agents) {
    if (a.moduleIds && a.isoAlarms) {
      a.moduleIds.forEach((mid, i) => { toolNamesMap[mid] = a.isoAlarms[i] || a.isoAlarms[0]; });
    }
  }
  res.render('agentes-catalog', {
    pageTitle: 'Agentes Industriales',
    currentPage: 'agentes',
    agents,
    toolNamesJson: JSON.stringify(toolNamesMap)
  });
}

export function renderAgentDetail(req, res, next) {
  const agent = getAgentById(req.params.id);
  if (!agent) { const err = new Error('Agente no encontrado'); err.status = 404; return next(err); }
  const { cloudTools, edgeTools, hybridTools, allTools } = resolveToolsForAgent(agent);
  res.render('agentes-detail', {
    pageTitle: agent.nameEs,
    currentPage: 'agentes',
    agent, cloudTools, edgeTools, hybridTools, allTools
  });
}

export function renderToolDetail(req, res, next) {
  const tool = getToolById(req.params.id);
  if (!tool) { const err = new Error('Tool no encontrada'); err.status = 404; return next(err); }
  const usedByAgents = getAgentsByToolId(tool.id);
  const agentAlarm = usedByAgents[0]?.isoAlarms?.[0] || null;
  const toolIsoAlarm = deriveToolAlarm(tool.id, agentAlarm);
  res.render('agentes-tool', {
    pageTitle: tool.nameEs,
    currentPage: 'agentes',
    tool,
    usedByAgents,
    commRules: getRulesForTool(tool.id),
    toolIsoAlarm,
  });
}

// ── API controllers ───────────────────────────────────────────

export function apiGetAgents(req, res) { res.json(getAllAgents()); }

export function apiGetAgent(req, res) {
  const agent = getAgentById(req.params.id);
  if (!agent) return res.status(404).json({ error: 'Agent not found' });
  res.json({ ...agent, ...resolveToolsForAgent(agent) });
}

export function apiGetTools(req, res) { res.json(getAllTools()); }

export function apiGetTool(req, res) {
  const tool = getToolById(req.params.id);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });
  res.json(tool);
}

export function apiGetRules(req, res) { res.json(getRules()); }
export function apiGetEventStandard(req, res) { res.json(getEventStandard()); }

export function apiGetDemoScript(req, res) {
  const agent = getAgentById(req.params.agentId);
  if (!agent) return res.status(404).json({ error: 'Agent not found' });
  res.json(buildScript(req.params.agentId));
}

export function apiGetToolDemo(req, res) {
  const result = buildToolDemo(req.params.toolId);
  if (!result) return res.status(404).json({ error: 'Tool not found' });
  res.json(result);
}
