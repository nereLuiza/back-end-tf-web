import dotenv from "dotenv";
import express from "express";
import routerPgts from "./routes/pgts.js";
import routerLogin from "./routes/login.js";
import routerImgs from "./routes/imgs.js";
import routerCursos from "./routes/cursos.js"
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerLogin);
app.use(routerPgts);
app.use(routerCursos);
app.use(routerImgs);

app.get("/", (req, res) => {
  console.log("Rota / solicitada");
  res.json({
    nome: "Trabalho Final da disciplina de WEB.",
  });
});

app.listen(port, () => {
  console.log("Serviço escutando na porta:  ${port}");
});