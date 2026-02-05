import Link from 'next/link';
import styles from './ServiceAreas.module.css';

interface ServiceAreaProps {
    introTitle?: string;
    introText?: string;
    primaryAreas?: { name: string; link: string }[];
    surroundingAreas?: string[];
}

export default function ServiceAreas({
    introTitle = "Proudly Serving Fayetteville, Sanford, Lillington & Surrounding Areas",
    introText = "From Anderson Creek to Pinehurst and everywhere in between, RWF Home Improvements brings quality craftsmanship and reliable service to homeowners across the region. Our experienced team is here to make your home improvement projects a reality, no matter where you are in our service area.",
    primaryAreas = [],
    surroundingAreas = []
}: ServiceAreaProps) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.eyebrow}>Service Areas</span>
                    <h2 className={styles.heading}>{introTitle}</h2>
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.textContent}>
                        <p className={styles.description}>
                            {introText}
                        </p>

                        <div className={styles.listsContainer}>
                            {/* Primary Areas */}
                            {primaryAreas.length > 0 && (
                                <div>
                                    <h3 className={styles.columnHeading}>Primary Areas</h3>
                                    <ul className={styles.list}>
                                        {primaryAreas.map((area, index) => (
                                            <li key={index} className={styles.listItem}>
                                                <Link href={area.link} className={styles.link}>
                                                    <svg className={styles.marker} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                    </svg> {area.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Surrounding Areas */}
                            {surroundingAreas.length > 0 && (
                                <div>
                                    <h3 className={styles.columnHeading}>Surrounding Areas</h3>
                                    <ul className={styles.list}>
                                        {surroundingAreas.map((areaGroup, index) => (
                                            <li key={index} className={styles.listItem}>{areaGroup}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.mapWrapper}>
                        <iframe
                            className={styles.mapFrame}
                            src="https://maps.google.com/maps?q=RWF+Home+Improvements+Fayetteville+NC&t=&z=9&ie=UTF8&iwloc=&output=embed"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            title="RWF Service Area Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
