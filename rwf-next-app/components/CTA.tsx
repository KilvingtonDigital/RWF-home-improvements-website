
import Link from 'next/link';
import styles from './CTA.module.css';

interface CTAProps {
    title?: string;
    text?: string;
    image?: string;
}

export default function CTA({
    title = "Ready to Transform Your Home?",
    text = "Elevate your home's curb appeal and functionality with RWF Home Improvements. From <strong>custom fencing solutions</strong> that provide privacy and security to <strong>stunning decks</strong> for outdoor entertaining, and <strong>energy-efficient windows and doors</strong> that save you money, we deliver craftsmanship you can trust. Let's start your project today!",
    image = "/images/rwf-home-improvements-team-richard-wilkes-fayetteville-nc.jpeg"
}: CTAProps) {
    return (
        <section className="container">
            <div className={styles.ctaSection}>
                <div className={styles.ctaImageCol}>
                    <img
                        src={image}
                        alt="Richard Wilkes, Owner of RWF Home Improvements"
                        className={styles.ctaOwnerImage}
                    />
                </div>
                <div className={styles.ctaContentCol}>
                    <h2>{title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: text }} />
                    <Link href="/contact-us" className={styles.ctaButton}>
                        Call now
                    </Link>
                </div>
            </div>
        </section>
    );
}
