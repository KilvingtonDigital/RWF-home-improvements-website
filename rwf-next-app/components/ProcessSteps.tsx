import Image from 'next/image';
import styles from './ProcessSteps.module.css';

export interface ProcessStep {
    title: string;
    description: string;
    image: string;
}

interface ProcessStepsProps {
    title?: string;
    steps: ProcessStep[];
}

export default function ProcessSteps({ title = "Our Process", steps }: ProcessStepsProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <section className={styles.section}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.stepsGrid}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.stepCard}>
                        <div className={styles.numberBadge}>{index + 1}</div>
                        <div className={styles.imageContainer}>
                            <Image
                                src={step.image}
                                alt={step.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                        </div>
                        <h3 className={styles.stepTitle}>{step.title}</h3>
                        <p className={styles.stepText}>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
