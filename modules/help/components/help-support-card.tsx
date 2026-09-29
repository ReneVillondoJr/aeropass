'use client';

import { CheckCircle2, Headphones, Mail, Send } from 'lucide-react';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { supportCategories } from '../data/help';

import { supportRequestSchema } from '../schema';

export function HelpSupportCard() {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [bookingReference, setBookingReference] = useState('');

  const [category, setCategory] = useState('');

  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const parsed = supportRequestSchema.safeParse({
      name,
      email,
      bookingReference,
      category,
      message,
    });

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ?? 'Please check your support request.',
      );

      return;
    }

    // Temporary local-only behavior.
    // Connect this to your support API later.
    console.log('AeroPass support request:', parsed.data);

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id='support' className='px-6 pb-20 sm:px-8 lg:px-10 lg:pb-24'>
        <div className='mx-auto max-w-5xl rounded-[2rem] border border-[#dce8ef] bg-white px-6 py-14 text-center shadow-[0_18px_55px_rgba(16,42,67,0.06)] sm:px-8 lg:px-10'>
          <div className='mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600'>
            <CheckCircle2 className='size-7' />
          </div>

          <h2 className='mt-5 text-2xl font-semibold tracking-tight text-[#102a43]'>
            Your support request was received.
          </h2>

          <p className='mx-auto mt-3 max-w-xl text-sm leading-7 text-[#718396]'>
            Your message has been recorded in this local demo. Connect the form
            to your support API when the AeroPass backend is ready.
          </p>

          <Button
            type='button'
            onClick={() => setSubmitted(false)}
            className='mt-7 h-11 rounded-xl bg-[#102a43] px-5 text-white hover:bg-[#183b5b]'
          >
            Send another request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id='support' className='px-6 pb-20 sm:px-8 lg:px-10 lg:pb-24'>
      <div className='mx-auto max-w-6xl'>
        <div className='overflow-hidden rounded-[2rem] border border-[#dce8ef] bg-white shadow-[0_18px_55px_rgba(16,42,67,0.06)]'>
          <div className='grid lg:grid-cols-[0.78fr_1.22fr]'>
            <div className='bg-[#102a43] px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12'>
              <div className='flex size-12 items-center justify-center rounded-2xl bg-white/10'>
                <Headphones className='size-5' />
              </div>

              <p className='mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-[#9fd3ef]'>
                Contact support
              </p>

              <h2 className='mt-2 text-3xl font-semibold tracking-tight'>
                Still need help?
              </h2>

              <p className='mt-4 text-sm leading-7 text-white/70'>
                Our support team can help when your question needs personal
                assistance.
              </p>

              <div className='mt-8 space-y-3'>
                <div className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4'>
                  <Mail className='size-4 text-[#9fd3ef]' />

                  <span className='text-sm text-white/80'>Support request</span>
                </div>

                <div className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4'>
                  <Headphones className='size-4 text-[#9fd3ef]' />

                  <span className='text-sm text-white/80'>
                    Booking assistance
                  </span>
                </div>
              </div>
            </div>

            <div className='px-6 py-8 sm:px-8 lg:px-10 lg:py-12'>
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div className='grid gap-5 sm:grid-cols-2'>
                  <div>
                    <label
                      htmlFor='help-name'
                      className='mb-2 block text-sm font-medium text-[#102a43]'
                    >
                      Name
                    </label>

                    <Input
                      id='help-name'
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder='Your name'
                      className='h-11 rounded-xl border-[#dce8ef]'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='help-email'
                      className='mb-2 block text-sm font-medium text-[#102a43]'
                    >
                      Email
                    </label>

                    <Input
                      id='help-email'
                      type='email'
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder='you@example.com'
                      className='h-11 rounded-xl border-[#dce8ef]'
                    />
                  </div>
                </div>

                <div className='grid gap-5 sm:grid-cols-2'>
                  <div>
                    <label
                      htmlFor='help-booking-reference'
                      className='mb-2 block text-sm font-medium text-[#102a43]'
                    >
                      Booking reference
                      <span className='ml-1 font-normal text-[#94a3b8]'>
                        Optional
                      </span>
                    </label>

                    <Input
                      id='help-booking-reference'
                      value={bookingReference}
                      onChange={(event) =>
                        setBookingReference(event.target.value.toUpperCase())
                      }
                      placeholder='APX8K2'
                      className='h-11 rounded-xl border-[#dce8ef] uppercase'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='help-category'
                      className='mb-2 block text-sm font-medium text-[#102a43]'
                    >
                      Category
                    </label>

                    <select
                      id='help-category'
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className='h-11 w-full rounded-xl border border-[#dce8ef] bg-white px-3 text-sm text-[#102a43] outline-none focus:border-[#74afd0] focus:ring-2 focus:ring-[#5ba9d6]/15'
                    >
                      <option value=''>Select a category</option>

                      {supportCategories.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='help-message'
                    className='mb-2 block text-sm font-medium text-[#102a43]'
                  >
                    Message
                  </label>

                  <textarea
                    id='help-message'
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={6}
                    placeholder='Tell us what you need help with...'
                    className='w-full resize-none rounded-xl border border-[#dce8ef] bg-white px-3 py-3 text-sm leading-6 text-[#102a43] outline-none placeholder:text-[#9aa9b7] focus:border-[#74afd0] focus:ring-2 focus:ring-[#5ba9d6]/15'
                  />
                </div>

                {error ?
                  <p className='text-sm text-red-600'>{error}</p>
                : null}

                <Button
                  type='submit'
                  className='h-11 rounded-xl bg-[#102a43] px-5 text-white hover:bg-[#183b5b]'
                >
                  <Send className='mr-2 size-4' />
                  Send support request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
