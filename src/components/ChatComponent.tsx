"use client"
import React from 'react'
import { Input } from './ui/input'
import { useChat } from 'ai/react'
import { Button } from './ui/button'
import { IconSend } from "@tabler/icons-react"
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

    const { input, handleInputChange, handleSubmit, messages, isLoading } = useChat({
        api: '/api/chat',
        body: {chatId},
        initialMessages: data || []
    })

    return (
        <div className='flex flex-col h-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950'>
            <div className="flex-shrink-0 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>Chat</h3>
            </div>
            
            {/* Message List */}
            <div className="flex-grow overflow-y-auto bg-transparent">
                <MessageList messages={messages} />
            </div>

            <form className='flex-shrink-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex gap-2' onSubmit={handleSubmit}>
                <Input 
                    className='w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400' 
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder="Ask a question..." 
                />
                <Button 
                    disabled={input.length === 0 || isLoading}
                    className='bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200'
                >
                    <IconSend size={20} />
                </Button>
            </form>
        </div>
    )
}

export default ChatComponent