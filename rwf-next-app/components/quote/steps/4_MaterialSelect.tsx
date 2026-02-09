'use client';

import { useQuoteStore } from '@/store/quoteStore';
import { ChevronRight, Check, Loader2, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { FenceType } from '@/store/quote-types';
import { useState, useEffect, useRef } from 'react';
import styles from './MaterialSelect.module.css';

// Extended Material Definitions
const FENCE_TYPES: { id: FenceType; label: string; image: string; description: string; imagePosition?: string; imageFit?: string; imageScale?: string; extraClasses?: string }[] = [
    {
        id: 'Wood',
        label: 'Wood Fencing',
        image: '/images/dog-eared-wood-fence-fayetteville.jpg',
        description: 'Classic Dog-Eared style. Offers timeless natural beauty and excellent privacy.',
        imagePosition: 'object-center',
        imageScale: 'scale-[1.60] group-hover:scale-[1.70]'
    },
    {
        id: 'Vinyl',
        label: 'Vinyl Fencing',
        image: '/images/vinyl-fence-fayetteville.png',
        description: 'Premium, maintenance-free fencing. Resistant to fading and rot—the perfect long-term investment for curb appeal.',
        imagePosition: 'object-center',
        imageFit: 'object-contain',
        imageScale: 'group-hover:scale-105'
    },
    {
        id: 'Aluminum',
        label: 'Aluminum Fencing',
        image: '/images/aluminum-fence-fayetteville.jpg',
        description: 'Elegant, rust-proof security. Offers a sophisticated open view with commercial-grade durability available.',
        imagePosition: 'object-center',
        imageFit: 'object-contain',
        imageScale: 'group-hover:scale-105'
    },
    {
        id: 'Chain Link',
        label: 'Chain Link Fencing',
        image: '/images/residential-commercial-chain-link-fence.jpg',
        description: 'Versatile and cost-effective. Available in Galvanized or Vinyl Coated options for residential and commercial security.',
        imagePosition: 'object-center',
        imageFit: 'object-contain',
        imageScale: 'group-hover:scale-105',
        extraClasses: 'translate-y-10'
    }
];

// Configuration for Grades/Quality Levels
const MATERIAL_GRADES: Record<string, string[]> = {
    'Vinyl': ['Residential', 'Commercial'],
    'Aluminum': ['Residential', 'Commercial'],
    'Chain Link': ['Residential', 'Commercial'],
    // Wood has no specific grade selection in this requirement
};

// Styles configuration - Simplified for now, can be made dynamic per material if needed
const STYLES_BY_MATERIAL: Record<string, string[]> = {
    'Wood': ['Privacy', 'Picket', 'Split Rail', 'Shadowbox', 'Board-on-Board'],
    'Vinyl': ['Privacy', 'Picket', 'Ranch Rail', 'Semi-Privacy'],
    'Aluminum': ['Classical Ornamental', '2-Rail', '3-Rail', 'Puppy Picket'],
    'Chain Link': ['Galvanized', 'Black Vinyl Coated']
};

const HEIGHTS = ['4 ft', '5 ft', '6 ft', '8 ft'];

export default function MaterialSelect() {
    const { formData, updateFormData, setStep } = useQuoteStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pricing, setPricing] = useState<any>(null); // Quick fetch for calculation

    const stepsRef = useRef<HTMLDivElement>(null);

    // Clear downstream selections when upstream changes
    const handleMaterialChange = (type: FenceType) => {
        updateFormData({
            fenceType: type,
            fenceGrade: null,
            fenceStyle: null,
            fenceHeight: null
        });

        // Auto-scroll to next step for mobile UX only (prevents jarring jumps on desktop)
        setTimeout(() => {
            if (stepsRef.current && window.innerWidth < 768) {
                stepsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const handleGradeChange = (grade: string) => {
        updateFormData({
            fenceGrade: grade,
            fenceStyle: null, // Reset style? Maybe not strictly necessary but safer
            fenceHeight: null
        });
    };

    // Fetch pricing early so we can submit the estimate
    useEffect(() => {
        fetch('/api/pricing').then(res => res.json()).then(setPricing).catch(console.error);
    }, []);

    const handleNext = async () => {
        if (!formData.fenceType || !formData.fenceStyle || !formData.fenceHeight) return;

        // If material has grades, enforce grade selection
        const availableGrades = formData.fenceType ? MATERIAL_GRADES[formData.fenceType] : [];
        if (availableGrades && availableGrades.length > 0 && !formData.fenceGrade) return;

        setIsSubmitting(true);

        try {
            // Calculate Estimate for the payload
            // This is a rough estimation for the lead capture. Real pricing engine is more complex.
            let basePrice = pricing?.fences[formData.fenceType] || 25;

            // Adjust for grade
            if (formData.fenceGrade === 'Commercial') basePrice *= 1.3;

            const singleGatePrice = pricing?.gates.single || 300;
            const doubleGatePrice = pricing?.gates.double || 500;

            const singleGates = formData.gateMarkers?.filter(g => g.type === 'single').length || 0;
            const doubleGates = formData.gateMarkers?.filter(g => g.type === 'double').length || 0;

            const gateCost = (singleGates * singleGatePrice) + (doubleGates * doubleGatePrice);
            const fenceCost = Math.round(basePrice * formData.linearFootage);
            const estimatedCost = fenceCost + gateCost;

            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                fenceType: formData.fenceType,
                fenceGrade: formData.fenceGrade,
                fenceStyle: formData.fenceStyle,
                fenceHeight: formData.fenceHeight,
                linearFootage: formData.linearFootage,
                gates: { single: singleGates, double: doubleGates },
                estimatedPrice: { min: Math.round(estimatedCost * 0.9), max: Math.round(estimatedCost * 1.1) },
                intent: 'pricing_view',
                honeyPot: formData.honeyPot
            };

            // Fire and forget (or await if you want strict reliability)
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

        } catch (error) {
            console.error('Failed to capture marketing lead', error);
        } finally {
            setIsSubmitting(false);
            setStep(5);
        }
    };

    // Determine current steps availability
    const availableGrades = formData.fenceType ? MATERIAL_GRADES[formData.fenceType] : [];
    const showGradeStep = availableGrades && availableGrades.length > 0;
    const isGradeSelected = !showGradeStep || !!formData.fenceGrade;

    const availableStyles = formData.fenceType ? STYLES_BY_MATERIAL[formData.fenceType] : [];

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Customize Your Fence</h2>
            <p className="text-gray-600 mb-10 text-lg">Select the material, style, and height that matches your vision.</p>

            {/* 1. Material Selection */}
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center text-sm">1</span>
                Choose Material
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {FENCE_TYPES.map((type) => (
                    <div
                        key={type.id}
                        onClick={() => handleMaterialChange(type.id)}
                        className={clsx(
                            'cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 relative group shadow-md hover:shadow-xl flex flex-col',
                            formData.fenceType === type.id
                                ? 'border-[#d4af37] ring-4 ring-[#d4af37]/20 transform scale-[1.02]'
                                : 'border-transparent hover:border-gray-300'
                        )}
                    >
                        {/* Image */}
                        <div className="h-56 bg-gray-100 relative shrink-0 flex items-center justify-center overflow-hidden">
                            {/* Use a generic fallback if specific image not found, but we try to source them */}
                            <img
                                src={type.image}
                                onError={(e) => {
                                    // Fallback to a color block if image fails
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#cbd5e1';
                                }}
                                alt={type.label}
                                className={clsx(
                                    "w-full h-full transition-transform duration-700",
                                    type.imagePosition || 'object-center',
                                    type.imageFit || 'object-cover',
                                    type.imageFit || 'object-cover',
                                    type.imageScale,
                                    type.extraClasses
                                )}
                            />
                            {formData.fenceType === type.id && (
                                <div className="absolute top-4 right-4 bg-[#d4af37] text-white p-2 rounded-full shadow-lg animate-in zoom-in spin-in-12">
                                    <Check size={20} strokeWidth={3} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className={clsx('p-4 flex-1 flex flex-col transition-colors duration-300', formData.fenceType === type.id ? 'bg-white' : 'bg-gray-50 group-hover:bg-white')}>
                            <h4 className="font-bold text-lg text-gray-900 mb-1">{type.label}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{type.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dynamic Steps Container */}
            <div ref={stepsRef} className={clsx('transition-all duration-700 ease-in-out', styles.stepsContainer, formData.fenceType ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 border-t border-gray-100 pt-10">

                    {/* 2. Grade Selection (Conditional) */}
                    {showGradeStep && (
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center text-sm">2</span>
                                Choose Grade
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {availableGrades?.map((grade) => (
                                    <button
                                        key={grade}
                                        onClick={() => handleGradeChange(grade)}
                                        className={clsx(
                                            'px-8 py-4 rounded-xl text-lg font-semibold border-2 transition-all duration-200 shadow-sm min-w-[150px]',
                                            formData.fenceGrade === grade
                                                ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-lg scale-105'
                                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#d4af37] hover:bg-white'
                                        )}
                                    >
                                        {grade}
                                    </button>
                                ))}
                            </div>
                            {/* Helper text for Commercial */}
                            {formData.fenceGrade === 'Commercial' && (
                                <p className="mt-3 text-sm text-gray-500 flex items-center gap-2 animate-in fade-in">
                                    <Info size={16} /> Commercial grade offers thicker gauge material for high-traffic or security applications.
                                </p>
                            )}
                        </div>
                    )}

                    {/* 3. Style Selection */}
                    {isGradeSelected && (
                        <div className="md:col-span-1 animate-in fade-in slide-in-from-left-4 duration-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center text-sm">{showGradeStep ? '3' : '2'}</span>
                                Choose Style
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {availableStyles?.map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => updateFormData({ fenceStyle: style })}
                                        className={clsx(
                                            'px-2 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 shadow-sm text-center h-auto min-h-[50px] break-words whitespace-normal flex items-center justify-center',
                                            formData.fenceStyle === style
                                                ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-lg scale-[1.02]'
                                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#d4af37] hover:bg-white'
                                        )}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 4. Height Selection */}
                    {isGradeSelected && (
                        <div className="md:col-span-1 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center text-sm">{showGradeStep ? '4' : '3'}</span>
                                Choose Height
                            </h3>
                            <div className="flex flex-col gap-4">
                                {HEIGHTS.map((height) => (
                                    <button
                                        key={height}
                                        onClick={() => updateFormData({ fenceHeight: height })}
                                        className={clsx(
                                            'w-full px-6 py-4 rounded-xl text-base font-semibold border-2 transition-all duration-200 shadow-sm flex justify-between items-center group',
                                            formData.fenceHeight === height
                                                ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-lg scale-[1.02]'
                                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#d4af37] hover:bg-white'
                                        )}
                                    >
                                        <span>{height}</span>
                                        {formData.fenceHeight === height && <Check size={20} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.calculateContainer}>
                <button
                    onClick={handleNext}
                    disabled={!formData.fenceType || !formData.fenceStyle || !formData.fenceHeight || (showGradeStep && !formData.fenceGrade) || isSubmitting}
                    className="bg-[#1e293b] hover:bg-[#334155] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto sm:mx-0 w-full sm:w-auto justify-center sm:justify-start"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <>Calculate Quote <ChevronRight size={20} strokeWidth={3} /></>}
                </button>
            </div>
        </div>
    );
}
