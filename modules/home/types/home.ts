import type { LucideIcon } from 'lucide-react';

export type PopularDestinationConfig = {
  airportCode: string;
  description: string;
};

export type PopularDestination = {
  city: string;
  airport: string;
  code: string;
  description: string;
  href: string;
};

export type TravelService = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};
