const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

//middleware
app.use(express.json({ limit: "50mb" }));
//cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//routes
app.use("/posts", require("./routes/posts"));
app.post("/upload", upload.single("image"), async (req, res) => {
	const file = req.file;

	if (!file) {
		return res.status(400).json({ message: "No File Uploaded" });
	}

	cloudinary.uploader.upload(file.buffer, (err, result) => {
		if (err) {
			return res.status(500).json({ message: "Something went wrong" });
		}
		//success
		console.log("Cloudinary Result: ", result);
		res.json({ message: "Image Uploaded Successfully" });
	});
});

//mongoose config
PORT = process.env.PORT || 3000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () =>
			console.log(`Listening on ${PORT}, you handsome devil`)
		);
	})
	.catch((error) => console.log(error.message, "error connecting to mongoose"));
