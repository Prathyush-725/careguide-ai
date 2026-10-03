import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { loadStore } from './data/store.js';
import apiRoutes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(__dirname, '../../frontend/dist');

const app = express();

app.disable('x-powered-by');
app.use(
  helmet({
    hsts: false,
    contentSecurityPolicy: env.isProduction
      ? {
          useDefaults: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ['https://fonts.gstatic.com'],
            connectSrc: ["'self'"],
            imgSrc: ["'self'", 'data:'],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            upgradeInsecureRequests: null,
          },
        }
      : false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'same-site' },
    frameguard: { action: 'deny' },
  }),
);

app.use((req, res, next) => {
  let decoded = req.originalUrl;
  try {
    decoded = decodeURIComponent(req.originalUrl);
  } catch {
    return res.status(400).json({
      error: 'bad_request',
      message: 'The request path is not valid.',
    });
  }
  if (req.originalUrl.includes('..') || decoded.includes('..')) {
    return res.status(400).json({
      error: 'bad_request',
      message: 'The request path is not valid.',
    });
  }
  next();
});

app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) return next();
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return res.status(415).json({
        error: 'unsupported_media_type',
        message: 'This endpoint accepts JSON only.',
      });
    }
  }
  next();
});

if (!env.isProduction) {
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || origin === env.clientOrigin) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      optionsSuccessStatus: 204,
    }),
  );
}

app.use(express.json({ limit: '100kb' }));
app.use('/api', apiRoutes);

async function frontendIndexExists() {
  try {
    await fs.access(path.join(frontendDist, 'index.html'));
    return true;
  } catch {
    return false;
  }
}

async function start() {
  const hasFrontend = await frontendIndexExists();
  if (env.isProduction && !hasFrontend) {
    console.error('frontend/dist/index.html is missing. Run npm run build before npm start.');
    process.exit(1);
  }

  if (hasFrontend) {
    app.use(
      express.static(frontendDist, {
        index: false,
        maxAge: env.isProduction ? '1h' : 0,
      }),
    );
    app.get(/^(?!\/api(?:\/|$)).*/, (req, res, next) => {
      res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
        if (err) next(err);
      });
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  await loadStore();
  const server = app.listen(env.port, env.host, () => {
    const mode = env.demoMode ? 'demo' : 'local';
    console.log(`CareGuide AI listening on http://${env.host}:${env.port}`);
    console.log(`Mode: ${mode} | AI: ${env.aiProvider} | frontend: ${hasFrontend ? 'served from frontend/dist' : 'API only'}`);
    if (env.demoMode) {
      console.log('Demo mode: generic profile, empty history, temporary JSON store. Not for real patient or PHI data.');
    } else {
      console.log('Local educational mode: APIs are unauthenticated. Add auth, HTTPS, and a production database before any real deployment.');
    }
  });

  server.on('error', (error) => {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  });
}

start();
