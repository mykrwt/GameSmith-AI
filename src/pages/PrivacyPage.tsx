import { Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';

const PrivacyPage = () => {
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
                }}>Privacy Policy</h1>
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
                    }}>Privacy Policy</h2>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginBottom: '24px',
                    }}>
                        GameSmith AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
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
                        }}>1. Information We Collect</h3>
                    </div>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        marginBottom: '12px',
                    }}>
                        We collect the following types of information:
                    </p>
                    <ul style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        paddingLeft: '20px',
                    }}>
                        <li style={{ marginBottom: '12px' }}><strong>Account Information:</strong> Email address, name, and authentication data when you create an account</li>
                        <li style={{ marginBottom: '12px' }}><strong>Game Data:</strong> Games you create, prompts you submit, and your generation history</li>
                        <li style={{ marginBottom: '12px' }}><strong>Usage Data:</strong> How you interact with our platform, including clicks, time spent, and features used</li>
                        <li style={{ marginBottom: '12px' }}><strong>Technical Data:</strong> IP address, browser type, device information, and crash reports</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Eye size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 style={{
                            fontSize: '24px',
                            margin: 0,
                            color: 'white',
                        }}>2. How We Use Your Information</h3>
                    </div>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                    }}>
                        We use your information to:
                    </p>
                    <ul style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        paddingLeft: '20px',
                    }}>
                        <li style={{ marginBottom: '12px' }}>Provide, maintain, and improve our services</li>
                        <li style={{ marginBottom: '12px' }}>Process your game generation requests</li>
                        <li style={{ marginBottom: '12px' }}>Authenticate users and prevent fraud</li>
                        <li style={{ marginBottom: '12px' }}>Communicate with you about your account and updates</li>
                        <li style={{ marginBottom: '12px' }}>Analyze usage patterns to enhance user experience</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Lock size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 style={{
                            fontSize: '24px',
                            margin: 0,
                            color: 'white',
                        }}>3. Data Security</h3>
                    </div>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        marginBottom: '12px',
                    }}>
                        We implement industry-standard security measures to protect your information:
                    </p>
                    <ul style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        paddingLeft: '20px',
                    }}>
                        <li style={{ marginBottom: '12px' }}>End-to-end encryption for data in transit</li>
                        <li style={{ marginBottom: '12px' }}>Secure storage with access controls</li>
                        <li style={{ marginBottom: '12px' }}>Regular security audits and penetration testing</li>
                        <li style={{ marginBottom: '12px' }}>Compliance with GDPR and CCPA regulations</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Database size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 style={{
                            fontSize: '24px',
                            margin: 0,
                            color: 'white',
                        }}>4. Data Retention</h3>
                    </div>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                    }}>
                        We retain your data for as long as necessary to provide our services. You can request deletion of your account and associated data at any time through your account settings or by contacting us.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <UserCheck size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 style={{
                            fontSize: '24px',
                            margin: 0,
                            color: 'white',
                        }}>5. Your Rights</h3>
                    </div>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        marginBottom: '12px',
                    }}>
                        You have the right to:
                    </p>
                    <ul style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginLeft: '36px',
                        paddingLeft: '20px',
                    }}>
                        <li style={{ marginBottom: '12px' }}>Access your personal data</li>
                        <li style={{ marginBottom: '12px' }}>Correct inaccurate information</li>
                        <li style={{ marginBottom: '12px' }}>Request deletion of your data</li>
                        <li style={{ marginBottom: '12px' }}>Opt out of marketing communications</li>
                        <li style={{ marginBottom: '12px' }}>Export your data</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h3 style={{
                        fontSize: '24px',
                        marginBottom: '16px',
                        color: 'white',
                    }}>6. Third-Party Services</h3>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                    }}>
                        We use Supabase for authentication and database services. We may also use analytics tools to understand how users interact with our platform. We do not sell your personal data to third parties.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h3 style={{
                        fontSize: '24px',
                        marginBottom: '16px',
                        color: 'white',
                    }}>7. Children's Privacy</h3>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                    }}>
                        GameSmith AI is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
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
                    }}>8. Contact Us</h3>
                    <p style={{
                        color: 'var(--color-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        marginBottom: '12px',
                    }}>
                        For questions about this Privacy Policy or to exercise your rights, contact us at:
                    </p>
                    <p style={{
                        color: 'var(--color-primary)',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}>
                        privacy@gamesmith.ai
                    </p>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPage;
