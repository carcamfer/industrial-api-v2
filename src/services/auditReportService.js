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

  // Pre-populate all 7 known ISO standards so they always appear in the report
  const ALL_STANDARDS = [
    { key: 'ISO 9001:2015',  clauses: [{ clause:'8.5', title:'Control de producción' }, { clause:'8.7', title:'Control de salidas no conformes' }, { clause:'9.1', title:'Seguimiento y evaluación' }] },
    { key: 'ISO 27001:2022', clauses: [{ clause:'A.12', title:'Seguridad operacional' }] },
    { key: 'ISO 55001:2014', clauses: [{ clause:'6.2', title:'Objetivos de gestión de activos' }, { clause:'8.1', title:'Planificación y control operacional' }, { clause:'9.1', title:'Monitoreo y evaluación' }] },
    { key: 'ISO 45001:2018', clauses: [{ clause:'8.1', title:'Planificación y control operacional' }, { clause:'8.2', title:'Preparación ante emergencias' }, { clause:'9.1', title:'Seguimiento del desempeño SST' }] },
    { key: 'ISO 14001:2015', clauses: [{ clause:'8.1', title:'Control operacional ambiental' }, { clause:'9.1', title:'Seguimiento ambiental' }, { clause:'10.2', title:'No conformidad ambiental' }] },
    { key: 'ISO 50001:2018', clauses: [{ clause:'6.6', title:'Planificación energética' }, { clause:'9.1', title:'Seguimiento energético' }, { clause:'10.2', title:'No conformidad energética' }] },
    { key: 'ISO 22301:2019', clauses: [{ clause:'8.4', title:'Procedimientos de continuidad' }] },
  ];
  const byStandard = {};
  for (const std of ALL_STANDARDS) {
    byStandard[std.key] = {
      compliant: 0, nonCompliant: 0, warnings: 0,
      clauses: std.clauses.map(c => ({ clause: c.clause, title: c.title, compliant: 0, nonCompliant: 0, warnings: 0 })),
    };
  }

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
        byStandard[iso.standard] = { compliant: 0, nonCompliant: 0, warnings: 0, clauses: [] };
      }

      const std = byStandard[iso.standard];

      if (iso.status === 'COMPLIANT')     std.compliant++;
      else if (iso.status === 'WARNING')  std.warnings++;
      else                                std.nonCompliant++;

      // Find existing clause entry or add one
      let clauseEntry = std.clauses.find(c => c.clause === iso.clause);
      if (!clauseEntry) {
        clauseEntry = { clause: iso.clause, title: iso.title, compliant: 0, nonCompliant: 0, warnings: 0 };
        std.clauses.push(clauseEntry);
      }

      if (iso.status === 'COMPLIANT')     clauseEntry.compliant++;
      else if (iso.status === 'WARNING')  clauseEntry.warnings++;
      else                                clauseEntry.nonCompliant++;
    }
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
