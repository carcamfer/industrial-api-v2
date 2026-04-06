import { getClientMappings } from '../services/isoMappingService.js';

function uid () { return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7); }

export function renderAuditReport (req, res) {
  const sinceRaw = req.query.since ? Number(req.query.since) : null;
  const clientMappings = getClientMappings();
  return res.render('auditReport', {
    report: {
      reportId: uid(),
      generatedAt: new Date().toISOString(),
      period: { from: null, to: null },
      summary: { total: 0, compliant: 0, nonCompliant: 0, warnings: 0 },
      byStandard: {},
      criticalFindings: [],
      recommendations: [],
    },
    since: sinceRaw || null,
    isoMappingsJson:  JSON.stringify(clientMappings.ISO_MAPPINGS),
    isoRecsJson:      JSON.stringify(clientMappings.RECS),
    isoAllStdJson:    JSON.stringify(clientMappings.ALL_STD),
    isoBcJson:        JSON.stringify(clientMappings.BC),
    isoIsJson:        JSON.stringify(clientMappings.IS),
    isoAliasMapJson:  JSON.stringify(clientMappings.ALIAS_MAP),
  });
}
