import Link from 'next/link';

import { ArrowUpRight, Sparkles } from 'lucide-react';

import type { AiChatMessage as AiChatMessageType } from '../types/ai-concierge';

interface AiChatMessageProps {
  message: AiChatMessageType;
}

export function AiChatMessage({ message }: AiChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={[
        'flex gap-2.5',
        isAssistant ? 'items-start' : 'justify-end',
      ].join(' ')}
    >
      {isAssistant ?
        <div className='flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#e5f5fc] text-[#3f88b2]'>
          <Sparkles className='size-3.5' />
        </div>
      : null}

      <div
        className={[
          'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6',
          isAssistant ?
            'rounded-tl-md bg-[#f4f9fc] text-[#334e68]'
          : 'rounded-tr-md bg-[#102a43] text-white',
        ].join(' ')}
      >
        <p>{message.content}</p>

        {message.actions?.length ?
          <div className='mt-2.5 flex flex-wrap gap-2'>
            {message.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className='inline-flex items-center gap-1.5 rounded-lg border border-[#cfe3ee] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#102a43] transition-colors hover:bg-[#f4f9fc]'
              >
                {action.label}

                <ArrowUpRight className='size-3' />
              </Link>
            ))}
          </div>
        : null}
      </div>
    </div>
  );
}
