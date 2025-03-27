import { Router } from "express";
import jwt from "jsonwebtoken";
import { autenticarUsuario } from "../db/index.js";
import verificarAutenticacao from "../middlewares/autenticacao.js";

const router = Router();

// Configuração CORS específica para a rota /login
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://front-end-tfweb-teste-steel.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(204).end();
});

router.post("/", async (req, res) => {
    try {
        const admin = await autenticarUsuario(req.body.email_admin, req.body.senha_admin);
        if (admin) {
            const token = jwt.sign({ user: admin.email_admin }, process.env.SECRET, {
                expiresIn: 300, // Token expira em 5 minutos
            });
            res.header('Access-Control-Allow-Origin', 'https://front-end-tfweb-teste-steel.vercel.app');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.status(202).json({ token });
        } else {
            res.status(404).json({ message: "Usuário/Senha incorreta!" });
        }
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.options('/auth', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://front-end-tfweb-teste-steel.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(204).end();
});

router.get("/auth", verificarAutenticacao, async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', 'https://front-end-tfweb-teste-steel.vercel.app');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.status(200).json({ user: req.userId });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

export default router;