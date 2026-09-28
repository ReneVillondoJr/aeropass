import Link from 'next/link';

import { ArrowUpRight, Sparkles } from 'lucide-react';

import type { ChatMessage as ChatMessageType } from '../types/help';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={[
        'flex gap-3',
        isAssistant ? 'items-start' : 'items-end justify-end',
      ].join(' ')}
    >
      {isAssistant ?
        <div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#e5f5fc] text-[#3f88b2]'>
          <Sparkles className='size-4' />
        </div>
      : null}

      <div
        className={[
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%]',
          isAssistant ?
            'rounded-tl-md bg-[#f4f9fc] text-[#334e68]'
          : 'rounded-tr-md bg-[#102a43] text-white',
        ].join(' ')}
      >
        <p>{message.content}</p>

        {message.actions?.length ?
          <div className='mt-3 flex flex-wrap gap-2'>
            {message.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className='inline-flex items-center gap-1.5 rounded-xl border border-[#cfe3ee] bg-white px-3 py-2 text-xs font-semibold text-[#102a43] transition-colors hover:border-[#9fcce3] hover:bg-[#f7fbfd]'
              >
                {action.label}

                <ArrowUpRight className='size-3.5' />
              </Link>
            ))}
          </div>
        : null}
      </div>
    </div>
  );
}
