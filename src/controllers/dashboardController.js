export function renderDashboard (req, res) {
  const sinceRaw = req.query.since ? Number(req.query.since) : null;
  return res.render('dashboard', {
    summary: { severity: [], modules: [], totals: { total: 0, last_24h: 0, last_hour: 0 } },
    events: [],
    since: sinceRaw || null,
  });
}
