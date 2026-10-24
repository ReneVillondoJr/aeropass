import Link from 'next/link';

import { getTicketsByBookingId } from '@/data/aeropass';
import { CustomerTicketDetailsModule } from '@/modules/customer/ticket-details';

interface BoardingPassPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function BoardingPassPage({
  params,
}: BoardingPassPageProps) {
  const { bookingId } = await params;
  const tickets = getTicketsByBookingId(bookingId);

  if (tickets.length === 0) {
    return (
      <section className='mx-auto max-w-3xl px-5 py-16 text-center'>
        <h1 className='text-2xl font-semibold text-[#102a43]'>
          Boarding pass unavailable
        </h1>
        <p className='mt-3 text-sm leading-6 text-slate-500'>
          We couldn’t find tickets for this booking. Retrieve your reservation
          to check its status.
        </p>
        <Link
          href='/manage-booking'
          className='mt-6 inline-flex rounded-lg bg-[#102a43] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#183b5b]'
        >
          Manage booking
        </Link>
      </section>
    );
  }

  return (
    <section className='mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10'>
      {tickets.map((ticket) => (
        <CustomerTicketDetailsModule key={ticket.id} ticketId={ticket.id} />
      ))}
    </section>
  );
}