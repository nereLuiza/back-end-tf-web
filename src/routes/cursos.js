import { Router } from "express";
import verificarAutenticacao from "../middlewares/autenticacao.js";
import {
    deleteCurso, 
    insertCurso, 
    selectCursos, 
    updateCurso
} from "../db/index.js"

const router = Router();

router.get("/cursos", async (req, res) => {
    try {
      const cursos = await selectCursos();
      res.json(cursos);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
    console.log("Rota GET/cursos solicitada");
  });

  router.post("/curso", verificarAutenticacao, async (req, res) => {
    console.log("Rota POST /curso solicitada");
    try {
      await insertCurso(req.body);
      res.status(201).json({ message: "Curso inserido com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  router.delete("/curso/:code_curso", verificarAutenticacao, async (req, res) => {
    console.log("Rota DELETE /curso/# solicitada");
    try {
        await deleteCurso(req.params.code_curso);
        res.status(200).json({ message: "Curso excluido com sucesso!!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  router.put("/curso/:code_curso", verificarAutenticacao, async (req, res) => {
    console.log("Rota PUT /curso/# solicitada");
    try {
        const code_curso = req.params.code_curso;
        await updateCurso(code_curso, req.body);
        res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });
  
  export default router;