
import styles from './FAQ.module.css';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQProps {
    title?: string;
    items: FAQItem[];
}

export default function FAQ({ title = "Frequently Asked Questions", items }: FAQProps) {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.goldBar}></div>
                </div>

                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <h3 className={styles.question}>{item.question}</h3>
                            <p className={styles.answer}>{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
