import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { getAgentById, getToolById, getRules, getAgentsByToolId } from './agentDataService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const eventStandard = JSON.parse(readFileSync(path.join(__dirname, '../data/agents/event-standard.json'), 'utf-8'));

const PROTOCOLS = ['MQTT', 'HTTPS', 'gRPC', 'OPC-UA', 'REST', 'Modbus/TCP', 'Internal'];

const CATEGORY_MAP = (() => {
  const map = {};
  for (const [cat, toolIds] of Object.entries(eventStandard.categoryToToolMapping || {})) {
    for (const id of toolIds) map[id] = cat;
  }
  return map;
})();

const SEVERITY_MAP = {
  safety: 'high', maintenance: 'medium', quality: 'medium',
  energy: 'low', productivity: 'low', configuration: 'low', system: 'low'
};

function buildStandardEvent(tool, agentCategory, outputData, eventType, isoAlarm) {
  return {
    event_id: `evt-demo-${Math.random().toString(36).slice(2, 10)}`,
    timestamp: new Date().toISOString(),
    platform_version: '1.0',
    module: { id: isoAlarm || tool.id, version: '1.0.0' },
    asset: {
      asset_id: 'asset-demo-01',
      asset_type: tool.category === 'vision' ? 'camera' : tool.category === 'ai-ml' ? 'motor' : tool.category === 'production' ? 'workstation' : 'sensor',
      plant_id: 'plant_01', area_id: 'assembly', line_id: 'line_1', location: 'station_1'
    },
    event: {
      type: eventType || tool.id,
      category: CATEGORY_MAP[tool.id] || agentCategory || 'system',
      severity: SEVERITY_MAP[CATEGORY_MAP[tool.id]] || 'low'
    },
    data: outputData,
    metadata: { shift: 'A', operator_id: 'op_demo', production_order: 'PO-DEMO-001' }
  };
}

function fakeValue(schema) {
  if (!schema) return null;
  switch (schema.type) {
    case 'number': { const min = schema.minimum ?? 0; const max = schema.maximum ?? 100; return parseFloat((min + Math.random() * (max - min)).toFixed(3)); }
    case 'integer': { const min = schema.minimum ?? 0; const max = schema.maximum ?? 100; return Math.floor(min + Math.random() * (max - min)); }
    case 'boolean': return Math.random() > 0.8;
    case 'string':
      if (schema.format === 'date-time') return new Date().toISOString();
      if (schema.format === 'date') return new Date().toISOString().slice(0, 10);
      if (schema.enum?.length > 0) return schema.enum[0];
      if (schema.default) return schema.default;
      return `DEMO-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    case 'array': return [];
    case 'object': return buildFakeOutput(schema);
    default: return null;
  }
}

function buildFakeOutput(schema) {
  if (!schema || schema.type !== 'object' || !schema.properties) return {};
  const result = {};
  for (const [key, prop] of Object.entries(schema.properties)) result[key] = fakeValue(prop);
  return result;
}

function fakeInputSummary(tool) {
  const required = tool.inputSchema?.required || [];
  if (required.length === 0) return 'No required inputs';
  const props = tool.inputSchema?.properties || {};
  return required.slice(0, 3).map(k => {
    const prop = props[k] || {};
    const val = prop.enum ? prop.enum[0] : prop.type === 'string' ? `${k}-DEMO-001` : prop.type === 'number' ? '42.7' : prop.type === 'integer' ? '10' : '{}';
    return `${k}: ${val}`;
  }).join(', ');
}

export function buildToolDemo(toolId) {
  const tool = getToolById(toolId);
  if (!tool) return null;
  const rules = getRules().rules;
  const inputData = buildFakeOutput(tool.inputSchema);
  const outputData = buildFakeOutput(tool.outputSchema);
  const outgoingRules = rules.filter(r => r.sourceToolId === toolId);
  const incomingRules = rules.filter(r => r.targetToolId === toolId);
  const boolOutputs = Object.entries(outputData).filter(([, v]) => typeof v === 'boolean');
  const hasNegativeSignal = boolOutputs.some(([k, v]) => v && (k.includes('anomaly') || k.includes('defect') || k.includes('violation') || k.includes('overrun') || k.includes('idle')));
  const status = hasNegativeSignal ? 'warn' : 'ok';
  const eventType = outgoingRules[0]?.event?.toLowerCase().replace(/-/g, '_') || tool.id;
  const parentAgents = getAgentsByToolId(toolId);
  const isoAlarm = parentAgents[0]?.isoAlarms?.[0] || null;
  const standardEvent = buildStandardEvent(tool, null, outputData, eventType, isoAlarm);
  return {
    toolId: tool.id, toolName: tool.name, toolNameEs: tool.nameEs,
    toolType: tool.type, toolCategory: tool.category, status,
    durationMs: Math.floor(15 + Math.random() * 135),
    inputData, outputData, standardEvent,
    outgoingRules: outgoingRules.slice(0, 3).map(r => ({ targetToolId: r.targetToolId, event: r.event, protocol: r.protocol })),
    incomingRules: incomingRules.slice(0, 3).map(r => ({ sourceToolId: r.sourceToolId, event: r.event, protocol: r.protocol }))
  };
}

export function buildScript(agentId) {
  const agent = getAgentById(agentId);
  if (!agent) return [];
  const rules = getRules().rules;
  const steps = [];
  let stepNum = 1;
  for (const toolId of agent.toolIds) {
    const tool = getToolById(toolId);
    if (!tool) continue;
    const outgoingRules = rules.filter(r => r.sourceToolId === toolId && agent.toolIds.includes(r.targetToolId));
    const outputData = buildFakeOutput(tool.outputSchema);
    const boolOutputs = Object.entries(outputData).filter(([, v]) => typeof v === 'boolean');
    const hasNegativeSignal = boolOutputs.some(([k, v]) => v && (k.includes('anomaly') || k.includes('defect') || k.includes('violation') || k.includes('overrun') || k.includes('idle')));
    const status = hasNegativeSignal ? 'warn' : 'ok';
    const eventType = outgoingRules[0]?.event?.toLowerCase().replace(/-/g, '_') || tool.id;
    const isoAlarm = agent.isoAlarms?.[0] || null;
    const standardEvent = buildStandardEvent(tool, agent.category, outputData, eventType, isoAlarm);
    steps.push({
      step: stepNum++, toolId: tool.id, toolName: tool.name, toolNameEs: tool.nameEs,
      toolType: tool.type, event: outgoingRules[0]?.event || `${tool.id.toUpperCase()}_EXECUTED`,
      protocol: outgoingRules[0]?.protocol || (tool.type === 'Edge' ? PROTOCOLS[Math.floor(Math.random() * 3) + 3] : PROTOCOLS[Math.floor(Math.random() * 3)]),
      nextToolId: outgoingRules[0]?.targetToolId || null, status,
      durationMs: Math.floor(15 + Math.random() * 135),
      inputSummary: fakeInputSummary(tool), outputData, standardEvent
    });
  }
  return steps;
}
