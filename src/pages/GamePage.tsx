import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import type { Game } from '../components/GameCard';
import { ArrowLeft, Edit3, Share2, Trash2, ArrowUp, Clock, Gamepad2 } from 'lucide-react';

const GamePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
        { role: 'ai', text: '👋 Hi! I\'m your game editor AI. Ask me to change anything — mechanics, colors, difficulty, level layout — and I\'ll update the game for you.' },
    ]);

    const DEMO_GAME: Game = {
        id: id || 'demo',
        title: 'Neon Racer',
        prompt: 'A cyberpunk racing game with neon streets and aggressive AI racers',
        status: 'ready',
        genre: 'racing',
        created_at: new Date().toISOString(),
    };

    useEffect(() => {
        const fetchGame = async () => {
            if (!id || id.startsWith('demo')) {
                setGame(DEMO_GAME);
                setLoading(false);
                return;
            }
            try {
                const { data, error } = await supabase
                    .from('games')
                    .select('*')
                    .eq('id', id)
                    .single();
                if (!error && data) setGame(data);
                else setGame(DEMO_GAME);
            } catch {
                setGame(DEMO_GAME);
            } finally {
                setLoading(false);
            }
        };
        fetchGame();
    }, [id]);

    const sendChat = () => {
        if (!chatInput.trim()) return;
        const userMsg = chatInput;
        setChatInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: `Got it! I'm updating your game to "${userMsg.toLowerCase()}". Changes will apply in a few moments. ✨`,
            }]);
        }, 1200);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar />
                <div style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--color-bg)',
                }}>
                    <div className="skeleton" style={{ width: '100%', height: '100%', margin: '40px', borderRadius: '20px' }} />
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <Sidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--color-bg)', overflow: 'hidden' }}>
                {/* Top bar */}
                <div style={{
                    padding: '0 28px', height: '64px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    borderBottom: '1px solid var(--color-border)', flexShrink: 0,
                }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'none', border: 'none', color: 'var(--color-text-2)',
                            cursor: 'pointer', fontSize: '14px', padding: '6px 10px',
                            borderRadius: '8px', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-text-2)'; }}
                    >
                        <ArrowLeft size={16} /> Games
                    </button>
                    <span style={{ color: 'var(--color-border)', fontSize: '18px' }}>/</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {game?.title}
                    </span>
                    {game && <StatusBadge status={game.status} size="md" />}

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-ghost" style={{ padding: '8px 14px', fontSize: '13px', gap: '6px' }}>
                            <Share2 size={14} /> Share
                        </button>
                        <button className="btn-ghost" style={{ padding: '8px 14px', fontSize: '13px', gap: '6px', color: '#f87171', borderColor: 'rgba(239,68,68,0.25)' }}>
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    {/* Game canvas */}
                    <div style={{ flex: 1, position: 'relative', background: '#03030a', overflow: 'hidden' }}>
                        {/* Placeholder game canvas */}
                        <div style={{
                            width: '100%', height: '100%',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            gap: '20px',
                        }}>
                            <div className="animate-float" style={{
                                width: '100px', height: '100px', borderRadius: '24px',
                                background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(249,115,22,0.3))',
                                border: '1px solid rgba(124,58,237,0.4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Gamepad2 size={44} style={{ color: '#c4b5fd' }} />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontFamily: 'Space Grotesk' }}>
                                    {game?.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-2)', margin: '0 0 20px', fontSize: '14px' }}>
                                    Full game runtime will load here
                                </p>
                                <button className="btn-primary" style={{ padding: '12px 28px' }}>
                                    ▶ Launch Game
                                </button>
                            </div>
                        </div>

                        {/* Game info overlay bottom-left */}
                        <div style={{
                            position: 'absolute', bottom: '20px', left: '20px',
                            padding: '12px 16px', borderRadius: '12px',
                            background: 'rgba(8,8,16,0.85)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid var(--color-border)',
                        }}>
                            <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Clock size={11} />
                                Created {new Date(game?.created_at || '').toLocaleDateString()}
                            </p>
                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-2)', maxWidth: '280px', lineHeight: 1.4 }}>
                                {game?.prompt}
                            </p>
                        </div>
                    </div>

                    {/* Right panel: AI chat editor */}
                    <div style={{
                        width: '340px', flexShrink: 0,
                        borderLeft: '1px solid var(--color-border)',
                        display: 'flex', flexDirection: 'column',
                        background: 'var(--color-bg-2)',
                    }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
                            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Edit3 size={15} style={{ color: 'var(--color-primary-2)' }} />
                                AI Editor
                            </h3>
                            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--color-text-3)' }}>
                                Chat to modify your game
                            </p>
                        </div>

                        {/* Chat messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                            {messages.map((msg, i) => (
                                <div key={i} style={{
                                    marginBottom: '12px',
                                    display: 'flex',
                                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                }}>
                                    <div style={{
                                        maxWidth: '88%',
                                        padding: '10px 14px',
                                        borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                                        background: msg.role === 'user'
                                            ? 'var(--gradient-brand-2)'
                                            : 'var(--color-surface)',
                                        border: msg.role !== 'user' ? '1px solid var(--color-border)' : 'none',
                                        fontSize: '13px', lineHeight: 1.55,
                                        animation: 'fadeInUp 0.25s ease',
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat input */}
                        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)' }}>
                            <div style={{
                                display: 'flex', gap: '8px', alignItems: 'flex-end',
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '14px', padding: '10px 12px',
                                transition: 'border-color 0.15s',
                            }}>
                                <textarea
                                    value={chatInput}
                                    onChange={e => setChatInput(e.target.value)}
                                    placeholder="Make the car faster..."
                                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                                    style={{
                                        flex: 1, resize: 'none', background: 'transparent',
                                        border: 'none', outline: 'none',
                                        color: 'white', fontSize: '13px', fontFamily: 'Inter',
                                        minHeight: '40px', maxHeight: '120px',
                                    }}
                                />
                                <button
                                    onClick={sendChat}
                                    disabled={!chatInput.trim()}
                                    style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: chatInput.trim() ? 'var(--gradient-brand)' : 'var(--color-surface)',
                                        border: 'none', cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <ArrowUp size={16} color="white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
