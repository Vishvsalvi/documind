import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { getContext } from "@/lib/context"
import { chats, messages as msg } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Message } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
// Extract the `prompt` from the body of the request


  const { messages, chatId } = await req.json();
  const chat = await db.select().from(chats).where(eq(chats.id, chatId))
  console.log(chat)
  if(chat.length != 1){
   return NextResponse.json({"message": "Chat not found"})
  }
  const filekey = chat[0].fileKey;
  const lastMessage = messages[messages.length - 1];
  const context = await getContext(lastMessage.content, filekey);
  const prompt = {
    role: "system",
    content: `AI assistant is a brand new, powerful, human-like artificial intelligence. 
  The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness. 
  AI is a well-behaved and well-mannered individual. 
  AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
  AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in the world. 
  AI assistant is a big fan of Pinecone and Vercel. 
  START CONTEXT BLOCK
  ${context}
  END OF CONTEXT BLOCK
  AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation. 
  If the context does not provide the answer to the question, the AI assistant will say, "I'm sorry, but I don't know the answer to that."
  AI assistant will not apologize for previous responses, but instead will indicate new information was gained. 
  AI assistant will not invent anything that is not drawn directly from the context.`,
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [prompt, ...messages.filter((m: Message) => m.role === "user")],
  });


  const stream = OpenAIStream(response, {
    onStart: async () => {
      await db.insert(msg).values({
        chatId,
        content: lastMessage.content,
        role: "user",
      })
    },
    onCompletion: async (completion) => {
      await db.insert(msg).values({
        chatId,
        content: completion,
        role: "assistant"
      })
    },
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);

}


