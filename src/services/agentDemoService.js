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

// ── Per-tool ISO alarm overrides (cross-domain tools) ────────────────────────
const TOOL_ALARM_OVERRIDES = {
  // ERP tools that really belong to production domain
  detect_production_deviation:      'production_oee_tracker',
  predict_production_delays:        'production_oee_tracker',
  optimize_production_schedule:     'production_oee_tracker',
  compare_planned_vs_actual:        'production_oee_tracker',
  // ERP tools that really belong to supply chain
  analyze_lead_times:               'supply_chain_risk_tracker',
  evaluate_suppliers:               'supply_chain_risk_tracker',
  // ERP tools for business anomalies → AI/ML domain
  detect_business_anomalies:        'aiml_failure_predictor',
  // Infrastructure tools for energy
  monitor_energy_consumption:       'energy_consumption_tracker',
  // Infrastructure tools that are edge monitoring
  collect_vibration_data:           'edge_health_monitor',
  collect_process_signals:          'edge_health_monitor',
  detect_real_time_anomalies:       'cybersec_threat_detector',
  // Maintenance tools cross-domain
  analyze_failure_modes:            'aiml_failure_predictor',
  execute_condition_monitoring:     'edge_health_monitor',
  generate_maintenance_kpis:        'erp_kpi_alert',
  // Vision tools that are really safety
  detect_safety_violations:         'safety_zone_monitor',
  monitor_worker_posture:           'safety_zone_monitor',
  // AI/ML tool for production
  identify_bottlenecks:             'production_oee_tracker',
  // Digital twin tool that is really edge
  generate_digital_twin_model:      'digital_twin_deviation',
  // Control tool using AI analysis
  analyze_control_loop_performance: 'aiml_failure_predictor',
  // Supply chain tools
  scan_incoming_material:           'quality_score_evaluator',
  manage_supplier_scorecard:        'erp_kpi_alert',
};

// ── Keyword-based ISO alarm derivation (fallback) ────────────────────────────
const KEYWORD_ALARM_RULES = [
  { re: /gas|hazop|sil_level|incident|permit|drill|safety_kpi/,                   alarm: 'safety_zone_monitor' },
  { re: /vision|camera|visual_pattern|train_vision|improve_detection/,             alarm: 'vision_defect_inspector' },
  { re: /cpk|ppk|spc|nonconform|8d|msa|control_chart|out_of_control|quality_meas|product_spec/, alarm: 'quality_score_evaluator' },
  { re: /energy_meter|energy_kpi|energy_waste|energy_load|iso50001|benchmark_energy|energy_audit|energy_usage|carbon|footprint/, alarm: 'energy_consumption_tracker' },
  { re: /emission/,                                                                 alarm: 'env_emission_monitor' },
  { re: /preventive_maintenance|mtbf|mttr|spare_part|asset_lifecycle/,             alarm: 'predictive_maintenance_scan' },
  { re: /scada|pid|setpoint|historian|batch_sequence|acknowledge_alarm|control_loop/, alarm: 'scada_pid_loop_monitor' },
  { re: /shipment|delivery|warehouse|wms|scm_kpi|supplier_score|incoming_material|delivery_route/, alarm: 'supply_chain_risk_tracker' },
  { re: /inventory|purchase|stock_level|forecast_revenue|lead_score|followup|sync_erp|push_order|budget|expense|operational_cost|project_cost/, alarm: 'erp_kpi_alert' },
  { re: /network|threat|attack|block_ip|segment|malicious|gateway|ot_network|isolate|security_strategy|anomaly_pattern/, alarm: 'cybersec_threat_detector' },
  { re: /predict_machine|vibration_pattern|predict_demand_industrial|process_deviation|local_inference|optimize_energy_usage/, alarm: 'aiml_failure_predictor' },
  { re: /bottleneck|idle_time|production_flow|machine_state|production_adjust|production_data|production_sequence|oee/, alarm: 'production_oee_tracker' },
  { re: /twin|simulate_operation|system_performance|real_time_data_to_twin/,       alarm: 'digital_twin_deviation' },
  { re: /edge_node|edge_device|deploy_edge|update_edge|edge_health|device_registry|digitize|local_control|sensor_data|edge_config/, alarm: 'edge_health_monitor' },
];

export function deriveToolAlarm(toolId, fallbackAlarm) {
  if (TOOL_ALARM_OVERRIDES[toolId]) return TOOL_ALARM_OVERRIDES[toolId];
  const id = toolId.toLowerCase();
  for (const { re, alarm } of KEYWORD_ALARM_RULES) {
    if (re.test(id)) return alarm;
  }
  return fallbackAlarm || toolId;
}

function deriveToolSeverity(toolId) {
  const id = toolId.toLowerCase();
  if (/detect|monitor|scan|block|trigger|report_incident|overrun|violation|anomaly/.test(id)) return 'high';
  if (/analyze|calculate|predict|investigate|assess|inspect|identify|track|compare|evaluate/.test(id)) return 'medium';
  return 'low';
}

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
      severity: deriveToolSeverity(tool.id),
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
  const agentAlarm = parentAgents[0]?.isoAlarms?.[0] || null;
  const isoAlarm = deriveToolAlarm(toolId, agentAlarm);
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
    const agentAlarm = agent.isoAlarms?.[0] || null;
    const isoAlarm = deriveToolAlarm(tool.id, agentAlarm);
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
