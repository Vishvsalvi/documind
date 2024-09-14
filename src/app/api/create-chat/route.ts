import { loadS3IntoPinecone } from "@/lib/db/pinecone";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { getS3FileUrl } from "@/lib/s3";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";

// api/create-chat/

export async function POST(req: Request, res: Response) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    await loadS3IntoPinecone(file_key);
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3FileUrl(file_key),
        userId: userId,
      })
      .returning({
        insertedId: chats.id,
      });
    console.log("Chat created with filekey", file_key);
    console.log(chat_id);
    return NextResponse.json({ chat_id: chat_id[0].insertedId }, {status: 200});

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error in creating chat" },
      { status: 500 }
    );
  }
}
