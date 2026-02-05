
import HeroSection from '@/components/HeroSection';
import { getPageData } from '@/lib/cms';
import { getGalleryImages } from '@/lib/gallery';
import Image from 'next/image';
import styles from './gallery.module.css';

export default function GalleryPage() {
    const data = getPageData('home-improvement-project-gallery');
    const images = getGalleryImages();

    // Filter out non-project looking images if possible or just limit count
    // For now we show all, but we might want to paginate or limit.
    // Let's take first 50 to avoid massive page.
    const displayImages = images.slice(0, 50);

    return (
        <main>
            <HeroSection
                backgroundImage="/images/Composite_20Deck_20Build.jpg"
                title="Our Project Gallery"
                subtitle="See our craftsmanship in action"
                ctaLink="/contact-us"
                ctaText="Get a Quote"
            />

            <div className={`container ${styles.container}`}>
                <div className={styles.galleryGrid}>
                    {displayImages.map((src, index) => (
                        <div key={index} className={styles.galleryItem}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={src}
                                    alt={`Project ${index}`}
                                    width={400}
                                    height={300}
                                    className={styles.image}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
