"use client";

import { FileText, CreditCard, Dice6, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Fill the Form",
      description: "Complete the registration form with your details.",
    },
    {
      icon: CreditCard,
      title: "Make Payment",
      description: "Secure payment to confirm your contest entry.",
    },
    {
      icon: Dice6,
      title: "Wait for result ",
      description: "Relax while we prepare the result announcement.",
    },
    {
      icon: Home,
      title: "Win Your Dream Home",
      description: "Congratulations! Claim your luxurious flat.",
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white to-gray-50/40">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent-violet-light)_0%,transparent_70%)] opacity-40 blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple, transparent process to help you secure your dream home
          </p>
        </div>

        {/* Connecting Line (Curved Gradient) */}
        {/* <div className="hidden lg:block absolute top-40 left-1/2 transform -translate-x-1/2 w-full max-w-5xl opacity-70">
          <svg viewBox="0 0 1000 100" fill="none" className="w-full h-12">
            <path
              d="M50 50 Q250 20 500 50 T950 50"
              stroke="url(#stepGradient)"
              strokeWidth="3"
              strokeDasharray="10,6"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="stepGradient" x1="0" x2="1000" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--color-accent-violet-light)" />
                <stop offset="50%" stopColor="var(--color-accent-violet)" />
                <stop offset="100%" stopColor="var(--color-accent-violet-dark)" />
              </linearGradient>
            </defs>
          </svg>
        </div> */}

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group text-center"
              >
                {/* Step Icon */}
                <div className="relative mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="relative w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-[var(--color-accent-violet-light)] to-[var(--color-accent-violet)] flex items-center justify-center shadow-lg shadow-[var(--color-accent-violet-light)]/40 transition-all duration-300"
                  >
                    <Icon className="w-10 h-10 text-white" />
                    <div className="absolute inset-0 rounded-3xl blur-xl bg-[var(--color-accent-violet)]/40 opacity-60 -z-10"></div>
                  </motion.div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-3 w-9 h-9 bg-[var(--color-accent-violet-dark)] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
