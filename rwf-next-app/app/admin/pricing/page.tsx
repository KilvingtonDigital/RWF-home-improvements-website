'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, Check, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [pricing, setPricing] = useState<{
        fences: Record<string, number>;
        gates: { single: number; double: number };
    } | null>(null);

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        try {
            const res = await fetch('/api/pricing');
            if (!res.ok) throw new Error('Failed to fetch pricing');
            const data = await res.json();
            setPricing(data);
        } catch (err) {
            setError('Could not load pricing data.');
        } finally {
            setLoading(false);
        }
    };

    const handleFenceChange = (type: string, value: string) => {
        if (!pricing) return;
        setPricing({
            ...pricing,
            fences: {
                ...pricing.fences,
                [type]: parseFloat(value) || 0
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

            if (!res.ok) throw new Error('Failed to save');

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
    if (!pricing) return <div className="text-red-500 p-20">Error loading data</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Pricing Management</h1>
                        <p className="text-gray-500">Adjust base material and gate prices for the quote calculator.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/leads"
                            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 0 0 0-4-4H6a4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 0 0 0-3-3.87" /><path d="M16 3.13a4 0 0 1 0 7.75" /></svg>
                            View Leads
                        </Link>
                        <Link href="/quote" className="text-[#d4af37] hover:underline flex items-center gap-1 font-medium">
                            Open Calculator <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Error/Success Messages */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                            <AlertCircle size={20} /> {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center gap-2">
                            <Check size={20} /> Settings saved successfully!
                        </div>
                    )}

                    {/* Fence Pricing */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Fence Material Rates (per ft)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(pricing.fences).map(([type, price]) => (
                                <div key={type} className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">{type}</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => handleFenceChange(type, e.target.value)}
                                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gate Pricing */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Gate Logic fees</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Single Gate (approx 4ft)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={pricing.gates.single}
                                        onChange={(e) => handleGateChange('single', e.target.value)}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Double Gate (approx 10ft)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={pricing.gates.double}
                                        onChange={(e) => handleGateChange('double', e.target.value)}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
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
