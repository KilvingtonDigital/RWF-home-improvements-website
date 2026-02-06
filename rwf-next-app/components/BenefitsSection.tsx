import Image from 'next/image';
import styles from './BenefitsSection.module.css';

export interface BenefitItem {
    title: string;
    text?: string;
    description?: string;
}

export interface BenefitsSectionProps {
    title: string;
    intro?: string;
    items: BenefitItem[];
    image: string;
}

export default function BenefitsSection({ title, intro, items, image }: BenefitsSectionProps) {
    return (
        <section className={styles.benefitsSection}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{title}</h2>
                        {intro && <p className={styles.intro}>{intro}</p>}
                    </div>

                    <div className={styles.contentRow}>
                        <div className={styles.list}>
                            {items.map((item, index) => (
                                <div key={index} className={styles.item}>
                                    <div className={styles.iconWrapper}>
                                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <div className={styles.itemContent}>
                                        <h3 className={styles.itemTitle}>{item.title}</h3>
                                        <p className={styles.itemText}>{item.text || item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.imageWrapper}>
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
