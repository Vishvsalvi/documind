import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { ChatSideBar } from "@/components/ChatSideBar";
import { cn } from "@/lib/utils";
import ChatComponent from '@/components/ChatComponent';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

type Props = {
  params: {
    chatId: string
  }
}

export default async function ChatPage({ params: { chatId } }: Props) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const userChat = await db.select().from(chats).where(eq(chats.userId, userId))

  const currentChat = userChat.find((chat) => chat.id === parseInt(chatId));

  

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row dark:bg-neutral-950 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-y-scroll",
        "h-screen"
      )}
    >
      <ChatSideBar chats={userChat} chatId={parseInt(chatId)} />
      <div className="flex-1 flex">
        {/* PDF viewer */}
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] rounded-lg"
        >
          <ResizablePanel defaultSize={25}>

            <div className="w-full h-full">
              <iframe
                src={`https://docs.google.com/gview?url=${currentChat?.pdfUrl}&embedded=true`}
                className="w-full h-full border-none"
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            {/* Space for chat or other content */}
            <div className="w-full h-full">
              <ChatComponent chatId={parseInt(chatId)} />
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  )
}
