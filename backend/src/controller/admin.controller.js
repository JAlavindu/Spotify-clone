import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

//helper function for cloudinary uploads
const uploadToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("error in uplatodToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
  {
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.filesaudioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "audioFile and imageFile are required" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile, "audio");
    const imageUrl = await uploadToCloudinary(imageFile, "image");

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    // if song belongs to an album, update the albums song array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json({ song });
  } catch (error) {
    console.log("error in createSong", error);
    return res.status(500).json({ message: "Internal server error", error });
    next(error);
  }
};
