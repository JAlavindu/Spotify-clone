import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find().populate("songs");
    res.status(200).json({ albums });
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const albums = await Album.findById(albumId).populate("songs");

    if (!albums) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json({ albums });
  } catch (error) {
    next(error);
  }
};
