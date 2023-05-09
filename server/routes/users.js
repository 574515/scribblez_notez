import express from "express";
import {getUser, getUserNotes} from "../controllers/users.js";

const router = express.Router();

router.get("/:username", getUser);
router.get("/:username/notes/:isCurrentUser", getUserNotes);
export default router;