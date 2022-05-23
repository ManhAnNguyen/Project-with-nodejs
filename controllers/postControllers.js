const Post = require("../models/Post");

exports.getAllPost = async (req, res) => {
  try {
    const data = await Post.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: "ERROR" });
  }
};
exports.createNewPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post(title, body);
    await post.save();
    res.status(200).json({ message: "create new post successfully" });
  } catch (err) {
    res.status(400).json({ err: "ERROR" });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const data = await Post.getById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: "ERROR" });
  }
};
