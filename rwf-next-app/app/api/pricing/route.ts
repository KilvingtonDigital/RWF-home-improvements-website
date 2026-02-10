import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Default pricing if none exists in DB
// Default pricing with granular control
const DEFAULT_PRICING = {
    id: 1,
    name: 'default',
    // New structure: Material -> Style -> Height -> Price per ft
    fences: {
        'Wood': {
            'Privacy': { '4 ft': 23, '5 ft': 25, '6 ft': 28, '8 ft': 35 },
            'Picket': { '4 ft': 20, '5 ft': 22, '6 ft': 25, '8 ft': 32 },
            'Split Rail': { '4 ft': 15, '5 ft': 16, '6 ft': 18, '8 ft': 22 },
            'Shadowbox': { '4 ft': 26, '5 ft': 29, '6 ft': 32, '8 ft': 38 },
            'Board-on-Board': { '4 ft': 28, '5 ft': 31, '6 ft': 35, '8 ft': 42 }
        },
        'Vinyl': {
            'Privacy': { '4 ft': 30, '5 ft': 34, '6 ft': 38, '8 ft': 55 },
            'Picket': { '4 ft': 28, '5 ft': 31, '6 ft': 35, '8 ft': 45 },
            'Ranch Rail': { '4 ft': 18, '5 ft': 20, '6 ft': 22, '8 ft': 28 },
            'Semi-Privacy': { '4 ft': 32, '5 ft': 36, '6 ft': 40, '8 ft': 58 }
        },
        'Aluminum': {
            'Classical Ornamental': { '4 ft': 32, '5 ft': 38, '6 ft': 45 },
            '2-Rail': { '4 ft': 25, '5 ft': 30, '6 ft': 36 },
            '3-Rail': { '4 ft': 28, '5 ft': 34, '6 ft': 40 },
            'Puppy Picket': { '4 ft': 35, '5 ft': 42, '6 ft': 48 }
        },
        'Chain Link': {
            'Galvanized': { '4 ft': 15, '5 ft': 18, '6 ft': 22, '8 ft': 28 },
            'Black Vinyl Coated': { '4 ft': 18, '5 ft': 22, '6 ft': 26, '8 ft': 32 }
        }
    },
    gates: { 'single': 300, 'double': 500 },
    options: {
        'commercial_multiplier': 1.3
    }
};

export async function GET() {
    try {
        let pricing = await prisma.pricing.findUnique({
            where: { name: 'default' }
        });

        // Migration Check: Detect if we are missing the new '5 ft' options
        // This heuristic checks if Wood -> Privacy has '5 ft'. If not, we re-seed to get the new defaults.
        const needsMigration = pricing?.fences?.['Wood']?.['Privacy']?.['5 ft'] === undefined;

        // Initialize with default if missing, or if structure is old (simple number values), or migration needed
        if (!pricing || (pricing.fences && typeof Object.values(pricing.fences)[0] === 'number') || needsMigration) {
            console.log('Seeding or migrating pricing data...');

            // Delete old valid if it exists but is wrong shape or missing keys
            if (pricing) {
                await prisma.pricing.delete({ where: { name: 'default' } });
            }

            pricing = await prisma.pricing.create({
                data: {
                    name: 'default',
                    fences: DEFAULT_PRICING.fences,
                    gates: DEFAULT_PRICING.gates,
                    // We might need to add 'options' to the schema if strict, but JSON field allows flexible data
                }
            });
        }

        return NextResponse.json(pricing);
    } catch (error) {
        console.error('Error fetching pricing:', error);
        return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.fences || !body.gates) {
            return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
        }

        const pricing = await prisma.pricing.upsert({
            where: { name: 'default' },
            update: {
                fences: body.fences,
                gates: body.gates,
                // Ensure options are preserved/updated if passed
                // For now, if body has it fine, if not we keep existing or default?
                // The current admin page sends the whole object, so it should be fine.
            },
            create: {
                name: 'default',
                fences: body.fences,
                gates: body.gates
            }
        });

        return NextResponse.json({ success: true, message: 'Pricing updated', data: pricing });
    } catch (error) {
        console.error('Error updating pricing:', error);
        return NextResponse.json({ error: 'Failed to update pricing' }, { status: 500 });
    }
}
