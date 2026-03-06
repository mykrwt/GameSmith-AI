import React from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface StatusBadgeProps {
    status: 'generating' | 'ready' | 'failed';
    size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
    const config = {
        generating: {
            label: 'Generating',
            className: 'badge badge-generating',
            icon: <Loader2 size={size === 'sm' ? 11 : 13} style={{ animation: 'spin-slow 1s linear infinite' }} />,
        },
        ready: {
            label: 'Ready',
            className: 'badge badge-ready',
            icon: <CheckCircle size={size === 'sm' ? 11 : 13} />,
        },
        failed: {
            label: 'Failed',
            className: 'badge badge-failed',
            icon: <AlertCircle size={size === 'sm' ? 11 : 13} />,
        },
    };

    const { label, className, icon } = config[status];

    return (
        <span className={className} style={{ fontSize: size === 'md' ? '13px' : '11px' }}>
            {icon}
            {label}
        </span>
    );
};

export default StatusBadge;
