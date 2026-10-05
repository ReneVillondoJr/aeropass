import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

interface AirportFiltersProps {
  search: string;
  terminal: string;
  terminalOptions: string[];
  resultCount: number;

  onSearchChange: (value: string) => void;

  onTerminalChange: (value: string) => void;

  onReset: () => void;
}

export function AirportFilters({
  search,
  terminal,
  terminalOptions,
  resultCount,
  onSearchChange,
  onTerminalChange,
  onReset,
}: AirportFiltersProps) {
  const hasFilters = Boolean(search) || terminal !== 'ALL';

  const terminalOptionsWithAll = [
    {
      label: 'All terminals',
      value: 'ALL',
    },
    ...terminalOptions.map((item) => ({
      label: item,
      value: item,
    })),
  ];

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search airport, code, city, or country...'
      resultCount={resultCount}
      resultLabel='airport'
      resultLabelPlural='airports'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Select an airport to inspect its network.'
    >
      <AdminFilterSelect
        id='airport-terminal'
        label='Terminal'
        value={terminal}
        options={terminalOptionsWithAll}
        onChange={onTerminalChange}
        className='w-full sm:w-[190px]'
      />
    </AdminFilterBar>
  );
}
