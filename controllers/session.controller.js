import Reviews from "../models/reviews.model.js";
import Session from "../models/session.model.js";
import SessionBook from "../models/sessionBook.model.js";

// Create a new session
export const createSession = async (req, res) => {
  try {
    const {
      sessionTitle,
      tutorName,
      tutorEmail,
      sessionDescription,
      registrationStartDate,
      registrationEndDate,
      classStartDate,
      classEndDate,
      sessionDuration,
      registrationFee = 0, // Default to 0
      status = "pending", // Default status
    } = req.body;

    const newSession = new Session({
      sessionTitle,
      tutorName,
      tutorEmail,
      sessionDescription,
      registrationStartDate,
      registrationEndDate,
      classStartDate,
      classEndDate,
      sessionDuration,
      registrationFee,
      status,
    });

    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sessions with optional filter by tutorEmail, limit, and page
export const getSessions = async (req, res) => {
  const { tutorEmail, limit, page, status } = req.query;

  try {
    const query = tutorEmail ? { tutorEmail } : {};
    if (status) {
      query.status = status;
    }
    const options = {
      limit: limit ? parseInt(limit) : 100,
      skip: page ? (parseInt(page) - 1) * parseInt(limit) : 0,
    };

    const sessions = await Session.find(query)
      .limit(options.limit)
      .skip(options.skip);

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single session by ID
export const getSessionById = async (req, res) => {
  const { id } = req.params;

  try {
    let session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const reviews = await Reviews.find({ session: id });

    // Convert the session document to a plain JavaScript object
    session = session.toObject();
    session.reviews = reviews;

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a session by ID
export const updateSession = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSession = await Session.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedSession) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a session by ID
export const deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSession = await Session.findByIdAndDelete(id);
    if (!deletedSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    // check session status is not approved
    if (deletedSession.status === "approved") {
      return res
        .status(400)
        .json({ message: "Session has been approved and cannot be deleted" });
    }

    //relete all reviews for the session
    await Reviews.deleteMany({ session: id });
    //delete all booked sessions for the session
    await SessionBook.deleteMany({ session: id });
    //delete all materials for the session
    await Material.deleteMany({ sessionId: id });
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const session = await Session.findById({ _id: id });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const newReview = new Reviews({
      rating,
      comment,
      session: id,
      createdBy: req.user.name,
    });

    await newReview.save();

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//book session

export const bookSession = async (req, res) => {
  const { id } = req.params;
  const student = req.user.id;

  try {
    const session = await Session.findById({ _id: id });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "approved") {
      return res.status(400).json({ message: "Session not approved" });
    }

    //check if student has already booked session
    const sessionBooked = await SessionBook.findOne({ session: id, student });

    if (sessionBooked) {
      return res.status(400).json({ message: "Session already booked" });
    }

    const newSessionBook = new SessionBook({
      session: id,
      student,
    });

    await newSessionBook.save();

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookedSessions = async (req, res) => {
  const student = req.user.id;

  try {
    const bookedSessions = await SessionBook.find({ student }).populate(
      "session"
    );
    res.status(200).json(bookedSessions);
  } catch (error) {
    console.error("Error fetching booked sessions:", error);
    res.status(500).json({ message: error.message });
  }
};

// return all classmates for all sessions what the student has booked
export const getClassmates = async (req, res) => {
  const student = req.user.id;

  try {
    const bookedSessions = await SessionBook.find({ student });
    const classmates = await SessionBook.find({
      session: { $in: bookedSessions.map((session) => session.session) },
    })
      .populate("student")
      .populate("session", "sessionTitle");

    res.status(200).json(classmates);
  } catch (error) {
    console.error("Error fetching classmates:", error);
    res.status(500).json({ message: error.message });
  }
};
