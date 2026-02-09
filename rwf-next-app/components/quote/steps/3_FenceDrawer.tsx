'use client';

import { useQuoteStore } from '@/store/quoteStore';
import { GoogleMap, DrawingManager, Marker } from '@react-google-maps/api';
import { useState, useCallback, useRef, useEffect } from 'react';
import GoogleMapWrapper from '../GoogleMapWrapper';
import { ChevronRight, Undo, Eraser, MapPin } from 'lucide-react';
import styles from '../Quote.module.css';

const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '0.75rem',
};

// Custom SVG Icons - Stylish Version
// Single Gate: Blue circle with a detailed white gate icon
const iconSingleGate = {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#2563eb" stroke="white" stroke-width="2"/><g transform="translate(10, 10)"><path d="M4 2v16M16 2v16M4 6h12M4 14h12M4 2L16 18" stroke="white" stroke-width="2" stroke-linecap="round"/></g></svg>'),
    scaledSize: { width: 40, height: 40 },
    anchor: { x: 20, y: 20 }
};

// Double Gate: Purple circle with a detailed double gate icon
const iconDoubleGate = {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#9333ea" stroke="white" stroke-width="2"/><g transform="translate(7, 10)"><path d="M2 2v16M11 2v16M2 6h9M2 14h9M2 2L11 18" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M15 2v16M24 2v16M15 6h9M15 14h9M24 2L15 18" stroke="white" stroke-width="1.5" stroke-linecap="round"/></g></svg>'),
    scaledSize: { width: 40, height: 40 },
    anchor: { x: 20, y: 20 }
};

// Options for the drawing manager
const drawingOptions = {
    drawingControl: true,
    drawingControlOptions: {
        position: 2, // google.maps.ControlPosition.TOP_CENTER
        drawingModes: ['polyline'] as google.maps.drawing.OverlayType[],
    },
    polylineOptions: {
        strokeColor: '#d4af37',
        strokeWeight: 4,
        editable: true,
        draggable: true,
    },
};

