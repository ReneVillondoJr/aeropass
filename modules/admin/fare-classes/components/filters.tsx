import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  FareCabinFilter,
  FareChangeFilter,
  FareRefundFilter,
} from '../types/fare-class';

interface FareClassFiltersProps {
  search: string;
  cabin: FareCabinFilter;
  refundable: FareRefundFilter;
  changeable: FareChangeFilter;
  resultCount: number;

  onSearchChange: (value: string) => void;

  onCabinChange: (value: FareCabinFilter) => void;

  onRefundableChange: (value: FareRefundFilter) => void;

  onChangeableChange: (value: FareChangeFilter) => void;

  onReset: () => void;
}

const cabinOptions = [
  {
    label: 'All cabins',
    value: 'ALL',
  },
  {
    label: 'Economy',
    value: 'ECONOMY',
  },
  {
    label: 'Premium Economy',
    value: 'PREMIUM_ECONOMY',
  },
  {
    label: 'Business',
    value: 'BUSINESS',
  },
];

const refundableOptions = [
  {
    label: 'All refund policies',
    value: 'ALL',
  },
  {
    label: 'Refundable',
    value: 'REFUNDABLE',
  },
  {
    label: 'Non-refundable',
    value: 'NON_REFUNDABLE',
  },
];

const changeableOptions = [
  {
    label: 'All change policies',
    value: 'ALL',
  },
  {
    label: 'Changeable',
    value: 'CHANGEABLE',
  },
  {
    label: 'Non-changeable',
    value: 'NON_CHANGEABLE',
  },
];

export function FareClassFilters({
  search,
  cabin,
  refundable,
  changeable,
  resultCount,
  onSearchChange,
  onCabinChange,
  onRefundableChange,
  onChangeableChange,
  onReset,
}: FareClassFiltersProps) {
  const hasFilters =
    search.length > 0 ||
    cabin !== 'ALL' ||
    refundable !== 'ALL' ||
    changeable !== 'ALL';

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search class, cabin, benefits...'
      resultCount={resultCount}
      resultLabel='fare class'
      resultLabelPlural='fare classes'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Select a fare class to inspect its rules and pricing.'
    >
      <AdminFilterSelect
        id='fare-class-cabin'
        label='Cabin'
        value={cabin}
        options={cabinOptions}
        onChange={(value) => onCabinChange(value as FareCabinFilter)}
        className='w-full sm:w-[170px]'
      />

      <AdminFilterSelect
        id='fare-class-refundable'
        label='Refund'
        value={refundable}
        options={refundableOptions}
        onChange={(value) => onRefundableChange(value as FareRefundFilter)}
        className='w-full sm:w-[185px]'
      />

      <AdminFilterSelect
        id='fare-class-changeable'
        label='Changes'
        value={changeable}
        options={changeableOptions}
        onChange={(value) => onChangeableChange(value as FareChangeFilter)}
        className='w-full sm:w-[185px]'
      />
    </AdminFilterBar>
  );
}
