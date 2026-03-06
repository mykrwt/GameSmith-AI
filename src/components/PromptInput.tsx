import React, { useState } from 'react';
import { ArrowUp, Mic, Plus } from 'lucide-react';

interface PromptInputProps {
    value: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
    placeholder?: string;
    disabled?: boolean;
    showControls?: boolean;
    minHeight?: string;
    className?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
    value,
    onChange,
    onSubmit,
    placeholder = "Describe your game idea...",
    disabled = false,
    showControls = true,
    minHeight = "80px",
    className = ""
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className={`prompt-container glass ${className}`} style={{ padding: '16px 20px' }}>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                style={{
                    width: '100%',
                    minHeight,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    resize: 'none',
                    lineHeight: 1.6,
                }}
            />

            {showControls && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            type="button"
                            className="btn-ghost"
                            style={{ padding: '6px', borderRadius: '8px' }}
                            title="Add context"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button
                            type="button"
                            className="btn-ghost"
                            style={{ padding: '6px', borderRadius: '8px' }}
                            title="Voice input"
                        >
                            <Mic size={18} />
                        </button>
                        <button
                            onClick={onSubmit}
                            disabled={!value.trim() || disabled}
                            className="btn-primary"
                            style={{
                                padding: '8px 18px',
                                borderRadius: '10px',
                                fontSize: '14px',
                                gap: '8px'
                            }}
                        >
                            <span>Generate</span>
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptInput;
