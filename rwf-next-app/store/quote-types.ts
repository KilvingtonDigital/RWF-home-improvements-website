export type FenceType = 'Wood' | 'Vinyl' | 'Aluminum' | 'Chain Link';

export interface QuoteFormData {
    // Step 1: Contact
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    projectType: string;

    // Step 2: Location
    address: string;
    lat: number | null;
    lng: number | null;

    // Step 3: Drawing
    linearFootage: number;
    polygons: Array<{ lat: number; lng: number }[]>; // Store drawn coordinates
    gateMarkers: Array<{ type: 'single' | 'double', lat: number, lng: number }>;

    // Step 4: Design
    fenceType: FenceType | null;
    fenceGrade: string | null; // e.g. Standard, Commercial
    fenceStyle: string | null;
    fenceHeight: string | null;

    // Bot Protection
    honeyPot?: string;
}

export interface QuoteState {
    currentStep: number;
    formData: QuoteFormData;
    setStep: (step: number) => void;
    updateFormData: (data: Partial<QuoteFormData>) => void;
    resetForm: () => void;
}
