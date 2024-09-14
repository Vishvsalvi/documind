"use client"
import React from 'react'
import { Input } from './ui/input'
import { useChat } from 'ai/react'
import { Button } from './ui/button'
import { IconSend } from "@tabler/icons-react";
import MessageList from './MessageList'
import { useQuery } from '@tanstack/react-query'
import { Message } from 'ai/react'
import axios from 'axios'

type Props = {
    chatId: number
}

const ChatComponent = ({chatId}: Props) => {
    const {data} = useQuery({
        queryKey: ['chat', chatId],
        queryFn: async () => {
            const response = await axios.post('/api/getMessages', {chatId})
            return response.data as Message[]
        }
    })

   const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: '/api/chat',
    body: {chatId},
    initialMessages: data || []
   })

   return (
    <div className='flex flex-col h-full'>
        <div className="flex-shrink-0 p-2 bg-white dark:bg-neutral-950">
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>
        
        {/* Message List */}
        <div className="flex-grow overflow-y-auto">
            <MessageList messages={messages} />
        </div>

        <form className='flex-shrink-0 p-2 bg-white dark:bg-neutral-950 flex gap-2' onSubmit={handleSubmit}>
            <Input 
                className='w-full' 
                value={input} 
                onChange={handleInputChange} 
                placeholder="Ask a question..." 
            />
            <Button disabled={input.length === 0}>
                <IconSend size={20} />
            </Button>
        </form>
    </div>
  )
}

export default ChatComponent