import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tr-nextjs-project';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      cached.conn = mongoose.connection;
      return cached.conn;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export const connectDB = async () => {
  const uri =process.env.mongooseURI ||`mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@templatenextpwa.nyfzuol.mongodb.net/?retryWrites=true&w=majority&appName=templateNextPWA`
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      uri
    );
  }
};

export default dbConnect;
