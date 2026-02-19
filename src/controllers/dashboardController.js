import { fetchSummaryStats, fetchRecentEvents } from '../services/dashboardService.js';

export async function renderDashboard (req, res, next) {
  try {
    const [summary, recent] = await Promise.all([
      fetchSummaryStats(),
      fetchRecentEvents(25)
    ]);

    return res.render('dashboard', {
      summary,
      events: recent
    });
  } catch (error) {
    return next(error);
  }
}
