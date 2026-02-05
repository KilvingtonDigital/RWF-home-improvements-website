
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './services.module.css';

export const metadata = {
    title: 'Our Services | RWF Home Improvements',
    description: 'Explore our comprehensive home improvement services in Fayetteville, NC.',
};

export default function ServicesPage() {
    return (
        <div className={styles.container}>

            {/* Header */}
            <div className={styles.header}>
                <span className={styles.label}>Our Expertise</span>
                <h1 className={styles.title}>World-Class Home Improvements</h1>
                <p className={styles.description}>
                    From concept to completion, RWF Home Improvements delivers superior quality and craftsmanship.
                </p>
            </div>

            {/* Service Blocks */}
            <div>

                <ServiceBlock
                    title="Custom Fencing"
                    desc="We specialize in all types of residential and commercial fencing. Whether you need the classic look of a wood picket fence, the durability of vinyl, or the security of chain link, we have the perfect solution for your property."
                    features={['Privacy & Semi-Privacy', 'Vinyl / PVC', 'Pressure Treated Wood', 'Aluminum Ornamental', 'Chain Link']}
                    image="/images/pages/fayetteville-fence/wooden-fence.jpg"
                    link="/fencing"
                    reverse={false}
                />

                <ServiceBlock
                    title="Deck Installation"
                    desc="Transform your backyard into a functional outdoor living space. Our custom decks are designed to fit your home's architecture and your lifestyle, using premium materials that stand up to the North Carolina weather."
                    features={['Composite Decking (Trex)', 'Custom Timber Design', 'Multi-Level Decks', 'Pool Decks', 'Railings & Lighting']}
                    image="/images/pages/home-improvement-project-gallery/home-improvement-project-gallery.jpg"
                    link="/deck-installation"
                    reverse={true}
                />

                <ServiceBlock
                    title="Windows & Doors"
                    desc="Boost your home's energy efficiency and curb appeal. We install high-performance windows and secure, stylish entry doors that reduce drafts and lower energy bills."
                    features={['Energy Star Rated', 'Double & Triple Pane', 'Vinyl Replacement Windows', 'Entry & Patio Doors', 'Storm Doors']}
                    image="/images/pages/window-installation/bright-room.jpg"
                    link="/window-installation"
                    reverse={false}
                />

            </div>

            {/* CTA */}
            <div className={styles.ctaBox}>
                <h2 className={styles.ctaTitle}>Ready to improve your home?</h2>
                <Link href="/contact-us" className="btn btn-primary">
                    Get Your Free Quote
                </Link>
            </div>

        </div>
    );
}

function ServiceBlock({ title, desc, features, image, link, reverse }: { title: string, desc: string, features: string[], image: string, link: string, reverse: boolean }) {
    return (
        <div className={`${styles.serviceBlock} ${reverse ? styles.serviceBlockReverse : ''}`}>
            <div className={styles.imageCol}>
                <div className={styles.imageWrapper}>
                    <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
            </div>
            <div className={styles.textCol}>
                <h2 className={styles.serviceTitle}>{title}</h2>
                <p className={styles.serviceDesc}>{desc}</p>
                <ul className={styles.featuresList}>
                    {features.map((item) => (
                        <li key={item} className={styles.featureItem}>
                            <CheckCircle2 size={20} className={styles.featureIcon} />
                            {item}
                        </li>
                    ))}
                </ul>
                <div className={styles.learnMoreWrapper}>
                    <Link href={link} className={styles.learnMore}>
                        Learn More <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
