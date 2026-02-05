import Image from 'next/image';
import styles from './SetsApart.module.css';

export interface FeatureItem {
    title: string;
    text: string;
    image: string;
}

export interface SetsApartProps {
    title?: string;
    items?: FeatureItem[];
}

const defaultItems: FeatureItem[] = [
    {
        title: "Family Owned",
        text: "Local experts who understand the needs of our communities.",
        image: "/images/Happy_20RWF_20Customers.jpg"
    },
    {
        title: "Lifetime Wood Gate Warranty",
        text: "Enjoy peace of mind with our durable wood gates.",
        image: "/images/home/custom-wooden-gate-fencing.jpg"
    },
    {
        title: "Instant Online Quote",
        text: "Get a no-obligation quote fast with our online estimate tool.",
        image: "/images/low-interest-fence-loans-nc.jpg"
    },
    {
        title: "100% Satisfaction Guarantee",
        text: "We're committed to excellence in every project.",
        image: "/images/Bill.jpg"
    },
    {
        title: "Financing Available",
        text: "Make your dream home a reality with flexible financing options.",
        image: "/images/flexible-financing-options-fayetteville.jpg"
    }
];

export default function SetsApart({ title = "What Sets us apart?", items = defaultItems }: SetsApartProps) {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <svg className={styles.starIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }}></h2>
            </div>

            <div className={styles.grid}>
                {items.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className={styles.cardImage}
                            style={{ objectFit: 'cover' }}
                        />
                        <div className={styles.overlay}></div>
                        <div className={styles.content}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardText}>{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
