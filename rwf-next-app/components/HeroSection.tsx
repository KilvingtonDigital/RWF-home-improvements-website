import Link from 'next/link';
import styles from './HeroSection.module.css';

interface HeroProps {
    backgroundImage: string;
    title: string;
    subtitle?: string;
    ctaLink?: string;
    ctaText?: string;
    overlayImage?: string;
    hideSecondaryLinks?: boolean;
}

export default function HeroSection({ backgroundImage, title, subtitle, ctaLink, ctaText, overlayImage, hideSecondaryLinks }: HeroProps) {
    // Static "Power Hero" strategy for best performance and stability.

    return (
        <section
            className={styles.hero}
            style={{ '--hero-bg': `url(${backgroundImage})` } as React.CSSProperties}
        >
            <div
                className={styles.overlay}
                style={overlayImage ? { background: `url(${overlayImage}) center/cover no-repeat` } : undefined}
            ></div>
            <div className="container">
                <div className={styles.content}>
                    <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }}></h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

                    <div className={styles.ctaGroup}>
                        {ctaLink && ctaText && (
                            ctaLink.startsWith('http') ? (
                                <a href={ctaLink} className="btn btn-primary">
                                    {ctaText}
                                </a>
                            ) : (
                                <Link href={ctaLink} className="btn btn-primary">
                                    {ctaText}
                                </Link>
                            )
                        )}
                        {/* Secondary Service Links */}
                        {!hideSecondaryLinks && (
                            <div className={styles.serviceQuickLinks}>
                                <span>Looking for something else?</span>
                                <div className={styles.quickLinks}>
                                    <Link href="/window-installation" className={styles.quickLink}>Windows</Link>
                                    <Link href="/deck-installation" className={styles.quickLink}>Decks</Link>
                                    <Link href="/door-installation" className={styles.quickLink}>Doors</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
