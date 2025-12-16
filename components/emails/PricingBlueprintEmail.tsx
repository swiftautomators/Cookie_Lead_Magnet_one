import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Row,
    Column,
    Heading,
    Text,
    Button,
    Link,
    Hr,
} from '@react-email/components';
import * as React from 'react';

interface PricingBlueprintEmailProps {
    userName: string;
    location: string;
    skillLevel: string;
    complexity: string;
    orderQuantity: number;
    pricing: {
        perCookieLow: number;
        perCookieHigh: number;
        totalLow: number;
        totalHigh: number;
        sweetSpot: number;
    };
    market: {
        localAverage: number;
    };
}

export default function PricingBlueprintEmail({
    userName = "Andre",
    location = "Dallas, TX",
    skillLevel = "Seasoned",
    complexity = "Avreage",
    orderQuantity = 48,
    pricing = {
        perCookieLow: 6.00,
        perCookieHigh: 7.50,
        totalLow: 288,
        totalHigh: 360,
        sweetSpot: 6.75
    },
    market = {
        localAverage: 5.50
    }
}: PricingBlueprintEmailProps) {
    const previewText = `Your $${pricing.perCookieLow.toFixed(2)}-$${pricing.perCookieHigh.toFixed(2)} pricing blueprint for ${location} is ready`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* HEADER */}
                    <Section style={header}>
                        <Heading style={logoText}>🍪 CookieCraft AI</Heading>
                        <Text style={headerSub}>Your Pricing Blueprint</Text>
                        <div style={badge}>For: {location}</div>
                    </Section>

                    {/* GREETING */}
                    <Section style={section}>
                        <Text style={text}>Hi {userName},</Text>
                        <Text style={text}>
                            Your cottage food hustle deserves profitable pricing. We analyzed the <strong>{location}</strong> market against your skill level and here's what the data says:
                        </Text>
                    </Section>

                    {/* PRICING CARD */}
                    <Section style={card}>
                        <Text style={cardTitle}>YOUR RECOMMENDED PRICING</Text>

                        <Row style={{ marginBottom: '16px' }}>
                            <Column align="center">
                                <Text style={priceLarge}>
                                    ${pricing.perCookieLow.toFixed(2)} - ${pricing.perCookieHigh.toFixed(2)}
                                </Text>
                                <Text style={perCookieLabel}>per cookie</Text>
                            </Column>
                        </Row>

                        <Section style={sweetSpotBox}>
                            <Text style={sweetSpotText}>🎯 Sweet Spot: ${pricing.sweetSpot.toFixed(2)}</Text>
                        </Section>

                        <Hr style={divider} />

                        <Text style={totalText}>
                            Total for {orderQuantity} cookies: <strong>${pricing.totalLow} - ${pricing.totalHigh}</strong>
                        </Text>
                    </Section>

                    {/* WHY THIS WORKS */}
                    <Section style={section}>
                        <Heading as="h3" style={subHeading}>WHY THIS PRICING WORKS FOR YOU:</Heading>

                        <Row style={insightRow}>
                            <Column>
                                <Text style={insightTitle}>📍 {location} Market Position</Text>
                                <Text style={text}>
                                    Your pricing sits above the local average (${market.localAverage.toFixed(2)}) but remains highly competitive for custom work.
                                </Text>
                            </Column>
                        </Row>

                        <Row style={insightRow}>
                            <Column>
                                <Text style={insightTitle}>👨‍🍳 Your Skill Level ({skillLevel})</Text>
                                <Text style={text}>
                                    Your artistry with 2-3 color designs and moderate intricacies commands premium rates.
                                </Text>
                            </Column>
                        </Row>

                        <Row style={insightRow}>
                            <Column>
                                <Text style={insightTitle}>🎨 Design Complexity ({complexity})</Text>
                                <Text style={text}>
                                    Detailed work per order means your time is valuable. Don't undersell your labor.
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    {/* HIDDEN COST */}
                    <Section style={warningBox}>
                        <Text style={warningTitle}>⚠️ THE HIDDEN COST KILLING YOUR MARGINS</Text>
                        <Text style={text}>
                            Most cookieteers price at $7.50 and think "Great profit!" But if you spend 3-4 hours designing, your actual hourly wage drops drastically.
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#b91c1c', marginBottom: '8px', fontWeight: 'bold' }}>
                            ⚠️ You&apos;re losing money on:
                        </Text>
                        <Text style={{ ...text, marginTop: '16px', fontStyle: 'italic', color: '#4b5563' }}>
                            Our Full Dashboard tracks all of this automatically. Just sayin&apos;. 😉
                        </Text>
                    </Section>

                    {/* CTA */}
                    <Section style={ctaSection}>
                        <Heading as="h3" style={ctaHeading}>READY TO 10X YOUR EFFICIENCY?</Heading>
                        <Text style={text}>
                            CookieCraft AI turns design time from hours to minutes:
                        </Text>
                        <ul style={list}>
                            <li>✓ AI-generated custom designs (30 sec)</li>
                            <li>✓ Perfect color formulas (95% accuracy)</li>
                            <li>✓ Automated production timelines</li>
                            <li>✓ Client mockups & previews</li>
                        </ul>
                        <Button
                            href="https://cookiecraftai.com"
                            style={button}
                        >
                            🚀 See How It Works →
                        </Button>
                    </Section>

                    {/* FOOTER */}
                    <Section style={footer}>
                        <Text style={footerText}>Happy baking! 🍪</Text>
                        <Text style={footerText}>The CookieCraft Team</Text>
                        <Link href="mailto:office@cookiecraftai.com" style={footerLink}>office@cookiecraftai.com</Link>

                        <Hr style={footerDivider} />

                        <Text style={footerSmall}>
                            P.S. Over 2,800 cookieteers have discovered their perfect pricing.
                        </Text>
                        <Link href="https://cookiecraftai.com" style={footerLink}>CookieCraftAI.com</Link>
                        <Text style={footerSmall}>
                            <Link href="#" style={footerLink}>Unsubscribe</Link> • <Link href="#" style={footerLink}>Update Preferences</Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// STYLES
