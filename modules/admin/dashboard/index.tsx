'use client';

import { DashboardHeader } from './components/dashboard-header';

import { DashboardKpiGrid } from './components/kpi-grid';

import { FlightOperations } from './components/flight-operations';

import { FleetOverview } from './components/fleet-overview';

import { RecentActivity } from './components/recent-activity';

import { RevenueOverview } from './components/revenue-overview';

import { UpcomingFlights } from './components/upcoming-flights';

import { useDashboard } from './hooks/use-dashboard';

export function Dashboard() {
  const { data, formattedOperationsDate } = useDashboard();

  return (
    <div>
      <div className='mx-auto max-w-[1600px]'>
        <DashboardHeader operationsDate={formattedOperationsDate} />

        <DashboardKpiGrid stats={data.stats} />

        <div className='mt-4'>
          <FlightOperations flights={data.flights} />
        </div>

        <div className='mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]'>
          <UpcomingFlights flights={data.flights} />

          <RevenueOverview revenue={data.revenue} />
        </div>

        <div className='mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.55fr)]'>
          <RecentActivity activities={data.activities} />

          <FleetOverview stats={data.stats} />
        </div>
      </div>
    </div>
  );
}
