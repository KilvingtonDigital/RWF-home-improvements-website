'use client';

import { useQuoteStore } from '@/store/quoteStore';
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { useState, useRef, useCallback } from 'react';

import { ChevronRight, Search } from 'lucide-react';
import GoogleMapWrapper from '../GoogleMapWrapper';
import styles from '../Quote.module.css';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.75rem',
};

const defaultCenter = {
    lat: 35.052664, // Fayetteville, NC
    lng: -78.878358,
};

export default function LocationFinder() {
    const { formData, updateFormData, setStep } = useQuoteStore();
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(
        formData.lat && formData.lng ? { lat: formData.lat, lng: formData.lng } : null
    );

    const onLoadMap = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const onLoadAutocomplete = useCallback((autocomplete: google.maps.places.Autocomplete) => {
        setAutocomplete(autocomplete);
    }, []);

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const address = place.formatted_address || '';

                setMarkerPosition({ lat, lng });
                updateFormData({ lat, lng, address });

                map?.panTo({ lat, lng });
                map?.setZoom(18); // Zoom in close for fence drawing
            }
        }
    };

    const handleNext = () => {
        if (markerPosition) {
            setStep(3);
        }
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={styles.headerContainer}>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Project Location</h2>
                <p className="text-gray-600 text-lg">Where should we build your new fence? Enter the address below.</p>
            </div>

            <div className={styles.centeredLayout}>
                <GoogleMapWrapper>
                    <div className="relative mb-8 group">
                        <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Start typing your address..."
                                    className="w-full pl-4 pr-11 py-3 rounded-lg border border-gray-200 bg-white focus:bg-white shadow-sm focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none text-base transition-all"
                                />
                                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" size={20} />
                            </div>
                        </Autocomplete>
                    </div>

                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={markerPosition || defaultCenter}
                            zoom={markerPosition ? 18 : 10}
                            onLoad={onLoadMap}
                            options={{
                                mapTypeId: 'satellite',
                                streetViewControl: false,
                                mapTypeControl: false,
                            }}
                        >
                            {markerPosition && <Marker position={markerPosition} />}
                        </GoogleMap>
                    </div>

                    <div className="mt-10 flex justify-end">
                        <button
                            onClick={handleNext}
                            disabled={!markerPosition}
                            className="bg-[#1e293b] hover:bg-[#334155] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Start Drawing Fence <ChevronRight size={22} />
                        </button>
                    </div>
                </GoogleMapWrapper>
            </div>
        </div>
    );
}
