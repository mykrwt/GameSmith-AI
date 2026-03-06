import React, { useState } from 'react';
import { Check, Zap, Users, Crown } from 'lucide-react';

const PLANS = [
    {
        name: 'Free',
        price: 0,
        period: '',
        description: 'Perfect for trying out AI game generation',
        icon: <Zap size={22} />,
        color: '#6b7280',
        features: [
            '3 games per month',
            'Basic templates (Racing, FPS)',
            'Standard generation speed',
            '720p game exports',
            'Community support',
        ],
        cta: 'Get started free',
        ctaStyle: 'ghost' as const,
    },
    {
        name: 'Pro',
        price: 19,
        period: '/mo',
        description: 'For serious indie creators and game designers',
        icon: <Crown size={22} />,
        color: '#7c3aed',
        popular: true,
        features: [
            'Unlimited games',
            'All 12+ genre templates',
            'Priority generation (3x faster)',
            '4K game exports',
            'AI chat editor',
            'Custom game domains',
            'Priority email support',
        ],
        cta: 'Start Pro trial',
        ctaStyle: 'primary' as const,
    },
    {
        name: 'Team',
        price: 49,
        period: '/mo',
        description: 'For studios and collaborative teams',
        icon: <Users size={22} />,
        color: '#ec4899',
        features: [
            'Everything in Pro',
            'Up to 10 team members',
            'Shared game library',
            'Team analytics dashboard',
            'Custom branding',
            'API access',
            'Dedicated support channel',
            'SLA guarantee',
        ],
        cta: 'Contact sales',
        ctaStyle: 'ghost' as const,
    },
];

const FAQ = [
    { q: 'Do I need any coding experience?', a: 'Absolutely not. Just describe your game idea in plain English and our AI handles everything — 3D models, physics, game logic, UI.' },
    { q: 'What types of games can I build?', a: 'Racing, FPS, platformer, puzzle, RPG, and more. Our template library is constantly growing with new genres.' },
    { q: 'Can I export or publish my games?', a: 'Yes! Every generated game runs in the browser and can be shared via a unique URL or exported as a standalone web app.' },
    { q: 'Is there a free trial for Pro?', a: 'Yes — every new account gets a 7-day Pro trial with no credit card required.' },
];

const PricingPage = () => {
    const [annual, setAnnual] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <div className="bg-mesh" />

            {/* Header */}
            <div style={{ padding: '80px 24px 48px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary-2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Pricing
                </p>
                <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', margin: '0 0 16px', letterSpacing: '-0.04em' }}>
                    Simple,{' '}
                    <span className="text-gradient">transparent</span>
                    {' '}pricing
                </h1>
                <p style={{ color: 'var(--color-text-2)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.6 }}>
                    Start for free. Scale as you grow.
                </p>

                {/* Annual toggle */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '12px',
                    padding: '6px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '99px',
                }}>
                    {['Monthly', 'Annual'].map((t, i) => (
                        <button
                            key={t}
                            onClick={() => setAnnual(i === 1)}
                            style={{
                                padding: '8px 20px', borderRadius: '99px',
                                background: annual === (i === 1) ? 'var(--gradient-brand)' : 'transparent',
                                border: 'none', color: 'white', cursor: 'pointer',
                                fontSize: '14px', fontWeight: 600, transition: 'all 0.2s',
                            }}
                        >
                            {t}
                            {i === 1 && (
                                <span style={{
                                    marginLeft: '6px', fontSize: '11px',
                                    background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '99px',
                                }}>
                                    −20%
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pricing cards */}
            <div style={{
                maxWidth: '1100px', margin: '0 auto',
                padding: '0 24px 80px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                position: 'relative', zIndex: 1,
            }}>
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className={`card ${plan.popular ? 'pricing-card-popular' : ''}`}
                        style={{
                            display: 'flex', flexDirection: 'column',
                            padding: '32px',
                            position: 'relative',
                        }}
                    >
                        {plan.popular && (
                            <div style={{
                                position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                                padding: '4px 16px',
                                background: 'var(--gradient-brand)',
                                borderRadius: '99px',
                                fontSize: '12px', fontWeight: 700, color: 'white',
                                whiteSpace: 'nowrap',
                            }}>
                                ✦ Most Popular
                            </div>
                        )}

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '13px',
                                background: `${plan.color}20`,
                                border: `1px solid ${plan.color}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: plan.color, marginBottom: '16px',
                            }}>
                                {plan.icon}
                            </div>
                            <h3 style={{ fontSize: '22px', margin: '0 0 6px', fontFamily: 'Space Grotesk' }}>{plan.name}</h3>
                            <p style={{ color: 'var(--color-text-2)', fontSize: '14px', margin: '0 0 20px', lineHeight: 1.5 }}>{plan.description}</p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '44px', fontWeight: 800, fontFamily: 'Space Grotesk', letterSpacing: '-0.04em' }}>
                                    ${annual ? Math.round(plan.price * 0.8) : plan.price}
                                </span>
                                {plan.period && (
                                    <span style={{ color: 'var(--color-text-3)', fontSize: '15px' }}>{plan.period}</span>
                                )}
                            </div>
                            {annual && plan.price > 0 && (
                                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4ade80' }}>
                                    Save ${Math.round(plan.price * 0.2 * 12)}/year
                                </p>
                            )}
                        </div>

                        <button
                            className={plan.ctaStyle === 'primary' ? 'btn-primary' : 'btn-ghost'}
                            style={{ width: '100%', marginBottom: '28px', justifyContent: 'center', borderRadius: '12px', padding: '13px' }}
                        >
                            {plan.cta}
                        </button>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {plan.features.map((f, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-text-2)' }}>
                                    <Check size={15} style={{ color: plan.color, flexShrink: 0, marginTop: '2px' }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* FAQ */}
            <div style={{
                maxWidth: '720px', margin: '0 auto',
                padding: '0 24px 100px',
                position: 'relative', zIndex: 1,
            }}>
                <h2 style={{ fontSize: '36px', textAlign: 'center', margin: '0 0 48px', letterSpacing: '-0.03em' }}>
                    Frequently asked questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {FAQ.map((faq, i) => (
                        <button
                            key={i}
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            style={{
                                display: 'flex', flexDirection: 'column',
                                padding: '20px 24px',
                                borderRadius: '12px',
                                border: `1px solid ${openFaq === i ? 'var(--color-border-hover)' : 'var(--color-border)'}`,
                                background: openFaq === i ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                marginBottom: '4px',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>{faq.q}</span>
                                <span style={{
                                    fontSize: '20px', color: 'var(--color-text-3)',
                                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s',
                                    lineHeight: 1, marginLeft: '16px', flexShrink: 0,
                                }}>
                                    +
                                </span>
                            </div>
                            {openFaq === i && (
                                <p style={{ margin: '12px 0 0', color: 'var(--color-text-2)', fontSize: '15px', lineHeight: 1.65 }}>
                                    {faq.a}
                                </p>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
