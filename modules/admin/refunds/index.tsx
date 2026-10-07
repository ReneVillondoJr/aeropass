'use client';

import { RefundDetail } from './components/detail';
import { RefundFilters } from './components/filters';
import { RefundHeader } from './components/header';
import { RefundList } from './components/list';
import { RefundStats } from './components/stats';

import { useRefunds } from './hooks/use-refund';

export function Refunds() {
  const {
    filteredRefunds,
    selectedRefund,
    selectedRefundId,

    stats,
    filters,
    hasFilters,

    updateSearch,
    updateStatus,
    updatePaymentMethod,

    resetFilters,
    selectRefund,
  } = useRefunds();

  return (
    <div className='flex flex-col gap-6'>
      <RefundHeader stats={stats} />

      <RefundStats stats={stats} />

      <RefundFilters
        search={filters.search}
        status={filters.status}
        paymentMethod={filters.paymentMethod}
        resultCount={filteredRefunds.length}
        hasFilters={hasFilters}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onPaymentMethodChange={updatePaymentMethod}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <RefundList
          refunds={filteredRefunds}
          selectedRefundId={selectedRefundId}
          onSelect={selectRefund}
        />

        <RefundDetail refund={selectedRefund} />
      </div>
    </div>
  );
}
