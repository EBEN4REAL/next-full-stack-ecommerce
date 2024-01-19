import mongoose, { Mongoose } from 'mongoose';

export function mongooseConnect(): Promise<Mongoose> {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose);
  } else {
    if (!process.env.MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    const uri: string = process.env.MONGODB_URI;
    return mongoose.connect(uri).then(() => mongoose);
  }
}