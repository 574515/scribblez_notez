import express from 'express';
import notesRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import multer from "multer";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.json());
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000',
}));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname)
	}
})

const upload = multer({storage})

app.post('/api/uploads', upload.single('file'), function (req, res) {
	const file = req.file;
	res.status(200).json(file);
})

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8800, () => {
	console.log("Listening on port 8800");
});