const main = {
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '0',
    maxWidth: '600px',
    borderRadius: '8px',
    overflow: 'hidden',
};

const header = {
    backgroundColor: '#F5DEB3', // Cookie-like color
    padding: '30px 20px',
    textAlign: 'center' as const,
    backgroundImage: 'linear-gradient(135deg, #F5DEB3 0%, #FFF9F0 100%)',
};

const logoText = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#8B4513',
    margin: '0 0 10px',
};

const headerSub = {
    fontSize: '16px',
    color: '#8B4513',
    margin: '0 0 15px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const badge = {
    display: 'inline-block',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: '4px 12px',
    borderRadius: '16px',
    color: '#8B4513',
    fontSize: '14px',
    fontWeight: 'bold',
};

const section = {
    padding: '30px 40px',
};

const text = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4B5563',
    margin: '0 0 16px',
};

const card = {
    backgroundColor: '#FFF9F0',
    border: '2px solid #E91E8C', // CookieCraft Pink
    borderRadius: '12px',
    padding: '24px',
    margin: '0 20px 30px',
    textAlign: 'center' as const,
};

const cardTitle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#E91E8C',
    margin: '0 0 20px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const priceLarge = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: '0',
};

const perCookieLabel = {
    fontSize: '14px',
    color: '#6B7280',
    margin: '4px 0 0',
};

const sweetSpotBox = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '8px 16px',
    display: 'inline-block',
    margin: '16px 0',
};

const sweetSpotText = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#E91E8C',
    margin: '0',
};

const divider = {
    borderColor: '#E91E8C',
    margin: '20px 0',
    opacity: 0.2,
};

const totalText = {
    fontSize: '16px',
    color: '#4B5563',
    margin: '0',
};

const subHeading = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: '0 0 24px',
};

const insightRow = {
    marginBottom: '20px',
};

const insightTitle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: '0 0 8px',
};

const warningBox = {
    backgroundColor: '#FEF2F2',
    padding: '30px 40px',
    borderLeft: '4px solid #EF4444',
};

const warningTitle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#991B1B',
    margin: '0 0 16px',
    textTransform: 'uppercase' as const,
};

const ctaSection = {
    padding: '40px',
    textAlign: 'center' as const,
    backgroundColor: '#ffffff',
};

const ctaHeading = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: '0 0 16px',
};

const list = {
    listStyleType: 'none',
    padding: '0',
    textAlign: 'left' as const,
    marginBottom: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '300px',
    color: '#4B5563',
    fontSize: '16px',
    lineHeight: '2',
};

const button = {
    backgroundColor: '#E91E8C',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '16px 32px',
    boxShadow: '0 4px 6px rgba(233, 30, 140, 0.25)',
};

const footer = {
    backgroundColor: '#F3F4F6',
    padding: '30px 40px',
    textAlign: 'center' as const,
};

const footerText = {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 8px',
};

const footerLink = {
    color: '#6B7280',
    textDecoration: 'underline',
};

const footerDivider = {
    borderColor: '#D1D5DB',
    margin: '20px 0',
};

const footerSmall = {
    fontSize: '12px',
    color: '#9CA3AF',
    margin: '0 0 8px',
};
