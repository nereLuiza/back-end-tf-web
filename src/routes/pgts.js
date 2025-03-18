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
      const { pergunta, alternativas } = req.body;

      if (!pergunta || !alternativas || !Array.isArray(alternativas)) {
          return res.status(400).json({ erro: "Dados inválidos" });
      }

      await insertPgt(pergunta, alternativas);
      res.status(201).json({ mensagem: "Pergunta e alternativas inseridas com sucesso!" });

  } catch (error) {
      console.error("Erro ao inserir pergunta:", error);
      res.status(500).json({ erro: "Erro interno ao inserir pergunta" });
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
      const { id } = req.params;
      const { pergunta, alternativas } = req.body;

      if (!pergunta || !alternativas || !Array.isArray(alternativas)) {
          return res.status(400).json({ erro: "Dados inválidos" });
      }

      await updatePgt(pergunta, alternativas, id);
      res.status(200).json({ mensagem: "Pergunta e alternativas atualizadas com sucesso!" });

  } catch (error) {
      console.error("Erro ao atualizar pergunta:", error);
      res.status(500).json({ erro: "Erro interno ao atualizar pergunta" });
  }
});
  
  export default router;