export default function FenceDrawer() {
    const { formData, updateFormData, setStep } = useQuoteStore();
    const [map, setMap] = useState<google.maps.Map | null>(null);

    // We keep track of the Polyline object to calculate length
    const polylineRef = useRef<google.maps.Polyline | null>(null);
    const [footage, setFootage] = useState<number>(formData.linearFootage || 0);

    // Gate state (stored as markers now)
    const [gateMarkers, setGateMarkers] = useState<{ type: 'single' | 'double'; lat: number; lng: number }[]>(formData.gateMarkers || []);
    const [gateMode, setGateMode] = useState<'none' | 'single' | 'double'>('none');

    // Drawing Manager Ref
    const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);

    // Center map on user's selected location
    const center = {
        lat: formData.lat || 35.052664,
        lng: formData.lng || -78.878358
    };

    const onLoadMap = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const calculateLength = (polyline: google.maps.Polyline) => {
        const path = polyline.getPath();
        const lengthInMeters = google.maps.geometry.spherical.computeLength(path);
        const lengthInFeet = Math.round(lengthInMeters * 3.28084);
        setFootage(lengthInFeet);
        updateFormData({ linearFootage: lengthInFeet });
    };

    // Initialize Helper Ref for listener cleanup
    const listenerRef = useRef<google.maps.MapsEventListener | null>(null);

    // Manually manage DrawingManager lifecycle to prevent duplicates
    useEffect(() => {
        if (!map || typeof google === 'undefined') return;

        // Create new instance
        const dm = new google.maps.drawing.DrawingManager(drawingOptions);

        // Set map immediately
        dm.setMap(map);

        // Save to state so other effects can use it (like gateMode toggling)
        setDrawingManager(dm);

        // Add Listener
        const listener = google.maps.event.addListener(dm, 'polylinecomplete', (polyline: google.maps.Polyline) => {
            onPolylineComplete(polyline);
        });
        listenerRef.current = listener;

        // Cleanup function
        return () => {
            if (listenerRef.current) {
                google.maps.event.removeListener(listenerRef.current);
            }
            dm.setMap(null);
            setDrawingManager(null);
        };
    }, [map]); // Only re-run if map instance changes

    // Handle Gate Mode Toggling (updates existing drawingManager & polyline clickability)
    useEffect(() => {
        // Toggle Polyline clickability to allow map clicks (and snapping) to work THROUGH the line
        if (polylineRef.current) {
            polylineRef.current.setOptions({
                clickable: gateMode === 'none', // Not clickable in gate mode => clicks fall through to map
                editable: gateMode === 'none',  // Optional: disable editing handles while placing gates to reduce clutter
                draggable: gateMode === 'none'
            });
        }

        if (!drawingManager) return;

        if (gateMode !== 'none') {
            drawingManager.setDrawingMode(null);
            drawingManager.setOptions({ drawingControl: false });
        } else {
            drawingManager.setOptions({ drawingControl: true });
        }
    }, [gateMode, drawingManager]);


    const onPolylineComplete = (polyline: google.maps.Polyline) => {
        if (polylineRef.current) {
            polylineRef.current.setMap(null);
        }
        polylineRef.current = polyline;

        calculateLength(polyline);

        // Stop drawing mode
        if (drawingManager) {
            drawingManager.setDrawingMode(null);
            // Re-enable drawing control but keep mode null so user can choose to draw again if needed
            drawingManager.setOptions({ drawingControl: true });
        }

        // Listen for updates
        google.maps.event.addListener(polyline.getPath(), 'set_at', () => calculateLength(polyline));
        google.maps.event.addListener(polyline.getPath(), 'insert_at', () => calculateLength(polyline));
        google.maps.event.addListener(polyline.getPath(), 'remove_at', () => calculateLength(polyline));
    };

    // Helper: Find closest point on a line segment defined by A and B to point P
    const getClosestPointOnSegment = (p: { lat: number, lng: number }, a: { lat: number, lng: number }, b: { lat: number, lng: number }) => {
        const x = p.lng;
        const y = p.lat;
        const x1 = a.lng;
        const y1 = a.lat;
        const x2 = b.lng;
        const y2 = b.lat;

        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        let param = -1;

        if (len_sq !== 0) // in case of 0 length line
            param = dot / len_sq;

        let xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        return { lat: yy, lng: xx };
    };

    // Threshold for snapping in degrees (approx 10 meters) - Balanced for mobile
    const SNAP_THRESHOLD = 0.0001;

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (gateMode !== 'none' && e.latLng) {
            let lat = e.latLng.lat();
            let lng = e.latLng.lng();

            // S N A P   L O G I C
            if (polylineRef.current) {
                const path = polylineRef.current.getPath();
                const numPoints = path.getLength();

                if (numPoints > 1) {
                    let minDistance = Number.MAX_VALUE;
                    let closestPoint = { lat, lng };

                    for (let i = 0; i < numPoints - 1; i++) {
                        const a = path.getAt(i);
                        const b = path.getAt(i + 1);

                        const pA = { lat: a.lat(), lng: a.lng() };
                        const pB = { lat: b.lat(), lng: b.lng() };
                        const pClick = { lat, lng };

                        const snapped = getClosestPointOnSegment(pClick, pA, pB);

                        // Simple Euclidean distance in lat/lng space (sufficient for small scale snapping)
                        const storeDist = Math.sqrt(Math.pow(snapped.lat - lat, 2) + Math.pow(snapped.lng - lng, 2));

                        if (storeDist < minDistance) {
                            minDistance = storeDist;
                            closestPoint = snapped;
                        }
                    }

                    // If within threshold, snap!
                    if (minDistance < SNAP_THRESHOLD) {
                        lat = closestPoint.lat;
                        lng = closestPoint.lng;
                    }
                }
            }

            const newMarker = {
                type: gateMode,
                lat: lat,
                lng: lng
            };
            const newMarkers = [...gateMarkers, newMarker];
            setGateMarkers(newMarkers);
            updateFormData({ gateMarkers: newMarkers });
        }
    };

    const removeGate = (index: number) => {
        const newMarkers = gateMarkers.filter((_, i) => i !== index);
        setGateMarkers(newMarkers);
        updateFormData({ gateMarkers: newMarkers });
    };

    const handleUndo = () => {
        if (polylineRef.current) {
            const path = polylineRef.current.getPath();
            if (path.getLength() > 0) {
                path.removeAt(path.getLength() - 1);
                calculateLength(polylineRef.current);

                // If we undo all points, reset gate mode so user can draw again
                if (path.getLength() === 0) {
                    setGateMode('none');
                }
            }
        }
    };

    const handleClear = () => {
        if (polylineRef.current) {
            polylineRef.current.setMap(null);
            polylineRef.current = null;
            setFootage(0);
            updateFormData({ linearFootage: 0 });
        }
        setGateMarkers([]);
        updateFormData({ gateMarkers: [] });
        setGateMode('none'); // Ensure we exit gate mode so drawing is re-enabled
    };

    const handleNext = () => {
        if (footage > 0) {
            setStep(4);
        }
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={styles.headerContainer}>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Draw Your Fence</h2>
                <div className="text-gray-600 text-lg space-y-1">
                    <p>1. Click to add points. <strong>Double-click</strong> to finish your fence line.</p>
                    <p>2. Select a <strong>Gate Tool</strong> to place gates on the line.</p>
                </div>
            </div>

            <div className={styles.centeredLayout}>
                {/* Controls Toolbar - Transparent & Borderless as requested */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-2 bg-transparent">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setGateMode(gateMode === 'single' ? 'none' : 'single')}
                            className={`px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2 transition-all ${gateMode === 'single'
                                ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {/* Stylish Single Gate Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4v16M16 4v16M4 8h12M4 16h12M4 4L16 20" />
                            </svg>
                            <span className="font-bold">Single Gate</span>
                        </button>

                        <button
                            onClick={() => setGateMode(gateMode === 'double' ? 'none' : 'double')}
                            className={`px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2 transition-all ${gateMode === 'double'
                                ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-300'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {/* Stylish Double Gate Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 4v16M9 4v16M2 8h7M2 16h7M2 4L9 20" />
                                <path d="M15 4v16M22 4v16M15 8h7M15 16h7M22 4L15 20" />
                            </svg>
                            <span className="font-bold">Double Gate</span>
                        </button>
                    </div>

                    <div className="bg-[#1e293b] text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-3">
                        <div className="text-xs uppercase tracking-wider text-gray-400">Total</div>
                        <div className="text-2xl font-bold text-[#d4af37]">{footage} <span className="text-sm font-normal text-white">ft</span></div>
                    </div>
                </div>

                <GoogleMapWrapper>
                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100 relative">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={19}
                            onLoad={onLoadMap}
                            onClick={onMapClick}
                            options={{
                                mapTypeId: 'satellite',
                                tilt: 0,
                                disableDefaultUI: true,
                                draggableCursor: gateMode !== 'none' ? 'crosshair' : undefined
                            }}
                        >
                            {/* User's Home Marker */}
                            <Marker position={center} />

                            {/* Gate Markers */}
                            {gateMarkers.map((gate, index) => (
                                <Marker
                                    key={index}
                                    position={{ lat: gate.lat, lng: gate.lng }}
                                    // @ts-ignore
                                    icon={gate.type === 'single' ? iconSingleGate : iconDoubleGate}
                                    title={`Click to remove ${gate.type} gate`}
                                    onClick={() => removeGate(index)}
                                />
                            ))}
                        </GoogleMap>

                        {/* Active Mode Banner */}
                        {gateMode !== 'none' && (
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-pulse z-10">
                                Click map to place {gateMode} gate
                            </div>
                        )}

                        {/* Floating Controls */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <button
                                onClick={handleUndo}
                                className="bg-white p-3 rounded-full shadow-lg text-gray-700 hover:text-[#d4af37] hover:bg-gray-50 transition-colors"
                                title="Undo Last Point"
                            >
                                <Undo size={20} />
                            </button>
                            <button
                                onClick={handleClear}
                                className="bg-white p-3 rounded-full shadow-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Clear All"
                            >
                                <Eraser size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleNext}
                            disabled={footage === 0}
                            className="bg-[#1e293b] hover:bg-[#334155] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Select Materials <ChevronRight size={22} />
                        </button>
                    </div>
                </GoogleMapWrapper>
            </div>
        </div>
    );
}
