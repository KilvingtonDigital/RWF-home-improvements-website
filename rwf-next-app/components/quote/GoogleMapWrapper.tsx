'use client';

import { ReactNode } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries: ("places" | "drawing" | "geometry")[] = ["places", "drawing", "geometry"];

interface GoogleMapWrapperProps {
    children: ReactNode;
}

export default function GoogleMapWrapper({ children }: GoogleMapWrapperProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries,
    });

    if (loadError) {
        return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg animate-pulse">
                <p className="text-gray-500">Loading Map...</p>
            </div>
        );
    }

    return <>{children}</>;
}
