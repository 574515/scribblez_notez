import express from 'express';
import notesRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());
app.use(cors());

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8800, () => {
	console.log("Listening on port 8800");
});