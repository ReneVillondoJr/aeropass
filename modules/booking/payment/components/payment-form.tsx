'use client';

import type { FormEvent } from 'react';

import { CreditCard, Smartphone, WalletCards } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { PaymentSchema } from '../schema';

interface PaymentFormProps {
  selected: PaymentSchema['paymentMethod'] | null;
  onSubmit: (values: PaymentSchema) => void;
}

const methods = [
  {
    value: 'GCASH',
    label: 'GCash',
    description: 'Pay using your GCash wallet.',
    icon: Smartphone,
  },
  {
    value: 'MAYA',
    label: 'Maya',
    description: 'Pay using your Maya wallet.',
    icon: WalletCards,
  },
  {
    value: 'QRPH',
    label: 'QRPh',
    description: 'Use a supported QR Ph payment app.',
    icon: Smartphone,
  },
  {
    value: 'CARD',
    label: 'Credit / debit card',
    description: 'Use Visa, Mastercard, or supported cards.',
    icon: CreditCard,
  },
  {
    value: 'BANK_TRANSFER',
    label: 'Bank transfer',
    description: 'Complete the payment through bank transfer.',
    icon: WalletCards,
  },
] as const;

export function PaymentForm({ selected, onSubmit }: PaymentFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      paymentMethod: String(
        formData.get('paymentMethod'),
      ) as PaymentSchema['paymentMethod'],
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-2xl border border-sky-100 bg-white p-6 sm:p-8'
    >
      <div>
        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
          Payment
        </p>

        <h2 className='mt-2 text-lg font-semibold text-[#102a43]'>
          Choose a payment method
        </h2>
      </div>

      <div className='mt-6 space-y-3'>
        {methods.map(({ value, label, description, icon: Icon }) => (
          <label
            key={value}
            className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
              selected === value ?
                'border-[#5ba9d6] bg-[#f4fbfe]'
              : 'border-sky-100 hover:border-sky-200'
            }`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value={value}
              defaultChecked={selected === value}
              className='accent-[#102a43]'
            />

            <div className='flex size-9 items-center justify-center rounded-lg bg-[#f4f9fc] text-[#3f88b2]'>
              <Icon className='size-4' />
            </div>

            <div>
              <p className='text-sm font-medium text-[#102a43]'>{label}</p>

              <p className='mt-1 text-xs text-slate-400'>{description}</p>
            </div>
          </label>
        ))}
      </div>

      <Button
        type='submit'
        className='mt-6 h-11 w-full bg-[#102a43] text-white hover:bg-[#183b5b]'
      >
        Continue
      </Button>
    </form>
  );
}
