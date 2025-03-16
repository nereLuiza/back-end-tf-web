import { Router } from "express";
import jwt from "jsonwebtoken";
import { autenticarUsuario } from "../db/index.js";
import verificarAutenticacao from "../middlewares/autenticacao.js";

const router = Router();

router.post("/login", async (req, res) => {
  console.log("Rota POST /login solicitada");
  try {
    const admin = await autenticarUsuario(req.body.email_admin, req.body.senha_admin);
    if (admin !== undefined) {
      const token = jwt.sign({ user: admin.email_admin }, process.env.SECRET, {
        expiresIn: 300,
      });
      res.status(202).json({ token: token });
    } else res.status(404).json({ message: "Usuário/Senha incorreta!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

router.get("/auth", verificarAutenticacao, async (req, res) => {
  console.log("Rota GET /auth solicitada");
  try {
    res.status(200).json({ user: `${req.userId}` });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

export default router;