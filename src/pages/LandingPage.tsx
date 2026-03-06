import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PromptInput from '../components/PromptInput';
import AuthModal from '../components/AuthModal';
import {
    Zap, Star, Car, Crosshair, Puzzle, Sword, ChevronRight, Gamepad2, PencilLine
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

const GENRES = [
    { icon: <Car size={15} />, label: 'Racing', prompt: 'A high-speed racing game with realistic physics' },
    { icon: <Crosshair size={15} />, label: 'FPS', prompt: 'A first-person shooter in a futuristic world' },
    { icon: <Zap size={15} />, label: 'Platformer', prompt: 'A 3D platformer with challenging levels and collectibles' },
    { icon: <Puzzle size={15} />, label: 'Puzzle', prompt: 'A mind-bending 3D puzzle game with physics elements' },
    { icon: <Sword size={15} />, label: 'RPG', prompt: 'An action RPG with character progression and epic battles' },
];

const FEATURES = [
    {
        icon: <Zap size={28} />,
        title: 'Instant Generation',
        desc: 'Type a prompt and watch your game come alive in seconds. Our AI pipeline handles scene creation, physics, and logic automatically.',
        color: '#D4AF37',
    },
    {
        icon: <Gamepad2 size={28} />,
        title: 'Full 3D Engine',
        desc: 'Built on a battle-tested WebGL engine with real-time lighting, physics simulation, collision detection, and audio support.',
        color: '#D4AF37',
    },
    {
        icon: <PencilLine size={28} />,
        title: 'Iterate with Chat',
        desc: 'Not happy with a result? Chat with the AI to refine your game. Change colors, mechanics, levels — all through conversation.',
        color: '#C0C0C0',
    },
];

const HOW_IT_WORKS = [
    { step: '01', title: 'Describe your game', desc: 'Type a natural language prompt. Be as creative as you want — genre, style, mechanics, story.' },
    { step: '02', title: 'AI builds it', desc: 'Our generator parses your prompt, selects templates, assembles the scene, and creates game logic automatically.' },
    { step: '03', title: 'Play & iterate', desc: 'Receive a playable browser game. Chat with AI to tweak anything until it\'s exactly what you envisioned.' },
];

const TESTIMONIALS = [
    { name: 'Alex Chen', role: 'Indie Developer', text: 'I built a fully playable racing game in under 5 minutes. This is absolutely mind-blowing.' },
    { name: 'Sarah Kim', role: 'Game Designer', text: 'The iteration workflow is incredible. I kept refining until the game matched my vision perfectly.' },
    { name: 'Marcus Rivera', role: 'Startup Founder', text: 'We prototyped 10 game ideas in a single afternoon. GameSmith AI is a game changer.' },
];

const LandingPage = () => {
    const [prompt, setPrompt] = useState('');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => setMousePos({ x: e.clientX, y: e.clientY }));
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        navigate('/build', { state: { prompt } });
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Animated background */}
            <div className="gradient-bg">
                <div className="glow-orb" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%,-50%)` }} />
            </div>
            <div className="bg-mesh" />

            {/* HERO SECTION */}
            <section style={{
                minHeight: '92vh',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '80px 24px 60px',
                textAlign: 'center',
                position: 'relative', zIndex: 1,
            }}>
                {/* Badge */}
                <div className="animate-fade-in-up" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '6px 16px 6px 8px',
                    borderRadius: '99px',
                    background: 'rgba(124,58,237,0.12)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    color: '#c4b5fd',
                    fontSize: '13px', fontWeight: 600,
                    marginBottom: '32px',
                }}>
                    <span style={{
                        background: 'var(--gradient-brand)',
                        padding: '2px 8px', borderRadius: '99px',
                        fontSize: '11px', color: 'white', fontWeight: 700,
                    }}>NEW</span>
                    AI-Powered 3D Game Generation is here
                    <ChevronRight size={14} />
                </div>

                {/* Headline */}
                <h1 className="animate-fade-in-up delay-100" style={{
                    fontSize: 'clamp(48px, 8vw, 96px)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    color: 'white',
                    maxWidth: '900px',
                    margin: '0 0 24px',
                }}>
                    Build 3D games<br />
                    <span className="text-gradient">with a prompt</span>
                </h1>

                <p className="animate-fade-in-up delay-200" style={{
                    fontSize: 'clamp(16px, 2.5vw, 22px)',
                    color: 'var(--color-text-2)',
                    maxWidth: '600px',
                    margin: '0 0 48px',
                    lineHeight: 1.6,
                }}>
                    Describe any game. Our AI generates a fully playable 3D browser game in seconds — no coding required.
                </p>

                {/* Prompt Input Area */}
                <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto 40px' }} className="animate-fade-in-up delay-300">
                    <PromptInput
                        value={prompt}
                        onChange={setPrompt}
                        onSubmit={handleGenerate}
                        placeholder="e.g. A high-speed racing game with neon tracks and retro-wave music..."
                    />
                </div>

                {/* Genre quick picks */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }} className="animate-fade-in-up delay-400">
                    <span style={{ fontSize: '13px', color: 'var(--color-text-3)' }}>Try:</span>
                    {GENRES.map(g => (
                        <button
                            key={g.label}
                            onClick={() => setPrompt(g.prompt)}
                            className="genre-chip"
                            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                            {g.icon}
                            {g.label}
                        </button>
                    ))}
                </div>

                {/* Social proof */}
                <div className="animate-fade-in-up delay-500" style={{
                    marginTop: '48px',
                    display: 'flex', alignItems: 'center', gap: '16px',
                    color: 'var(--color-text-3)', fontSize: '14px',
                }}>
                    <div style={{ display: 'flex' }}>
                        {['#7c3aed', '#ec4899', '#f97316', '#22c55e', '#3b82f6'].map((c, i) => (
                            <div key={i} style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: c,
                                border: '2px solid var(--color-bg)',
                                marginLeft: i === 0 ? 0 : '-10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '12px', fontWeight: 700, color: 'white',
                            }}>
                                {String.fromCharCode(65 + i)}
                            </div>
                        ))}
                    </div>
                    <span>Join <strong style={{ color: 'white' }}>2,400+</strong> creators building with AI</span>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section style={{
                padding: '100px 24px',
                maxWidth: '1200px', margin: '0 auto',
                position: 'relative', zIndex: 1,
            }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary-2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                        Why GameSmith AI
                    </p>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '0 0 16px' }}>
                        Everything you need to ship
                    </h2>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
                        From idea to playable game in seconds
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                }}>
                    {FEATURES.map((f, i) => (
                        <div key={i} className="card" style={{ textAlign: 'left' }}>
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '14px',
                                background: `${f.color}20`, border: `1px solid ${f.color}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: f.color,
                                marginBottom: '20px',
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '20px', margin: '0 0 10px', color: 'white' }}>{f.title}</h3>
                            <p style={{ color: 'var(--color-text-2)', lineHeight: 1.65, margin: 0, fontSize: '15px' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section style={{
                padding: '80px 24px',
                position: 'relative', zIndex: 1,
                borderTop: '1px solid var(--color-border)',
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '0 0 16px' }}>How it works</h2>
                        <p style={{ color: 'var(--color-text-2)', fontSize: '17px' }}>Three steps from idea to playable game</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {HOW_IT_WORKS.map((step, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '32px', alignItems: 'flex-start',
                                padding: '32px',
                                borderRadius: '20px',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-surface)',
                                marginBottom: i < HOW_IT_WORKS.length - 1 ? '2px' : 0,
                                transition: 'all 0.25s',
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'var(--color-border-hover)';
                                    e.currentTarget.style.background = 'var(--color-surface-hover)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.background = 'var(--color-surface)';
                                }}
                            >
                                <div style={{
                                    fontFamily: 'Space Grotesk', fontSize: '40px', fontWeight: 800,
                                    color: 'rgba(124,58,237,0.3)', lineHeight: 1, flexShrink: 0, minWidth: '60px',
                                }}>
                                    {step.step}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '20px', margin: '0 0 8px', color: 'white' }}>{step.title}</h3>
                                    <p style={{ color: 'var(--color-text-2)', margin: 0, lineHeight: 1.65, fontSize: '15px' }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section style={{
                padding: '80px 24px',
                position: 'relative', zIndex: 1,
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '0 0 12px' }}>Loved by creators</h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px',
                    }}>
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="card">
                                <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={14} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                                    ))}
                                </div>
                                <p style={{ color: 'var(--color-text-2)', lineHeight: 1.65, margin: '0 0 20px', fontSize: '15px' }}>
                                    "{t.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '38px', height: '38px', borderRadius: '50%',
                                        background: 'var(--gradient-brand)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: '15px', color: 'white'
                                    }}>
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: 'white' }}>{t.name}</p>
                                        <p style={{ margin: 0, color: 'var(--color-text-3)', fontSize: '13px' }}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section style={{
                padding: '80px 24px 100px',
                position: 'relative', zIndex: 1,
                textAlign: 'center',
            }}>
                <div style={{
                    maxWidth: '700px', margin: '0 auto',
                    padding: '64px 48px',
                    borderRadius: '32px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(219,39,119,0.1) 100%)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    boxShadow: '0 0 80px rgba(124,58,237,0.15)',
                }}>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', margin: '0 0 16px' }}>
                        Start building today
                    </h2>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '18px', margin: '0 0 36px', lineHeight: 1.6 }}>
                        Create your first game for free. No credit card required.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => user ? navigate('/build') : setIsAuthModalOpen(true)}
                            className="btn-primary"
                            style={{ padding: '14px 32px', fontSize: '16px' }}
                        >
                            <Zap size={18} /> Build your first game
                        </button>
                        <button
                            onClick={() => navigate('/pricing')}
                            className="btn-ghost"
                            style={{ padding: '14px 32px', fontSize: '16px' }}
                        >
                            View pricing
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{
                borderTop: '1px solid var(--color-border)',
                padding: '40px 24px',
                position: 'relative', zIndex: 1,
            }}>
                <div style={{
                    maxWidth: '1200px', margin: '0 auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '8px',
                            background: 'var(--gradient-brand)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Zap size={14} color="white" />
                        </div>
                        <span style={{ fontWeight: 700, fontFamily: 'Space Grotesk', letterSpacing: '-0.02em', color: 'white' }}>
                            GameSmith AI
                        </span>
                    </div>
                    <p style={{ color: 'var(--color-text-3)', fontSize: '14px', margin: 0 }}>
                        © 2026 GameSmith AI. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {[
                            { label: 'Privacy', path: '/privacy' },
                            { label: 'Terms', path: '/terms' },
                            { label: 'Docs', path: '#' },
                        ].map(l => (
                            <a key={l.label} href={l.path} style={{
                                color: 'var(--color-text-3)', fontSize: '14px',
                                textDecoration: 'none', transition: 'color 0.15s',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-3)')}
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={() => { setIsAuthModalOpen(false); navigate('/login'); }}
                onSignUp={() => { setIsAuthModalOpen(false); navigate('/login'); }}
            />
        </div>
    );
};

export default LandingPage;
