import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import eventsRouter from './routes/eventsRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';
import auditRouter from './routes/auditRoutes.js';

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

app.use('/api/v1/events', eventsRouter);
app.use('/dashboard', dashboardRouter);
app.use('/audit-report', auditRouter);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CTRLHACK 2.0 Industrial API',
    docs: '/dashboard'
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }

  console.error('Unhandled error:', err);

  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.status(err.status || 500).render('error', { error });
  }

  return res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Industrial API v2 running on port ${PORT}`);
});

export default app;
