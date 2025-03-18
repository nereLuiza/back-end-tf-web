import { Router } from "express";
import verificarAutenticacao from "../middlewares/autenticacao.js"
import {
    selectImgs,
    updateImg,
    deleteImg,
    insertImg
} from "../db/index.js"

const router = Router();

router.get("/imgs", async (req, res) => {
    try {
      const imagens = await selectImgs();
      res.json(imagens);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
    console.log("Rota GET/imgs solicitada");
  });

  router.post("/img", verificarAutenticacao, async (req, res) => {
    console.log("Rota POST /img solicitada");
    try {
      await insertImg(req.body);
      res.status(201).json({ message: "Imagem inserida com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  router.delete("/img/:code_img", verificarAutenticacao, async (req, res) => {
    console.log("Rota DELETE /img/# solicitada");
    try {
        await deleteImg(req.params.code_img);
        res.status(200).json({ message: "Imagem excluída com sucesso!!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  router.put("/pgt/:code_img", verificarAutenticacao, async (req, res) => {
    console.log("Rota PUT /img/# solicitada");
    try {
        const code_img = req.params.code_img;
        await updatePgt(req.body, code_img);
        res.status(200).json({ message: "Imagem alterada com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });
  
  export default router;