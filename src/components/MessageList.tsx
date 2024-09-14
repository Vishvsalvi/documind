import { Message } from 'ai/react';
import { cn } from '@/lib/utils';
import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
    messages: Message[]
}

const MessageList = ({ messages }: Props) => {
  if (!messages) return <></>;

  return (
    <div className='flex flex-col gap-2 px-4'>
      {
        messages.map((message) => {
          return (
            <div
              key={message.id}
              className={cn('flex bg-white dark:bg-neutral-950', {
                'justify-end pl-4': message.role === 'user',
                'justify-start pr-4': message.role === 'assistant',
              })}
            >
              <div
                className={cn('rounded-lg py-2 px-3 text-xs md:text-sm', {
                  'dark:bg-indigo-600 dark:text-neutral-100 text-black rounded-bl-none': message.role === 'assistant',
                  'dark:bg-indigo-800 dark:text-neutral-100 rounded-br-none ': message.role === 'user',
                })}
              >
                {/* Render message content with Markdown */}
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default MessageList;
