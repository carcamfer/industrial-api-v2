// src/services/auditReportService.js
import { mapEventToISO } from './isoMappingService.js';

function uuid () {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Genera un reporte de auditoría ISO a partir de eventos de la base de datos.
 * @param {Array} events - Filas de industrial_events
 * @returns {Object} Reporte estructurado
 */
export function generateAuditReport (events) {
  if (!events || events.length === 0) {
    return {
      reportId: uuid(),
      generatedAt: new Date().toISOString(),
      period: { from: null, to: null },
      summary: { total: 0, compliant: 0, nonCompliant: 0, warnings: 0 },
      byStandard: {},
      criticalFindings: [],
      recommendations: [],
    };
  }

  const timestamps = events.map(e => new Date(e.timestamp));
  const period = {
    from: new Date(Math.min(...timestamps)).toISOString(),
    to:   new Date(Math.max(...timestamps)).toISOString(),
  };

  const summary = { total: events.length, compliant: 0, nonCompliant: 0, warnings: 0 };
  const byStandard = {};
  const criticalFindings = [];
  const recommendationsSet = new Set();

  for (const event of events) {
    const mapped = mapEventToISO({
      module_id:  event.module_id,
      event_type: event.event_type,
      severity:   event.severity,
      data:       event.data || {},
    });

    // Summary global
    if (mapped.complianceStatus === 'COMPLIANT')     summary.compliant++;
    else if (mapped.complianceStatus === 'WARNING')  summary.warnings++;
    else                                             summary.nonCompliant++;

    // Critical findings
    if (event.severity === 'CRITICAL' && mapped.complianceStatus === 'NON_COMPLIANT') {
      criticalFindings.push({
        eventId:          event.event_id,
        timestamp:        event.timestamp,
        module:           event.module_id,
        asset:            event.asset_id,
        severity:         event.severity,
        complianceStatus: mapped.complianceStatus,
        standards:        mapped.isoStandards.map(s => `${s.standard} §${s.clause}`).join(', '),
        recommendation:   mapped.recommendation,
      });
    }

    // Recommendations
    if (mapped.recommendation) recommendationsSet.add(mapped.recommendation);

    // By standard
    for (const iso of mapped.isoStandards) {
      if (!byStandard[iso.standard]) {
        byStandard[iso.standard] = { compliant: 0, nonCompliant: 0, warnings: 0, clauses: {} };
      }

      const std = byStandard[iso.standard];

      if (iso.status === 'COMPLIANT')     std.compliant++;
      else if (iso.status === 'WARNING')  std.warnings++;
      else                                std.nonCompliant++;

      const clauseKey = iso.clause;
      if (!std.clauses[clauseKey]) {
        std.clauses[clauseKey] = { clause: iso.clause, title: iso.title, compliant: 0, nonCompliant: 0, warnings: 0 };
      }

      if (iso.status === 'COMPLIANT')     std.clauses[clauseKey].compliant++;
      else if (iso.status === 'WARNING')  std.clauses[clauseKey].warnings++;
      else                                std.clauses[clauseKey].nonCompliant++;
    }
  }

  // Convertir clauses de objeto a array
  for (const std of Object.values(byStandard)) {
    std.clauses = Object.values(std.clauses);
  }

  return {
    reportId:        uuid(),
    generatedAt:     new Date().toISOString(),
    period,
    summary,
    byStandard,
    criticalFindings,
    recommendations: [...recommendationsSet],
  };
}
