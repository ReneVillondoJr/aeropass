'use client';

import { ChevronRight, Settings2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { SETTINGS_SECTIONS } from '../data/settings';

import type { SettingsSectionKey } from '../types/settings';

interface SettingsSectionNavProps {
  activeSection: SettingsSectionKey;
  onSelect: (section: SettingsSectionKey) => void;
}

export function SettingsSectionNav({
  activeSection,
  onSelect,
}: SettingsSectionNavProps) {
  return (
    <section className='rounded-[1.5rem] border border-border/70 bg-card shadow-sm'>
      <div className='border-b border-border/60 px-5 py-5'>
        <div className='flex items-center gap-3'>
          <div className='flex size-10 items-center justify-center rounded-xl bg-[#E5F5FC] text-[#102A43]'>
            <Settings2 className='size-5' />
          </div>

          <div className='min-w-0 flex-1'>
            <h2 className='text-sm font-semibold'>Configuration</h2>

            <p className='mt-1 text-xs text-muted-foreground'>
              Settings directory
            </p>
          </div>

          <Badge
            variant='outline'
            className='shrink-0 border-border/60 text-[10px]'
          >
            {SETTINGS_SECTIONS.length}
          </Badge>
        </div>
      </div>

      <nav aria-label='Settings sections' className='grid gap-1.5 p-3'>
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.key;

          return (
            <button
              key={section.key}
              type='button'
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onSelect(section.key)}
              className={[
                'group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors',
                isActive ?
                  'border-[#5BA9D6]/35 bg-[#E5F5FC]/60 text-[#102A43]'
                : 'border-transparent hover:border-border/60 hover:bg-muted/40',
              ].join(' ')}
            >
              <div
                className={[
                  'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                  isActive ? 'bg-background' : (
                    'bg-muted/60 text-muted-foreground group-hover:bg-background'
                  ),
                ].join(' ')}
              >
                <Icon className='size-4' />
              </div>

              <div className='min-w-0 flex-1'>
                <p className='text-xs font-semibold'>{section.title}</p>

                <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                  {section.description}
                </p>
              </div>

              <ChevronRight
                className={[
                  'mt-1 size-4 shrink-0 transition-colors',
                  isActive ? 'text-[#102A43]' : 'text-muted-foreground/60',
                ].join(' ')}
              />
            </button>
          );
        })}
      </nav>
    </section>
  );
}
