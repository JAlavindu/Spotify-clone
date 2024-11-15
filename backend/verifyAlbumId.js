import mongoose from "mongoose";
import { Album } from "/src/models/album.model.js"; // Assuming you have an Album model

const verifyAlbumId = async (albumId) => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    const album = await Album.findById(albumId);
    if (album) {
      console.log("Album exists:", album);
    } else {
      console.log("No album found with the given albumId.");
    }
  } catch (error) {
    console.error("Error verifying albumId:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Example albumId to verify
const albumId = "6737568627d99232ee900e1d";
verifyAlbumId(albumId);
