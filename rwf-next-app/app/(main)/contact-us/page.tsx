
import HeroSection from '@/components/HeroSection';
import { getPageData } from '@/lib/cms';
import { submitContactForm } from '../../actions';
import styles from './contact.module.css';

export default function ContactPage() {
    const data = getPageData('contact-us');
    const title = data.headings?.find((h: any) => h.tag === 'h1')?.text || "Contact Us";

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "mainEntity": {
                            "@type": "LocalBusiness",
                            "name": "RWF Home Improvements",
                            "telephone": "+1-910-709-6734",
                            "email": "rwfhomeimprovements@gmail.com",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Broadway",
                                "addressRegion": "NC",
                                "postalCode": "27505",
                                "streetAddress": "973 Buie Road"
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday"
                                ],
                                "opens": "07:00",
                                "closes": "17:00"
                            }
                        }
                    })
                }}
            />
            <HeroSection
                backgroundImage="/images/gallery/6d09b8fb361c4db2bface53383644ae8.jpg"
                title={title}
                hideSecondaryLinks={true}
            />

            <div className="container" id="form">
                <div className={styles.wrapper}>
                    <div className={styles.info}>
                        <h2>Get In Touch</h2>
                        <p>Ready to start your project? Fill out the form or give us a call.</p>
                        <div className={styles.contactDetails}>
                            <div className="mb-4">
                                <strong>Phone:</strong><br />
                                <a href="tel:9107096734">(910) 709-6734</a>
                            </div>
                            <div className="mb-4">
                                <strong>Email:</strong><br />
                                <a href="mailto:rwfhomeimprovements@gmail.com">rwfhomeimprovements@gmail.com</a>
                            </div>
                            <div>
                                <strong>Service Areas:</strong><br />
                                Fayetteville, Sanford, Lillington & Surrounding Areas
                            </div>
                        </div>
                    </div>

                    <form className={styles.form} action={submitContactForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" required className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="projectType">Project Type</label>
                            <select id="projectType" name="projectType" className={styles.select}>
                                <option value="fencing">Fencing</option>
                                <option value="deck">Deck</option>
                                <option value="window">Window</option>
                                <option value="door">Door</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows={5} className={styles.textarea}></textarea>
                        </div>

                        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>Send Request</button>
                    </form>
                </div>
            </div>
        </main>
    );
}
