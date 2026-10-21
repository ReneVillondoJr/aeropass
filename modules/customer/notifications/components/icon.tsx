import {
  Bell,
  CalendarCheck,
  CircleDollarSign,
  ClipboardCheck,
  Plane,
  ScanLine,
  Settings2,
} from 'lucide-react';

import type { CustomerNotificationType } from '../types/notification';

interface NotificationIconProps {
  type: CustomerNotificationType;
  className?: string;
}

const iconStyles: Record<
  CustomerNotificationType,
  {
    icon: typeof Bell;
    container: string;
  }
> = {
  BOOKING: {
    icon: CalendarCheck,
    container: 'bg-blue-50 text-blue-700',
  },
  PAYMENT: {
    icon: CircleDollarSign,
    container: 'bg-emerald-50 text-emerald-700',
  },
  FLIGHT: {
    icon: Plane,
    container: 'bg-sky-50 text-sky-700',
  },
  CHECK_IN: {
    icon: ScanLine,
    container: 'bg-violet-50 text-violet-700',
  },
  BOARDING: {
    icon: ClipboardCheck,
    container: 'bg-amber-50 text-amber-700',
  },
  SYSTEM: {
    icon: Settings2,
    container: 'bg-slate-100 text-slate-700',
  },
};

export function NotificationIcon({
  type,
  className = '',
}: NotificationIconProps) {
  const config = iconStyles[type] ?? iconStyles.SYSTEM;
  const Icon = config.icon;

  return (
    <div
      className={[
        'flex size-11 shrink-0 items-center justify-center rounded-2xl',
        config.container,
        className,
      ].join(' ')}
      aria-hidden='true'
    >
      <Icon className='size-5' />
    </div>
  );
}
