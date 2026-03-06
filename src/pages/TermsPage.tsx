import { Shield, Scale, AlertCircle } from 'lucide-react';

const TermsPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            <header style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontFamily: 'Space Grotesk',
                    fontWeight: 700,
                    margin: 0,
                }}>Terms of Service</h1>
                <a href="/" style={{
                    color: 'var(--color-text-2)',
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                   onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-2)'}>
                    ← Back to Home
                </a>
            </header>

            <main style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '60px 24px',
            }}>
                <section style={{ marginBottom: '48px' }}>
                    <h2 style={{
                        fontSize: '32px',
                        marginBottom: '16px',
                        color: 'white',
                    }}>Terms of Service</h2>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginBottom: '24px',
                    }}>
                        Welcome to GameSmith AI. These Terms of Service ("Terms") govern your use of our platform and services. By accessing or using GameSmith AI, you agree to be bound by these Terms.
                    </p>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                    }}>
                        Last updated: January 2026
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Shield size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 style={{
                            fontSize: '24px',
                            margin: 0,
                            color: 'white',
                        }}>1. Acceptance of Terms</h3>
                    </div>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                    }}>
                        By creating an account and using GameSmith AI, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use our services.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Scale size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 style={{
                            fontSize: '24px',
                            margin: 0,
                            color: 'white',
                        }}>2. User Responsibilities</h3>
                    </div>
                    <ul style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        paddingLeft: '20px',
                    }}>
                        <li style={{ marginBottom: '12px' }}>You must be at least 13 years old to use GameSmith AI</li>
                        <li style={{ marginBottom: '12px' }}>You are responsible for maintaining the security of your account</li>
                        <li style={{ marginBottom: '12px' }}>You agree not to use our services for any illegal or unauthorized purpose</li>
                        <li style={{ marginBottom: '12px' }}>You must not generate content that violates copyright laws, contains hate speech, or is harmful to others</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <AlertCircle size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 style={{
                            fontSize: '24px',
                            margin: 0,
                            color: 'white',
                        }}>3. Intellectual Property</h3>
                    </div>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        marginBottom: '12px',
                    }}>
                        Games generated using GameSmith AI belong to you. You retain all rights to the games you create through our platform.
                    </p>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                    }}>
                        GameSmith AI's technology, software, and platform are protected by intellectual property laws. You may not copy, modify, or distribute our proprietary technology.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h3 style={{
                        fontSize: '24px',
                        marginBottom: '16px',
                        color: 'white',
                    }}>4. Service Availability</h3>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                    }}>
                        We strive to maintain 99.9% uptime but do not guarantee uninterrupted access to our services. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h3 style={{
                        fontSize: '24px',
                        marginBottom: '16px',
                        color: 'white',
                    }}>5. Limitation of Liability</h3>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                    }}>
                        GameSmith AI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount you paid for our services in the twelve months preceding the claim.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h3 style={{
                        fontSize: '24px',
                        marginBottom: '16px',
                        color: 'white',
                    }}>6. Termination</h3>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                    }}>
                        We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion. You may also terminate your account at any time through your account settings.
                    </p>
                </section>

                <section style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                }}>
                    <h3 style={{
                        fontSize: '24px',
                        marginBottom: '16px',
                        color: 'white',
                    }}>7. Contact Us</h3>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginBottom: '12px',
                    }}>
                        If you have questions about these Terms, please contact us at:
                    </p>
                    <p style={{
                        color: 'var(--color-primary)',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}>
                        support@gamesmith.ai
                    </p>
                </section>
            </main>
        </div>
    );
};

export default TermsPage;
