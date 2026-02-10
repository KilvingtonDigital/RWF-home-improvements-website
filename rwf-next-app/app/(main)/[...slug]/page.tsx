import { getPageData, getPageSlugs } from '@/lib/cms';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import styles from './page.module.css';
import HeroSection from '@/components/HeroSection';
import ServiceAreas from '@/components/ServiceAreas';
import CTA from '@/components/CTA';
import SetsApart from '@/components/SetsApart';
import ServiceGrid from '@/components/ServiceGrid';
import ProcessSteps from '@/components/ProcessSteps';
import BenefitsSection from '@/components/BenefitsSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';


interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export async function generateStaticParams() {
    const slugs = getPageSlugs();
    return slugs.map((slug) => ({
        slug: slug.split('/'),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join('/');
    const data = getPageData(slug);

    if (!data) return {};

    return {
        title: data.title,
        description: data.description || `RWF Home Improvements - ${data.headings?.[0]?.text}`,
    };
}

export default async function DynamicPage({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join('/');
    const data = getPageData(slug);

    if (!data) {
        notFound();
    }

    // Find H1 - Prioritize JSON headings, then Title
    const h1 = data.headings?.find((h: any) => h.tag === 'h1')?.text || data.title.split('|')[0].trim();

    // Determine Image: heroImage > ogImage > Default
    const defaultHero = "/images/expert-fence-installation-fayetteville-nc.png";
    let heroBg = data.heroImage;
    if (!heroBg && data.ogImage && !data.ogImage.includes('wixstatic')) {
        // Use ogImage if it's local, otherwise prefer default high-quality hero over random low-res wix scrape
        heroBg = data.ogImage;
    }
    if (!heroBg) {
        heroBg = defaultHero;
    }

    return (
        <main>
            <HeroSection
                backgroundImage={heroBg}
                title={h1}
                subtitle={data.heroSubtitle || "Trusted Quality & Craftsmanship"} // Fallback subtitle for uniformity
                ctaLink={data.heroCtaLink || "/contact-us"}
                ctaText={data.heroCtaText || "Get a Quote"}
            />

            {data.primaryAreas && data.primaryAreas.length > 0 && (
                <ServiceAreas
                    introTitle={data.introTitle}
                    introText={data.introText}
                    primaryAreas={data.primaryAreas}
                    surroundingAreas={data.surroundingAreas}
                />
            )}




            {data.serviceOptions && (
                <section className="container py-5">
                    {data.serviceOptionsTitle && (
                        <h2 className={styles.sectionTitle}>
                            {data.serviceOptionsTitle}
                        </h2>
                    )}
                    <ServiceGrid services={data.serviceOptions} />
                </section>
            )}

            {data.benefits && (
                <BenefitsSection
                    title={data.benefitsTitle || "Why Choose RWF?"}
                    intro={data.benefitsIntro}
                    items={data.benefits}
                    image={data.benefitsImage || "/images/professional-door-installation-fayetteville.jpg"}
                />
            )}

            {data.content && data.content.trim().length > 0 && (
                <section className={styles.seoSection}>
                    <div className="container">
                        <article className={styles.content}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    img: ({ node, ...props }) => (
                                        <img {...props} />
                                    ),
                                    p: ({ node, ...props }) => <div {...props} className={styles.paragraph} />,
                                }}
                            >
                                {data.content}
                            </ReactMarkdown>
                        </article>
                    </div>
                </section>
            )}

            {data.features && (
                <SetsApart
                    title={data.featuresTitle}
                    items={data.features}
                />
            )}

            {data.reviews && (
                <Testimonials
                    title={data.intro?.title || "Testimonials"}
                    reviews={data.reviews}
                />
            )}

            {data.financingOptions && (
                <section className={`container py-5 ${styles.sectionCenter}`}>
                    <h2 className={styles.sectionTitle}>
                        Financing Options That Work for You
                    </h2>
                    <ServiceGrid services={data.financingOptions} />
                </section>
            )}

            {data.faqs && (
                <FAQ
                    items={data.faqs}
                    title={data.faqTitle}
                />
            )}

            {data.processSteps && (
                <ProcessSteps
                    title={data.processTitle || "Our Fencing Installation Process"}
                    steps={data.processSteps}
                />
            )}



            <CTA
                title={data.ctaTitle}
                text={data.ctaText}
            />
        </main>
    );
}
