import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

const tutorsInfo = [
  {
    subject: "Mathematics",
    bio: "I am a professional mathematician with 10 years of experience",
  },
  {
    subject: "Physics",
    bio: "I am a professional physicist with 10 years of experience",
  },
  {
    subject: "Chemistry",
    bio: "I am a professional chemist with 10 years of experience",
  },
  {
    subject: "Biology",
    bio: "I am a professional biologist with 10 years of experience",
  },
  {
    subject: "English",
    bio: "I am a professional English teacher with 10 years of experience",
  },
  {
    subject: "History",
    bio: "I am a professional historian with 10 years of experience",
  },
  {
    subject: "Geography",
    bio: "I am a professional geographer with 10 years of experience",
  },
  {
    subject: "Computer Science",
    bio: "I am a professional computer scientist with 10 years of experience",
  },
  {
    subject: "Economics",
    bio: "I am a professional economist with 10 years of experience",
  },
];

export const signup = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !role ||
    name === "" ||
    email === "" ||
    password === "" ||
    role === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  //exist or not

  const existing = await User.findOne({ email });

  if (existing) {
    return next(errorHandler(400, "User already exists"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const tutorinfo = tutorsInfo[Math.floor(Math.random() * tutorsInfo.length)];

  const newUser = new User({
    name,
    email,
    role,
    password: hashedPassword,
    expertise: role === "tutor" ? tutorinfo.subject : "",
    bio: role === "tutor" ? tutorinfo.bio : "",
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const user = {
      id: validUser._id,
      name: validUser.name,
      email: validUser.email,
      image: validUser.profilePicture,
      role: validUser.role,
    };

    const token = jwt.sign(user, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res.json({ user, token });
  } catch (error) {
    return next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl, role } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const userObject = {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.profilePicture,
        role: user.role,
      };
      const token = jwt.sign(userObject, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      res.json({ user: userObject, token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const tutorinfo =
        tutorsInfo[Math.floor(Math.random() * tutorsInfo.length)];
      const newUser = new User({
        name: name,
        email,
        role: role,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        expertise: role === "tutor" ? tutorinfo.subject : "",
        bio: role === "tutor" ? tutorinfo.bio : "",
      });
      await newUser.save();
      const userObject = {
        id: newUser._doc._id,
        name: newUser._doc.name,
        email: newUser._doc.email,
        image: newUser._doc.profilePicture,
        role: newUser.role,
      };
      const token = jwt.sign(userObject, process.env.JWT_SECRET);

      res.json({ user: userObject, token });
    }
  } catch (error) {
    next(error);
  }
};
