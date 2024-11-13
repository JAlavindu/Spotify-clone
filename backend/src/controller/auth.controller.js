import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firtsName, lastName, imageUrl } = req.body;

    //check if user already exists
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      //SIGNUP
      await User.create({
        clerkId: id,
        fullName: `${firtsName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error ina auth callback", error);
    next(error);
  }
};
