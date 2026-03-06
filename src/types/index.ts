// Game Types
export type GameStatus = 'generating' | 'ready' | 'failed';

export interface Game {
  id: string;
  title: string;
  prompt: string;
  status: GameStatus;
  genre?: string;
  created_at: string;
  updated_at?: string;
  user_id?: string;
}

export type GameGenre = 'racing' | 'fps' | 'platformer' | 'puzzle' | 'rpg' | 'other';

// Auth Types
export interface UserProfile {
  id: string;
  email: string;
  avatar_url?: string;
  full_name?: string;
}

// Generation Types
export interface GenerationStep {
  id: string;
  label: string;
  description: string;
}

export type GenerationPhase = 'input' | 'generating' | 'done';

// Chat Types
export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  timestamp?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// UI Types
export type ButtonVariant = 'primary' | 'ghost' | 'white';
export type BadgeSize = 'sm' | 'md';
export type AnimationDelay = '100' | '200' | '300' | '400' | '500';
