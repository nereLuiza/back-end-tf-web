import jwt from "jsonwebtoken";

function verificarAutenticacao(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Usuário não Autenticado" });
        }
        req.userId = decoded.user;
        next();
    });
}

export default verificarAutenticacao;