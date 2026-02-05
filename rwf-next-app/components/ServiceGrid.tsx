
import Link from 'next/link';
import Image from 'next/image';
import styles from './ServiceGrid.module.css';

interface Service {
    title: string;
    image: string;
    link: string;
    description: string;
    imageStyle?: React.CSSProperties;
}

export default function ServiceGrid({ services }: { services: Service[] }) {
    return (
        <div className={styles.grid}>
            {services.map((service, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={service.image}
                            alt={service.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover"
                            style={service.imageStyle}
                        />
                    </div>
                    <div className={styles.content}>
                        <h3 className={styles.title}>{service.title}</h3>
                        <p className={styles.desc}>{service.description}</p>
                        <div className={styles.buttonWrapper}>
                            <Link href={service.link} className={`btn btn-outline ${styles.btnFullWidth} ${styles.authColorOverride}`}>
                                Learn More
                            </Link>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdLt2w5zOci_Px3bk4Da5hT23PIiQQixsTjoDjon3fdcMsPQw/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn btn-primary ${styles.btnFullWidth}`}
                            >
                                Apply for Financing
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
