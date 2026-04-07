// src/services/isoMappingService.js
// Keys are isoAlarm names (from agents.json isoAlarms[]).
// Old category keys kept as aliases for backward-compatibility.

// ─────────────────────────────────────────────────────────────────────────────
// Per-tool ISO event mappings — each tool's isoEvent → specific clauses
// ─────────────────────────────────────────────────────────────────────────────
export const TOOL_ISO_MAPPINGS = {

  // ── ERP & Gestión Empresarial ─────────────────────────────────────────────
  inventory_status_report: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Control del estado de inventario como parte de las operaciones de suministro.' },
  ],
  demand_prediction_alert: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Predicción de demanda para planificar la producción y compras.' },
  ],
  stock_optimization_result: [
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de procesos, productos y servicios externos', description: 'Optimización de niveles de stock para asegurar disponibilidad de materiales.' },
  ],
  purchase_order_recommendation: [
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de procesos, productos y servicios externos', description: 'Recomendación de órdenes de compra basada en criterios de proveedor aprobado.' },
  ],
  purchase_order_generated: [
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de procesos, productos y servicios externos', description: 'Generación de órdenes de compra con trazabilidad a requerimientos aprobados.' },
  ],
  supplier_evaluation_result: [
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de procesos, productos y servicios externos', description: 'Evaluación periódica de proveedores según criterios de desempeño definidos.' },
  ],
  lead_time_analysis: [
    { standard: 'ISO 28000:2022', clause: '8.1', title: 'Planificación y control operacional de la cadena de suministro', description: 'Análisis de tiempos de entrega para gestión de riesgo logístico.' },
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de procesos, productos y servicios externos', description: 'Evaluación de lead times de proveedores como criterio de selección.' },
  ],
  production_variance_report: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Comparación entre producción planificada y real para identificar desviaciones.' },
  ],
  production_deviation_alert: [
    { standard: 'ISO 9001:2015', clause: '9.1.3', title: 'Análisis y evaluación', description: 'Detección de desviaciones de producción con respecto a lo planificado.' },
    { standard: 'ISO 9001:2015', clause: '8.7', title: 'Control de las salidas no conformes', description: 'Tratamiento de desviaciones que puedan resultar en producto no conforme.' },
  ],
  production_delay_forecast: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Predicción de retrasos de producción para acción preventiva.' },
  ],
  schedule_optimization_result: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Optimización del programa de producción para cumplimiento de requisitos del cliente.' },
  ],
  project_progress_update: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Seguimiento del avance de proyectos contra los hitos planificados.' },
  ],
  project_cost_estimate: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Estimación y seguimiento de costos de proyecto.' },
  ],
  budget_overrun_alert: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Detección de sobrepasos presupuestarios como indicador de desempeño operacional.' },
  ],
  expense_categorization: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Categorización de gastos para análisis de eficiencia operacional.' },
  ],
  cost_optimization_result: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Resultados de optimización de costos operacionales.' },
    { standard: 'ISO 9001:2015', clause: '10.3', title: 'Mejora continua', description: 'Reducción de costos como parte del proceso de mejora continua.' },
  ],
  kpi_report_generated: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Generación de KPIs de negocio para monitoreo del desempeño organizacional.' },
  ],
  revenue_forecast_alert: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Pronóstico de ingresos como indicador de desempeño de negocio.' },
  ],
  business_anomaly_detected: [
    { standard: 'ISO 9001:2015', clause: '9.1.3', title: 'Análisis y evaluación', description: 'Detección de anomalías en indicadores de negocio mediante modelos ML.' },
    { standard: 'ISO 9001:2015', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Activación de acciones correctivas ante anomalías de negocio detectadas.' },
  ],
  lead_scoring_result: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Calificación de leads para priorización de oportunidades de venta.' },
  ],
  sales_prediction_alert: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Predicción de ventas para planificación de producción y recursos.' },
  ],
  followup_automation_event: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Automatización de seguimientos comerciales como parte del proceso de ventas.' },
  ],
  erp_sync_event: [
    { standard: 'ISO 9001:2015', clause: '7.5', title: 'Información documentada', description: 'Sincronización de datos ERP local garantizando integridad de información documentada.' },
  ],
  erp_order_pushed: [
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de procesos, productos y servicios externos', description: 'Envío de órdenes al ERP local con trazabilidad completa.' },
  ],

  // ── Ciberseguridad Industrial ─────────────────────────────────────────────
  net_risk_assessment: [
    { standard: 'IEC 62443-2-1:2010', clause: '4.2.3.1', title: 'Evaluación de riesgo de seguridad IACS', description: 'Identificación y evaluación de riesgos en la red industrial OT/IT.' },
    { standard: 'ISO 27001:2022', clause: 'A.5.19', title: 'Seguridad de la información con proveedores', description: 'Evaluación de riesgos en la cadena de suministro digital.' },
  ],
  anomaly_pattern_alert: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 6.2', title: 'Monitoreo continuo de red OT', description: 'Detección continua de patrones de anomalía en la red industrial.' },
    { standard: 'ISO 27001:2022', clause: 'A.12.4', title: 'Registro y monitoreo', description: 'Análisis de logs y detección de comportamientos anómalos en sistemas industriales.' },
  ],
  attack_simulation_report: [
    { standard: 'IEC 62443-2-4:2015', clause: '5', title: 'Requerimientos de seguridad para proveedores de servicios IACS', description: 'Simulación de escenarios de ataque para validar controles de seguridad.' },
    { standard: 'ISO 27001:2022', clause: 'A.8.8', title: 'Gestión de vulnerabilidades técnicas', description: 'Pruebas de penetración y simulación de ataques para identificar vulnerabilidades.' },
  ],
  security_strategy_update: [
    { standard: 'IEC 62443-2-1:2010', clause: '4.3', title: 'Desarrollo del programa de gestión de seguridad IACS', description: 'Actualización de la estrategia de seguridad basada en análisis de amenazas.' },
    { standard: 'ISO 27001:2022', clause: 'A.5.1', title: 'Políticas de seguridad de la información', description: 'Actualización de políticas y estrategias de seguridad.' },
  ],
  local_network_anomaly: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 6.1', title: 'Auditoría de eventos de seguridad', description: 'Detección y registro local de anomalías de red sin dependencia de conectividad cloud.' },
  ],
  ip_block_action: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 5.1', title: 'Segmentación de red', description: 'Bloqueo de IPs maliciosas para proteger la integridad de la red OT.' },
    { standard: 'ISO 27001:2022', clause: 'A.16.1', title: 'Gestión de incidentes de seguridad', description: 'Respuesta activa ante incidentes de ciberseguridad mediante bloqueo de acceso.' },
  ],
  network_segmentation_event: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 5.2', title: 'Protección del perímetro de zona', description: 'Segmentación de red OT en zonas de seguridad aisladas.' },
    { standard: 'IEC 62443-2-1:2010', clause: '4.3.4', title: 'Gestión del riesgo en zonas de seguridad', description: 'Aplicación de zonas y conductos de seguridad según modelo de zonas IEC 62443.' },
  ],
  segmentation_applied: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 5.2', title: 'Protección del perímetro de zona', description: 'Aplicación efectiva de segmentación de red en el entorno OT.' },
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 5.1', title: 'Segmentación de red', description: 'Confirmación de que la segmentación aplicada cumple con los requisitos de separación OT/IT.' },
  ],
  ot_network_monitor_alert: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 6.2', title: 'Monitoreo continuo de red OT', description: 'Vigilancia continua del tráfico en la red de tecnología operacional.' },
    { standard: 'IEC 62443-2-1:2010', clause: '4.3.3', title: 'Gestión del sistema de control industrial', description: 'Monitoreo del estado de salud de la red de control industrial.' },
  ],
  device_isolation_action: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 5.1', title: 'Segmentación de red', description: 'Aislamiento de dispositivos comprometidos para contener la propagación de amenazas.' },
    { standard: 'ISO 27001:2022', clause: 'A.16.1', title: 'Gestión de incidentes de seguridad', description: 'Contención de incidentes mediante aislamiento de dispositivos afectados.' },
  ],
  gateway_traffic_inspection: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 5.3', title: 'Restricción de comunicaciones a través de interfaces diagnósticas', description: 'Inspección del tráfico en gateways OT/IT para detectar comunicaciones no autorizadas.' },
    { standard: 'ISO 27001:2022', clause: 'A.13.1', title: 'Gestión de seguridad en redes', description: 'Control del tráfico de red a través de puntos de acceso y gateways.' },
  ],

  // ── Visión Artificial Industrial ──────────────────────────────────────────
  product_quality_inspection: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Inspección visual automatizada en línea para asegurar calidad de producto.' },
    { standard: 'ISO 9001:2015', clause: '8.7', title: 'Control de las salidas no conformes', description: 'Detección y segregación de productos defectuosos mediante visión artificial.' },
    { standard: 'IATF 16949:2016', clause: '8.5.1', title: 'Plan de control de manufactura', description: 'Inspección automatizada como parte del plan de control del proceso.' },
  ],
  conveyor_count_event: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Conteo automatizado de unidades en línea para control de producción.' },
  ],
  safety_violation_detected: [
    { standard: 'ISO 45001:2018', clause: '8.1', title: 'Planificación y control operacional', description: 'Detección automática de violaciones a las normas de seguridad en planta.' },
    { standard: 'ISO 45001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación del desempeño SST', description: 'Monitoreo continuo de condiciones de seguridad mediante visión artificial.' },
  ],
  worker_posture_alert: [
    { standard: 'ISO 45001:2018', clause: '8.1', title: 'Planificación y control operacional', description: 'Monitoreo de postura de trabajadores para prevención de lesiones ergonómicas.' },
    { standard: 'ISO 45001:2018', clause: '6.1', title: 'Acciones para abordar riesgos y oportunidades SST', description: 'Identificación de riesgos ergonómicos mediante análisis de postura.' },
  ],
  video_stream_capture: [
    { standard: 'ISO 9001:2015', clause: '7.5', title: 'Información documentada', description: 'Captura y almacenamiento de video como evidencia de inspección y trazabilidad.' },
  ],
  vision_model_trained: [
    { standard: 'ISO 9001:2015', clause: '7.2', title: 'Competencia', description: 'Entrenamiento de modelos de visión como competencia tecnológica del sistema de calidad.' },
    { standard: 'IATF 16949:2016', clause: '8.5.1', title: 'Plan de control de manufactura', description: 'Actualización del modelo de inspección visual para el plan de control.' },
  ],
  detection_model_improved: [
    { standard: 'ISO 9001:2015', clause: '10.3', title: 'Mejora continua', description: 'Mejora iterativa del modelo de detección como parte del ciclo de mejora continua.' },
    { standard: 'IATF 16949:2016', clause: '8.5.1', title: 'Plan de control de manufactura', description: 'Mejora de la detección de defectos en el plan de control.' },
  ],
  visual_pattern_analysis: [
    { standard: 'ISO 9001:2015', clause: '9.1.3', title: 'Análisis y evaluación', description: 'Análisis de patrones visuales históricos para identificar tendencias de calidad.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Análisis visual de activos para mantenimiento predictivo.' },
  ],

  // ── AI & ML Industrial ────────────────────────────────────────────────────
  demand_forecast_alert: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Pronóstico de demanda industrial para planificación de producción y capacidad.' },
  ],
  sequence_optimization_result: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Optimización de secuencia de producción mediante modelos de ML.' },
  ],
  process_deviation_detected: [
    { standard: 'ISO 9001:2015', clause: '9.1.3', title: 'Análisis y evaluación', description: 'Detección automática de desviaciones de proceso usando modelos predictivos.' },
    { standard: 'ISO 9001:2015', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Inicio de acción correctiva ante desviación detectada por ML.' },
  ],
  machine_failure_prediction: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Predicción de fallas de máquinas para programar mantenimiento predictivo.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Evaluación del estado de activos mediante modelos de predicción de fallas.' },
  ],
  vibration_pattern_alert: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Análisis de patrones de vibración para detectar degradación de activos.' },
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Acción preventiva basada en análisis de vibración.' },
  ],
  energy_usage_optimized: [
    { standard: 'ISO 50001:2018', clause: '6.6', title: 'Planificación energética', description: 'Optimización del uso de energía mediante modelos ML para reducir consumo.' },
    { standard: 'ISO 50001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Evaluación del desempeño energético post-optimización.' },
  ],
  bottleneck_identified: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Identificación de cuellos de botella para mejora del flujo productivo.' },
    { standard: 'ISO 9001:2015', clause: '10.3', title: 'Mejora continua', description: 'Eliminación de cuellos de botella como acción de mejora continua.' },
  ],
  twin_model_generated: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Generación de modelo de gemelo digital para evaluación de activos.' },
  ],
  vibration_data_collected: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Recolección de datos de vibración en el edge para análisis predictivo.' },
  ],
  process_signal_collected: [
    { standard: 'ISO 9001:2015', clause: '7.5', title: 'Información documentada', description: 'Recolección de señales de proceso como información documentada del sistema de calidad.' },
  ],
  local_inference_result: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Inferencia local ML en el edge para decisiones de mantenimiento en tiempo real.' },
  ],
  realtime_anomaly_detected: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 6.2', title: 'Monitoreo continuo de red OT', description: 'Detección en tiempo real de anomalías de proceso o red en el edge.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Monitoreo continuo de activos con detección de anomalías en tiempo real.' },
  ],

  // ── Infraestructura & Edge ────────────────────────────────────────────────
  edge_orchestration_event: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Orquestación de nodos edge como control operacional de la infraestructura.' },
    { standard: 'IEC 62443-2-1:2010', clause: '4.3.3', title: 'Gestión del sistema de control industrial', description: 'Gestión centralizada de nodos edge en la infraestructura de control.' },
  ],
  edge_device_management: [
    { standard: 'IEC 62443-2-1:2010', clause: '4.3.3', title: 'Gestión del sistema de control industrial', description: 'Administración de dispositivos edge con control de inventario y configuración.' },
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Gestión del ciclo de vida de dispositivos edge como activos físicos.' },
  ],
  sensor_data_collected: [
    { standard: 'ISO 9001:2015', clause: '7.1', title: 'Recursos', description: 'Recolección de datos de sensores como recurso para el monitoreo del proceso.' },
  ],
  analog_digitization_event: [
    { standard: 'ISO 9001:2015', clause: '7.1', title: 'Recursos', description: 'Digitalización de señales analógicas para integrar equipos legacy al sistema de monitoreo.' },
  ],
  energy_consumption_monitored: [
    { standard: 'ISO 50001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Monitoreo de consumo energético en tiempo real desde el edge.' },
  ],
  local_control_action: [
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 2.1', title: 'Autorización de acceso a sistemas de control', description: 'Ejecución de acciones de control local en PLCs con autorización verificada.' },
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Acción de control operacional sobre activos físicos en planta.' },
  ],
  edge_config_deployed: [
    { standard: 'IEC 62443-2-1:2010', clause: '4.3.3', title: 'Gestión del sistema de control industrial', description: 'Despliegue de configuración en nodos edge con verificación de integridad.' },
  ],
  edge_agent_updated: [
    { standard: 'IEC 62443-2-1:2010', clause: '4.3.3', title: 'Gestión del sistema de control industrial', description: 'Actualización de agentes edge con control de versión y verificación.' },
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Mantenimiento de software de nodos edge como activos de infraestructura.' },
  ],
  edge_health_status: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Evaluación del estado de salud de la flota de nodos edge.' },
    { standard: 'IEC 62443-2-1:2010', clause: '4.3.3', title: 'Gestión del sistema de control industrial', description: 'Monitoreo de disponibilidad y salud de infraestructura de control.' },
  ],
  device_registry_update: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Actualización del registro de dispositivos como inventario de activos físicos.' },
  ],

  // ── Producción Avanzada ───────────────────────────────────────────────────
  bottleneck_simulation: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Simulación de cuellos de botella para planificación de capacidad productiva.' },
  ],
  production_flow_optimized: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Resultado de optimización del flujo productivo medido contra KPIs de OEE.' },
    { standard: 'ISO 9001:2015', clause: '10.3', title: 'Mejora continua', description: 'Mejora del flujo de producción como resultado del ciclo de mejora continua.' },
  ],
  production_plan_generated: [
    { standard: 'ISO 9001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Generación automática de plan de producción con restricciones de capacidad.' },
  ],
  idle_time_pattern_alert: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Identificación de patrones de tiempo muerto para mejora de eficiencia.' },
  ],
  production_data_collected: [
    { standard: 'ISO 9001:2015', clause: '7.5', title: 'Información documentada', description: 'Recolección de datos de producción como información documentada.' },
  ],
  machine_state_change: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Seguimiento del estado de máquinas como indicador de disponibilidad de activos.' },
  ],
  idle_time_detected: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Detección de tiempo muerto en tiempo real para acción correctiva inmediata.' },
  ],
  production_adjustment_applied: [
    { standard: 'ISO 9001:2015', clause: '8.5', title: 'Control de producción y de la provisión del servicio', description: 'Aplicación de ajuste de producción para mantener parámetros dentro de especificación.' },
  ],

  // ── Digital Twin ──────────────────────────────────────────────────────────
  digital_twin_created: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Creación de gemelo digital para evaluación virtual del desempeño de activos.' },
  ],
  twin_simulation_result: [
    { standard: 'ISO 9001:2015', clause: '10.3', title: 'Mejora continua', description: 'Resultado de simulación what-if en gemelo digital para identificar mejoras.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Evaluación virtual de escenarios operacionales en el gemelo digital.' },
  ],
  system_performance_optimized: [
    { standard: 'ISO 9001:2015', clause: '10.3', title: 'Mejora continua', description: 'Optimización del sistema aplicando hallazgos del gemelo digital.' },
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Mejora de desempeño de activos basada en análisis del gemelo digital.' },
  ],
  twin_data_feed_event: [
    { standard: 'ISO 9001:2015', clause: '7.5', title: 'Información documentada', description: 'Alimentación continua del gemelo digital con datos reales del piso de planta.' },
  ],

  // ── Mantenimiento & CMMS ──────────────────────────────────────────────────
  work_order_event: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Gestión de órdenes de trabajo de mantenimiento correctivo y preventivo.' },
  ],
  preventive_maint_scheduled: [
    { standard: 'ISO 55001:2014', clause: '6.2', title: 'Objetivos de gestión de activos y planificación', description: 'Programación de mantenimiento preventivo optimizado según objetivos del activo.' },
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Control operacional de actividades de mantenimiento preventivo.' },
  ],
  reliability_metrics_alert: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Seguimiento de indicadores MTBF/MTTR para evaluar desempeño de activos.' },
  ],
  fmea_analysis_result: [
    { standard: 'ISO 55001:2014', clause: '6.2', title: 'Objetivos de gestión de activos y planificación', description: 'Análisis de modos de falla (FMEA/RCM) para optimizar la estrategia de mantenimiento.' },
    { standard: 'ISO 31000:2018', clause: '6.4', title: 'Evaluación del riesgo', description: 'Evaluación de riesgos de falla mediante análisis FMEA.' },
  ],
  spare_parts_status: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Control de inventario de repuestos para soporte del plan de mantenimiento.' },
  ],
  asset_lifecycle_event: [
    { standard: 'ISO 55001:2014', clause: '8.1', title: 'Planificación y control operacional', description: 'Seguimiento del ciclo de vida completo de activos físicos.' },
  ],
  condition_monitoring_alert: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Monitoreo de condición en tiempo real de activos críticos.' },
  ],
  maintenance_kpi_report: [
    { standard: 'ISO 55001:2014', clause: '9.1', title: 'Monitoreo, medición, análisis y evaluación', description: 'Reporte de KPIs de mantenimiento para evaluación del sistema de gestión de activos.' },
  ],

  // ── Control & SCADA ───────────────────────────────────────────────────────
  scada_tag_alarm: [
    { standard: 'IEC 61511:2016', clause: '16', title: 'Operación y mantenimiento del SIS', description: 'Monitoreo de tags SCADA para detección de condiciones fuera de límites operacionales.' },
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 6.2', title: 'Monitoreo continuo', description: 'Monitoreo continuo del sistema SCADA para detección de condiciones anómalas.' },
  ],
  pid_control_action: [
    { standard: 'IEC 61511:2016', clause: '11', title: 'Diseño e ingeniería del SIS', description: 'Ejecución de lazo PID como parte del sistema de control del proceso.' },
  ],
  setpoint_change_event: [
    { standard: 'IEC 61511:2016', clause: '11', title: 'Diseño e ingeniería del SIS', description: 'Cambio de setpoint con auditoría de quién, cuándo y por qué.' },
    { standard: 'IEC 62443-3-3:2013', clause: 'SR 6.1', title: 'Auditoría de eventos de seguridad', description: 'Registro auditado de cambios de setpoint para trazabilidad.' },
  ],
  process_alarm_triggered: [
    { standard: 'IEC 61511:2016', clause: '16', title: 'Operación y mantenimiento del SIS', description: 'Disparo de alarma de proceso conforme a la gestión de alarmas ISA-18.2.' },
  ],
  historian_log_entry: [
    { standard: 'IEC 61511:2016', clause: '16', title: 'Operación y mantenimiento del SIS', description: 'Registro de datos de proceso en el historiador para trazabilidad y auditoría.' },
    { standard: 'ISO 9001:2015', clause: '7.5', title: 'Información documentada', description: 'Datos del proceso como información documentada requerida por el sistema de calidad.' },
  ],
  batch_sequence_event: [
    { standard: 'IEC 61511:2016', clause: '11', title: 'Diseño e ingeniería del SIS', description: 'Ejecución de secuencia de producción por lotes conforme a ISA-88.' },
  ],
  alarm_acknowledged: [
    { standard: 'IEC 61511:2016', clause: '16', title: 'Operación y mantenimiento del SIS', description: 'Reconocimiento de alarma con registro del operador y tiempo de respuesta.' },
  ],
  control_loop_analysis: [
    { standard: 'IEC 61511:2016', clause: '5.2', title: 'Gestión de seguridad funcional', description: 'Análisis del desempeño de lazos de control para verificar cumplimiento del SIL.' },
  ],

  // ── Calidad & SPC ─────────────────────────────────────────────────────────
  control_chart_generated: [
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Generación de cartas de control Xbar-R para monitoreo estadístico del proceso.' },
    { standard: 'IATF 16949:2016', clause: '8.5.1', title: 'Plan de control de manufactura', description: 'SPC como técnica estadística en el plan de control de manufactura.' },
  ],
  out_of_control_signal: [
    { standard: 'IATF 16949:2016', clause: '8.5.1', title: 'Plan de control de manufactura', description: 'Detección de señal fuera de control con reglas de Nelson.' },
    { standard: 'ISO 9001:2015', clause: '9.1.3', title: 'Análisis y evaluación', description: 'Análisis de señales fuera de control para identificar causas especiales.' },
  ],
  nonconformance_registered: [
    { standard: 'ISO 9001:2015', clause: '8.7', title: 'Control de las salidas no conformes', description: 'Registro y disposición de producto o proceso no conforme.' },
    { standard: 'IATF 16949:2016', clause: '8.7.1', title: 'Control de producto no conforme — requerimientos específicos', description: 'Gestión de no conformidades incluyendo cuarentena y notificación al cliente.' },
  ],
  '8d_report_issued': [
    { standard: 'IATF 16949:2016', clause: '8.7.1', title: 'Control de producto no conforme — requerimientos específicos', description: 'Reporte 8D para resolución estructurada de no conformidades en la industria automotriz.' },
    { standard: 'ISO 9001:2015', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Acción correctiva documentada mediante metodología 8D.' },
  ],
  capability_index_alert: [
    { standard: 'IATF 16949:2016', clause: '8.5.1', title: 'Plan de control de manufactura', description: 'Monitoreo de índices de capacidad Cpk/Ppk para validación de proceso.' },
    { standard: 'ISO 9001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Evaluación de la capacidad del proceso para cumplir especificaciones.' },
  ],
  product_spec_update: [
    { standard: 'ISO 9001:2015', clause: '8.5.2', title: 'Identificación y trazabilidad', description: 'Actualización de especificaciones de producto con control de versiones.' },
  ],
  msa_analysis_result: [
    { standard: 'IATF 16949:2016', clause: '7.1.5.1', title: 'Análisis del sistema de medición (MSA)', description: 'Análisis Gage R&R para validar la confiabilidad del sistema de medición.' },
    { standard: 'ISO 9001:2015', clause: '7.1.5', title: 'Recursos de seguimiento y medición', description: 'Validación de equipos de medición mediante análisis de sistema de medición.' },
  ],
  quality_measurement_data: [
    { standard: 'ISO 9001:2015', clause: '9.1.1', title: 'Generalidades — seguimiento y medición', description: 'Recolección de mediciones de calidad en punto de proceso para SPC.' },
  ],

  // ── Energía & Sustentabilidad ─────────────────────────────────────────────
  energy_meter_reading: [
    { standard: 'ISO 50001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Lectura de medidores de energía para seguimiento del desempeño energético.' },
  ],
  energy_kpi_report: [
    { standard: 'ISO 50001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Cálculo de indicadores de desempeño energético (EnPI) para auditoría ISO 50001.' },
  ],
  energy_waste_detected: [
    { standard: 'ISO 50001:2018', clause: '6.6', title: 'Planificación energética', description: 'Detección de usos significativos de energía y desperdicios para acción correctiva.' },
    { standard: 'ISO 50001:2018', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Tratamiento de desperdicio energético como no conformidad del SGEn.' },
  ],
  energy_load_optimization: [
    { standard: 'ISO 50001:2018', clause: '6.6', title: 'Planificación energética', description: 'Optimización del despacho de cargas para reducir demanda máxima y costo energético.' },
  ],
  carbon_footprint_report: [
    { standard: 'ISO 14001:2015', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Cálculo de huella de carbono como indicador ambiental clave.' },
    { standard: 'ISO 14001:2015', clause: '8.1', title: 'Planificación y control operacional', description: 'Control de emisiones de CO₂ como aspecto ambiental significativo.' },
  ],
  iso50001_audit_report: [
    { standard: 'ISO 50001:2018', clause: '9.1.2', title: 'Revisión por la dirección', description: 'Generación automática del reporte de auditoría de cumplimiento ISO 50001.' },
  ],
  energy_benchmark_result: [
    { standard: 'ISO 50001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación', description: 'Comparación del desempeño energético contra benchmarks sectoriales.' },
  ],
  energy_audit_scheduled: [
    { standard: 'ISO 50001:2018', clause: '9.2', title: 'Auditoría interna', description: 'Programación de auditoría energética interna del sistema de gestión de energía.' },
  ],

  // ── Seguridad HSE ─────────────────────────────────────────────────────────
  gas_sensor_alert: [
    { standard: 'ISO 45001:2018', clause: '8.1', title: 'Planificación y control operacional', description: 'Monitoreo de sensores de gas para control operacional de riesgos de SST.' },
    { standard: 'IEC 61511:2016', clause: '16', title: 'Operación y mantenimiento del SIS', description: 'Sensor de gas como parte del sistema instrumentado de seguridad en operación.' },
  ],
  safety_incident_report: [
    { standard: 'ISO 45001:2018', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Reporte de incidente de seguridad como no conformidad de SST.' },
    { standard: 'ISO 45001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación del desempeño SST', description: 'Registro de incidentes como indicador de desempeño de seguridad.' },
  ],
  hse_root_cause_finding: [
    { standard: 'ISO 45001:2018', clause: '10.2', title: 'No conformidad y acción correctiva', description: 'Investigación de causa raíz de incidentes HSE para acción correctiva.' },
  ],
  hazop_analysis_result: [
    { standard: 'IEC 61511:2016', clause: '9', title: 'Especificación de requerimientos de seguridad (SRS)', description: 'Análisis HAZOP para identificar desviaciones de proceso y definir funciones SIS.' },
    { standard: 'ISO 45001:2018', clause: '6.1', title: 'Acciones para abordar riesgos y oportunidades SST', description: 'Identificación de riesgos operacionales mediante análisis HAZOP.' },
  ],
  sil_assessment_result: [
    { standard: 'IEC 61511:2016', clause: '9', title: 'Especificación de requerimientos de seguridad (SRS)', description: 'Determinación del nivel de integridad de seguridad (SIL) requerido para funciones SIS.' },
    { standard: 'IEC 61508-1:2010', clause: '7', title: 'Gestión del ciclo de vida de seguridad', description: 'Evaluación de SIL conforme al ciclo de vida de seguridad funcional.' },
  ],
  work_permit_event: [
    { standard: 'ISO 45001:2018', clause: '8.1', title: 'Planificación y control operacional', description: 'Gestión de permisos de trabajo como control operacional para trabajos de riesgo.' },
  ],
  safety_kpi_report: [
    { standard: 'ISO 45001:2018', clause: '9.1', title: 'Seguimiento, medición, análisis y evaluación del desempeño SST', description: 'Seguimiento de KPIs de seguridad para evaluación del desempeño del SGSST.' },
  ],
  safety_drill_scheduled: [
    { standard: 'ISO 45001:2018', clause: '8.2', title: 'Preparación y respuesta ante emergencias', description: 'Programación de simulacros de emergencia para validar planes de respuesta.' },
  ],

  // ── Cadena de Suministro ──────────────────────────────────────────────────
  shipment_tracking_update: [
    { standard: 'ISO 28000:2022', clause: '8.1', title: 'Planificación y control operacional de la cadena de suministro', description: 'Rastreo en tiempo real de envíos para visibilidad de la cadena de suministro.' },
  ],
  route_optimization_result: [
    { standard: 'ISO 28000:2022', clause: '8.1', title: 'Planificación y control operacional de la cadena de suministro', description: 'Optimización de rutas de entrega para eficiencia logística.' },
  ],
  supply_disruption_alert: [
    { standard: 'ISO 28000:2022', clause: '6.1', title: 'Acciones para abordar riesgos y oportunidades de la cadena de suministro', description: 'Predicción y alerta de disrupciones en la cadena de suministro.' },
    { standard: 'ISO 22301:2019', clause: '8.4', title: 'Procedimientos de continuidad de negocio', description: 'Activación de planes de continuidad ante disrupción de suministro.' },
  ],
  wms_management_event: [
    { standard: 'ISO 28000:2022', clause: '8.1', title: 'Planificación y control operacional de la cadena de suministro', description: 'Gestión de operaciones de almacén con slotting dinámico.' },
  ],
  scm_kpi_report: [
    { standard: 'ISO 28000:2022', clause: '8.1', title: 'Planificación y control operacional de la cadena de suministro', description: 'Reporte de KPIs de cadena de suministro para evaluación del desempeño.' },
  ],
  supplier_scorecard_update: [
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de procesos, productos y servicios externos', description: 'Actualización del scorecard de proveedores como evaluación periódica de desempeño.' },
    { standard: 'ISO 28000:2022', clause: '6.1', title: 'Acciones para abordar riesgos y oportunidades', description: 'Evaluación de riesgos de proveedores mediante scorecard.' },
  ],
  delivery_report_generated: [
    { standard: 'ISO 28000:2022', clause: '8.1', title: 'Planificación y control operacional de la cadena de suministro', description: 'Generación de reporte de entregas para trazabilidad y cumplimiento.' },
  ],
  incoming_material_scanned: [
    { standard: 'ISO 28000:2022', clause: '8.1', title: 'Planificación y control operacional de la cadena de suministro', description: 'Escaneo de material entrante con QR/RFID para trazabilidad lote a lote.' },
    { standard: 'ISO 9001:2015', clause: '8.4', title: 'Control de procesos, productos y servicios externos', description: 'Verificación de material entrante de proveedor como control de calidad en recepción.' },
  ],
};

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

  // Export all primary alarm keys + alias keys
  const clientMappings = {};
  for (const [key, val] of Object.entries(ISO_MAPPINGS)) {
    if (val !== null) clientMappings[key] = val;
  }
  // Also include alias keys pointing to the resolved arrays
  for (const [alias, primary] of Object.entries(aliasMap)) {
    clientMappings[alias] = ISO_MAPPINGS[primary];
  }
  // Include all per-tool event mappings
  for (const [key, val] of Object.entries(TOOL_ISO_MAPPINGS)) {
    clientMappings[key] = val;
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
  // Prefer per-tool mapping, fall back to agent-level mapping
  const baseClauses = TOOL_ISO_MAPPINGS[key] ?? ISO_MAPPINGS[key] ?? [];
  const clauseStatus = getClauseStatus(severity, event_type);

  const isoStandards = baseClauses.map(c => ({ ...c, status: clauseStatus }));

  if (severity === 'CRITICAL') isoStandards.push({ ...BUSINESS_CONTINUITY_CLAUSE, status: 'NON_COMPLIANT' });
  if (event_type === 'ERROR') isoStandards.push({ ...INFOSEC_CLAUSE, status: clauseStatus });

  const complianceStatus = getOverallCompliance(isoStandards.map(s => s.status));
  const recommendation = buildRecommendation(key, severity, complianceStatus);

  return { isoStandards, complianceStatus, recommendation };
}
