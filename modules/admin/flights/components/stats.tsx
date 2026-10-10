import { Activity, Plane, Radio, Users } from 'lucide-react';

interface FlightStatsProps {
  total: number;
  active: number;
  boarding: number;
  passengers: number;
}

export function FlightStats({
  total,
  active,
  boarding,
  passengers,
}: FlightStatsProps) {
  const stats = [
    {
      label: 'Total flights',
      value: total,
      icon: Plane,
      description: 'Operational schedule',
    },
    {
      label: 'Active',
      value: active,
      icon: Activity,
      description: 'Scheduled or in progress',
    },
    {
      label: 'Boarding',
      value: boarding,
      icon: Radio,
      description: 'Currently boarding',
    },
    {
      label: 'Passengers',
      value: passengers,
      icon: Users,
      description: 'Checked in',
    },
  ];

  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className='rounded-2xl border border-border bg-card p-5'
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-xs font-medium text-muted-foreground'>
                  {stat.label}
                </p>

                <p className='mt-2 text-2xl font-semibold tracking-tight'>
                  {stat.value}
                </p>
              </div>

              <div className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
                <Icon className='size-4' />
              </div>
            </div>

            <p className='mt-3 text-xs text-muted-foreground'>
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
