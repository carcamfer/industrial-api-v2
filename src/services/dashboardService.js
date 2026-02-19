import dayjs from 'dayjs';
import pool from '../db/index.js';

export async function fetchSummaryStats () {
  const [countsBySeverity, countsByModule, totals] = await Promise.all([
    pool.query(`
      SELECT COALESCE(severity, 'UNKNOWN') AS severity, COUNT(*)
      FROM industrial_events
      GROUP BY severity
      ORDER BY COUNT(*) DESC
    `),
    pool.query(`
      SELECT module_id, COUNT(*)
      FROM industrial_events
      GROUP BY module_id
      ORDER BY COUNT(*) DESC
      LIMIT 10
    `),
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
    `)
  ]);

  return {
    severity: countsBySeverity.rows,
    modules: countsByModule.rows,
    totals: totals.rows[0]
  };
}

export async function fetchRecentEvents (limit = 20) {
  const { rows } = await pool.query(
    `SELECT *
     FROM industrial_events
     ORDER BY timestamp DESC
     LIMIT $1`,
    [limit]
  );

  return rows.map((row) => ({
    ...row,
    timestamp_fmt: dayjs(row.timestamp).format('YYYY-MM-DD HH:mm:ss'),
    received_at_fmt: dayjs(row.received_at).format('YYYY-MM-DD HH:mm:ss')
  }));
}
