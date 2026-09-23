'use client';

import { useRouter } from 'next/navigation';

import { ChevronDown, LogOut, Settings, UserRound } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AdminUserMenu() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='flex h-10 items-center gap-2 rounded-md px-2 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring'
        aria-label='Open user menu'
      >
        <Avatar className='size-8'>
          <AvatarFallback className='bg-muted text-xs font-semibold'>
            AU
          </AvatarFallback>
        </Avatar>

        <div className='hidden text-left md:block'>
          <p className='text-sm font-medium leading-none'>Admin User</p>

          <p className='mt-1 text-xs text-muted-foreground'>Administrator</p>
        </div>

        <ChevronDown className='hidden size-4 text-muted-foreground md:block' />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' sideOffset={8} className='w-56'>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-9'>
                <AvatarFallback className='bg-muted text-xs font-semibold'>
                  AU
                </AvatarFallback>
              </Avatar>

              <div className='min-w-0'>
                <p className='truncate text-sm font-medium'>Admin User</p>

                <p className='truncate text-xs text-muted-foreground'>
                  Administrator
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push('/admin/settings/profile')}
          >
            <UserRound className='size-4' />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
            <Settings className='size-4' />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            // Add local logout logic here.
          }}
          className='text-destructive focus:text-destructive'
        >
          <LogOut className='size-4' />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
