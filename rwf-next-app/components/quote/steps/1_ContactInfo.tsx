'use client';

import { useQuoteStore } from '@/store/quoteStore';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import styles from '../Quote.module.css';

export default function ContactInfo() {
    const { formData, updateFormData, setStep } = useQuoteStore();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required'; // Basic check
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            setStep(2);
        }
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
            <div className={styles.headerContainer}>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Let's Start Your Quote</h2>
                <p className="text-gray-600 text-lg">Who should we send this personalized estimate to?</p>
            </div>

            <div className={styles.formGrid}>
                {/* First Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">First Name</label>
                    <input
                        type="text"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all text-lg shadow-sm"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => updateFormData({ firstName: e.target.value })}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-2 font-medium">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Last Name</label>
                    <input
                        type="text"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all text-lg shadow-sm"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => updateFormData({ lastName: e.target.value })}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-2 font-medium">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all text-lg shadow-sm"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email}</p>}
                    <p className="text-xs text-gray-400 mt-2">We'll email you a copy of your estimate.</p>
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Phone Number</label>
                    <input
                        type="tel"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all text-lg shadow-sm"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-2 font-medium">{errors.phone}</p>}
                </div>

                {/* Honeypot Field (Hidden) */}
                <div className="hidden">
                    <label>Fax Number</label>
                    <input
                        type="text"
                        name="fax"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeyPot || ''}
                        onChange={(e) => updateFormData({ honeyPot: e.target.value })}
                    />
                </div>
                {/* Continue Button - Moved inside grid for alignment */}
                <div className="md:col-span-2 flex justify-end pt-4">
                    <button
                        onClick={handleNext}
                        className="bg-[#1e293b] hover:bg-[#334155] text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Continue to Location <ChevronRight size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}
