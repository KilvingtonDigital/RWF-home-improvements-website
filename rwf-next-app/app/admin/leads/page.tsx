'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, DollarSign } from 'lucide-react';

interface Lead {
    id: string;
    submittedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    projectDetails: {
        fenceType: string;
        fenceStyle: string;
        fenceHeight: string;
        linearFootage: number;
        gates: { single: number; double: number };
        estimatedPrice: { min: number; max: number };
    };
    intent?: 'pricing_view' | 'consultation_request';
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/leads');
            const data = await res.json();
            // Sort by newest first
            if (Array.isArray(data)) {
                setLeads(data.reverse());
            }
        } catch (error) {
            console.error('Failed to fetch leads', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
                        <p className="text-gray-500">View and manage quote submissions.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/pricing"
                            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                        >
                            <DollarSign size={18} /> Manage Pricing
                        </Link>
                        <button
                            onClick={fetchLeads}
                            className="bg-[#d4af37] text-white px-4 py-2 rounded-lg hover:bg-[#b5952f] flex items-center gap-2"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Stage</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Project</th>
                                    <th className="p-4">Details</th>
                                    <th className="p-4">Est. Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">Loading leads...</td>
                                    </tr>
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">No leads found yet.</td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                                                {new Date(lead.submittedAt).toLocaleDateString()} <br />
                                                <span className="text-xs text-gray-400">{new Date(lead.submittedAt).toLocaleTimeString()}</span>
                                            </td>
                                            <td className="p-4">
                                                {lead.intent === 'consultation_request' ? (
                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold border border-green-200">
                                                        High Intent
                                                    </span>
                                                ) : (
                                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium border border-gray-200">
                                                        Browsing
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="font-bold text-gray-900">{lead.firstName} {lead.lastName}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-[200px]" title={lead.address}>{lead.address}</div>
                                            </td>
                                            <td className="p-4 text-sm">
                                                <div className="text-gray-900">{lead.phone}</div>
                                                <Link href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">{lead.email}</Link>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold mb-1">
                                                    {lead.projectDetails.fenceType}
                                                </span>
                                                <div className="text-sm text-gray-600">{lead.projectDetails.fenceStyle}</div>
                                                <div className="text-xs text-gray-500">{lead.projectDetails.fenceHeight}</div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-700">
                                                <div className="font-semibold">{lead.projectDetails.linearFootage} ft</div>
                                                <div className="text-xs text-gray-500">
                                                    {lead.projectDetails.gates.single} Single, {lead.projectDetails.gates.double} Double
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-green-700 font-bold">
                                                    ${lead.projectDetails.estimatedPrice.min.toLocaleString()} - ${lead.projectDetails.estimatedPrice.max.toLocaleString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
