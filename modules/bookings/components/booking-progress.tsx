interface BookingProgressProps {
  currentStep: 'seats' | 'passengers' | 'addons' | 'checkout' | 'payment';
}

const steps = [
  {
    key: 'seats',
    label: 'Seats',
  },
  {
    key: 'passengers',
    label: 'Passenger',
  },
  {
    key: 'addons',
    label: 'Add-ons',
  },
  {
    key: 'checkout',
    label: 'Review',
  },
  {
    key: 'payment',
    label: 'Payment',
  },
] as const;

export function BookingProgress({ currentStep }: BookingProgressProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className='border-b border-sky-100 bg-white'>
      <div className='mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10'>
        <div className='flex items-center'>
          {steps.map((step, index) => {
            const completed = index < currentIndex;

            const active = index === currentIndex;

            return (
              <div key={step.key} className='flex min-w-0 flex-1 items-center'>
                <div className='flex items-center gap-2'>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                      completed || active ?
                        'bg-[#102a43] text-white'
                      : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span
                    className={`hidden text-xs font-medium sm:block ${
                      active ? 'text-[#102a43]'
                      : completed ? 'text-slate-500'
                      : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 ?
                  <div
                    className={`mx-3 h-px flex-1 ${
                      index < currentIndex ? 'bg-[#5ba9d6]' : 'bg-slate-200'
                    }`}
                  />
                : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
