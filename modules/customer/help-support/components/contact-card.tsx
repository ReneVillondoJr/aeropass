import type { LucideIcon } from 'lucide-react';

interface HelpContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export function HelpContactCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: HelpContactCardProps) {
  return (
    <article className='flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#C5E3F2] hover:shadow-sm sm:p-6'>
      <div className='flex size-12 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#24658A]'>
        <Icon className='size-6' />
      </div>

      <h3 className='mt-4 font-semibold text-[#102A43]'>{title}</h3>

      <p className='mt-2 flex-1 text-sm leading-6 text-slate-500'>
        {description}
      </p>

      <button
        type='button'
        onClick={onAction}
        className='mt-5 inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#102A43] transition hover:border-[#C5E3F2] hover:bg-[#EEF7FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
      >
        {actionLabel}
      </button>
    </article>
  );
}
