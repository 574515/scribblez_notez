import express from "express";
import {addNote, deleteNote, getNote, getNotes, updateNote} from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", addNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;