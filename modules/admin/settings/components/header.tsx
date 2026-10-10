import { Settings2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

export function SettingsHeader() {
  return (
    <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='min-w-0'>
        <div className='flex items-center gap-2'>
          <div className='flex size-9 items-center justify-center rounded-xl border border-border/70 bg-card'>
            <Settings2 className='size-4 text-muted-foreground' />
          </div>

          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
            Settings
          </h1>
        </div>

        <p className='mt-2 max-w-2xl text-sm leading-6 text-muted-foreground'>
          Configure AeroPass platform defaults, operational preferences,
          notifications, security options, and demo payment settings.
        </p>
      </div>

      <Badge
        variant='outline'
        className='w-fit shrink-0 border-[#5BA9D6]/30 bg-[#E5F5FC]/60 px-3 py-1 text-[#102A43]'
      >
        Local configuration
      </Badge>
    </header>
  );
}
