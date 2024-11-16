import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try {
    // -1 = descending => newest songs first
    // 1 = ascending => oldest songs first
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res) => {
  try {
    //fetch 6 random using mongoDBs aggregate method
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res) => {
  try {
    //fetch 6 random using mongoDBs aggregate method
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res) => {
  try {
    //fetch 6 random using mongoDBs aggregate method
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};