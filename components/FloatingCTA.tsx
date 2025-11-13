'use client';

import { useState, useEffect, useContext } from 'react';
import { ContestContext } from '../contexts/ContestContext';

export default function FloatingCTA() {
  const context = useContext(ContestContext);
  const openModal = context?.openModal || (() => {});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible || !context) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => openModal()}
        className="gradient-bg text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all flex items-center space-x-2"
      >
        <span>🎯</span>
        <span className="font-semibold">Join Contest</span>
      </button>
    </div>
  );
}