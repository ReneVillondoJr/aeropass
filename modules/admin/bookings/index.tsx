'use client';

import { BookingDetail } from './components/detail';
import { BookingFilters } from './components/filters';
import { BookingHeader } from './components/header';
import { BookingList } from './components/list';
import { BookingStats } from './components/stats';

import { useBookings } from './hooks/use-booking';

export function Bookings() {
  const {
    search,
    status,
    paymentStatus,
    paymentMethod,

    setSearch,
    setStatus,
    setPaymentStatus,
    setPaymentMethod,

    resetFilters,
    selectBooking,

    bookings,
    selectedBooking,
    selectedBookingDetails,
    stats,
    resultCount,
  } = useBookings();

  return (
    <div className='flex flex-col gap-6'>
      <BookingHeader stats={stats} />

      <BookingStats stats={stats} />

      <BookingFilters
        search={search}
        status={status}
        paymentStatus={paymentStatus}
        paymentMethod={paymentMethod}
        resultCount={resultCount}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPaymentStatusChange={setPaymentStatus}
        onPaymentMethodChange={setPaymentMethod}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <BookingList
          bookings={bookings}
          selectedBookingId={selectedBooking?.booking.id ?? null}
          onSelect={selectBooking}
        />

        <BookingDetail booking={selectedBookingDetails} />
      </div>
    </div>
  );
}
