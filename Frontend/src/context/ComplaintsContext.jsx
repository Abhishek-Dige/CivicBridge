import React, { createContext, useContext, useState } from 'react';

const ComplaintsContext = createContext(null);

const DEMO_COMPLAINTS = [
  {
    id: 1700000001,
    trackingId: 'CB-100001',
    title: 'Pothole on MG Road near Junction',
    location: 'MG Road, Sector 12',
    category: 'Roads',
    description: 'Large pothole causing traffic hazards and damage to vehicles. Been there for over 2 months.',
    imageUrl: null,
    status: 'In Progress',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 1700000002,
    trackingId: 'CB-100002',
    title: 'Water supply disruption in Block B',
    location: 'Block B, Lakeview Colony',
    category: 'Water',
    description: 'No water supply since 3 days. Residents are severely affected.',
    imageUrl: null,
    status: 'Pending',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 1700000003,
    trackingId: 'CB-100003',
    title: 'Street light not working near Park',
    location: 'Central Park Gate, Sector 5',
    category: 'Electricity',
    description: 'Street light pole near park entrance has been dark for a week creating safety concerns at night.',
    imageUrl: null,
    status: 'Completed',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const ComplaintsProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(DEMO_COMPLAINTS);

  const addComplaint = (complaint) => {
    setComplaints((prev) => [complaint, ...prev]);
  };

  return (
    <ComplaintsContext.Provider value={{ complaints, addComplaint }}>
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => {
  const ctx = useContext(ComplaintsContext);
  if (!ctx) throw new Error('useComplaints must be used inside ComplaintsProvider');
  return ctx;
};
