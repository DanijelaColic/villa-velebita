import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Gallery } from '@/components/sections/Gallery';
import { FloorPlan } from '@/components/sections/FloorPlan';
import { Amenities } from '@/components/sections/Amenities';
import { Experiences } from '@/components/sections/Experiences';
import { Location } from '@/components/sections/Location';
import { Pricing } from '@/components/sections/Pricing';
import { HouseRules } from '@/components/sections/HouseRules';
import { Booking } from '@/components/sections/Booking';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <FloorPlan />
        <Amenities />
        <Experiences />
        <Location />
        <Pricing />
        <HouseRules />
        <Booking />
      </main>
    </>
  );
}
