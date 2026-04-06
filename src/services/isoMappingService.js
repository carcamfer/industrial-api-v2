// src/services/isoMappingService.js
// Keys are isoAlarm names (from agents.json isoAlarms[]).
// Old category keys kept as aliases for backward-compatibility.

const ISO_MAPPINGS = {

  // ── Calidad & SPC ──────────────────────────────────────────
  quality_score_evaluator: [
    { standard: 'ISO 9001:2015',   clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Asegura que la producción se lleva a cabo bajo condiciones controladas.' },
    { standard: 'ISO 9001:2015',   clause: '8.7', title: 'Control de las salidas no conformes', description: 'Identifica y controla las salidas que no cumplen con los requisitos.' },
    { standard: 'ISO 9001:2015',   clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo continuo de la calidad del proceso y producto.' },
    { standard: 'IATF 16949:2016', clause: '8.5.1', title: 'Control de plan de control (manufacturing process)', description: 'Plan de control para procesos de manufactura con SPC y Cpk.' },
    { standard: 'IATF 16949:2016', clause: '8.7.1', title: 'Control de producto no conforme — requerimientos específicos', description: 'Gestión de producto no conforme incluyendo material sospechoso y cuarentena.' },
  ],

  // ── Visión Artificial ──────────────────────────────────────
  vision_defect_inspector: [
    { standard: 'ISO 9001:2015',   clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Inspección visual automatizada para asegurar condiciones controladas.' },
    { standard: 'ISO 9001:2015',   clause: '8.7', title: 'Control de las salidas no conformes', description: 'Detección visual de defectos y productos no conformes.' },
    { standard: 'ISO 9001:2015',   clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Medición continua de parámetros de calidad mediante visión artificial.' },
    { standard: 'IATF 16949:2016', clause: '8.5.1', title: 'Control de plan de control (manufacturing process)', description: 'Inspección automatizada como parte del plan de control de manufactura.' },
  ],

  // ── Mantenimiento & CMMS ──────────────────────────────────
  predictive_maintenance_scan: [
    { standard: 'ISO 55001:2014', clause: '6.2', title: 'Objetivos de gestión de activos y planificación para lograrlos', description: 'Define y persigue objetivos de mantenimiento para los activos físicos.' },
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Planificación de actividades de mantenimiento preventivo y correctivo.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Seguimiento del estado y desempeño de los activos.' },
  ],

  // ── Seguridad HSE ─────────────────────────────────────────
  safety_zone_monitor: [
    { standard: 'ISO 45001:2018', clause: '8.1', title: 'Planificación y control operacional', description: 'Controles operacionales para eliminar o reducir riesgos de SST.' },
    { standard: 'ISO 45001:2018', clause: '8.2', title: 'Preparación y respuesta ante emergencias', description: 'Procedimientos para responder ante situaciones de emergencia.' },
    { standard: 'ISO 45001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación del desempeño', description: 'Monitoreo continuo de indicadores de seguridad y salud en el trabajo.' },
    { standard: 'IEC 61511:2016', clause: '5.2', title: 'Gestión de seguridad funcional', description: 'Gestión del ciclo de vida de seguridad para sistemas instrumentados de seguridad (SIS).' },
    { standard: 'IEC 61511:2016', clause: '9',   title: 'Especificación de requerimientos de seguridad (SRS)', description: 'Especificación de requerimientos SIL para funciones instrumentadas de seguridad.' },
  ],

  // ── Medio Ambiente ────────────────────────────────────────
  env_emission_monitor: [
    { standard: 'ISO 14001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Control de operaciones con impacto ambiental significativo.' },
    { standard: 'ISO 14001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo de parámetros ambientales clave (CO₂, temperatura, humedad).' },
    { standard: 'ISO 14001:2015', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Gestión de incumplimientos ambientales y acciones correctivas.' },
  ],

  // ── Energía & Sustentabilidad ─────────────────────────────
  energy_consumption_tracker: [
    { standard: 'ISO 50001:2018', clause: '6.6', title: 'Planificación energética', description: 'Identificación de usos y consumos de energía significativos.' },
    { standard: 'ISO 50001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo del desempeño energético y consumos.' },
    { standard: 'ISO 50001:2018', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Gestión de desviaciones en consumo energético y acciones correctivas.' },
  ],

  // ── Control & SCADA ───────────────────────────────────────
  scada_pid_loop_monitor: [
    { standard: 'IEC 61511:2016', clause: '5.2', title: 'Gestión de seguridad funcional', description: 'Gestión del ciclo de vida de los sistemas instrumentados de seguridad en lazos de control.' },
    { standard: 'IEC 61511:2016', clause: '11',  title: 'Diseño e ingeniería del SIS', description: 'Diseño del sistema instrumentado de seguridad conforme al SIL requerido.' },
    { standard: 'IEC 61511:2016', clause: '16',  title: 'Operación y mantenimiento del SIS', description: 'Operación y mantenimiento del sistema instrumentado según el plan de seguridad.' },
  ],

  // ── Cadena de Suministro ──────────────────────────────────
  supply_chain_risk_tracker: [
    { standard: 'ISO 28000:2022', clause: '6.1', title: 'Acciones para abordar riesgos y oportunidades de la cadena de suministro', description: 'Identificación y gestión de riesgos de seguridad en la cadena de suministro.' },
    { standard: 'ISO 28000:2022', clause: '8.1', title: 'Planificación y control operacional de la cadena de suministro', description: 'Control operacional de las actividades de la cadena de suministro.' },
    { standard: 'ISO 28000:2022', clause: '8.3', title: 'Gestión de incidentes de seguridad en la cadena de suministro', description: 'Preparación y respuesta ante incidentes de seguridad logística.' },
  ],

  // ── ERP & Gestión Empresarial ─────────────────────────────
  erp_kpi_alert: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Planificación y control de las operaciones de producción, compras y ventas.' },
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo de KPIs de negocio y desempeño operacional.' },
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de los procesos, productos y servicios suministrados externamente', description: 'Gestión de proveedores y evaluación de su desempeño.' },
  ],

  // ── Ciberseguridad Industrial ─────────────────────────────
  cybersec_threat_detector: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 6.1', title: 'Auditoría de eventos de seguridad', description: 'Registro y auditoría de eventos de ciberseguridad en redes industriales OT/IT.' },
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 6.2', title: 'Monitoreo continuo de seguridad', description: 'Monitoreo continuo de la red OT para detectar intrusiones y anomalías.' },
    { standard: 'ISO 27001:2022',     clause: 'A.12.6', title: 'Gestión de vulnerabilidades técnicas', description: 'Identificación y gestión de vulnerabilidades en sistemas industriales.' },
    { standard: 'ISO 27001:2022',     clause: 'A.16.1', title: 'Gestión de incidentes de seguridad de la información', description: 'Detección, reporte y respuesta ante incidentes de ciberseguridad.' },
  ],

  // ── AI & Machine Learning Industrial ─────────────────────
  aiml_failure_predictor: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Uso de modelos predictivos ML para planificar intervenciones de mantenimiento.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Análisis de datos de vibración y proceso para detectar degradación de activos.' },
    { standard: 'ISO 9001:2015',  clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Uso de modelos ML para el monitoreo y mejora del proceso productivo.' },
  ],

  // ── Infraestructura & Edge ────────────────────────────────
  edge_health_monitor: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Gestión operacional de nodos edge y dispositivos IIoT en planta.' },
    { standard: 'ISO 9001:2015',  clause: '7.1', title: 'Recursos', description: 'Aseguramiento de infraestructura tecnológica necesaria para las operaciones.' },
    { standard: 'IEC 62443-2-1:2010', clause: '4.3.3', title: 'Gestión del sistema de control industrial', description: 'Monitoreo y mantenimiento de la infraestructura de control industrial.' },
  ],

  // ── Producción Avanzada ───────────────────────────────────
  production_oee_tracker: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Aseguramiento de condiciones controladas de producción y monitoreo de OEE.' },
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo de indicadores de productividad, tiempos muertos y cuellos de botella.' },
    { standard: 'ISO 55001:2014', clause: '6.2', title: 'Objetivos de gestión de activos y planificación', description: 'Planificación de la producción alineada a objetivos de disponibilidad de activos.' },
  ],

  // ── Digital Twin ──────────────────────────────────────────
  digital_twin_deviation: [
    { standard: 'ISO 9001:2015',  clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Uso del gemelo digital para monitoreo continuo y detección de desviaciones.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Evaluación del desempeño de activos mediante simulación de gemelo digital.' },
    { standard: 'ISO 9001:2015',  clause: '10.3', title: 'Mejora continua', description: 'Escenarios what-if en el gemelo digital para identificar oportunidades de mejora.' },
  ],

  // ── Aliases de categoría (backward-compat) ─────────────────
  quality:      null,
  vision:       null,
  maintenance:  null,
  safety:       null,
  environment:  null,
  energy:       null,
  control:      null,
  supply_chain: null,
};

// Resolve alias categories to their isoAlarm equivalents
ISO_MAPPINGS.quality      = ISO_MAPPINGS.quality_score_evaluator;
ISO_MAPPINGS.vision       = ISO_MAPPINGS.vision_defect_inspector;
ISO_MAPPINGS.maintenance  = ISO_MAPPINGS.predictive_maintenance_scan;
ISO_MAPPINGS.safety       = ISO_MAPPINGS.safety_zone_monitor;
ISO_MAPPINGS.environment  = ISO_MAPPINGS.env_emission_monitor;
ISO_MAPPINGS.energy       = ISO_MAPPINGS.energy_consumption_tracker;
ISO_MAPPINGS.control      = ISO_MAPPINGS.scada_pid_loop_monitor;
ISO_MAPPINGS.supply_chain = ISO_MAPPINGS.supply_chain_risk_tracker;

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
    // isoAlarm keys
    quality_score_evaluator:   { NON_COMPLIANT: 'Detener el lote afectado, iniciar revisión de no conformidades según ISO 9001:2015 §8.7 / IATF 16949 §8.7.1 y notificar al responsable de calidad.', WARNING: 'Revisar parámetros de calidad del proceso. Documentar la desviación y evaluar acción correctiva preventiva (IATF 16949 §8.5.1).' },
    vision_defect_inspector:   { NON_COMPLIANT: 'Inspeccionar el sistema de visión artificial. Segregar productos sospechosos y abrir reporte de no conformidad (ISO 9001:2015 §8.7 / IATF 16949 §8.7.1).', WARNING: 'Verificar calibración del sistema de visión. Documentar la anomalía para análisis de tendencias.' },
    predictive_maintenance_scan: { NON_COMPLIANT: 'Detener el activo afectado si hay riesgo de falla inminente. Ejecutar orden de trabajo correctivo urgente (ISO 55001:2014 §8.1).', WARNING: 'Programar mantenimiento preventivo anticipado. Revisar el plan de gestión del activo (ISO 55001:2014 §6.2).' },
    safety_zone_monitor:       { NON_COMPLIANT: 'ALERTA DE SEGURIDAD: Evacuar zona si es necesario. Activar protocolo de emergencia (ISO 45001:2018 §8.2). Verificar estado del SIS conforme IEC 61511:2016 §16.', WARNING: 'Reforzar controles operacionales en la zona afectada. Revisar evaluación de riesgos (ISO 45001:2018 §8.1) y demanda de función SIS (IEC 61511:2016 §5.2).' },
    env_emission_monitor:      { NON_COMPLIANT: 'Activar plan de respuesta ambiental. Documentar el incidente y notificar a la autoridad ambiental si aplica (ISO 14001:2015 §10.2).', WARNING: 'Monitorear tendencia de parámetros ambientales. Revisar controles operacionales (ISO 14001:2015 §8.1).' },
    energy_consumption_tracker: { NON_COMPLIANT: 'Identificar y corregir la causa del consumo energético anómalo. Actualizar línea base energética (ISO 50001:2018 §10.2).', WARNING: 'Revisar el plan de uso de energía. Analizar indicadores de desempeño energético (ISO 50001:2018 §9.1).' },
    scada_pid_loop_monitor:    { NON_COMPLIANT: 'ALARMA DE PROCESO CRÍTICA: Verificar estado del sistema instrumentado de seguridad (SIS). Revisar desvío de función SIL conforme IEC 61511:2016 §11. Notificar al ingeniero de seguridad funcional.', WARNING: 'Revisar desempeño del lazo de control afectado. Documentar desvío de proceso y evaluar demanda al SIS (IEC 61511:2016 §5.2).' },
    supply_chain_risk_tracker: { NON_COMPLIANT: 'Activar plan de contingencia de cadena de suministro. Notificar a gestión de proveedores y revisar acuerdo de seguridad (ISO 28000:2022 §8.3).', WARNING: 'Monitorear indicadores de riesgo del proveedor afectado. Revisar controles de cadena de suministro (ISO 28000:2022 §8.1).' },
    erp_kpi_alert:             { NON_COMPLIANT: 'Revisar desviación de KPIs de negocio. Analizar causa raíz de la anomalía operacional y escalar a gerencia según ISO 9001:2015 §9.1. Verificar estado de proveedores críticos (ISO 9001:2015 §8.4).', WARNING: 'Monitorear tendencia de indicadores de negocio. Documentar la desviación y evaluar impacto en objetivos de calidad (ISO 9001:2015 §9.1).' },
    cybersec_threat_detector:  { NON_COMPLIANT: 'INCIDENTE DE CIBERSEGURIDAD: Aislar el segmento de red afectado. Activar plan de respuesta ante incidentes (ISO 27001:2022 §A.16.1). Reportar a CISO y documentar el evento (IEC 62443-3-3:2013 §SR 6.1).', WARNING: 'Reforzar monitoreo de red OT/IT. Revisar configuración de firewall y segmentación (IEC 62443-3-3:2013 §SR 6.2). Verificar parches de seguridad pendientes (ISO 27001:2022 §A.12.6).' },
    aiml_failure_predictor:    { NON_COMPLIANT: 'Alta probabilidad de falla detectada por modelo ML. Detener el activo para inspección y ejecutar orden de trabajo preventivo urgente (ISO 55001:2014 §8.1). Revisar modelo de predicción.', WARNING: 'Monitorear de cerca el activo flaggeado. Programar inspección anticipada. Revisar datos de entrenamiento del modelo (ISO 55001:2014 §9.1).' },
    edge_health_monitor:       { NON_COMPLIANT: 'Nodo edge fuera de servicio o degradado. Activar plan de contingencia de infraestructura (ISO 55001:2014 §8.1). Verificar conectividad y estado de sensores afectados (IEC 62443-2-1:2010 §4.3.3).', WARNING: 'Revisar salud de la flota edge. Programar mantenimiento de nodo afectado. Verificar configuración de watchdog (ISO 9001:2015 §7.1).' },
    production_oee_tracker:    { NON_COMPLIANT: 'OEE por debajo del umbral crítico. Iniciar análisis de causa raíz de tiempos muertos (ISO 9001:2015 §8.5). Activar plan de recuperación de producción y notificar a planeación (ISO 55001:2014 §6.2).', WARNING: 'OEE en zona de advertencia. Revisar cuellos de botella y programar ajuste de parámetros. Documentar tiempo muerto para análisis de tendencias (ISO 9001:2015 §9.1).' },
    digital_twin_deviation:    { NON_COMPLIANT: 'Desviación crítica detectada entre gemelo digital y planta real. Revisar calibración del modelo. Escalar para análisis de causa raíz (ISO 9001:2015 §9.1). Verificar integridad de datos del proceso.', WARNING: 'Desviación detectada en gemelo digital. Revisar parámetros del modelo y ajustar según datos recientes (ISO 55001:2014 §9.1). Documentar para mejora continua (ISO 9001:2015 §10.3).' },
    // category aliases for backward-compat
    quality:      null, vision: null, maintenance: null, safety: null,
    environment:  null, energy: null, control: null, supply_chain: null,
  };

  // resolve aliases
  const aliasMap = {
    quality: 'quality_score_evaluator', vision: 'vision_defect_inspector',
    maintenance: 'predictive_maintenance_scan', safety: 'safety_zone_monitor',
    environment: 'env_emission_monitor', energy: 'energy_consumption_tracker',
    control: 'scada_pid_loop_monitor', supply_chain: 'supply_chain_risk_tracker',
  };
  const key = aliasMap[module_id] || module_id;
  return recs[key]?.[complianceStatus] ?? `Revisar el módulo "${module_id}" y tomar acción correctiva según el nivel de severidad ${severity}.`;
}

/**
 * Returns the full client-side ISO mapping data for use in Pug templates.
 * This is the single source of truth — auditReport.pug reads from this.
 */
export function getClientMappings () {
  const aliasMap = {
    quality: 'quality_score_evaluator', vision: 'vision_defect_inspector',
    maintenance: 'predictive_maintenance_scan', safety: 'safety_zone_monitor',
    environment: 'env_emission_monitor', energy: 'energy_consumption_tracker',
    control: 'scada_pid_loop_monitor', supply_chain: 'supply_chain_risk_tracker',
  };

  // Only export primary alarm-name keys (not alias nulls)
  const clientMappings = {};
  for (const [key, val] of Object.entries(ISO_MAPPINGS)) {
    if (val !== null && !Object.values(aliasMap).every(v => v !== key) === false) {
      // include both primary keys and aliases that resolve
      clientMappings[key] = val;
    }
  }
  // Also include all alias keys pointing to the resolved arrays
  for (const [alias, primary] of Object.entries(aliasMap)) {
    clientMappings[alias] = ISO_MAPPINGS[primary];
  }

  const recKeys = [
    'quality_score_evaluator', 'vision_defect_inspector', 'predictive_maintenance_scan',
    'safety_zone_monitor', 'env_emission_monitor', 'energy_consumption_tracker',
    'scada_pid_loop_monitor', 'supply_chain_risk_tracker',
    'erp_kpi_alert', 'cybersec_threat_detector', 'aiml_failure_predictor',
    'edge_health_monitor', 'production_oee_tracker', 'digital_twin_deviation',
  ];

  const RECS_CLIENT = {};
  for (const k of recKeys) {
    RECS_CLIENT[k] = {
      NON_COMPLIANT: buildRecommendation(k, 'CRITICAL', 'NON_COMPLIANT'),
      WARNING: buildRecommendation(k, 'MEDIUM', 'WARNING'),
    };
  }
  // Add alias keys
  for (const [alias, primary] of Object.entries(aliasMap)) {
    RECS_CLIENT[alias] = RECS_CLIENT[primary];
  }

  const ALL_STD = [
    { key: 'ISO 9001:2015',      clauses: [{ clause:'8.5', title:'Control de producción y de la provisión del servicio' }, { clause:'8.7', title:'Control de las salidas no conformes' }, { clause:'8.4', title:'Control de procesos, productos y servicios externos' }, { clause:'9.1', title:'Seguimiento, medición, análisis y evaluación' }, { clause:'10.3', title:'Mejora continua' }] },
    { key: 'IATF 16949:2016',    clauses: [{ clause:'8.5.1', title:'Control de plan de control (manufacturing process)' }, { clause:'8.7.1', title:'Control de producto no conforme — requerimientos específicos' }] },
    { key: 'ISO 27001:2022',     clauses: [{ clause:'A.12', title:'Seguridad operacional' }, { clause:'A.12.6', title:'Gestión de vulnerabilidades técnicas' }, { clause:'A.16.1', title:'Gestión de incidentes de seguridad de la información' }] },
    { key: 'ISO 55001:2014',     clauses: [{ clause:'6.2', title:'Objetivos de gestión de activos y planificación' }, { clause:'7.1', title:'Recursos' }, { clause:'8.1', title:'Planificación y control operacional' }, { clause:'9.1', title:'Monitoreo, medición, análisis y evaluación' }] },
    { key: 'ISO 45001:2018',     clauses: [{ clause:'8.1', title:'Planificación y control operacional' }, { clause:'8.2', title:'Preparación y respuesta ante emergencias' }, { clause:'9.1', title:'Seguimiento, medición, análisis y evaluación del desempeño SST' }] },
    { key: 'IEC 61511:2016',     clauses: [{ clause:'5.2', title:'Gestión de seguridad funcional' }, { clause:'9', title:'Especificación de requerimientos de seguridad (SRS)' }, { clause:'11', title:'Diseño e ingeniería del SIS' }, { clause:'16', title:'Operación y mantenimiento del SIS' }] },
    { key: 'ISO 14001:2015',     clauses: [{ clause:'8.1', title:'Control operacional ambiental' }, { clause:'9.1', title:'Seguimiento, medición, análisis y evaluación ambiental' }, { clause:'10.2', title:'No conformidad y acción correctiva ambiental' }] },
    { key: 'ISO 50001:2018',     clauses: [{ clause:'6.6', title:'Planificación energética' }, { clause:'9.1', title:'Seguimiento, medición, análisis y evaluación energética' }, { clause:'10.2', title:'No conformidad y acción correctiva energética' }] },
    { key: 'ISO 28000:2022',     clauses: [{ clause:'6.1', title:'Acciones para abordar riesgos en cadena de suministro' }, { clause:'8.1', title:'Control operacional de la cadena de suministro' }, { clause:'8.3', title:'Gestión de incidentes de seguridad logística' }] },
    { key: 'ISO 22301:2019',     clauses: [{ clause:'8.4', title:'Procedimientos de continuidad de negocio' }] },
    { key: 'IEC 62443-3-3:2013', clauses: [{ clause:'SR 6.1', title:'Auditoría de eventos de seguridad industrial' }, { clause:'SR 6.2', title:'Monitoreo continuo de seguridad OT' }] },
    { key: 'IEC 62443-2-1:2010', clauses: [{ clause:'4.3.3', title:'Gestión del sistema de control industrial' }] },
  ];

  return {
    ISO_MAPPINGS: clientMappings,
    RECS: RECS_CLIENT,
    ALL_STD,
    BC: BUSINESS_CONTINUITY_CLAUSE,
    IS: INFOSEC_CLAUSE,
    ALIAS_MAP: aliasMap,
  };
}

export function mapEventToISO (event) {
  const { module_id, event_type, severity } = event;
  const aliasMap = {
    quality: 'quality_score_evaluator', vision: 'vision_defect_inspector',
    maintenance: 'predictive_maintenance_scan', safety: 'safety_zone_monitor',
    environment: 'env_emission_monitor', energy: 'energy_consumption_tracker',
    control: 'scada_pid_loop_monitor', supply_chain: 'supply_chain_risk_tracker',
  };
  const key = aliasMap[module_id] || module_id;
  const baseClauses = ISO_MAPPINGS[key] ?? [];
  const clauseStatus = getClauseStatus(severity, event_type);

  const isoStandards = baseClauses.map(c => ({ ...c, status: clauseStatus }));

  if (severity === 'CRITICAL') isoStandards.push({ ...BUSINESS_CONTINUITY_CLAUSE, status: 'NON_COMPLIANT' });
  if (event_type === 'ERROR') isoStandards.push({ ...INFOSEC_CLAUSE, status: clauseStatus });

  const complianceStatus = getOverallCompliance(isoStandards.map(s => s.status));
  const recommendation = buildRecommendation(key, severity, complianceStatus);

  return { isoStandards, complianceStatus, recommendation };
}
