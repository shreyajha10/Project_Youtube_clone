import Video from "../Models/video.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    const videoUpload = new Video({
      user: req.user._id,
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
    });
    await videoUpload.save();
    res.status(201).json({ success: "true", videoUpload });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "server error" });
  }
};

export const getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate(
      "user",
      "channelName profilePic userName createdAt"
    );
    res.status(201).json({ videos: videos });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );
    res.status(201).json({ video: video });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "server error" });
  }
};

export const getAllVideoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const video = await Video.find({ user: userId }).populate(
      "user",
      "channelName profilePic userName about createdAt"
    );
    res.status(201).json({ video: video });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
