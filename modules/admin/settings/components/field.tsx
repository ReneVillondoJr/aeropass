import type { ReactNode } from 'react';

export const SETTING_CONTROL_CLASS =
  'h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-[#5BA9D6] focus-visible:ring-2 focus-visible:ring-[#5BA9D6]/20 disabled:cursor-not-allowed disabled:opacity-60';

interface SettingFieldProps {
  label: string;
  htmlFor: string;
  description?: string;
  children: ReactNode;
}

export function SettingField({
  label,
  htmlFor,
  description,
  children,
}: SettingFieldProps) {
  return (
    <div className='grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center sm:gap-6'>
      <div className='min-w-0'>
        <label htmlFor={htmlFor} className='text-xs font-semibold'>
          {label}
        </label>

        {description ?
          <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
            {description}
          </p>
        : null}
      </div>

      <div className='min-w-0'>{children}</div>
    </div>
  );
}

interface SettingToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function SettingToggle({
  title,
  description,
  checked,
  onCheckedChange,
}: SettingToggleProps) {
  return (
    <div className='flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-background/80 p-3.5'>
      <div className='min-w-0 flex-1'>
        <p className='text-xs font-semibold'>{title}</p>

        <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
          {description}
        </p>
      </div>

      <label className='relative mt-0.5 inline-flex shrink-0 cursor-pointer items-center'>
        <input
          type='checkbox'
          className='peer sr-only'
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          aria-label={title}
        />

        <span className='relative h-6 w-11 rounded-full bg-muted transition-colors after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-background after:shadow-sm after:transition-transform peer-checked:bg-[#102A43] peer-checked:after:translate-x-5 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#5BA9D6] peer-focus-visible:ring-offset-2' />
      </label>
    </div>
  );
}
