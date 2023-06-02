const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: "posts" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
