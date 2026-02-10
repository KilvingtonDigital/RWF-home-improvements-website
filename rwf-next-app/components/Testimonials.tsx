import styles from './Testimonials.module.css';


interface Review {
    author: string;
    text: string;
    title?: string;
    rating?: number;
    location?: string;
}

interface TestimonialsProps {
    title?: string;
    reviews: Review[];
}

export default function Testimonials({ title = "Our Customers Say It Best", reviews = [] }: TestimonialsProps) {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>{title}</h2>
                <div className={styles.grid}>
                    {reviews.map((review, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.stars}>{"★".repeat(review.rating || 5)}</div>
                            <h3 className={styles.name}>{review.author}</h3>
                            {review.title && <h4 className={styles.title}>{review.title}</h4>}
                            <p className={styles.text}>"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

