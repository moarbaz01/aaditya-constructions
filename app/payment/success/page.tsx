"use client";

import { Suspense } from "react";
import { CheckCircle } from "lucide-react";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get("transactionId");

  useEffect(() => {
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    if (transactionId && email && phone) {
      const timer = setTimeout(() => {
        router.push(
          `/?step=3&transactionId=${transactionId}&email=${email}&phone=${phone}`
        );
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [transactionId, searchParams, router]);

  if (!transactionId) {
    return notFound();
  }

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Payment Verified!
      </h1>

      <p className="text-gray-600 mb-6">Redirecting to essay form...</p>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
