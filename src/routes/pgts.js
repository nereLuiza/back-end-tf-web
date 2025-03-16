import { Router } from "express";
import verificarAutenticacao from "../middlewares/autenticacao.js"
import {
    selectPgt,
    updatePgt,
    deletePgt,
    insertPgt
} from "../db/index.js"

