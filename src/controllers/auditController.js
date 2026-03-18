function uid () { return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7); }

export function renderAuditReport (req, res) {
  const sinceRaw = req.query.since ? Number(req.query.since) : null;
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
  });
}
