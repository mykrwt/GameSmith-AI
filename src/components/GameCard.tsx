import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Edit3, Clock, Zap } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { Game, GameGenre } from '../types';

interface GameCardProps {
  game: Game;
}

const genreColors: Record<GameGenre, string> = {
  racing: '#D4AF37',
  fps: '#C0C0C0',
  platformer: '#D4AF37',
  puzzle: '#C0C0C0',
  rpg: '#D4AF37',
  other: '#808080',
};

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = React.useState(false);

  const timeAgo = (date: string): string => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const genreColor = genreColors[game.genre as GameGenre] || genreColors.other;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        border: `1px solid ${hovered ? 'var(--color-border-hover)' : 'var(--color-border)'}`,
        background: hovered ? 'var(--color-surface-hover)' : 'var(--color-surface)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'var(--shadow-card)',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: '160px',
        background: `linear-gradient(135deg, ${genreColor}22 0%, #1a1a2e 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Abstract game preview art */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '16px',
          background: `linear-gradient(135deg, ${genreColor}66, ${genreColor}22)`,
          border: `2px solid ${genreColor}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: game.status === 'generating' ? 'pulse-glow 2s infinite' : 'float 4s ease-in-out infinite',
        }}>
          <Zap size={32} style={{ color: genreColor }} />
        </div>

        {/* Hover Overlay with actions */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '12px',
          opacity: hovered && game.status === 'ready' ? 1 : 0,
          transition: 'opacity 0.2s',
        }}>
          <button
            onClick={() => navigate(`/game/${game.id}`)}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px' }}
          >
            <Play size={15} fill="white" /> Play
          </button>
          <button
            onClick={() => navigate(`/game/${game.id}`)}
            className="btn-ghost"
            style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }}
          >
            <Edit3 size={15} /> Edit
          </button>
        </div>

        {/* Status Badge top-right */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <StatusBadge status={game.status} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px' }}>
        <h3 style={{
          margin: '0 0 6px',
          fontSize: '16px', fontWeight: 700,
          color: 'var(--color-text)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {game.title}
        </h3>
        <p style={{
          margin: '0 0 12px',
          fontSize: '13px', color: 'var(--color-text-3)',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {game.prompt}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {game.genre && (
            <span style={{
              fontSize: '11px', fontWeight: 600,
              color: genreColor,
              background: `${genreColor}18`,
              padding: '3px 10px', borderRadius: '99px',
              border: `1px solid ${genreColor}30`,
              textTransform: 'capitalize',
            }}>
              {game.genre}
            </span>
          )}
          <span style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '12px', color: 'var(--color-text-3)', marginLeft: 'auto',
          }}>
            <Clock size={12} />
            {timeAgo(game.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;

