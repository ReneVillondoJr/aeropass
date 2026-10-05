import type { ReactNode } from 'react';

import { ListFilter } from 'lucide-react';

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
          'h-10 w-full min-w-0 border-border/70 bg-background text-xs shadow-none',
          'focus:ring-[#5BA9D6]/30',
          className,
        ].join(' ')}
      >
        {icon ?? (
          <ListFilter className='size-3.5 shrink-0 text-muted-foreground' />
        )}

        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
