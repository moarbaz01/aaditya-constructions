"use client";

import { Suspense } from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  if (!transactionId) {
    return notFound();
  }

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <XCircle className="w-8 h-8 text-red-600" />
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Payment Failed!
      </h1>

      <p className="text-gray-600 mb-6">
        Unfortunately, your payment could not be processed. Please try again
        or contact support if the issue persists.
      </p>

      <Link
        href="/"
        className="inline-block gradient-bg text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentFailedContent />
      </Suspense>
    </div>
  );
}
