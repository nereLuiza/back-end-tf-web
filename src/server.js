import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routerLogin from './routes/login.js';
import routerPgts from './routes/pgts.js';
import routerCursos from './routes/cursos.js';
import routerImgs from './routes/imgs.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'https://front-end-tfweb-teste-steel.vercel.app',
  'https://bookish-train-5gg496xwqv4cv6pj-5501.app.github.dev',
  'http://localhost:5500'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// 2️⃣ Middlewares essenciais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3️⃣ Rotas
app.use('/login', routerLogin);
app.use(routerCursos);
app.use(routerImgs);
app.use(routerPgts);

// 4️⃣ Rota de teste CORS
app.get('/test-cors', (req, res) => {
    res.json({ message: "CORS configurado com sucesso!" });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});