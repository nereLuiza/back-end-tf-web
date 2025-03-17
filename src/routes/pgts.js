import { Router } from "express";
import verificarAutenticacao from "../middlewares/autenticacao.js"
import {
    selectPgt,
    updatePgt,
    deletePgt,
    insertPgt
} from "../db/index.js"

const router = Router();

router.get("/pgts", async (req, res) => {
    try {
      const perguntas = await selectPgt();
      res.json(perguntas);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
    console.log("Rota GET/pgts solicitada");
  });

  router.post("/pgt", verificarAutenticacao, async (req, res) => {
    console.log("Rota POST /pgt solicitada");
    try {
      await insertPgt(req.body);
      res.status(201).json({ message: "Pergunta inserida com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  router.delete("/pgt/:num_pgt", verificarAutenticacao, async (req, res) => {
    console.log("Rota DELETE /pgt/# solicitada");
    try {
        await deletePgt(req.params.num_pgt);
        res.status(200).json({ message: "Pergunta excluída com sucesso!!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  router.put("/pgt/:num_pgt", verificarAutenticacao, async (req, res) => {
    console.log("Rota PUT /pgt/# solicitada");
    try {
        const num_pgt = req.params.num_pgt;
        await updatePgt(num_pgt, req.body);
        res.status(200).json({ message: "Pergunta alterada com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });
  
  export default router;