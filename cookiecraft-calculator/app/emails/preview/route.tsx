import { render } from '@react-email/render';
import PricingBlueprintEmail from '@/components/emails/PricingBlueprintEmail';
import { NextResponse } from 'next/server';

export async function GET() {
    // Generate the email HTML with explicit mock props to satisfy TS
    const emailHtml = await render(<PricingBlueprintEmail
        userName="Andre"
        location="Dallas, TX"
        skillLevel="seasoned"
        complexity="average"
        orderQuantity={48}
        pricing={{
            perCookieLow: 6.00,
            perCookieHigh: 7.50,
            totalLow: 288,
            totalHigh: 360,
            sweetSpot: 324
        }}
        market={{
            localAverage: 5.50
        }}
    />);

    return new NextResponse(emailHtml, {
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
