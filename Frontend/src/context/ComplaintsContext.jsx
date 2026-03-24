import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ComplaintsContext = createContext(null);

const DEMO_COMPLAINTS = [
  {
    id: 1700000001,
    trackingId: 'CB-100001',
    author: { name: 'Parth Badgire', initials: 'PB' },
    title: 'Pothole on MG Road near Junction',
    location: 'MG Road, Sector 12',
    category: 'Roads',
    description: 'Large pothole causing traffic hazards and damage to vehicles. Been there for over 2 months. Many accidents have almost happened here.',
    imageUrl: null,
    status: 'In Progress',
    upvotedBy: ['demo-001', 'user-123', 'user-456'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 1700000002,
    trackingId: 'CB-100002',
    author: { name: 'Abhishek Dige', initials: 'AD' },
    title: 'Water supply disruption in Block B',
    location: 'Block B, Lakeview Colony',
    category: 'Water',
    description: 'No water supply since 3 days. Residents are severely affected especially since the temperature is rising.',
    imageUrl: null,
    status: 'Pending',
    upvotedBy: ['demo-001'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 1700000003,
    trackingId: 'CB-100003',
    author: { name: 'Smit Jain', initials: 'SJ' },
    title: 'Street light not working near Park',
    location: 'Central Park Gate, Sector 5',
    category: 'Electricity',
    description: 'Street light pole near park entrance has been dark for a week creating safety concerns at night for women and children.',
    imageUrl: null,
    status: 'Completed',
    upvotedBy: ['user-123', 'user-456', 'user-789', 'user-000', 'user-111'],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const ComplaintsProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(DEMO_COMPLAINTS);

  // Notice we aren't enforcing the user exists in context, this is handled in logic
  const { user } = useAuth();

  const addComplaint = (complaint) => {
    // Inject current user as author and initialize upvotedBy
    const newComplaint = {
      ...complaint,
      author: {
        name: user?.name || 'Anonymous Citizen',
        initials: user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AC',
      },
      upvotedBy: [],
    };
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const toggleUpvote = (complaintId) => {
    if (!user) return; // Must be logged in to upvote

    setComplaints((prev) => prev.map((c) => {
      if (c.id === complaintId) {
        const hasUpvoted = c.upvotedBy.includes(user.id);
        return {
          ...c,
          upvotedBy: hasUpvoted
            ? c.upvotedBy.filter(id => id !== user.id)
            : [...c.upvotedBy, user.id],
        };
      }
      return c;
    }));
  };

  return (
    <ComplaintsContext.Provider value={{ complaints, addComplaint, toggleUpvote }}>
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => {
  const ctx = useContext(ComplaintsContext);
  if (!ctx) throw new Error('useComplaints must be used inside ComplaintsProvider');
  return ctx;
};
