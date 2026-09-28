'use client';

import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import { quickActionIcons } from '../data/help';

import type { QuickAction } from '../types/help';

interface ChatQuickActionsProps {
  actions: QuickAction[];
  onAsk: (value: string) => void;
}

export function ChatQuickActions({ actions, onAsk }: ChatQuickActionsProps) {
  return (
    <div className='grid gap-2 sm:grid-cols-2'>
      {actions.map((action) => {
        const Icon = quickActionIcons[action.icon];

        const isChatAction = action.href === '#chat';

        if (isChatAction) {
          return (
            <button
              key={action.id}
              type='button'
              onClick={() => onAsk(action.label)}
              className='group flex items-center gap-3 rounded-2xl border border-[#dce8ef] bg-white p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b8d7e7] hover:shadow-[0_10px_28px_rgba(16,42,67,0.07)]'
            >
              <span className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e5f5fc] text-[#3f88b2]'>
                <Icon className='size-4' />
              </span>

              <span className='min-w-0 flex-1'>
                <span className='block text-sm font-semibold text-[#102a43]'>
                  {action.label}
                </span>

                <span className='mt-0.5 block truncate text-xs text-[#7b8b9a]'>
                  {action.description}
                </span>
              </span>

              <ArrowUpRight className='size-4 text-[#94a3b8] transition-colors group-hover:text-[#3f88b2]' />
            </button>
          );
        }

        return (
          <Link
            key={action.id}
            href={action.href}
            className='group flex items-center gap-3 rounded-2xl border border-[#dce8ef] bg-white p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b8d7e7] hover:shadow-[0_10px_28px_rgba(16,42,67,0.07)]'
          >
            <span className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e5f5fc] text-[#3f88b2]'>
              <Icon className='size-4' />
            </span>

            <span className='min-w-0 flex-1'>
              <span className='block text-sm font-semibold text-[#102a43]'>
                {action.label}
              </span>

              <span className='mt-0.5 block truncate text-xs text-[#7b8b9a]'>
                {action.description}
              </span>
            </span>

            <ArrowUpRight className='size-4 text-[#94a3b8] transition-colors group-hover:text-[#3f88b2]' />
          </Link>
        );
      })}
    </div>
  );
}
