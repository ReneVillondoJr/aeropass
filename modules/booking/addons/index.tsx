'use client';

import Link from 'next/link';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { BookingProgress } from '@/modules/bookings/components/booking-progress';
import { BookingStepShell } from '@/modules/bookings/components/booking-step-shell';

import { AddonOptions } from './components/addon-options';
import { useAddons } from './hooks/use-addons';

interface AddonsProps {
  flightId: string;
  fareId: string;
}

export function Addons({ flightId, fareId }: AddonsProps) {
  const { addons, baggagePrice, protectionPrice, loungePrice, saveAddons } =
    useAddons();

  function continueToCheckout() {
    const result = saveAddons(addons);

    if (!result.success) {
      return;
    }

    window.location.href = `/book/${flightId}/checkout?fare=${encodeURIComponent(fareId)}`;
  }

  return (
    <div>
      <BookingProgress currentStep='addons' />

      <BookingStepShell
        title='Enhance your journey'
        description='Add optional travel services before reviewing your booking.'
      >
        <AddonOptions
          baggageKg={addons.checkedBaggageKg}
          travelProtection={addons.travelProtection}
          loungeAccess={addons.loungeAccess}
          onBaggageChange={(value) =>
            saveAddons({
              ...addons,
              checkedBaggageKg: value,
            })
          }
          onProtectionChange={(value) =>
            saveAddons({
              ...addons,
              travelProtection: value,
            })
          }
          onLoungeChange={(value) =>
            saveAddons({
              ...addons,
              loungeAccess: value,
            })
          }
        />

        <div className='mt-6 flex items-center justify-between rounded-2xl border border-sky-100 bg-white p-5'>
          <div>
            <p className='text-xs text-slate-400'>Optional services</p>

            <p className='mt-1 text-lg font-semibold text-[#102a43]'>
              ₱
              {(baggagePrice + protectionPrice + loungePrice).toLocaleString(
                'en-PH',
              )}
            </p>
          </div>

          <Button
            type='button'
            onClick={continueToCheckout}
            className='h-11 gap-2 rounded-xl bg-[#102a43] text-white hover:bg-[#183b5b]'
          >
            Review booking
            <ArrowRight className='size-4' />
          </Button>
        </div>

        <Link
          href={`/book/${flightId}/passengers?fare=${encodeURIComponent(fareId)}`}
          className='mt-4 inline-flex'
        >
          <Button variant='ghost' className='gap-2 text-slate-400'>
            <ArrowLeft className='size-4' />
            Back to passenger
          </Button>
        </Link>
      </BookingStepShell>
    </div>
  );
}
