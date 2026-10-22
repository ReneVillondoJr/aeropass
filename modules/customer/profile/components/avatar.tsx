import { UserRound } from 'lucide-react';

import { getProfileInitials } from '../data/profile';

interface ProfileAvatarProps {
  name: string;
  avatar?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'size-10 text-sm',
  md: 'size-16 text-xl',
  lg: 'size-24 text-3xl',
};

export function ProfileAvatar({
  name,
  avatar,
  size = 'md',
}: ProfileAvatarProps) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#E5F5FC] font-semibold text-[#102A43] ${sizeStyles[size]}`}
    >
      {avatar ?
        // The canonical mock avatar may be a remote or local image URL.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          alt={`${name}'s profile`}
          className='size-full object-cover'
        />
      : name.trim() ?
        <span aria-label={`${name}'s initials`}>
          {getProfileInitials(name)}
        </span>
      : <UserRound className='size-8' aria-hidden='true' />}
    </div>
  );
}
