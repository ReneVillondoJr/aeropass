import { Check, ClipboardList, Armchair, ShieldCheck } from 'lucide-react';

const steps = [
  { number: 1, label: 'Passenger details', icon: ClipboardList },
  { number: 2, label: 'Choose seats', icon: Armchair },
  { number: 3, label: 'Review & confirm', icon: ShieldCheck },
];

export function CheckInSteps({ completed }: { completed: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border/70 bg-card p-3 sm:p-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const active = index === 0 || index === 1;
        return (
          <div key={step.number} className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className={[
              'flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
              completed || (index === 0) ? 'border-[#102A43] bg-[#102A43] text-white' : active ? 'border-[#5BA9D6] bg-[#EEF7FB] text-[#102A43]' : 'border-border bg-muted text-muted-foreground',
            ].join(' ')}>
              {completed ? <Check className="size-4" /> : <Icon className="size-4" />}
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Step {step.number}</p>
              <p className="truncate text-[10px] font-semibold text-foreground sm:text-xs">{step.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
