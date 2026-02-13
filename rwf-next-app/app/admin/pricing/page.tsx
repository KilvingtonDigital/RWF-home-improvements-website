'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, Check, Loader2, ArrowRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './pricing.module.css';

interface PricingData {
    id?: number;
    name?: string;
    fences: Record<string, Record<string, Record<string, number>>>;
    gates: { single: number; double: number };
    options?: { commercial_multiplier: number };
}

export default function PricingAdmin() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('Wood');

    const [pricing, setPricing] = useState<PricingData | null>(null);

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        try {
            const res = await fetch('/api/pricing');
            const data = await res.json().catch(() => null); // Handle non-JSON response gracefully

            if (!res.ok) {
                const errorMessage = data?.details || data?.error || 'Failed to fetch pricing';
                throw new Error(errorMessage);
            }

            setPricing(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Could not load pricing data.');
        } finally {
            setLoading(false);
        }
    };

    const handleMatrixChange = (material: string, style: string, height: string, value: string) => {
        if (!pricing) return;
        setPricing({
            ...pricing,
            fences: {
                ...pricing.fences,
                [material]: {
                    ...pricing.fences[material],
                    [style]: {
                        ...pricing.fences[material]?.[style],
                        [height]: parseFloat(value) || 0
                    }
                }
            }
        });
    };

    const handleGateChange = (type: 'single' | 'double', value: string) => {
        if (!pricing) return;
        setPricing({
            ...pricing,
            gates: {
                ...pricing.gates,
                [type]: parseFloat(value) || 0
            }
        });
    };

    const handleOptionChange = (key: string, value: string) => {
        if (!pricing) return;
        setPricing({
            ...pricing,
            options: {
                ...(pricing.options || { commercial_multiplier: 1.3 }),
                [key]: parseFloat(value) || 0
            } as { commercial_multiplier: number }
        });
    };

    const handleSave = async () => {
        if (!pricing) return;
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch('/api/pricing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pricing),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                const errorMessage = data?.details || data?.error || 'Failed to save';
                throw new Error(errorMessage);
            }

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
    // Handle case where pricing might be null or valid but empty fences (initial load edge case)
    if (!pricing || !pricing.fences) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-red-600 gap-4">
                <AlertCircle size={48} />
                <h2 className="text-xl font-bold">Error Loading Data</h2>
                <p className="text-center font-mono bg-red-50 p-4 rounded-lg border border-red-200">{error || 'Unknown error occurred. Try refreshing.'}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={styles.headerContainer}>
                    <div>
                        <h1 className={styles.headerTitle}>Pricing Management</h1>
                        <p className="text-sm text-gray-500">Configure detailed pricing for every material variation.</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            onClick={async () => {
                                await fetch('/api/auth/logout', { method: 'POST' });
                                router.push('/admin/login');
                            }}
                            className="bg-gray-100 text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center gap-2 text-sm transition-colors w-full sm:w-auto"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                        <Link
                            href="/admin/leads"
                            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm transition-colors w-full sm:w-auto"
                        >
                            View Leads
                        </Link>
                        <Link
                            href="/quote"
                            target="_blank"
                            className="bg-[#d4af37] text-white px-4 py-2 rounded-lg hover:bg-[#b5952f] flex items-center justify-center gap-2 text-sm font-bold shadow-sm transition-all hover:shadow-md w-full sm:w-auto"
                        >
                            Open Quote Sheet <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                <div className="p-4 md:p-8 space-y-6 md:space-y-8">
                    {/* Error/Success Messages */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 md:p-4 rounded-lg flex items-center gap-2 animate-in fade-in text-sm md:text-base">
                            <AlertCircle size={20} /> {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 text-green-600 p-3 md:p-4 rounded-lg flex items-center gap-2 animate-in fade-in text-sm md:text-base">
                            <Check size={20} /> Settings saved successfully!
                        </div>
                    )}

                    {/* Material TABS */}
                    <div>
                        <nav className="flex flex-wrap gap-2 md:gap-3" aria-label="Tabs">
                            {Object.keys(pricing.fences).map((material) => (
                                <button
                                    key={material}
                                    onClick={() => setActiveTab(material)}
                                    className={`${activeTab === material
                                        ? 'bg-[#1e293b] text-white shadow-md transform scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                        } whitespace-nowrap py-2 px-4 md:py-3 md:px-6 rounded-lg md:rounded-xl font-bold text-xs md:text-sm capitalize transition-all duration-200`}
                                >
                                    {material}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Pricing Matrix for Active Tab */}
                    {pricing.fences[activeTab] && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 capitalize">{activeTab} Pricing Configuration</h3>

                            <div className="space-y-8">
                                {Object.entries(pricing.fences[activeTab]).map(([style, heights]: [string, any]) => (
                                    <div key={style} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        <h4 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2">{style}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                            {Object.entries(heights).map(([height, price]: [string, any]) => (
                                                <div key={height} className="flex flex-col">
                                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{height}</label>
                                                    <div className={styles.currencyWrapper}>
                                                        <span className={styles.currencySymbol}>$</span>
                                                        <input
                                                            type="number"
                                                            value={price}
                                                            onChange={(e) => handleMatrixChange(activeTab, style, height, e.target.value)}
                                                            className={styles.currencyInput}
                                                            aria-label={`Price for ${style} ${height}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Global Settings (Gates & Multipliers) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Gate Fees</h3>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Single Gate Base</label>
                                    <div className={styles.currencyWrapper}>
                                        <span className={styles.currencySymbol}>$</span>
                                        <input
                                            type="number"
                                            value={pricing.gates.single}
                                            onChange={(e) => handleGateChange('single', e.target.value)}
                                            className={styles.currencyInput}
                                            aria-label="Single Gate Price"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Double Gate Base</label>
                                    <div className={styles.currencyWrapper}>
                                        <span className={styles.currencySymbol}>$</span>
                                        <input
                                            type="number"
                                            value={pricing.gates.double}
                                            onChange={(e) => handleGateChange('double', e.target.value)}
                                            className={styles.currencyInput}
                                            aria-label="Double Gate Price"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Global Multipliers</h3>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-2">Commercial Grade Multiplier (e.g. 1.3 = 30% markup)</label>
                                <div className={styles.currencyWrapper}>
                                    <span className={styles.currencySymbol}>x</span>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={pricing?.options?.commercial_multiplier || 1.3}
                                        onChange={(e) => handleOptionChange('commercial_multiplier', e.target.value)}
                                        className={styles.currencyInput}
                                        aria-label="Commercial Grade Multiplier"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-6 border-t flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-[#1e293b] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0f172a] transition-all flex items-center gap-2 disabled:opacity-70"
                        >
                            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
