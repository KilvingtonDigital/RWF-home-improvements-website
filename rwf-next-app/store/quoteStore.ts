import { create } from 'zustand';
import { QuoteState, QuoteFormData } from './quote-types';

const initialFormData: QuoteFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    address: '',
    lat: null,
    lng: null,
    linearFootage: 0,
    polygons: [],
    gateMarkers: [],
    fenceType: null,
    fenceGrade: null,
    fenceStyle: null,
    fenceHeight: null,
};

export const useQuoteStore = create<QuoteState>((set) => ({
    currentStep: 1,
    formData: initialFormData,
    setStep: (step) => set({ currentStep: step }),
    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data },
        })),
    resetForm: () => set({ currentStep: 1, formData: initialFormData }),
}));
