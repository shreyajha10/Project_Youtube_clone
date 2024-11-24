import Comment from "../Models/comment.js";

export const addComment = async (req, res) => {
  try {
    const { video, message } = req.body;
    const comment = new Comment({ user: req.user._id, video, message });
    await comment.save();

    res.status(201).json({ message: "success", comment });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "server error" });
  }
};

export const getCommentByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId }).populate(
      "user",
      "channelName profilePic userName createdAt"
    );
    res.status(201).json({ message: "success", comments });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
