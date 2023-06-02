const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// new post
router.post("/", async (req, res) => {
	const { title, content, imageUrl } = req.body;

	try {
		const post = new Post({ title, content, imageUrl });
		const savedPost = await post.save();
		res.json({ savedPost, message: "Post created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to save post" });
	}
});

// get all posts
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 }); //sort by newest first
		res.json({ posts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to get posts" });
	}
});
