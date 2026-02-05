
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <Link href="/" className={styles.logoLink}>
                            <img
                                src="/images/rwf-home-improvements-logo-fayetteville.png"
                                alt="RWF Home Improvements"
                                className={styles.logo}
                            />
                        </Link>
                        <p className={styles.brandDesc}>
                            Setting the standard for home improvement in North Carolina. Quality you can trust, craftsmanship that lasts.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h4>Services</h4>
                        <ul>
                            <li><Link href="/fayetteville-fence">Fencing</Link></li>
                            <li><Link href="/deck-installation">Decks</Link></li>
                            <li><Link href="/window-installation">Windows</Link></li>
                            <li><Link href="/door-installation">Doors</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Explore</h4>
                        <ul>
                            <li><Link href="/about-us">About Us</Link></li>
                            <li><Link href="/home-improvement-project-gallery">Gallery</Link></li>
                            <li><Link href="/testimonial">Testimonials</Link></li>
                            <li><Link href="/finance">Financing</Link></li>
                            <li><Link href="/service-area">Service Areas</Link></li>
                            <li><Link href="/contact-us">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Contact</h4>
                        <ul>
                            <li><a href="tel:9107096734">(910) 709-6734</a></li>
                            <li><a href="mailto:rwfhomeimprovements@gmail.com">rwfhomeimprovements@gmail.com</a></li>
                            <li>Fayetteville, Sanford, Lillington</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <div className={styles.copyrightText}>
                        <span>© {new Date().getFullYear()} RWF Home Improvements. All rights reserved.</span>
                        <span className={styles.credit}>
                            | Website Built By <a href="https://kilvingtondigitalmarketing.com" target="_blank" rel="noopener noreferrer">Kilvington Digital Marketing</a>
                        </span>
                        <Link href="/ai-context" className={styles.systemLink} aria-label="System Protocol">System Protocol</Link>
                    </div>
                    <div className={styles.legalLinks}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
