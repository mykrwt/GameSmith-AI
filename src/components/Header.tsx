import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useState } from 'react';
import { Gamepad2, ChevronDown, LayoutDashboard, Plus, LogOut, User } from 'lucide-react';

const Header = () => {
    const { user, signOut } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/build') || location.pathname.startsWith('/game');

    return (
        <header style={{
            position: 'sticky', top: 0, zIndex: 50,
            width: '100%',
            borderBottom: '1px solid var(--color-border)',
            background: 'rgba(8,8,16,0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
        }}>
            <div style={{
                maxWidth: isDashboard ? '100%' : '1200px',
                margin: '0 auto',
                padding: '0 24px',
                height: '68px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div style={{
                        width: '36px', height: '36px',
                        borderRadius: '10px',
                        background: 'var(--gradient-brand)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                    }}>
                        <Gamepad2 size={20} color="white" />
                    </div>
                    <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '18px', fontWeight: 700,
                        color: 'white', letterSpacing: '-0.02em',
                    }}>
                        GameSmith <span className="text-gradient">AI</span>
                    </span>
                </Link>

                {/* Navigation */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {!user && (
                        <>
                            <Link to="/pricing" className="btn-ghost" style={{ padding: '8px 18px', fontSize: '14px' }}>
                                Pricing
                            </Link>
                            <Link to="/login" style={{
                                padding: '8px 18px', fontSize: '14px', fontWeight: 500,
                                color: 'var(--color-text-2)', textDecoration: 'none',
                                transition: 'color 0.15s',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-2)')}
                            >
                                Log in
                            </Link>
                            <Link to="/login" className="btn-primary" style={{ padding: '9px 20px', fontSize: '14px' }}>
                                Get started →
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <Link to="/dashboard" style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 14px', borderRadius: '8px',
                                color: location.pathname === '/dashboard' ? 'white' : 'var(--color-text-2)',
                                background: location.pathname === '/dashboard' ? 'rgba(255,255,255,0.06)' : 'transparent',
                                textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                                transition: 'all 0.15s',
                            }}>
                                <LayoutDashboard size={16} />
                                Dashboard
                            </Link>
                            <Link to="/build" className="btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }}>
                                <Plus size={16} /> New Game
                            </Link>
                            {/* Avatar dropdown */}
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: '6px 12px 6px 8px',
                                        borderRadius: '99px',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-surface)',
                                        color: 'white', cursor: 'pointer',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: 'var(--gradient-brand)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '12px', fontWeight: 700,
                                    }}>
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <ChevronDown size={14} style={{ color: 'var(--color-text-2)', transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                </button>

                                {dropdownOpen && (
                                    <div style={{
                                        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                                        width: '220px',
                                        background: 'var(--color-bg-2)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '14px',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                        overflow: 'hidden',
                                        animation: 'fadeInUp 0.2s ease',
                                        zIndex: 100,
                                    }}>
                                        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)' }}>
                                            <p style={{ fontSize: '11px', color: 'var(--color-text-3)', margin: '0 0 2px' }}>Signed in as</p>
                                            <p style={{ fontSize: '13px', color: 'var(--color-text)', margin: 0, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {user.email}
                                            </p>
                                        </div>
                                        <div style={{ padding: '8px' }}>
                                            <Link to="/dashboard" onClick={() => setDropdownOpen(false)} style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                padding: '10px 12px', borderRadius: '8px',
                                                color: 'var(--color-text-2)', textDecoration: 'none',
                                                fontSize: '14px', transition: 'all 0.15s',
                                            }}
                                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface-hover)'; e.currentTarget.style.color = 'white'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-2)'; }}
                                            >
                                                <User size={15} /> Profile
                                            </Link>
                                            <button onClick={() => { signOut(); setDropdownOpen(false); }} style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                padding: '10px 12px', borderRadius: '8px',
                                                background: 'none', border: 'none',
                                                color: '#f87171', cursor: 'pointer',
                                                fontSize: '14px', width: '100%', textAlign: 'left',
                                                transition: 'all 0.15s',
                                            }}
                                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                            >
                                                <LogOut size={15} /> Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </nav>
            </div>
            {/* Dropdown backdrop */}
            {dropdownOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setDropdownOpen(false)} />
            )}
        </header>
    );
};

export default Header;
