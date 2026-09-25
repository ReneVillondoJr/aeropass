import { HeroSection } from './components/hero-section';
import { HomeCta } from './components/home-cta';
import { PopularDestinations } from './components/popular-destinations';
import { TravelServices } from './components/travel-services';

export function PublicHome() {
  return (
    <div>
      <HeroSection />

      <PopularDestinations />

      <TravelServices />

      <HomeCta />
    </div>
  );
}
