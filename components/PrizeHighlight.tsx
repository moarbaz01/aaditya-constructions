"use client";

import { useContext } from "react";
import { ContestContext } from "../contexts/ContestContext";

export default function PrizeHighlight() {
  const context = useContext(ContestContext);
  const openModal = context?.openModal || (() => {});

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="glass rounded-3xl p-8 md:p-16 text-center">
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              This Could Be Your New Home In Jaipur!
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              A luxury 3BHK flat worth ₹60 Lakhs in prime location of Jaipur, Rajasthan.
            </p>

            {/* <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-accent-violet-dark mb-2">
                  3BHK
                </h3>
                <p className="text-gray-600">Spacious Bedrooms</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-accent-violet-dark mb-2">
                  1200 sq ft
                </h3>
                <p className="text-gray-600">Built-up Area</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-accent-violet-dark mb-2">
                  Prime Location
                </h3>
                <p className="text-gray-600">City Center</p>
              </div>
            </div> */}

            {context && (
              <button
                onClick={() => openModal()}
                className="inline-block gradient-bg text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Join Contest Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confetti Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>


    </section>
  );
}
