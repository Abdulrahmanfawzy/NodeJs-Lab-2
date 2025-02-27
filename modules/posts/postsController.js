import { postModel } from "./postsModel.js";

export const allPostsController = async (req, res) => {
  const posts = await postModel.find({});
  res.json({ message: "done", posts });
};

export const addPostController = async (req, res) => {
  const { title, description } = req.body;
  const postInsert = await postModel({ title, description });
  const postSaved = await postInsert.save();
  res.json({ message: "done", postSaved });
};

export const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (post) {
      const deletePost = await postModel.findByIdAndDelete(id);
      res.json({ message: "deleted successfully", deletePost });
    }
  } catch (err) {
    if (err.path == "_id") {
      res.json({ message: "invalid id" });
    } else {
      res.json({ message: "error", err });
    }
  }
};

export const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const post = await postModel.findById(id);
    if (post) {
      const updatePost = await postModel.findByIdAndUpdate(id, { title }, { new: true });
      res.json({ message: "updated successfully", updatePost });
    }
  } catch (err) {
    if (err.path == "_id") {
      res.json({ message: "invalid id" });
    } else {
      res.json({ message: "error", err });
    }
  }
};

export const searchPostByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (post) {
      const searchPost = await postModel.findById(id);
      res.json({ message: "updated successfully", searchPost });
    }
  } catch (err) {
    if (err.path == "_id") {
      res.json({ message: "invalid id" });
    } else {
      res.json({ message: "error", err });
    }
  }
};

export const allUsersReversed = async (req, res) => {
  try {
    const posts = await postModel.find({});
    const postsReserved = posts.reverse();
    res.json({ message: "done", postsReserved });
  } catch (err) {
    res.json({ message: "error", err });
  }
};
