"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContestProvider, useContest } from "../contexts/ContestContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import PrizeHighlight from "../components/PrizeHighlight";
import WinnersTable from "../components/WinnersTable";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import MultiStepForm from "../components/MultiStepForm";

function HomeContent() {
  const searchParams = useSearchParams();
  const { isModalOpen, modalStep, openModal, closeModal } = useContest();

  useEffect(() => {
    const step = searchParams.get("step");
    const savedData = localStorage.getItem("contestFormData");
    if (step === "3" && savedData) {
      openModal(3);
    } else if (step === "3") {
      window.history.replaceState(null, "", "/");
    }
  }, [searchParams, openModal]);

  return (
    <>
      <Header />
      <Hero />
      <PrizeHighlight />
      <WinnersTable />
      <HowItWorks />
      <Footer />
      <FloatingCTA />
      <MultiStepForm
        isOpen={isModalOpen}
        onClose={closeModal}
        initialStep={modalStep}
      />
    </>
  );
}

export default function Home() {
  return (
    <ContestProvider>
      <div className="min-h-screen">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <HomeContent />
        </Suspense>
      </div>
    </ContestProvider>
  );
}
