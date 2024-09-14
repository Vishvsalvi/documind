import {messages} from '@/lib/db/schema';
import {db} from '@/lib/db';
import {eq} from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request){
    const {chatId} = await request.json();
    const msg = await db.select().from(messages).where(eq(messages.chatId, chatId));
    return NextResponse.json(msg)
}