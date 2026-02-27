// src/services/isoMappingService.js

const ISO_MAPPINGS = {
  quality: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Asegura que la producción se lleva a cabo bajo condiciones controladas.' },
    { standard: 'ISO 9001:2015', clause: '8.7', title: 'Control de las salidas no conformes', description: 'Identifica y controla las salidas que no cumplen con los requisitos.' },
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo continuo de la calidad del proceso y producto.' },
  ],
  vision: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Inspección visual automatizada para asegurar condiciones controladas.' },
    { standard: 'ISO 9001:2015', clause: '8.7', title: 'Control de las salidas no conformes', description: 'Detección visual de defectos y productos no conformes.' },
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Medición continua de parámetros de calidad mediante visión artificial.' },
  ],
  maintenance: [
    { standard: 'ISO 55001:2014', clause: '6.2', title: 'Objetivos de gestión de activos y planificación para lograrlos', description: 'Define y persigue objetivos de mantenimiento para los activos físicos.' },
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Planificación de actividades de mantenimiento preventivo y correctivo.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Seguimiento del estado y desempeño de los activos.' },
  ],
  safety: [
    { standard: 'ISO 45001:2018', clause: '8.1', title: 'Planificación y control operacional', description: 'Controles operacionales para eliminar o reducir riesgos de SST.' },
    { standard: 'ISO 45001:2018', clause: '8.2', title: 'Preparación y respuesta ante emergencias', description: 'Procedimientos para responder ante situaciones de emergencia.' },
    { standard: 'ISO 45001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación del desempeño', description: 'Monitoreo continuo de indicadores de seguridad y salud en el trabajo.' },
  ],
  environment: [
    { standard: 'ISO 14001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Control de operaciones con impacto ambiental significativo.' },
    { standard: 'ISO 14001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo de parámetros ambientales clave (CO₂, temperatura, humedad).' },
    { standard: 'ISO 14001:2015', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Gestión de incumplimientos ambientales y acciones correctivas.' },
  ],
  energy: [
    { standard: 'ISO 50001:2018', clause: '6.6', title: 'Planificación energética', description: 'Identificación de usos y consumos de energía significativos.' },
    { standard: 'ISO 50001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo del desempeño energético y consumos.' },
    { standard: 'ISO 50001:2018', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Gestión de desviaciones en consumo energético y acciones correctivas.' },
  ],
};

const BUSINESS_CONTINUITY_CLAUSE = {
  standard: 'ISO 22301:2019', clause: '8.4',
  title: 'Procedimientos de continuidad de negocio',
  description: 'Activación de procedimientos de continuidad ante eventos críticos.',
};

const INFOSEC_CLAUSE = {
  standard: 'ISO 27001:2022', clause: 'A.12',
  title: 'Seguridad operacional',
  description: 'Controles para la seguridad de sistemas y datos operacionales.',
};

function getClauseStatus (severity, event_type) {
  if ((severity === 'CRITICAL' || severity === 'HIGH') && (event_type === 'ALARM' || event_type === 'ERROR')) return 'NON_COMPLIANT';
  if (severity === 'MEDIUM' && event_type === 'WARNING') return 'WARNING';
  return 'COMPLIANT';
}

function getOverallCompliance (statuses) {
  if (statuses.includes('NON_COMPLIANT')) return 'NON_COMPLIANT';
  if (statuses.includes('WARNING')) return 'WARNING';
  return 'COMPLIANT';
}

function buildRecommendation (module_id, severity, complianceStatus) {
  if (complianceStatus === 'COMPLIANT') return `El módulo "${module_id}" opera dentro de los parámetros normativos. Continuar con el monitoreo regular.`;

  const recs = {
    quality:     { NON_COMPLIANT: 'Detener el lote afectado, iniciar revisión de no conformidades según ISO 9001:2015 §8.7 y notificar al responsable de calidad.', WARNING: 'Revisar parámetros de calidad del proceso. Documentar la desviación y evaluar acción correctiva preventiva.' },
    vision:      { NON_COMPLIANT: 'Inspeccionar el sistema de visión artificial. Segregar productos sospechosos y abrir reporte de no conformidad (ISO 9001:2015 §8.7).', WARNING: 'Verificar calibración del sistema de visión. Documentar la anomalía para análisis de tendencias.' },
    maintenance: { NON_COMPLIANT: 'Detener el activo afectado si hay riesgo de falla inminente. Ejecutar orden de trabajo correctivo urgente (ISO 55001:2014 §8.1).', WARNING: 'Programar mantenimiento preventivo anticipado. Revisar el plan de gestión del activo (ISO 55001:2014 §6.2).' },
    safety:      { NON_COMPLIANT: 'ALERTA DE SEGURIDAD: Evacuar zona si es necesario. Activar protocolo de emergencia (ISO 45001:2018 §8.2). Notificar a responsable de SST inmediatamente.', WARNING: 'Reforzar controles operacionales en la zona afectada. Revisar evaluación de riesgos (ISO 45001:2018 §8.1).' },
    environment: { NON_COMPLIANT: 'Activar plan de respuesta ambiental. Documentar el incidente y notificar a la autoridad ambiental si aplica (ISO 14001:2015 §10.2).', WARNING: 'Monitorear tendencia de parámetros ambientales. Revisar controles operacionales (ISO 14001:2015 §8.1).' },
    energy:      { NON_COMPLIANT: 'Identificar y corregir la causa del consumo energético anómalo. Actualizar línea base energética (ISO 50001:2018 §10.2).', WARNING: 'Revisar el plan de uso de energía. Analizar indicadores de desempeño energético (ISO 50001:2018 §9.1).' },
  };

  return recs[module_id]?.[complianceStatus] ?? `Revisar el módulo "${module_id}" y tomar acción correctiva según el nivel de severidad ${severity}.`;
}

export function mapEventToISO (event) {
  const { module_id, event_type, severity } = event;
  const baseClauses = ISO_MAPPINGS[module_id] ?? [];
  const clauseStatus = getClauseStatus(severity, event_type);

  const isoStandards = baseClauses.map(c => ({ ...c, status: clauseStatus }));

  if (severity === 'CRITICAL') isoStandards.push({ ...BUSINESS_CONTINUITY_CLAUSE, status: 'NON_COMPLIANT' });
  if (event_type === 'ERROR') isoStandards.push({ ...INFOSEC_CLAUSE, status: clauseStatus });

  const complianceStatus = getOverallCompliance(isoStandards.map(s => s.status));
  const recommendation = buildRecommendation(module_id, severity, complianceStatus);

  return { isoStandards, complianceStatus, recommendation };
}
