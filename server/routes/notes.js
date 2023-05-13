import express from "express";
import {addNote, deleteNote, getNote, getNotes, updateNote, updateVisibility, getPublicNotes, getNoteCountForUser} from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/count/:username/:isCurrentUser", getNoteCountForUser);
router.get("/public", getPublicNotes)
router.get("/:id", getNote);
router.post("/", addNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);
router.patch("/:id", updateVisibility)

export default router;