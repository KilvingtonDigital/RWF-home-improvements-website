'use client';

import { useQuoteStore } from '@/store/quoteStore';
import { CheckCircle, Phone, ArrowRight, Printer } from 'lucide-react';
import { useState, useEffect } from 'react';



export default function QuoteSummary() {
    const { formData } = useQuoteStore();
    const [pricing, setPricing] = useState<{
        fences: Record<string, number>;
        gates: { single: number; double: number };
    } | null>(null);

    useEffect(() => {
        fetch('/api/pricing')
            .then(res => res.json())
            .then(data => setPricing(data))
            .catch(err => console.error('Failed to load pricing', err));
    }, []);

    // Default Fallback
    const basePrice = pricing?.fences?.[formData.fenceType || 'Wood'] || 25;
    const singleGatePrice = pricing?.gates?.single || 300;
    const doubleGatePrice = pricing?.gates?.double || 500;

    // Calculate gates from markers
    const singleGates = formData.gateMarkers?.filter(g => g.type === 'single').length || 0;
    const doubleGates = formData.gateMarkers?.filter(g => g.type === 'double').length || 0;

    const gateCost = (singleGates * singleGatePrice) + (doubleGates * doubleGatePrice);
    const fenceCost = Math.round(basePrice * formData.linearFootage);
    const estimatedCost = fenceCost + gateCost;

    // Create a range (+/- 10%)
    const minCost = Math.round(estimatedCost * 0.9);
    const maxCost = Math.round(estimatedCost * 1.1);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSchedule = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                fenceType: formData.fenceType,
                fenceStyle: formData.fenceStyle,
                fenceHeight: formData.fenceHeight,
                linearFootage: formData.linearFootage,
                gates: {
                    single: singleGates,
                    double: doubleGates
                },
                estimatedPrice: {
                    min: minCost,
                    max: maxCost
                },
                intent: 'consultation_request',
                honeyPot: formData.honeyPot
            };

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsSuccess(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-3xl mx-auto animate-in fade-in zoom-in duration-500 text-center py-20">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                    <CheckCircle size={48} strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">You're All Set!</h2>
                <p className="text-xl text-gray-600 max-w-lg mx-auto mb-8">
                    Thanks {formData.firstName}! We've received your project details. One of our experts will review your estimate and call you at <span className="font-semibold text-gray-900">{formData.phone}</span> shortly.
                </p>
                <button
                    onClick={() => location.reload()}
                    className="text-[#d4af37] font-semibold hover:underline"
                >
                    Start a New Quote
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center mb-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Quote Ready!</h2>
                <p className="text-gray-600">Great news, {formData.firstName}. Here is the estimated price for your project.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Project Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Project Details</h3>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total Length</span>
                            <span className="font-semibold text-gray-900">{formData.linearFootage} ft</span>
                        </div>
                        {singleGates > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Single Gates</span>
                                <span className="font-semibold text-gray-900">{singleGates}</span>
                            </div>
                        )}
                        {doubleGates > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Double Gates</span>
                                <span className="font-semibold text-gray-900">{doubleGates}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-500">Material</span>
                            <span className="font-semibold text-gray-900">{formData.fenceType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Style</span>
                            <span className="font-semibold text-gray-900">{formData.fenceStyle}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Height</span>
                            <span className="font-semibold text-gray-900">{formData.fenceHeight}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Location</span>
                            <span className="font-semibold text-gray-900 truncate max-w-[200px]" title={formData.address}>{formData.address}</span>
                        </div>
                    </div>
                </div>

                {/* Price Card */}
                <div className="bg-[#1e293b] text-white rounded-xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>

                    <div>
                        <h3 className="text-gray-300 font-medium mb-1">Estimated Price Range</h3>
                        <div className="text-4xl font-bold text-white mb-2">
                            ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-400">*Based on {formData.linearFootage}ft of {formData.fenceType} fencing.</p>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleSchedule}
                            disabled={isSubmitting}
                            className="w-full bg-[#d4af37] hover:bg-[#b5952f] disabled:bg-gray-500 text-white py-3 rounded-lg font-bold transition-colors flex justify-center items-center gap-2"
                        >
                            {isSubmitting ? (
                                <span>Processing...</span>
                            ) : (
                                <>
                                    <Phone size={18} /> Schedule Consultation
                                </>
                            )}
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-3">RWF Home Improvements will contact you shortly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
