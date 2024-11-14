import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";
import { protectRoute } from "../middleware/auth.middleware.js";

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

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    //if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted" });
  } catch (error) {
    console.log("error in deleteSong", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile, "image");

    const album = await Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();
    res.status(201).json({ album });
  } catch (error) {
    console.log("error in createAlbum", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
  } catch (error) {
    console.log("error in deleteAlbum", error);
    next(error);
  }
};

export const checkAdmin = (req, res, next) => {
  res.status(200).json({ admin: true });
};
