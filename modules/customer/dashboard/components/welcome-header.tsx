import Link from 'next/link';
import { ArrowRight, CalendarDays, PlaneTakeoff, Ticket } from 'lucide-react';

interface WelcomeHeaderProps {
  customerName: string;
  upcomingTripCount: number;
  unreadNotificationCount: number;
}

function getFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] || 'traveler';
}

export function WelcomeHeader({
  customerName,
  upcomingTripCount,
  unreadNotificationCount,
}: WelcomeHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[1.6rem] border border-[#274761] bg-[#102A43] text-white shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 -z-10 size-80 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(91,169,214,0.3),rgba(91,169,214,0)_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-[42%] -z-10 size-72 rounded-full border border-white/10"
      />

      <div className="grid gap-7 px-5 py-6 sm:px-7 sm:py-8 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-center xl:px-9">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-[#5BA9D6]" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
              AeroPass customer portal
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2.1rem]">
            Welcome back, {getFirstName(customerName)}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Your trips, tickets, and travel updates are all in one place. Review your booking details or plan your next journey.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/search"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#102A43] outline-none transition hover:bg-[#E5F5FC] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102A43]"
            >
              <PlaneTakeoff className="size-4" aria-hidden="true" />
              Book a flight
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/customer/bookings"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102A43]"
            >
              <Ticket className="size-4" aria-hidden="true" />
              View my bookings
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-1">
          <div className="rounded-2xl border border-white/12 bg-white/7 p-4">
            <div className="flex items-center gap-2 text-white/65">
              <CalendarDays className="size-4 text-[#8CC9EA]" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.13em]">Upcoming trips</span>
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{upcomingTripCount}</p>
            <p className="mt-1 text-xs text-white/55">
              {upcomingTripCount === 1 ? 'A journey is on your calendar' : 'Confirmed journeys ahead'}
            </p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/7 p-4">
            <div className="flex items-center gap-2 text-white/65">
              <span className="relative flex size-4 items-center justify-center">
                <span className="absolute size-4 rounded-full bg-[#5BA9D6]/20" />
                <span className="relative size-1.5 rounded-full bg-[#8CC9EA]" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.13em]">Unread updates</span>
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{unreadNotificationCount}</p>
            <p className="mt-1 text-xs text-white/55">
              {unreadNotificationCount === 1 ? 'Notification to review' : 'Booking and travel notices'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
