import express from "express";
import {getUser, getUserNotes, updateUserProfile, updateIsAnonymous, removeProfilePicture, getAllUsernames} from "../controllers/users.js";

const router = express.Router();

router.get("/usernames", getAllUsernames);
router.get("/:username", getUser);
router.get("/:username/notes/:isCurrentUser", getUserNotes);
router.put("/:username", updateUserProfile);
router.patch("/:username", updateIsAnonymous);
router.patch("/:username/image", removeProfilePicture);
export default router;