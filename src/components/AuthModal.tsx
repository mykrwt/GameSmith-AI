import React from 'react';
import { X, Gamepad2 } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
    onSignUp: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSignUp }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
        }}>
            {/* Backdrop */}
            <div
                style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                }}
                onClick={onClose}
            />

            {/* Modal Card */}
            <div
                className="glass-strong animate-fade-in-up"
                style={{
                    position: 'relative', width: '100%', maxWidth: '420px',
                    borderRadius: '24px', padding: '40px',
                    textAlign: 'center',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', right: '20px', top: '20px',
                        background: 'none', border: 'none',
                        color: 'var(--color-text-3)', cursor: 'pointer',
                        padding: '4px', transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-3)')}
                >
                    <X size={22} />
                </button>

                <div style={{
                    width: '48px', height: '48px', borderRadius: '13px',
                    background: 'var(--gradient-brand)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 0 30px rgba(124,58,237,0.3)',
                }}>
                    <Gamepad2 size={24} color="white" />
                </div>

                <h2 style={{
                    fontSize: '28px', margin: '0 0 12px',
                    fontFamily: 'Space Grotesk', letterSpacing: '-0.03em',
                    color: 'white',
                }}>
                    Continue with GameSmith <span className="text-gradient">AI</span>
                </h2>

                <p style={{
                    color: 'var(--color-text-2)', fontSize: '15px',
                    lineHeight: 1.6, margin: '0 0 36px',
                }}>
                    Sign in to save your games and use the AI editor to iterate on your creations.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                        onClick={onLogin}
                        className="btn-primary"
                        style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px' }}
                    >
                        Sign in
                    </button>

                    <button
                        onClick={onSignUp}
                        className="btn-ghost"
                        style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px' }}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
