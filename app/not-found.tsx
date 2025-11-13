"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-100 via-white to-blue-50 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <SearchX className="w-20 h-20 text-violet-500 mb-6" />
        <h1 className="text-5xl font-bold text-gray-800 mb-3">404</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-full shadow-md transition-all"
        >
          <ArrowLeft size={18} />
          Go Home
        </Link>
      </motion.div>
    </main>
  );
}
