import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the file path for leads
const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');

// Interface for type safety (optional but good practice)
interface LeadData {
    id: string;
    submittedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    projectDetails: {
        fenceType: string;
        fenceGrade?: string;
        fenceStyle: string;
        fenceHeight: string;
        linearFootage: number;
        gates: {
            single: number;
            double: number;
        };
        estimatedPrice: {
            min: number;
            max: number;
        };
        mapDeepLink?: string; // Future proofing
    };
    intent: 'pricing_view' | 'consultation_request';
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.firstName || !body.email || !body.linearFootage) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Bot Protection Checks
        // 1. Honeypot Check
        if (body.honeyPot) {
            // Silently fail (return success to fool bot)
            console.log('Bot detected via honeypot:', body.email);
            return NextResponse.json({ success: true, message: 'Lead captured successfully' });
        }

        // 2. Referer Check (Optional but good)
        const referer = request.headers.get('referer');
        const origin = request.headers.get('origin');
        const host = request.headers.get('host'); // e.g. localhost:3000

        // Ensure request is coming from our own domain (or local for dev)
        // Adjust logic if you expect external API calls
        if (referer && !referer.includes(host || 'rwfhomeimprovements')) {
            console.log('Suspicious referer:', referer);
            // Verify this isn't too strict for your deployment environment
            // return NextResponse.json({ error: 'Unauthorized source' }, { status: 403 });
        }

        // Create new lead object
        const newLead: LeadData = {
            id: crypto.randomUUID(),
            submittedAt: new Date().toISOString(),
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            address: body.address,
            projectDetails: {
                fenceType: body.fenceType,
                fenceGrade: body.fenceGrade,
                fenceStyle: body.fenceStyle,
                fenceHeight: body.fenceHeight,
                linearFootage: body.linearFootage,
                gates: body.gates || { single: 0, double: 0 },
                estimatedPrice: body.estimatedPrice || { min: 0, max: 0 }
            },
            intent: body.intent || 'pricing_view'
        };

        // Read existing leads
        let leads: LeadData[] = [];
        if (fs.existsSync(leadsFilePath)) {
            const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
            try {
                leads = JSON.parse(fileContent);
            } catch (e) {
                console.error('Error parsing leads.json', e);
            }
        }

        // Check for existing lead with same email
        const existingLeadIndex = leads.findIndex(l => l.email === newLead.email);

        if (existingLeadIndex !== -1) {
            // Update existing lead (UPSERT)
            // We preserve the original ID but update all details including intent
            leads[existingLeadIndex] = {
                ...newLead,
                id: leads[existingLeadIndex].id, // Keep original ID
                // If upgrading from pricing_view to consultation_request, this effectively "moves" them down funnel
            };
        } else {
            // Add new lead
            leads.push(newLead);
        }

        // Save back to file
        fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2));

        return NextResponse.json({ success: true, message: 'Lead captured successfully', leadId: newLead.id });

    } catch (error) {
        console.error('Error processing lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        if (fs.existsSync(leadsFilePath)) {
            const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
            const leads = JSON.parse(fileContent);
            return NextResponse.json(leads);
        }
        return NextResponse.json([]);
    } catch (error) {
        console.error('Error reading leads:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
