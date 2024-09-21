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
        "rounded-lg flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 w-full flex-1 mx-auto overflow-y-scroll",
        "h-screen border border-gray-200 dark:border-gray-800 shadow-lg"
      )}
    >
      <ChatSideBar chats={userChat} chatId={parseInt(chatId)} />
      <div className="flex-1 flex">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] rounded-lg bg-white dark:bg-gray-900"
        >
          <ResizablePanel defaultSize={25}>
            <div className="w-full h-full p-2">
              <div className="w-full h-full rounded-lg overflow-hidden shadow-inner">
                <iframe
                  src={`https://docs.google.com/gview?url=${currentChat?.pdfUrl}&embedded=true`}
                  className="w-full h-full border-none bg-white dark:bg-gray-800"
                />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-gray-200 dark:bg-gray-700 w-1.5 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600" />
          <ResizablePanel defaultSize={75} minSize={30}>
            <div className="w-full h-full p-2 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
              <ChatComponent chatId={parseInt(chatId)} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}