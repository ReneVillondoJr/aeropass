'use client';

import { ReportHeader } from './components/header';

import { ReportKpiGrid } from './components/kpi-grid';

import { ReportRevenue } from './components/revenue';

import { BookingStatusReport } from './components/booking-status-report';

import { PaymentMethodReport } from './components/payment-method-report';

import { ReportOperations } from './components/operations';

import { ReportExceptions } from './components/exceptions';

import { FlightPerformanceReport } from './components/flight-performance-report';

import { useReports } from './hooks/use-reports';

export function Reports() {
  const { period, setPeriod, data } = useReports();

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-[1600px]'>
        <ReportHeader period={period} onPeriodChange={setPeriod} />

        <ReportKpiGrid items={data.kpis} />

        <div className='mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]'>
          <ReportRevenue points={data.revenueTrend} />

          <BookingStatusReport statuses={data.bookingStatuses} />
        </div>

        <div className='mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]'>
          <PaymentMethodReport methods={data.paymentMethods} />

          <ReportOperations operations={data.operations} />
        </div>

        <div className='mt-4'>
          <ReportExceptions exceptions={data.exceptions} />
        </div>

        <div className='mt-4'>
          <FlightPerformanceReport flights={data.flights} />
        </div>
      </div>
    </div>
  );
}
