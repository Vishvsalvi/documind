import { Message } from 'ai/react';
import { cn } from '@/lib/utils';
import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  messages: Message[]
}

export default function Component({ messages }: Props = { messages: [] }) {
  if (!messages.length) return null;

  return (
    <div className="flex flex-col gap-4 px-4 py-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn('flex', {
            'justify-end': message.role === 'user',
            'justify-start': message.role === 'assistant',
          })}
        >
          <div
            className={cn('rounded-2xl py-2 px-4 text-sm shadow-sm', {
              'bg-gradient-to-br from-purple-500 to-indigo-600 text-white': message.role === 'assistant',
              'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100': message.role === 'user',
            })}
          >
            <ReactMarkdown className="prose dark:prose-invert max-w-none">
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}