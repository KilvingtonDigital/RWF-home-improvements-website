import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.firstName || !body.email || !body.linearFootage) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Bot Protection Checks
        if (body.honeyPot) {
            console.log('Bot detected via honeypot:', body.email);
            return NextResponse.json({ success: true, message: 'Lead captured successfully' });
        }

        // Referer Check (Optional)
        const referer = request.headers.get('referer');
        const host = request.headers.get('host');
        if (referer && !referer.includes(host || 'rwfhomeimprovements')) {
            console.log('Suspicious referer:', referer);
        }

        // UPSERT LEAD using Email as unique key
        // Map nested JSON fields to Flat DB Schema
        const lead = await prisma.lead.upsert({
            where: { email: body.email },
            update: {
                firstName: body.firstName,
                lastName: body.lastName,
                phone: body.phone,
                address: body.address,
                fenceType: body.fenceType,
                fenceGrade: body.fenceGrade,
                fenceStyle: body.fenceStyle,
                fenceHeight: body.fenceHeight,
                linearFootage: parseFloat(body.linearFootage),
                gates: body.gates || { single: 0, double: 0 },
                estimatedPriceMin: body.estimatedPrice?.min || 0,
                estimatedPriceMax: body.estimatedPrice?.max || 0,
                intent: body.intent || 'pricing_view',
                status: 'new' // Reset status on new submission? Or keep? Let's just update info.
            },
            create: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                address: body.address,
                fenceType: body.fenceType,
                fenceGrade: body.fenceGrade,
                fenceStyle: body.fenceStyle,
                fenceHeight: body.fenceHeight,
                linearFootage: parseFloat(body.linearFootage),
                gates: body.gates || { single: 0, double: 0 },
                estimatedPriceMin: body.estimatedPrice?.min || 0,
                estimatedPriceMax: body.estimatedPrice?.max || 0,
                intent: body.intent || 'pricing_view',
                source: 'quote_wizard',
                status: 'new'
            }
        });

        return NextResponse.json({ success: true, message: 'Lead captured successfully', leadId: lead.id });

    } catch (error) {
        console.error('Error processing lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Transform DB flat structure back to Nested JSON for Frontend compatibility
        const transformedLeads = leads.map(lead => ({
            id: lead.id.toString(),
            submittedAt: lead.createdAt.toISOString(),
            firstName: lead.firstName,
            lastName: lead.lastName,
            email: lead.email,
            phone: lead.phone,
            address: lead.address,
            projectDetails: {
                fenceType: lead.fenceType,
                fenceGrade: lead.fenceGrade,
                fenceStyle: lead.fenceStyle,
                fenceHeight: lead.fenceHeight,
                linearFootage: lead.linearFootage,
                gates: lead.gates || { single: 0, double: 0 },
                estimatedPrice: {
                    min: lead.estimatedPriceMin,
                    max: lead.estimatedPriceMax
                }
            },
            intent: lead.intent,
            status: lead.status
        }));

        return NextResponse.json(transformedLeads);
    } catch (error) {
        console.error('Error reading leads:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
