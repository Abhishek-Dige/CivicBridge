import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const STEPS = [
  { key: 'Submitted',    label: 'Submitted' },
  { key: 'Under Review', label: 'Under Review' },
  { key: 'In Progress',  label: 'In Progress' },
  { key: 'Completed',    label: 'Completed' },
];

const STATUS_STEP_MAP = {
  Pending:      0,
  'In Progress': 2,
  Completed:    3,
};

const Timeline = ({ status }) => {
  const activeIndex = STATUS_STEP_MAP[status] ?? 0;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {STEPS.map((step, idx) => {
        const done    = idx <= activeIndex;
        const current = idx === activeIndex;
        const isLast  = idx === STEPS.length - 1;

        return (
          <div key={step.key} className="flex gap-4">
            {/* Icon + connector */}
            <div className="flex flex-col items-center">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: done ? 'none' : '2px solid #e2e8f0',
                  background: done
                    ? current
                      ? 'linear-gradient(135deg, #2563eb, #10b981)'
                      : '#10b981'
                    : '#fff',
                  color: done ? '#fff' : '#cbd5e1',
                  boxShadow: current ? '0 0 0 4px rgba(37,99,235,0.12)' : 'none',
                  transition: 'all 0.3s',
                }}
              >
                <CheckCircle2 size={15} />
              </div>
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 28,
                    margin: '4px 0',
                    borderRadius: 2,
                    background: idx < activeIndex ? 'linear-gradient(180deg,#2563eb,#10b981)' : '#e2e8f0',
                    transition: 'all 0.3s',
                  }}
                />
              )}
            </div>

            {/* Label */}
            <div style={{ paddingBottom: isLast ? 0 : 24 }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: done ? '#0f172a' : '#94a3b8',
                lineHeight: 1.2,
              }}>
                {step.label}
              </p>
              {current && (
                <p style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600, marginTop: 3 }}>
                  Current status
                </p>
              )}
              {done && !current && (
                <p style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: 3 }}>
                  Completed
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
