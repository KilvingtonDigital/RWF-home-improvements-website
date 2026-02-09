'use client';

import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './Quote.module.css';

interface QuoteNavProps {
    currentStep: number;
}

const steps = [
    { id: 1, name: 'Contact' },
    { id: 2, name: 'Location' },
    { id: 3, name: 'Draw' },
    { id: 4, name: 'Design' },
    { id: 5, name: 'Quote' },
];

export default function QuoteNav({ currentStep }: QuoteNavProps) {
    return (
        <div className={styles.navContainer}>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-0 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 h-1 bg-[#d4af37] -z-0 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} />

            <div className="flex justify-between items-center relative z-10">
                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center relative group cursor-default">
                            <div
                                className={clsx(
                                    'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 font-bold text-sm z-10 bg-white',
                                    isCompleted ? 'bg-[#d4af37] border-[#d4af37] text-[#1e293b]' :
                                        isCurrent ? 'bg-[#d4af37] border-[#d4af37] text-[#1e293b]' :
                                            'bg-[#1e293b] border-gray-500 text-gray-400'
                                )}
                            >
                                {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id}
                            </div>
                            <span className={clsx(
                                'absolute top-10 text-xs font-medium uppercase tracking-wider transition-all duration-300 hidden md:block whitespace-nowrap left-1/2 -translate-x-1/2',
                                isCurrent || isCompleted ? 'text-[#d4af37]' : 'text-gray-500'
                            )}>
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
