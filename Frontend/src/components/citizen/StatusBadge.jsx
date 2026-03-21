import React from 'react';

const STATUS_CONFIG = {
  Pending: {
    bg:   '#fef3c7',
    text: '#92400e',
    dot:  '#f59e0b',
    border: '#fde68a',
  },
  'In Progress': {
    bg:   '#e0f2fe',
    text: '#0369a1',
    dot:  '#0ea5e9',
    border: '#bae6fd',
  },
  Completed: {
    bg:   '#d1fae5',
    text: '#065f46',
    dot:  '#10b981',
    border: '#a7f3d0',
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['Pending'];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '100px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        background: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.border}`,
        fontFamily: "'Inter', system-ui, sans-serif",
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: cfg.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
};

export default StatusBadge;
