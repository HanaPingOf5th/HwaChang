import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "kr-standard",
  endpoint: "https://kr.object.ncloudstorage.com",
  credentials: {
    accessKeyId: "ncp_iam_BPAMKR2M01JBqOkEENSZ",
    secretAccessKey: "ncp_iam_BPKMKRQPhBbHRvo52fd0gyRU4R3eGJVNoD",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { file, fileName } = await req.json();

    if (!file || !fileName) {
      return NextResponse.json({ error: "File and fileName are required." }, { status: 400 });
    }

    const buffer = Buffer.from(file, "base64");

    const command = new PutObjectCommand(
      {
        Bucket: "consulting-audiofile",
        Key: fileName,
        Body: buffer,
        ContentType: "audio/mp4",
        ACL: 'public-read',
      }
    );
    const result = await s3.send(command);

    return NextResponse.json({ message: "File uploaded successfully.", data: result });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed", details: error }, { status: 500 });
  }
}






