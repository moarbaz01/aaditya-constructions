"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ContestContextType {
  isModalOpen: boolean;
  modalStep: number;
  openModal: (step?: number) => void;
  closeModal: () => void;
}

export const ContestContext = createContext<ContestContextType | undefined>(undefined);

export function ContestProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  const openModal = (step = 1) => {
    setModalStep(step);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
  };

  return (
    <ContestContext.Provider value={{ isModalOpen, modalStep, openModal, closeModal }}>
      {children}
    </ContestContext.Provider>
  );
}

export function useContest() {
  const context = useContext(ContestContext);
  if (!context) throw new Error("useContest must be used within ContestProvider");
  return context;
}
