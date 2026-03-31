import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Gallery } from '@/components/sections/Gallery';
import { FloorPlan } from '@/components/sections/FloorPlan';
import { Amenities } from '@/components/sections/Amenities';
import { Experiences } from '@/components/sections/Experiences';
import { CaffeBarPlitvice } from '@/components/sections/CaffeBarPlitvice';
import { Location } from '@/components/sections/Location';
import { Pricing } from '@/components/sections/Pricing';
import { HouseRules } from '@/components/sections/HouseRules';
import { FAQ } from '@/components/sections/FAQ';
import { Booking } from '@/components/sections/Booking';
import { Contact } from '@/components/sections/Contact';

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
        <CaffeBarPlitvice />
        <Location />
        <Pricing />
        <HouseRules />
        <FAQ />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
