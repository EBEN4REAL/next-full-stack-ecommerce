// import mongoose, { Mongoose } from 'mongoose';

// export function mongooseConnect(): Promise<Mongoose> {
//   if (mongoose.connection.readyState === 1) {
//     // return Promise.resolve(mongoose);
//     return mongoose.connection.asPromise()
//   } else {
//     if (!process.env.MONGODB_URI) {
//       throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
//     }

//     const uri: string = process.env.MONGODB_URI;
//     return mongoose.connect(uri).then(() => mongoose);
//   }
// }

import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}