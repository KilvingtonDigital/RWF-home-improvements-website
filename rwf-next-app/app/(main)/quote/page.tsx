'use client';

import { useQuoteStore } from '@/store/quoteStore';
import QuoteNav from '@/components/quote/QuoteNav';
import ContactInfo from '@/components/quote/steps/1_ContactInfo';
import LocationFinder from '@/components/quote/steps/2_LocationFinder';
import FenceDrawer from '@/components/quote/steps/3_FenceDrawer';
import MaterialSelect from '@/components/quote/steps/4_MaterialSelect';
import QuoteSummary from '@/components/quote/steps/5_QuoteSummary';

export default function QuotePage() {
    const currentStep = useQuoteStore((state) => state.currentStep);

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="bg-white rounded-2xl shadow-2xl min-h-[700px] flex flex-col border border-gray-100">
                    {/* Header / Nav */}
                    <div className="bg-[#1e293b] p-8 md:p-10 text-white rounded-t-2xl">
                        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Instant Fence Quote</h1>
                        <QuoteNav currentStep={currentStep} />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 px-10 pt-16 pb-40 md:px-24 md:py-24 relative">
                        {currentStep === 1 && <ContactInfo />}
                        {currentStep === 2 && <LocationFinder />}
                        {currentStep === 3 && <FenceDrawer />}
                        {currentStep === 4 && <MaterialSelect />}
                        {currentStep === 5 && <QuoteSummary />}
                    </div>
                </div>
            </div>
        </div>
    );
}
