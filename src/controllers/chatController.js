import Anthropic from '@anthropic-ai/sdk';
import nodemailer from 'nodemailer';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODULE_DESCRIPTIONS = {
  'Producción Real vs Planeada': 'Monitoreo en tiempo real de producción vs objetivos. KPIs y alertas automáticas de desviación.',
  'Inventario Inteligente': 'Control de stock con alertas de reabastecimiento, trazabilidad FIFO y análisis de rotación.',
  'Compras y Proveedores': 'Gestión de órdenes de compra, evaluación de proveedores y seguimiento de entregas.',
  'Gestión de Scrap y Calidad': 'Registro y análisis de desechos, no conformidades y acciones correctivas ISO.',
  'Analítica Empresarial': 'Dashboards ejecutivos con KPIs en tiempo real y reportes automáticos para auditorías.',
  'CRM Industrial': 'Seguimiento de clientes industriales, oportunidades y soporte técnico postventa.',
  'Gestión de Proyectos y Costos': 'Planificación de proyectos, control de costos reales vs presupuesto.',
  'Control de Gastos Operativos': 'Monitoreo de gastos por área con alertas de desviación presupuestal.',
  'Segmentación de Red OT': 'Aislamiento y protección de redes operativas ante amenazas externas.',
  'Edge Vision Seguridad Industrial': 'Vigilancia inteligente de planta con detección de intrusos y accesos no autorizados.',
  'Gateway Industrial OT-IT Seguro': 'Puente cifrado entre redes OT e IT con control de acceso granular.',
  'Detección de Anomalías OT con AI': 'Detección automática de comportamientos anómalos en equipos usando inteligencia artificial.',
  'Simulador de Ataques + Defensa': 'Simulación de ciberataques para pruebas de resiliencia y entrenamiento de equipos de seguridad.',
  'Visión Artificial Industrial': 'Inspección automatizada de calidad en línea con cámaras y modelos de visión computacional.',
  'Conteo Automático en Banda': 'Conteo preciso de piezas en banda transportadora sin intervención manual.',
  'Detección de Riesgos Ergonómicos': 'Análisis postural y detección de riesgos ergonómicos en operarios usando visión artificial.',
  'Simulación de Cuellos de Botella': 'Modelado y simulación de procesos productivos para identificar y eliminar cuellos de botella.',
  'Detección de Fallas Mecánicas': 'Diagnóstico predictivo de fallas mecánicas mediante análisis de vibración y señales de sensores.',
  'Detección de Desviaciones con AI': 'Detección automática de desviaciones de proceso con análisis de causa raíz asistido por AI.',
  'Predicción de Demanda con ML': 'Modelos de machine learning para pronóstico preciso de demanda y optimización de inventarios.',
  'Planificación Automática con AI': 'Generación automática de planes de producción optimizados usando inteligencia artificial.',
  'Optimización de Secuenciación': 'Secuenciación óptima de órdenes de producción para maximizar eficiencia y minimizar cambios.',
  'Red Industrial Resiliente OT': 'Diseño y gestión de redes OT con alta disponibilidad, redundancia y monitoreo continuo.',
  'Monitorización de Energía con AI': 'Detección de consumo anómalo y recomendaciones de ahorro energético basadas en AI.',
  'Digital Twin Operativo': 'Gemelo digital de equipos y procesos para simulación predictiva y análisis de escenarios.',
  'Identificación de Tiempos Muertos': 'Registro y análisis de paros de producción con clasificación por causa y área responsable.',
  'Orquestación de Nodos Edge': 'Gestión centralizada de dispositivos edge industriales con despliegue y monitoreo automatizado.',
  'Digitalización de Señales Analógicas': 'Conversión y transmisión de señales analógicas legacy a protocolos digitales industriales.'
};

export async function chat(req, res) {
  try {
    const { module: moduleName, messages } = req.body;
    if (!moduleName || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'module and messages required' });
    }

    const description = MODULE_DESCRIPTIONS[moduleName] || 'Módulo especializado de la plataforma industrial.';

    const systemPrompt = `Eres un asistente especializado en el módulo "${moduleName}" de Expo Programador, una plataforma de software industrial para manufactura.

Contexto del módulo: ${description}

Tu rol:
- Responder preguntas técnicas sobre implementación, integración y beneficios
- Ser conciso y directo (máx 3 párrafos por respuesta)
- Cuando el usuario quiera más info, invitarlo a agendar una llamada o enviar un correo
- Idioma: español

NO inventes precios ni fechas específicas. Si no sabes algo, sugiérele agendar una llamada.`;

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages
    });

    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('chat error:', err);
    res.status(500).json({ error: 'Error al procesar la consulta' });
  }
}

export async function contact(req, res) {
  try {
    const { name, company, email, phone, preferredTime, module: moduleName, type } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Expo Programador" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `[${type === 'llamada' ? 'Agendar llamada' : 'Correo de contacto'}] ${moduleName} — ${name}`,
      html: `
        <h2>Nuevo contacto desde chatbot</h2>
        <p><strong>Módulo:</strong> ${moduleName}</p>
        <p><strong>Tipo:</strong> ${type}</p>
        <hr>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Horario preferido:</strong> ${preferredTime}</p>
      `
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('contact error:', err);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
}
