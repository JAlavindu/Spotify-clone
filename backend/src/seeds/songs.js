import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
  {
    title: "Stay With Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, // 0:46
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Midnight Drive",
    artist: "The Wanderers",
    imageUrl: "/cover-images/2.jpg",
    audioUrl: "/songs/2.mp3",
    duration: 41, // 0:41
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Lost in Tokyo",
    artist: "Electric Dreams",
    imageUrl: "/cover-images/3.jpg",
    audioUrl: "/songs/3.mp3",
    duration: 24, // 0:24
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Summer Daze",
    artist: "Coastal Kids",
    imageUrl: "/cover-images/4.jpg",
    audioUrl: "/songs/4.mp3",
    duration: 24, // 0:24
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Neon Lights",
    artist: "Night Runners",
    imageUrl: "/cover-images/5.jpg",
    audioUrl: "/songs/5.mp3",
    duration: 36, // 0:36
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Mountain High",
    artist: "The Wild Ones",
    imageUrl: "/cover-images/6.jpg",
    audioUrl: "/songs/6.mp3",
    duration: 40, // 0:40
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "City Rain",
    artist: "Urban Echo",
    imageUrl: "/cover-images/7.jpg",
    audioUrl: "/songs/7.mp3",
    duration: 39, // 0:39
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Desert Wind",
    artist: "Sahara Sons",
    imageUrl: "/cover-images/8.jpg",
    audioUrl: "/songs/8.mp3",
    duration: 28, // 0:28
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Ocean Waves",
    artist: "Coastal Drift",
    imageUrl: "/cover-images/9.jpg",
    audioUrl: "/songs/9.mp3",
    duration: 28, // 0:28
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Starlight",
    artist: "Luna Bay",
    imageUrl: "/cover-images/10.jpg",
    audioUrl: "/songs/10.mp3",
    duration: 30, // 0:30
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Winter Dreams",
    artist: "Arctic Pulse",
    imageUrl: "/cover-images/11.jpg",
    audioUrl: "/songs/11.mp3",
    duration: 29, // 0:29
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Purple Sunset",
    artist: "Dream Valley",
    imageUrl: "/cover-images/12.jpg",
    audioUrl: "/songs/12.mp3",
    duration: 17, // 0:17
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Neon Dreams",
    artist: "Cyber Pulse",
    imageUrl: "/cover-images/13.jpg",
    audioUrl: "/songs/13.mp3",
    duration: 39, // 0:39
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Moonlight Dance",
    artist: "Silver Shadows",
    imageUrl: "/cover-images/14.jpg",
    audioUrl: "/songs/14.mp3",
    duration: 27, // 0:27
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Urban Jungle",
    artist: "City Lights",
    imageUrl: "/cover-images/15.jpg",
    audioUrl: "/songs/15.mp3",
    duration: 36, // 0:36
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Crystal Rain",
    artist: "Echo Valley",
    imageUrl: "/cover-images/16.jpg",
    audioUrl: "/songs/16.mp3",
    duration: 39, // 0:39
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Neon Tokyo",
    artist: "Future Pulse",
    imageUrl: "/cover-images/17.jpg",
    audioUrl: "/songs/17.mp3",
    duration: 39, // 0:39
    albumId: new mongoose.Types.ObjectId(),
  },
  {
    title: "Midnight Blues",
    artist: "Jazz Cats",
    imageUrl: "/cover-images/18.jpg",
    audioUrl: "/songs/18.mp3",
    duration: 29, // 0:29
    albumId: new mongoose.Types.ObjectId(),
  },
];

const seedSongs = async () => {
  try {
    // Connect to MongoDB
    console.log("Connecting to the database...");
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection successful.");

    // Clear existing songs
    console.log("Clearing existing songs...");
    await Song.deleteMany({});

    // Insert new songs
    console.log("Seeding songs...");
    await Song.insertMany(songs);

    console.log("Songs seeded successfully!");
  } catch (error) {
    console.error("Error during the seeding process:", error);
  } finally {
    // Close the connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("Database connection closed.");
    }
  }
};

seedSongs();
