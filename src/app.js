import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import eventsRouter from './routes/eventsRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';
import auditRouter from './routes/auditRoutes.js';
import isoLandingRouter from './routes/isoLandingRoutes.js';
import serviciosRouter from './routes/serviciosRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import agentesRouter from './routes/agentesRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;
const LOG_LEVEL = process.env.LOG_LEVEL || 'dev';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(LOG_LEVEL));

// API routes
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1', chatRouter);
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// View routes
app.get('/', (req, res) => {
  res.render('home');
});
app.use('/dashboard', dashboardRouter);
app.use('/audit-report', auditRouter);
app.use('/integracion-iso', isoLandingRouter);
app.use('/servicios-software', serviciosRouter);
app.use('/agentes', agentesRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  console.error('Unhandled error:', err);
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.status(err.status || 500).render('error', { error: err });
  }
  return res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Expo Programador · Plataforma Industrial running on http://localhost:${PORT}`);
});

export default app;
