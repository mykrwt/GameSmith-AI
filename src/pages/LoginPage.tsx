import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import { Gamepad2, Eye, EyeOff, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user, navigate]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                navigate('/dashboard');
            } else {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setSuccessMsg('Account created! Check your email to confirm, then log in.');
            }
        } catch (error: any) {
            setErrorMsg(error.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: '24px', position: 'relative',
        }}>
            <div className="bg-mesh" />

            <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'var(--gradient-brand)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 0 40px rgba(124,58,237,0.4)',
                        animation: 'pulse-glow 3s infinite',
                    }}>
                        <Gamepad2 size={26} color="white" />
                    </div>
                    <h1 style={{
                        fontSize: '28px', margin: '0 0 8px',
                        fontFamily: 'Space Grotesk', letterSpacing: '-0.03em',
                    }}>
                        {isLogin ? 'Welcome back' : 'Create account'}
                    </h1>
                    <p style={{ color: 'var(--color-text-2)', margin: 0, fontSize: '15px' }}>
                        {isLogin ? 'Sign in to your GameSmith account' : 'Start building games with AI for free'}
                    </p>
                </div>

                {/* Card */}
                <div className="glass-strong" style={{ borderRadius: '24px', padding: '36px' }}>
                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text-2)' }}>
                                Email address
                            </label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-2)' }}>
                                    Password
                                </label>
                                {isLogin && (
                                    <button type="button" style={{
                                        background: 'none', border: 'none',
                                        color: 'var(--color-primary-2)', fontSize: '13px',
                                        cursor: 'pointer', fontWeight: 500,
                                    }}>
                                        Forgot password?
                                    </button>
                                )}
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input-field"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    style={{ paddingRight: '44px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: '12px', top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none', border: 'none',
                                        color: 'var(--color-text-3)', cursor: 'pointer',
                                        padding: '4px',
                                    }}
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                        </div>

                        {errorMsg && (
                            <div style={{
                                padding: '12px 16px', borderRadius: '10px',
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.25)',
                                color: '#f87171', fontSize: '14px', lineHeight: 1.5,
                            }}>
                                {errorMsg}
                            </div>
                        )}

                        {successMsg && (
                            <div style={{
                                padding: '12px 16px', borderRadius: '10px',
                                background: 'rgba(34,197,94,0.1)',
                                border: '1px solid rgba(34,197,94,0.25)',
                                color: '#4ade80', fontSize: '14px', lineHeight: 1.5,
                            }}>
                                {successMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{
                                width: '100%', justifyContent: 'center',
                                padding: '14px', fontSize: '15px',
                                borderRadius: '12px', marginTop: '4px',
                            }}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                        width: '16px', height: '16px', borderRadius: '50%',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTopColor: 'white',
                                        animation: 'spin-slow 0.7s linear infinite',
                                        display: 'inline-block',
                                    }} />
                                    {isLogin ? 'Signing in...' : 'Creating account...'}
                                </span>
                            ) : (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {isLogin ? 'Sign in' : 'Create account'}
                                    <ArrowRight size={17} />
                                </span>
                            )}
                        </button>
                    </form>

                    <div style={{
                        marginTop: '24px', paddingTop: '24px',
                        borderTop: '1px solid var(--color-border)',
                        textAlign: 'center', fontSize: '14px', color: 'var(--color-text-2)',
                    }}>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        {' '}
                        <button
                            onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); setSuccessMsg(''); }}
                            style={{
                                background: 'none', border: 'none',
                                color: 'white', fontWeight: 700,
                                cursor: 'pointer', fontSize: '14px',
                            }}
                        >
                            {isLogin ? 'Sign up free' : 'Sign in'}
                        </button>
                    </div>
                </div>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--color-text-3)' }}>
                    By continuing, you agree to our{' '}
                    <a href="/terms" style={{ color: 'var(--color-text-2)', textDecoration: 'underline' }}>Terms</a>
                    {' '}and{' '}
                    <a href="/privacy" style={{ color: 'var(--color-text-2)', textDecoration: 'underline' }}>Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
