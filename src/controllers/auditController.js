import { fetchRecentEvents } from '../services/dashboardService.js';
import { generateAuditReport } from '../services/auditReportService.js';

export async function renderAuditReport (req, res, next) {
  try {
    const limit = Number(req.query.limit) || 200;
    const events = await fetchRecentEvents(limit);
    const report = generateAuditReport(events);
    return res.render('auditReport', { report });
  } catch (error) {
    return next(error);
  }
}
