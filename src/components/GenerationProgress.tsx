import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface Step {
    id: string;
    label: string;
    description: string;
}

interface GenerationProgressProps {
    currentStep: number;
    steps: Step[];
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ currentStep, steps }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {steps.map((step, index) => {
                const status =
                    index < currentStep ? 'completed' :
                        index === currentStep ? 'active' : 'pending';

                return (
                    <div key={step.id} className={`progress-step ${status}`}>
                        <div className={`step-icon ${status}`}>
                            {status === 'completed' ? (
                                <Check size={16} />
                            ) : status === 'active' ? (
                                <Loader2 size={16} style={{ animation: 'spin-slow 1s linear infinite' }} />
                            ) : (
                                <span style={{ fontSize: '12px' }}>{index + 1}</span>
                            )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                marginBottom: '2px',
                            }}>
                                <span style={{
                                    fontSize: '14px', fontWeight: 600,
                                    color: status === 'pending' ? 'var(--color-text-3)' :
                                        status === 'active' ? '#c4b5fd' : '#4ade80',
                                }}>
                                    {step.label}
                                </span>
                                {status === 'active' && (
                                    <div className="dot-loader">
                                        <span /><span /><span />
                                    </div>
                                )}
                                {status === 'completed' && (
                                    <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 500 }}>Done</span>
                                )}
                            </div>
                            <p style={{
                                margin: 0, fontSize: '12px',
                                color: status === 'pending' ? 'var(--color-text-3)' : 'var(--color-text-2)',
                                lineHeight: 1.5,
                            }}>
                                {step.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GenerationProgress;
