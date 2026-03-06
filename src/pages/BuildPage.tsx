import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import GenerationProgress from '../components/GenerationProgress';
import PromptInput from '../components/PromptInput';
import {
    Zap, Car, Crosshair, Puzzle, Sword,
    ArrowLeft, Gamepad2, ChevronRight
} from 'lucide-react';

const GENERATION_STEPS = [
    { id: 'parse', label: 'Parsing Prompt', description: 'Analyzing your description to extract game genre, mechanics, and visual style.' },
    { id: 'template', label: 'Selecting Template', description: 'Choosing the best base game template that matches your requirements.' },
    { id: 'assets', label: 'Generating Assets', description: 'Creating 3D models, textures, terrain, lighting, and audio configuration.' },
    { id: 'scene', label: 'Assembling Scene', description: 'Placing objects, configuring physics, setting up player spawn points and logic.' },
    { id: 'compile', label: 'Finalizing Game', description: 'Compiling all systems, running validation checks, and preparing for playback.' },
];

const GENRES = [
    { icon: <Car size={15} />, label: 'Racing', prompt: 'A high-speed racing game with realistic physics and neon tracks' },
    { icon: <Crosshair size={15} />, label: 'FPS', prompt: 'A first-person shooter in a futuristic abandoned space station' },
    { icon: <Zap size={15} />, label: 'Platformer', prompt: 'A colorful 3D platformer with floating islands and collectibles' },
    { icon: <Puzzle size={15} />, label: 'Puzzle', prompt: 'A gravity-based 3D puzzle game with mind-bending mechanics' },
    { icon: <Sword size={15} />, label: 'RPG', prompt: 'An action RPG with inventory, enemies, and skill progression' },
];

const STEP_DURATIONS = [2000, 1500, 3000, 2500, 1500]; // ms per step

type Phase = 'input' | 'generating' | 'done';

const BuildPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [phase, setPhase] = useState<Phase>('input');
    const [prompt, setPrompt] = useState((location.state as any)?.prompt || '');
    const [currentStep, setCurrentStep] = useState(0);
    const [gameId, setGameId] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const threeRef = useRef<any>(null);

    // Simulate generation pipeline
    const startGeneration = async () => {
        if (!prompt.trim()) return;
        setPhase('generating');
        setMessages(prev => [...prev, { role: 'user', text: prompt }]);
        setCurrentStep(0);

        // Detect genre
        const genreMatch = GENRES.find(g => prompt.toLowerCase().includes(g.label.toLowerCase()));
        const genre = genreMatch?.label.toLowerCase() || 'other';

        // Derive title from prompt
        const title = prompt
            .split(' ')
            .slice(0, 4)
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

        // Save to Supabase
        let savedId: string | null = null;
        try {
            const { data, error } = await supabase
                .from('games')
                .insert([{ user_id: user!.id, title, prompt, status: 'generating', genre }])
                .select()
                .single();
            if (!error && data) savedId = data.id;
        } catch (_) { /* offline mode */ }

        // Step through pipeline
        for (let i = 0; i < GENERATION_STEPS.length; i++) {
            setCurrentStep(i);
            await new Promise(res => setTimeout(res, STEP_DURATIONS[i]));
        }

        // Mark done
        if (savedId) {
            setGameId(savedId);
            await supabase.from('games').update({ status: 'ready' }).eq('id', savedId);
        } else {
            setGameId('demo-' + Date.now());
        }

        setMessages(prev => [...prev, {
            role: 'ai',
            text: `✅ Your game "${title}" is ready! I've built a complete ${genre} game with all mechanics in place. You can play it now or ask me to make changes.`,
        }]);
        setPhase('done');
    };

    // Three.js placeholder game preview
    useEffect(() => {
        if (phase !== 'done' || !canvasRef.current) return;

        let animId: number;
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        // Simple WebGL spinning cube
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);

        const vsSource = `
            attribute vec4 aVertexPosition;
            attribute vec4 aVertexColor;
            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;
            varying lowp vec4 vColor;
            void main() {
                gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
                vColor = aVertexColor;
            }
        `;
        const fsSource = `
            varying lowp vec4 vColor;
            void main() { gl_FragColor = vColor; }
        `;

        const compileShader = (type: number, src: string) => {
            const s = gl.createShader(type)!;
            gl.shaderSource(s, src); gl.compileShader(s); return s;
        };
        const prog = gl.createProgram()!;
        gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vsSource));
        gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fsSource));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const positions = new Float32Array([
            -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
            -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1,
            -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
            -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1,
            1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
            -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1,
        ]);
        const cols = [
            [0.49, 0.22, 0.93, 1], [0.86, 0.15, 0.49, 1],
            [0.98, 0.45, 0.09, 1], [0.13, 0.77, 0.37, 1],
            [0.24, 0.63, 0.98, 1], [0.94, 0.37, 0.47, 1],
        ];
        const colors: number[] = [];
        cols.forEach(c => { for (let i = 0; i < 4; i++) colors.push(...c); });

        const posBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(prog, 'aVertexPosition');
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(posLoc);

        const colBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        const colLoc = gl.getAttribLocation(prog, 'aVertexColor');
        gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colLoc);

        const indices = new Uint16Array([
            0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
        ]);
        const idxBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        const proj = new Float32Array([
            1.8, 0, 0, 0, 0, 1.8, 0, 0, 0, 0, -1.01, -1, 0, 0, -0.2, 0,
        ]);
        gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'uProjectionMatrix'), false, proj);

        gl.enable(gl.DEPTH_TEST);
        let angle = 0;

        const render = () => {
            angle += 0.01;
            gl.clearColor(0.03, 0.03, 0.08, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            const c = Math.cos(angle), s = Math.sin(angle);
            const c2 = Math.cos(angle * 0.6), s2 = Math.sin(angle * 0.6);
            const mv = new Float32Array([
                c, s * s2, s * c2, 0,
                0, c2, -s2, 0,
                -s, c * s2, c * c2, 0,
                0, 0, -5, 1,
            ]);
            gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'uModelViewMatrix'), false, mv);
            gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
            animId = requestAnimationFrame(render);
        };
        render();
        threeRef.current = { cancel: () => cancelAnimationFrame(animId) };
        return () => cancelAnimationFrame(animId);
    }, [phase]);

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <Sidebar />

            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                background: 'var(--color-bg)', overflow: 'hidden',
            }}>
                {/* Top bar */}
                <div style={{
                    padding: '0 32px', height: '64px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    borderBottom: '1px solid var(--color-border)',
                    flexShrink: 0,
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
                        <ArrowLeft size={16} /> Dashboard
                    </button>
                    <span style={{ color: 'var(--color-border)', fontSize: '18px' }}>/</span>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>
                        {phase === 'input' ? 'New Game' : phase === 'generating' ? 'Generating...' : 'Game Ready!'}
                    </span>
                    {phase === 'done' && (
                        <div style={{ marginLeft: 'auto' }}>
                            <button
                                onClick={() => navigate(`/game/${gameId}`)}
                                className="btn-primary"
                                style={{ padding: '8px 20px', fontSize: '14px' }}
                            >
                                <Gamepad2 size={16} /> Play Game
                            </button>
                        </div>
                    )}
                </div>

                {/* Main content */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    {/* Left panel: chat/prompt */}
                    <div style={{
                        width: '420px', flexShrink: 0,
                        borderRight: '1px solid var(--color-border)',
                        display: 'flex', flexDirection: 'column',
                        overflow: 'hidden',
                    }}>
                        {phase === 'input' ? (
                            /* INPUT PHASE */
                            <div style={{ flex: 1, padding: '32px 28px', overflowY: 'auto' }}>
                                <h2 style={{ fontSize: '24px', margin: '0 0 8px', fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
                                    Describe your game
                                </h2>
                                <p style={{ color: 'var(--color-text-2)', margin: '0 0 28px', fontSize: '14px' }}>
                                    Be as descriptive as you like about genre, mechanics, style, and theme.
                                </p>

                                {/* Genre Quick Picks */}
                                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                                    Quick start
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                                    {GENRES.map(g => (
                                        <button
                                            key={g.label}
                                            onClick={() => setPrompt(g.prompt)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                padding: '12px 16px', borderRadius: '12px',
                                                border: `1px solid ${prompt === g.prompt ? 'rgba(124,58,237,0.5)' : 'var(--color-border)'}`,
                                                background: prompt === g.prompt ? 'rgba(124,58,237,0.12)' : 'var(--color-surface)',
                                                color: prompt === g.prompt ? '#c4b5fd' : 'var(--color-text-2)',
                                                cursor: 'pointer', textAlign: 'left',
                                                fontSize: '14px', transition: 'all 0.15s',
                                            }}
                                            onMouseEnter={e => {
                                                if (prompt !== g.prompt) {
                                                    e.currentTarget.style.borderColor = 'var(--color-border-hover)';
                                                    e.currentTarget.style.color = 'white';
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (prompt !== g.prompt) {
                                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                                    e.currentTarget.style.color = 'var(--color-text-2)';
                                                }
                                            }}
                                        >
                                            <span style={{
                                                width: '32px', height: '32px', borderRadius: '8px',
                                                background: 'rgba(255,255,255,0.06)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                {g.icon}
                                            </span>
                                            <div>
                                                <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: '13px', color: 'inherit' }}>{g.label}</p>
                                                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-3)', lineHeight: 1.4 }}>{g.prompt}</p>
                                            </div>
                                            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.4 }} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* CHAT PHASE */
                            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                                {messages.map((msg, i) => (
                                    <div key={i} style={{
                                        marginBottom: '16px',
                                        display: 'flex',
                                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    }}>
                                        <div style={{
                                            maxWidth: '85%', padding: '12px 16px',
                                            borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                            background: msg.role === 'user'
                                                ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                                                : 'var(--color-surface)',
                                            border: msg.role !== 'user' ? '1px solid var(--color-border)' : 'none',
                                            fontSize: '14px', lineHeight: 1.6,
                                            color: 'white',
                                        }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Bottom: Textarea */}
                        <div style={{
                            padding: '16px 20px',
                            borderTop: '1px solid var(--color-border)',
                            flexShrink: 0,
                        }}>
                            <PromptInput
                                value={prompt}
                                onChange={setPrompt}
                                onSubmit={startGeneration}
                                disabled={phase === 'generating'}
                                minHeight="60px"
                            />
                        </div>
                    </div>

                    {/* Right panel: preview / progress */}
                    <div style={{
                        flex: 1, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        padding: '32px', position: 'relative',
                        background: 'var(--color-bg)',
                    }}>
                        {phase === 'input' && (
                            <div style={{ textAlign: 'center', maxWidth: '480px' }}>
                                <div className="animate-float" style={{
                                    width: '120px', height: '120px', borderRadius: '28px',
                                    background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.2))',
                                    border: '1px solid rgba(124,58,237,0.3)',
                                    margin: '0 auto 32px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Gamepad2 size={52} style={{ color: '#c4b5fd' }} />
                                </div>
                                <h3 style={{ fontSize: '28px', margin: '0 0 12px', fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
                                    Ready to build
                                </h3>
                                <p style={{ color: 'var(--color-text-2)', lineHeight: 1.65, margin: '0 0 28px' }}>
                                    Select a genre or write your own prompt. Your game preview will appear here once generation starts.
                                </p>
                                <button
                                    onClick={startGeneration}
                                    disabled={!prompt.trim()}
                                    className="btn-primary"
                                    style={{ padding: '14px 32px', fontSize: '16px' }}
                                >
                                    <Zap size={18} /> Start Building
                                </button>
                            </div>
                        )}

                        {phase === 'generating' && (
                            <div style={{ width: '100%', maxWidth: '520px' }}>
                                <div style={{ marginBottom: '32px' }}>
                                    <div className="animate-pulse-glow" style={{
                                        width: '64px', height: '64px', borderRadius: '18px',
                                        background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(219,39,119,0.3))',
                                        border: '1px solid rgba(124,58,237,0.4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '20px',
                                    }}>
                                        <Zap size={28} style={{ color: '#c4b5fd' }} />
                                    </div>
                                    <h3 style={{ fontSize: '22px', margin: '0 0 4px', fontFamily: 'Space Grotesk' }}>
                                        Building your game
                                    </h3>
                                    <p style={{ color: 'var(--color-text-2)', margin: 0, fontSize: '14px' }}>
                                        This usually takes 10–15 seconds
                                    </p>
                                </div>
                                <GenerationProgress
                                    currentStep={currentStep}
                                    steps={GENERATION_STEPS}
                                />
                                {/* Overall progress bar */}
                                <div style={{
                                    marginTop: '24px',
                                    height: '4px', borderRadius: '99px',
                                    background: 'var(--color-border)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${((currentStep + 1) / GENERATION_STEPS.length) * 100}%`,
                                        background: 'var(--gradient-brand)',
                                        borderRadius: '99px',
                                        transition: 'width 1s ease',
                                    }} />
                                </div>
                                <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-text-3)', textAlign: 'right' }}>
                                    Step {Math.min(currentStep + 1, GENERATION_STEPS.length)}/{GENERATION_STEPS.length}
                                </p>
                            </div>
                        )}

                        {phase === 'done' && (
                            <div style={{
                                width: '100%', height: '100%',
                                display: 'flex', flexDirection: 'column',
                            }}>
                                <div style={{
                                    flex: 1, position: 'relative',
                                    borderRadius: '16px', overflow: 'hidden',
                                    background: '#05050d',
                                    border: '1px solid var(--color-border)',
                                }}>
                                    <canvas
                                        ref={canvasRef}
                                        style={{ width: '100%', height: '100%', display: 'block' }}
                                    />
                                    {/* Overlay label */}
                                    <div style={{
                                        position: 'absolute', top: '16px', left: '16px',
                                        padding: '6px 14px', borderRadius: '99px',
                                        background: 'rgba(34,197,94,0.15)',
                                        border: '1px solid rgba(34,197,94,0.3)',
                                        color: '#4ade80', fontSize: '12px', fontWeight: 600,
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                    }}>
                                        <span style={{
                                            width: '6px', height: '6px', borderRadius: '50%',
                                            background: '#4ade80', display: 'inline-block',
                                        }} />
                                        Game Preview
                                    </div>
                                    <div style={{
                                        position: 'absolute', bottom: '16px', right: '16px',
                                    }}>
                                        <button
                                            onClick={() => navigate(`/game/${gameId}`)}
                                            className="btn-primary"
                                            style={{ padding: '10px 22px', fontSize: '14px' }}
                                        >
                                            <Gamepad2 size={16} /> Open Full Screen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildPage;
