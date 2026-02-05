"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

interface NavItem {
    label: string;
    href: string;
    external?: boolean;
    children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
    {
        label: 'Fencing',
        href: '/fayetteville-fence',
        children: [
            { label: 'Privacy Fencing', href: '/privacy-fencing' },
            { label: 'Wood Fencing', href: '/fayetteville-wood-fencing' },
            { label: 'Vinyl Fencing', href: '/vinyl-fencing-for-sanford-and-fayetteville' },
            { label: 'Aluminum Fencing', href: '/aluminum-fencing-for-sanford-and-fayetteville' },
            { label: 'Chain Link Fencing', href: '/chain-link-fencing-for-sanford-and-fayetteville' },
            { label: 'Farm and Ranch Fencing', href: '/farm-and-ranch-fencing-for-sanford-and-fayetteville' },
        ]
    },
    { label: 'Decks', href: '/deck-installation' },
    { label: 'Windows', href: '/window-installation' },
    { label: 'Doors', href: '/door-installation' },
    {
        label: 'About',
        href: '/about-us',
        children: [
            { label: 'Testimonials', href: '/testimonial' },
        ]
    },
    {
        label: 'Service Areas',
        href: '/service-area',
        children: [
            { label: 'Fayetteville Fencing', href: '/fayetteville-nc' },
            { label: 'Sanford Fencing', href: '/sanford-fencing' },
            { label: 'Lillington Fencing', href: '/lillington-fencing' },
        ]
    },
    { label: 'Finance', href: '/finance' },
    { label: 'Contact', href: '/contact-us' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Auto-expand Fencing on mobile for better visibility
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1100) {
                // If nothing is open, open Fencing by default
                setOpenDropdown((prev) => prev || 'Fencing');
            } else {
                setOpenDropdown(null);
            }
        };

        // Run on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = (label: string) => {
        if (openDropdown === label) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(label);
        }
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
                    <img src="/images/rwf-home-improvements-logo-fayetteville.png" alt="RWF Home Improvements" />
                </Link>

                {/* Navigation Links */}
                <nav className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
                    {navItems.map((item, index) => (
                        <div key={index} className={`${styles.navItem} ${openDropdown === item.label ? styles.dropdownOpen : ''}`}>
                            <div className={styles.linkWrapper}>
                                {item.external ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.link}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={styles.link}
                                        onClick={(e) => {
                                            if (item.children) {
                                                // Prevent navigation if clicking parent on mobile to toggle dropdown
                                                if (window.innerWidth < 1100) {
                                                    e.preventDefault();
                                                    toggleDropdown(item.label);
                                                } else {
                                                    setIsMenuOpen(false);
                                                }
                                            } else {
                                                setIsMenuOpen(false);
                                            }
                                        }}
                                    >
                                        {item.label}
                                        {item.children && <span className={styles.navArrow}> ▼</span>}
                                    </Link>
                                )}
                            </div>

                            {item.children && (
                                <div className={styles.dropdown}>
                                    {item.children.map((child, cIndex) => (
                                        <Link
                                            key={cIndex}
                                            href={child.href}
                                            className={styles.dropdownLink}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Mobile CTA - Hidden on desktop, visible in drawer if needed, but we have header CTA now. Keep for very small screens? or remove? removing to avoid duplicates if header one is visible. */}
                </nav>

                <div className={styles.cta}>
                    <Link href="/contact-us" className="btn btn-primary">
                        Get Instant Quote
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={styles.toggle}
                    aria-label="Menu"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>
        </header>
    );
}
