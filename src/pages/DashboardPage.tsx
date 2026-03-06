import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import Sidebar from '../components/Sidebar';
import GameCard from '../components/GameCard';
import type { Game } from '../components/GameCard';
import { Plus, Gamepad2, TrendingUp, Clock, Zap, Sparkles } from 'lucide-react';

const DEMO_GAMES: Game[] = [
    {
        id: 'demo-1',
        title: 'Neon Racer',
        prompt: 'A cyberpunk racing game with neon streets and aggressive AI racers',
        status: 'ready',
        genre: 'racing',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
        id: 'demo-2',
        title: 'Space Siege',
        prompt: 'A first-person shooter in a haunted space station with alien enemies',
        status: 'ready',
        genre: 'fps',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
        id: 'demo-3',
        title: 'Sky Jumper',
        prompt: 'A colorful 3D platformer with floating islands and collectible stars',
        status: 'generating',
        genre: 'platformer',
        created_at: new Date(Date.now() - 600000).toISOString(),
    },
];

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const { data, error } = await supabase
                    .from('games')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setGames(data && data.length > 0 ? data : DEMO_GAMES);
            } catch {
                // Fallback to demo games if table doesn't exist yet
                setGames(DEMO_GAMES);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const firstName = user?.email?.split('@')[0] || 'Creator';
    const readyCount = games.filter(g => g.status === 'ready').length;
    const generatingCount = games.filter(g => g.status === 'generating').length;

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />

            <main style={{
                flex: 1,
                overflowY: 'auto',
                padding: '40px 48px',
                background: 'var(--color-bg)',
                minHeight: '100vh',
            }}>
                {/* Welcome header */}
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{
                        fontSize: '32px', fontFamily: 'Space Grotesk',
                        fontWeight: 800, margin: '0 0 8px',
                        letterSpacing: '-0.03em',
                    }}>
                        Welcome back, <span className="text-gradient">{firstName}</span> 👾
                    </h1>
                    <p style={{ color: 'var(--color-text-2)', margin: 0, fontSize: '16px' }}>
                        Your creative studio awaits.
                    </p>
                </div>

                {/* Stats row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    marginBottom: '40px',
                }}>
                    {[
                        { icon: <Gamepad2 size={20} style={{ color: '#a78bfa' }} />, label: 'Total Games', value: games.length, color: '#a78bfa' },
                        { icon: <TrendingUp size={20} style={{ color: '#4ade80' }} />, label: 'Ready to Play', value: readyCount, color: '#4ade80' },
                        { icon: <Clock size={20} style={{ color: '#fb923c' }} />, label: 'Generating', value: generatingCount, color: '#fb923c' },
                    ].map((stat, i) => (
                        <div key={i} className="card" style={{
                            display: 'flex', alignItems: 'center', gap: '16px',
                            padding: '20px 24px',
                        }}>
                            <div style={{
                                width: '44px', height: '44px', borderRadius: '12px',
                                background: `${stat.color}18`,
                                border: `1px solid ${stat.color}30`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                {stat.icon}
                            </div>
                            <div>
                                <p style={{ margin: '0 0 2px', fontSize: '28px', fontWeight: 800, fontFamily: 'Space Grotesk', lineHeight: 1 }}>
                                    {stat.value}
                                </p>
                                <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-3)' }}>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* New Game CTA card */}
                <div
                    onClick={() => navigate('/build')}
                    style={{
                        marginBottom: '40px',
                        padding: '28px',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(219,39,119,0.08) 100%)',
                        border: '1px dashed rgba(124,58,237,0.35)',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '20px',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(219,39,119,0.12) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(219,39,119,0.08) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
                    }}
                >
                    <div style={{
                        width: '52px', height: '52px', borderRadius: '14px',
                        background: 'var(--gradient-brand)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                    }}>
                        <Plus size={24} color="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700 }}>Create a new game</h3>
                        <p style={{ margin: 0, color: 'var(--color-text-2)', fontSize: '14px' }}>
                            Describe any game idea and watch AI build it in seconds
                        </p>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <Sparkles size={20} style={{ color: '#c4b5fd' }} />
                    </div>
                </div>

                {/* Games Grid */}
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontFamily: 'Space Grotesk', fontWeight: 700, margin: '0 0 20px' }}>
                        Your Games
                    </h2>

                    {loading ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '20px',
                        }}>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '240px', borderRadius: '20px' }} />
                            ))}
                        </div>
                    ) : games.length === 0 ? (
                        <div style={{
                            textAlign: 'center', padding: '60px 24px',
                            borderRadius: '20px',
                            border: '1px solid var(--color-border)',
                            background: 'var(--color-surface)',
                        }}>
                            <Zap size={40} style={{ color: 'var(--color-text-3)', marginBottom: '16px' }} />
                            <h3 style={{ margin: '0 0 8px', fontSize: '20px' }}>No games yet</h3>
                            <p style={{ color: 'var(--color-text-2)', margin: '0 0 24px' }}>
                                Create your first AI-generated game with a single prompt
                            </p>
                            <button onClick={() => navigate('/build')} className="btn-primary">
                                <Plus size={17} /> Build your first game
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '20px',
                        }}>
                            {games.map(game => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
