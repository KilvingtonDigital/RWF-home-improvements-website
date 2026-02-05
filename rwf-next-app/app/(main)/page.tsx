
import HeroSection from '@/components/HeroSection';
import ServiceGrid from '@/components/ServiceGrid';
import SetsApart from '@/components/SetsApart';
import ServiceAreas from '@/components/ServiceAreas';
import Testimonials from '@/components/Testimonials';
import Link from 'next/link';
import testimonialData from '@/data/testimonial.json';
import { getPageData } from '@/lib/cms';
import styles from './page.module.css';
import type { Metadata } from 'next';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: "Fencing, Decks & Home Improvements | Fayetteville & Sanford, NC | RWF",
  description: "RWF Home Improvements provides expert fencing, deck building, window, and door installation services in Fayetteville, Sanford, and Lillington, NC. 35+ Years Experience.",
  alternates: {
    canonical: 'https://www.rwfhomeimprovements.com',
  },
  openGraph: {
    title: "Fencing, Decks & Home Improvements | Fayetteville, NC",
    description: "Expert fencing, decks, windows, and doors. Serving Fayetteville, Sanford, and Lillington.",
    url: 'https://www.rwfhomeimprovements.com',
    siteName: 'RWF Home Improvements',
    images: [
      {
        url: '/images/expert-fence-installation-fayetteville-nc.png',
        width: 1200,
        height: 630,
        alt: 'RWF Home Improvements Project',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function Home() {
  const pageData = await getPageData('home');
  // Fallbacks if data is missing - SEO Optimized H1
  const title = pageData.headings?.[0]?.text || "Premier Fencing, Decks, Windows & Doors in Fayetteville & Sanford, NC";
  const subtitle = "Trusted for Over 35 Years, RWF Home Improvements Brings Quality Craftsmanship to Every Project.";

  const services = [
    {
      title: "Fencing Installation",
      image: "/images/residential-dog-eared-wood-fence-installation.jpg",
      link: "/fayetteville-fence",
      description: "Choose from wood, vinyl, chain-link, aluminum, and more."
    },
    {
      title: "Deck Installation",
      image: "/images/outdoor-living-wood-fence-and-deck-fayetteville.jpg",
      link: "/deck-installation",
      description: "Custom decks built to withstand the Carolina weather."
    },
    {
      title: "Window Installation",
      image: "/images/custom-window-installation-service-fayetteville.jpg",
      link: "/window-installation",
      description: "High-quality, energy-efficient windows tailored to your home.",
      imageStyle: { transform: 'scale(1.35) translateY(8%)' }
    },
    {
      title: "Door Installation",
      image: "/images/secure-entry-door-installation.jpg",
      link: "/door-installation",
      description: "Beautiful, secure, and durable doors for any entrance."
    }
  ];

  return (
    <main>
      <HeroSection
        backgroundImage="/images/expert-fence-installation-fayetteville-nc.png"
        title={title}
        subtitle={subtitle}
        ctaLink="/contact-us"
        ctaText="Get Instant Quote"
      />

      <section className="container">
        <div className={styles.sectionServices}>
          <h2>Our Top Services</h2>
          <p>
            Transforming Homes with Quality Fencing and Comprehensive Home Improvements.
          </p>
          <ServiceGrid services={services} />
        </div>
      </section>

      <section className="container" style={{ paddingBottom: '5rem' }}>
        <div className={styles.sectionServices}>
          <h2>Specialized Fencing Options</h2>
          <p>
            Find the perfect material and style to secure and beautify your property.
          </p>
          <ServiceGrid services={[
            {
              title: "Vinyl Fencing",
              image: "/images/vinyl-privacy-fence-installation-fayetteville.jpg",
              link: "/vinyl-fencing-for-sanford-and-fayetteville",
              description: "Low-maintenance, durable, and stylish privacy solutions."
            },
            {
              title: "Wood Fencing",
              image: "/images/wood-picket-fence-installation.jpg",
              link: "/fayetteville-wood-fencing",
              description: "Classic beauty offering natural warmth and privacy."
            },
            {
              title: "Aluminum Fencing",
              image: "/images/aluminum-fence-installation-fayetteville.jpg",
              link: "/aluminum-fencing-for-sanford-and-fayetteville",
              description: "Elegant, rust-free durability with open views."
            },
            {
              title: "Chain Link Fencing",
              image: "/images/chain-link-security-fence-fayetteville.jpg",
              link: "/chain-link-fencing-for-sanford-and-fayetteville",
              description: "Affordable, secure, and practical for any property."
            }
          ]} />
        </div>
      </section>

      <SetsApart />

      <section className={styles.splitSection}>
        <div className="container">
          <div className={styles.splitContent}>
            <img src="/images/dog-eared-wooden-fence-installation-fayetteville.jpg" alt="Get a Free Quote" />
            <div className={styles.splitTextCol}>
              <h2>Why Choose RWF?</h2>
              <p>
                With over 35 years of experience, RWF Home Improvements brings expertise, dedication, and personalized service to every project. We understand the unique needs of Fayetteville, Sanford, and Lillington homeowners.
              </p>
              <Link href="/about-us" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials reviews={testimonialData.reviews.slice(0, 3)} />

      <ServiceAreas />

      <section className="container py-5">
        <CTA />
      </section>

    </main>
  );
}
