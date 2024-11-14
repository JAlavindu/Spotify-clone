import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";
//import { Artist } from "../models/artist.model.js";

export const getStats = async (req, res, next) => {
  try {
    // const totalSong = await Song.countDoucuments();
    // const totalUserst = await User.countDoucuments();
    // const totoalAlbums = await Album.countDoucuments();
    // const totalArtist = await Artist.countDoucuments();

    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        // Artist.countDocuments()

        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artities",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0].count || 0,
    });
  } catch (err) {
    next(err);
  }
};
