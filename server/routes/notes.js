import express from "express";
import {addNote} from "../controllers/notes.js";

const router = express.Router();

router.get("/", addNote);

export default router;