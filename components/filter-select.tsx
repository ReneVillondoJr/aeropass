import type { ReactNode } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface AdminFilterOption {
  label: string;
  value: string;
}

interface AdminFilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: AdminFilterOption[];
  onChange: (value: string) => void;
  className?: string;
  icon?: ReactNode;
}

export function AdminFilterSelect({
  id,
  label,
  value,
  options,
  onChange,
  className = '',
  icon,
}: AdminFilterSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue !== null) {
          onChange(nextValue);
        }
      }}
    >
      <SelectTrigger
        id={id}
        aria-label={label}
        className={[
          'h-10 w-full min-w-0 justify-between gap-2 border-border/70 bg-background text-xs shadow-none',
          'focus:ring-[#5BA9D6]/30',
          className,
        ].join(' ')}
      >
        {icon ?
          <span className='flex shrink-0 items-center'>{icon}</span>
        : null}

        <SelectValue
          placeholder={label}
          className='min-w-0 flex-1 truncate text-left'
        />
      </SelectTrigger>

      <SelectContent
        align='start'
        sideOffset={0}
        alignItemWithTrigger={false}
        className='h-auto min-h-0 pb-1'
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
