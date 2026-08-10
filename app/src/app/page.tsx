import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import {
  AboutTeaser,
  GalleryTeaser,
  AmenitiesTeaser,
  LocationTeaser,
  SeoDiscoverTeaser,
  FAQTeaser,
} from '@/components/sections/LandingTeasers';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { Booking } from '@/components/sections/Booking';
import { ContactSection } from '@/components/sections/ContactSection';

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
        <SeoDiscoverTeaser />
        <FAQTeaser />
        <ReviewsSection />
        <Booking />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
