import jwt from "jsonwebtoken";

function verificarAutenticacao(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    if (!process.env.SECRET) {
        return res.status(500).json({ message: "Erro interno: chave secreta não configurada" });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err || !decoded || !decoded.user) {
            return res.status(401).json({ message: "Token inválido ou expirado" });
        }
        req.userId = decoded.user;
        next();
    });
}

export default verificarAutenticacao;