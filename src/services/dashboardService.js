import dayjs from 'dayjs';
import pool from '../db/index.js';

export async function fetchSummaryStats (since = null) {
  const where = since ? 'WHERE timestamp >= $1' : '';
  const p = since ? [since] : [];

  const [countsBySeverity, countsByModule, totals] = await Promise.all([
    pool.query(`
      SELECT COALESCE(severity, 'UNKNOWN') AS severity, COUNT(*)
      FROM industrial_events
      ${where}
      GROUP BY severity
      ORDER BY COUNT(*) DESC
    `, p),
    pool.query(`
      SELECT module_id, COUNT(*)
      FROM industrial_events
      ${where}
      GROUP BY module_id
      ORDER BY COUNT(*) DESC
      LIMIT 10
    `, p),
    pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (
          WHERE timestamp >= NOW() - INTERVAL '24 HOURS'
        ) AS last_24h,
        COUNT(*) FILTER (
          WHERE timestamp >= NOW() - INTERVAL '1 HOUR'
        ) AS last_hour
      FROM industrial_events
      ${where}
    `, p)
  ]);

  return {
    severity: countsBySeverity.rows,
    modules: countsByModule.rows,
    totals: totals.rows[0]
  };
}

export async function fetchRecentEvents (limit = 20, since = null) {
  const whereClause = since ? 'WHERE timestamp >= $1' : '';
  const params = since ? [since, limit] : [limit];
  const limitParam = since ? '$2' : '$1';
  const { rows } = await pool.query(
    `SELECT *
     FROM industrial_events
     ${whereClause}
     ORDER BY timestamp DESC
     LIMIT ${limitParam}`,
    params
  );

  return rows.map((row) => ({
    ...row,
    timestamp_fmt: dayjs(row.timestamp).format('YYYY-MM-DD HH:mm:ss'),
    received_at_fmt: dayjs(row.received_at).format('YYYY-MM-DD HH:mm:ss')
  }));
}
