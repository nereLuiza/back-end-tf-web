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

// 1️⃣ Middleware CORS Personalizado (Solução definitiva)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://front-end-tfweb-teste-steel.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Responde imediatamente para requisições OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(204).send();
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

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});