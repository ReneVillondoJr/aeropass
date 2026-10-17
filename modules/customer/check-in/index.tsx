'use client';

import { Info } from 'lucide-react';

import { useCustomerId } from '@/modules/auth/hooks/use-customer-id';

import { CheckInFilters } from './components/check-in-filters';
import { CheckInHeader } from './components/check-in-header';
import { CheckInList } from './components/check-in-list';
import { useCustomerCheckIn } from './hooks/use-customer-check-in';

export function CustomerCheckInModule() {
  const customerId = useCustomerId();
  const { view, query, setQuery, filter, setFilter, filteredItems } = useCustomerCheckIn(customerId ?? '');
  const filterIsActive = query.trim().length > 0 || filter !== 'ALL';

  return (
    <section className="space-y-6">
      <CheckInHeader customerName={view.customerName} stats={view.stats} />

      <div className="flex items-start gap-3 rounded-xl border border-[#D9EAF3] bg-[#EEF7FB]/80 px-4 py-3.5 text-sm text-[#102A43]">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p className="leading-5">Online check-in is available for eligible, fully paid bookings. Choose your seat and review every passenger detail before confirming. Check-in availability is based on the flight departure time and status stored in AeroPass.</p>
      </div>

      <CheckInFilters
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
        total={view.items.length}
        shown={filteredItems.length}
      />

      <CheckInList
        items={filteredItems}
        accountAvailable={view.accountAvailable}
        filterIsActive={filterIsActive}
        onResetFilters={() => { setQuery(''); setFilter('ALL'); }}
      />
    </section>
  );
}
