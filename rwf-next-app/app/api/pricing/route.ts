import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'pricing.json');

// Helper to read data
const getPricingData = () => {
    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading pricing data:', error);
        // Fallback default
        return {
            fences: { 'Wood': 25, 'Vinyl': 35, 'Aluminum': 42, 'Chain Link': 18 },
            gates: { 'single': 300, 'double': 500 }
        };
    }
};

export async function GET() {
    const data = getPricingData();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate structure (basic)
        if (!body.fences || !body.gates) {
            return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
        }

        // Write to file
        fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ success: true, message: 'Pricing updated', data: body });
    } catch (error) {
        console.error('Error updating pricing:', error);
        return NextResponse.json({ error: 'Failed to update pricing' }, { status: 500 });
    }
}
