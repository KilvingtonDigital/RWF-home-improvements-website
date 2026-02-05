
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Hammer, Users, Star, MapPin, CheckCircle } from "lucide-react";

export default function LightAltPage() {
    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">

            {/* Hero Section - Centered & Clean with Soft Gradients */}
            <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
                <div className="container px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-600">Top Rated in Fayetteville & Sanford</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.1]">
                        Elevate Your Home <br />
                        <span className="text-[#116dff]">Inside & Out</span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Fencing, Decks, Windows, and Doors. Experience the RWF difference with over 35 years of dedicated local craftsmanship.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link href="/contact-us" className="bg-[#116dff] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0e4eba] transition-shadow shadow-lg hover:shadow-xl hover:shadow-blue-500/20">
                            Get Your Free Estimate
                        </Link>
                        <Link href="/about-us" className="bg-white text-gray-800 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 border border-gray-200 transition-colors">
                            Our Story
                        </Link>
                    </div>

                    {/* Floating Hero Image */}
                    <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50">
                        <div className="relative h-[400px] md:h-[600px] w-full">
                            <Image
                                src="/images/down-net_http20241126-79-v1blet.jpg"
                                alt="Modern Light Hero"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Floating Stats Card */}
                        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg text-left hidden md:block">
                            <p className="text-3xl font-bold text-[#116dff]">35+</p>
                            <p className="text-sm font-medium text-gray-600">Years of Excellence</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section - Minimalist Cards */}
            <section className="py-24 bg-white">
                <div className="container px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Crafted for Your Lifestyle</h2>
                        <p className="text-gray-500 text-lg">We provide a full range of home improvement services designed to add value and beauty to your property.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ServiceCardLight
                            title="Fencing"
                            icon="🛡️"
                            link="/fayetteville-fence"
                            desc="Vinyl, Wood, Aluminum & Chain Link"
                        />
                        <ServiceCardLight
                            title="Decks"
                            icon="☀️"
                            link="/deck-installation"
                            desc="Custom Timber & Composite"
                        />
                        <ServiceCardLight
                            title="Windows"
                            icon="🪟"
                            link="/window-installation"
                            desc="Energy Efficient Replacement"
                        />
                        <ServiceCardLight
                            title="Doors"
                            icon="🚪"
                            link="/door-installation"
                            desc="Secure & Stylish Entryways"
                        />
                    </div>
                </div>
            </section>

            {/* Value Proposition - Split with Graphic */}
            <section className="py-24 bg-gray-50">
                <div className="container px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        {/* Left Graphic - Collage Style */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative h-[500px] w-full bg-white rounded-[2rem] overflow-hidden shadow-xl transform -rotate-2">
                                <Image
                                    src="/images/Vinyl_20Fencing.png"
                                    alt="Quality Fencing"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-2/3 h-64 bg-white rounded-[2rem] overflow-hidden shadow-2xl border-8 border-gray-50 transform rotate-3 hidden md:block">
                                <Image
                                    src="/images/window_20interior_20-RWF.jpg"
                                    alt="Window Detail"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Text */}
                        <div className="w-full lg:w-1/2 space-y-8 pl-0 lg:pl-10">
                            <span className="text-[#116dff] font-bold tracking-wide uppercase text-sm">Why Choose RWF?</span>
                            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                                Uncompromising Quality.<br />
                                Local Commitment.
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Your home is your biggest investment. Don't settle for less. We bring certified expertise and top-tier materials to ensures your project lasts for generations.
                            </p>

                            <ul className="space-y-4">
                                <CheckListLight text="Fully Licensed & Insured Professionals" />
                                <CheckListLight text="Premium, Durable Materials" />
                                <CheckListLight text="Clear Communication & Transparent Pricing" />
                                <CheckListLight text="35+ Years Serving NC Communities" />
                            </ul>

                            <div className="pt-4">
                                <Link href="/about-us" className="text-[#116dff] font-bold flex items-center hover:underline text-lg">
                                    Meet Our Team <ArrowRight className="ml-2" size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financing - Simple Band */}
            <section className="py-16 bg-[#116dff]">
                <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-2">Need Financing? We've Got You Covered.</h2>
                        <p className="text-blue-100 text-lg">Flexible payment plans to make your renovation dreams a reality.</p>
                    </div>
                    <Link href="/finance" className="bg-white text-[#116dff] px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors whitespace-nowrap">
                        Check Your Options
                    </Link>
                </div>
            </section>

            {/* Simple Footer */}
            <section className="py-20 bg-white text-center border-t border-gray-100">
                <div className="container px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Areas</h2>
                    <div className="flex flex-wrap justify-center gap-3 text-gray-500 mb-12">
                        {['Fayetteville', 'Sanford', 'Lillington', 'Spring Lake', 'Hope Mills', 'Raeford'].map((city) => (
                            <span key={city} className="bg-gray-50 px-5 py-2 rounded-lg text-sm font-medium border border-gray-100">
                                {city}
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} RWF Home Improvements. Crafted with care.</p>
                </div>
            </section>
        </div>
    );
}

function ServiceCardLight({ title, icon, link, desc }: { title: string, icon: string, link: string, desc: string }) {
    return (
        <Link href={link} className="group block bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(17,109,255,0.15)] hover:border-blue-100 transition-all duration-300">
            <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-[#116dff] group-hover:text-white transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#116dff] transition-colors">{title}</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">{desc}</p>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#116dff] group-hover:text-white transition-all">
                <ArrowRight size={18} />
            </div>
        </Link>
    );
}

function CheckListLight({ text }: { text: string }) {
    return (
        <li className="flex items-center text-gray-700 font-medium">
            <CheckCircle className="text-[#116dff] mr-3 flex-shrink-0" size={20} />
            {text}
        </li>
    )
}
