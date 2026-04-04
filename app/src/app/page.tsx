import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import {
  AboutTeaser,
  GalleryTeaser,
  AmenitiesTeaser,
  LocationTeaser,
  FAQTeaser,
} from '@/components/sections/LandingTeasers';
import { Booking } from '@/components/sections/Booking';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutTeaser />
        <GalleryTeaser />
        <AmenitiesTeaser />
        <LocationTeaser />
        <FAQTeaser />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
