// import { MongoClient, MongoClientOptions } from 'mongodb';

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri: string = process.env.MONGODB_URI;
// const options: MongoClientOptions = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;
// let _mongoClientPromise = null

// if (process.env.NODE_ENV === 'development') {
//   if (!_mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     _mongoClientPromise = client.connect();
//   }
//   clientPromise = _mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;



import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri: string = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = _mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;