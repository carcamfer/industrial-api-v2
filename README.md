# Industrial API v2

Ambiente modular listo para los módulos del hackatón CTRLHACK 2.0. Incluye:

- API Node.js/Express con validación AJV + middleware de API keys
- Postgres con índices y tabla de API keys
- Dashboard web (Pug) con métricas y tabla de eventos recientes
- Scripts para poblar/streamear datos
- Docker Compose con perfiles (`api`, `dashboard`, `seed`)
- Workflow de CI (GitHub Actions) con lint + build Docker

## Estructura

```
industrial-apiV2/
├── .github/workflows/ci.yml
├── docker-compose.yml
├── Dockerfile
├── db/
│   └── init.sql
├── scripts/
│   ├── createApiKey.js
│   ├── seedEvents.js
│   └── simulateStream.js
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── dashboardController.js
│   │   └── eventsController.js
│   ├── db/
│   │   └── index.js
│   ├── middleware/
│   │   └── apiKeyAuth.js
│   ├── public/
│   │   └── styles.css
│   ├── routes/
│   │   ├── dashboardRoutes.js
│   │   └── eventsRoutes.js
│   ├── services/
│   │   ├── dashboardService.js
│   │   ├── eventsService.js
│   │   └── validationService.js
│   └── views/
│       ├── dashboard.pug
│       ├── error.pug
│       └── layout.pug
├── .env.example
└── README.md
```

## Variables de entorno

1. Copia `.env.example` → `.env` si vas a correr fuera de Docker Compose.
2. Con Compose ya están definidas (host `db`, credenciales `industrial/industrial`).
3. Para usar el script `simulateStream.js` añade `API_KEY` (generada con `npm run apikey:create`).

## Docker Compose + Perfiles

```bash
# Dev completo (API + DB)
docker compose --profile api up -d

# Dashboard (usa mismo contenedor que la API)
docker compose --profile dashboard up -d

# Ejecutar seeding puntual (200 eventos)
docker compose --profile seed up --build seed
```

Servicios expuestos:
- API/Dashboard: http://localhost:3000
- Postgres: localhost:5432 (usuario `industrial`, pass `industrial`).

## API Keys

1. Genera una key:
   ```bash
   npm run apikey:create my-client -- --scopes=events:read,events:write
   ```
2. Guarda el valor mostrado (se almacena sólo su hash SHA256 en la tabla `api_keys`).
3. Usa la key en todos los requests:
   ```bash
   curl -H "x-api-key: <tu_key>" ...
   ```
4. Scopes disponibles: `events:read`, `events:write`. El middleware revisa que estén activos.

## Endpoints (autenticados por API key)

### POST `/api/v1/events`
- Valida contra el esquema definido en `validationService.js`.
- Responde `{ status, event_id, received_at }`.

### GET `/api/v1/events?start=...&end=...&module_id=...&asset_id=...&limit=N`
- `start`/`end` obligatorios (ISO8601).
- Resto opcional. Máx `limit=1000`.

### GET `/dashboard`
- Renderiza métricas, totales y tabla de eventos recientes (usa Pug + CSS liviano).

### GET `/api/v1/health`
- Estado rápido del servicio.

## Scripts útiles

| Script                 | Uso |
|------------------------|-----|
| `npm run apikey:create [label] -- --scopes=...` | Crea una API key (imprime el valor en consola). |
| `npm run seed:events [cantidad]`               | Inserta eventos de prueba directamente en Postgres. |
| `npm run seed:stream`                          | Envía eventos al endpoint usando `API_KEY` y `API_BASE_URL` (por defecto `http://localhost:3000/api/v1/events`). |

## Dashboard

- Implementado en `/dashboard` con Pug. Muestra:
  - Totales históricos, últimas 24h y última hora.
  - Distribución por severidad.
  - Top módulos por volumen.
  - Tabla de eventos recientes (25).
- Estilos en `src/public/styles.css`. Puedes ajustar el look & feel ahí.

## CI/CD (GitHub Actions)

`.github/workflows/ci.yml` ejecuta en cada push/PR hacia `main/master`:
1. `npm install`
2. `npm run lint`
3. Paso placeholder de tests (listo para cuando agregues Jest/Vitest)
4. Build de la imagen Docker (`docker build -t ghcr.io/<repo>/industrial-api-v2:ci .`)

Para publicar imágenes reales, añade `docker login` y `docker push` con secrets en el workflow.

## Migraciones / Esquema

`db/init.sql` crea:
- `industrial_events` (con índices en `event_id`, `timestamp`, `module_id`, `plant_id`, `asset_id`).
- `api_keys` (hash, label, scopes, timestamps).
- Rol `industrial_reader` para futuros dashboards externos.

Para volver a aplicar manualmente:
```bash
DATABASE_URL=postgresql://user:pass@host:port/db npm run db:migrate
```

## Flujo típico

1. `npm install`
2. `docker compose --profile api up -d`
3. `npm run apikey:create hackaton-client`
4. Probar health + endpoints con `x-api-key`.
5. Abrir `http://localhost:3000/dashboard` para visualizar.
6. Sembrar datos (`npm run seed:events 200`) o lanzar stream (`npm run seed:stream`).

## TODOs opcionales

- Añadir autenticación al dashboard (Basic/Auth con `.env`).
- Integrar Prometheus/Grafana o Metabase apuntando al rol `industrial_reader`.
- Sustituir `db/init.sql` por migraciones versionadas (p.ej. `node-pg-migrate`).
- Añadir pruebas automatizadas (Jest/Vitest) y cobertura en CI.
