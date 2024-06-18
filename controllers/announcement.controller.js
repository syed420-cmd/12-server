import Announcement from "../models/announcement.model.js";

export const createAnnouncement = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content || title === "" || content === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  const newAnnouncement = new Announcement({
    title,
    content,
    createdBy: req.user.name,
  });

  try {
    await newAnnouncement.save();
    res.json("Announcement created successfully");
  } catch (error) {
    return next(errorHandler(500, "Failed to create announcement"));
  }
};

export const getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    return next(errorHandler(500, "Failed to fetch announcements"));
  }
};
