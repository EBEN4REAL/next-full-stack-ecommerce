import { client } from "@/lib/mongodb";


export async function fileExists(filename: string): Promise<boolean> {
    const count = await client
      .db()
      .collection("images.files")
      .countDocuments({ filename });
  
    return !!count;
  }

  