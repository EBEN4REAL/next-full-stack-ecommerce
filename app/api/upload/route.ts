import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/app/api/auth/[...nextauth]/route";
import { NextApiResponse, NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { IncomingMessage } from 'http';
const bucketName = 'dawid-next-ecommerce';



export async function POST(req: Request, res: Response) {
  await mongooseConnect();
  await isAdminRequest(req,res);

  const form = new multiparty.Form();
  
    const incomingMessage = req as unknown as IncomingMessage;
    const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(incomingMessage, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    // Do something with fields and files
    console.log('Fields:', fields);
    console.log('Files:', files);

  // const client = new S3Client({
  //   region: 'us-east-1',
  //   credentials: {
  //     accessKeyId: process.env.S3_ACCESS_KEY,
  //     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  //   },
  // });
  // const links = [];
  // for (const file of files.file) {
  //   const ext = file.originalFilename.split('.').pop();
  //   const newFilename = Date.now() + '.' + ext;
  //   await client.send(new PutObjectCommand({
  //     Bucket: bucketName,
  //     Key: newFilename,
  //     Body: fs.readFileSync(file.path),
  //     ACL: 'public-read',
  //     ContentType: mime.lookup(file.path),
  //   }));
  //   const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
  //   links.push(link);
  // }
  return NextResponse.json({file: files.file});
}

export const config = {
  api: {bodyParser: false},
};




