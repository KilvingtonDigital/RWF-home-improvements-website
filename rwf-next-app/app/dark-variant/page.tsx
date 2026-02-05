
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Hammer, Users, Star, MapPin } from "lucide-react";

export default function DarkPage() {
    return (
        <div className="bg-[#121212] min-h-screen text-gray-100 font-sans">

            {/* Hero Section - Dark & Dramatic */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/Vinyl_20Fencing.png"
                        alt="Dark Theme Hero"
                        fill
                        className="object-cover opacity-40 grayscale-[20%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#116dff]/20 text-[#116dff] text-sm font-bold tracking-wider mb-6 border border-[#116dff]/30 uppercase">
                        Fayetteville's Premier Experts
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Quality Craftsmanship.<br />
                        Modern <span className="text-[#116dff]">Living.</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Specializing in Fencing, Decks, Windows, and Doors. Trusted for over 35 years to deliver excellence in every detail.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/about-us" className="bg-[#116dff] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#0e4eba] transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(17,109,255,0.4)]">
                            Explore Our Work
                        </Link>
                        <Link href="/contact-us" className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 hover:border-white transition-all">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section - Grid Cards */}
            <section className="py-24 bg-[#121212]">
                <div className="container px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-bold text-white mb-4">Our Core Services</h2>
                            <p className="text-gray-400 text-lg">Precision engineering for your home's exterior needs.</p>
                        </div>
                        <Link href="/services" className="hidden md:flex items-center text-[#116dff] font-semibold hover:text-white transition-colors">
                            View All Services <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ServiceCardDark
                            title="Fencing"
                            image="/images/Vinyl_20Fencing.png"
                            link="/fayetteville-fence"
                            desc="Vinyl, Wood, Aluminum & Chain Link"
                        />
                        <ServiceCardDark
                            title="Decks"
                            image="/images/down-net_http20241126-79-v1blet.jpg"
                            link="/deck-installation"
                            desc="Custom Timber & Composite"
                        />
                        <ServiceCardDark
                            title="Windows"
                            image="/images/window_20interior_20-RWF.jpg"
                            link="/window-installation"
                            desc="Energy Efficient Upgrades"
                        />
                        <ServiceCardDark
                            title="Doors"
                            image="/images/exterior-and-interior-door-installation.png"
                            link="/door-installation"
                            desc="Secure & Stylish Entryways"
                        />
                    </div>
                </div>
            </section>

            {/* Feature Section - Dark Panel */}
            <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
                {/* Abstract Background Element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#116dff]/5 to-transparent skew-x-12 opacity-50"></div>

                <div className="container px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2 space-y-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                Why Homeowners <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#116dff] to-cyan-400">Trust RWF</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We don't just build; we engineer lasting value for your home. With 35 years of legacy, our commitment to quality materials and superior craftsmanship stands the test of time.
                            </p>

                            <div className="space-y-8">
                                <FeatureRowDark
                                    icon={<ShieldCheck className="text-[#116dff]" size={28} />}
                                    title="Fully Licensed & Insured"
                                    desc="Total peace of mind with a verified, compliant professional team."
                                />
                                <FeatureRowDark
                                    icon={<Hammer className="text-[#116dff]" size={28} />}
                                    title="Premium Materials Only"
                                    desc="We source industry-leading materials for durability and aesthetics."
                                />
                                <FeatureRowDark
                                    icon={<Users className="text-[#116dff]" size={28} />}
                                    title="Expert Craftsmanship"
                                    desc="A dedicated team with decades of hands-on experience."
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                                <Image
                                    src="/images/down-net_http20241126-79-v1blet.jpg"
                                    alt="RWF Project"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                                    <p className="text-white font-bold text-lg">Latest Project: Deck Renovation</p>
                                    <p className="text-gray-400 text-sm">Fayetteville, NC</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financing Banner - High Contrast */}
            <section className="py-20 bg-[#116dff] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

                <div className="container px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Financing Made Simple.</h2>
                    <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto font-light">
                        Breaking down barriers to your dream home. Competitive rates and flexible terms tailored for you.
                    </p>
                    <Link href="/finance" className="inline-block bg-[#121212] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-black hover:scale-105 transition-all shadow-xl border border-gray-700">
                        Check Your Eligibility
                    </Link>
                </div>
            </section>

            {/* Footer / CTA Area */}
            <section className="py-24 bg-[#0a0a0a] text-center border-t border-gray-900">
                <div className="container px-4">
                    <MapPin className="mx-auto text-gray-500 mb-6" size={40} />
                    <h2 className="text-3xl font-bold text-white mb-8">Serving North Carolina</h2>
                    <div className="flex flex-wrap justify-center gap-4 text-gray-400 mb-12 font-medium">
                        <span className="border border-gray-800 px-6 py-2 rounded-full hover:border-[#116dff] hover:text-[#116dff] transition-colors cursor-default">Fayetteville</span>
                        <span className="border border-gray-800 px-6 py-2 rounded-full hover:border-[#116dff] hover:text-[#116dff] transition-colors cursor-default">Sanford</span>
                        <span className="border border-gray-800 px-6 py-2 rounded-full hover:border-[#116dff] hover:text-[#116dff] transition-colors cursor-default">Lillington</span>
                        <span className="border border-gray-800 px-6 py-2 rounded-full hover:border-[#116dff] hover:text-[#116dff] transition-colors cursor-default">Spring Lake</span>
                        <span className="border border-gray-800 px-6 py-2 rounded-full hover:border-[#116dff] hover:text-[#116dff] transition-colors cursor-default">Hope Mills</span>
                    </div>

                    <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-12 rounded-3xl border border-gray-800">
                        <h2 className="text-4xl font-bold text-white mb-4">Start Your Transformation</h2>
                        <p className="text-gray-400 mb-8">No pressure. No hidden fees. Just expert advice.</p>
                        <Link href="/contact-us" className="inline-block bg-[#116dff] text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#0e4eba] transition-colors w-full sm:w-auto">
                            Request Free Quote
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ServiceCardDark({ title, image, link, desc }: { title: string, image: string, link: string, desc: string }) {
    return (
        <Link href={link} className="group block h-full bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-[#116dff] transition-all duration-300 hover:shadow-[0_0_30px_rgba(17,109,255,0.15)] flex flex-col">
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#116dff] transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{desc}</p>
                <div className="flex items-center text-gray-300 font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                    Explore <ArrowRight size={16} className="ml-2 text-[#116dff]" />
                </div>
            </div>
        </Link>
    );
}

function FeatureRowDark({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-6 items-start p-4 hover:bg-[#222] rounded-xl transition-colors border border-transparent hover:border-gray-800">
            <div className="mt-1 p-3 bg-[#116dff]/10 rounded-lg text-[#116dff]">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 font-light">{desc}</p>
            </div>
        </div>
    );
}
