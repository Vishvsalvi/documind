'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function navigateToChat() {
  const { userId } = auth()
  
  if (userId) {
    const userChat = await db.select().from(chats).where(eq(chats.userId, userId))
    if (userChat.length) {
      redirect(`/chat/${userChat[0].id}`)
    } else {
      alert("No chat found!")
      return { error: "No chat found" }
    }
  }
  
  return { error: "User not authenticated" }
}