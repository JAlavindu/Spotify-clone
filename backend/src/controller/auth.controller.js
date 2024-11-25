import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id || !firstName || !lastName || !imageUrl) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Find the user or create if not exists
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $setOnInsert: {
          clerkId: id,
          fullName: `${firstName || ""} ${lastName || ""}`.trim(),
          imageUrl,
        },
      },
      { new: true, upsert: true } // Create if not found
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in auth callback", error);
    next(error); // Pass error to centralized error handler
  }
};
