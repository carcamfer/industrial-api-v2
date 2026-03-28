import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRESENTACION_PATH = path.resolve(__dirname, '../public', 'presentacion_industrial.html');

router.get('/', (req, res) => {
  res.render('servicios');
});

router.get('/presentacion', (req, res) => {
  res.sendFile(PRESENTACION_PATH);
});

export default router;
