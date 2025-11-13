"use client";

import { useState, useEffect } from "react";
import { X, User, Phone, MapPin, CreditCard, FileText } from "lucide-react";

interface MultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
}

export default function MultiStepForm({
  isOpen,
  onClose,
  initialStep = 1,
}: MultiStepFormProps) {
  const [step, setStep] = useState(initialStep);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("contestFormData");
    };

    if (isOpen && initialStep === 3) {
      setStep(3);
      const savedData = localStorage.getItem("contestFormData");
      const urlParams = new URLSearchParams(window.location.search);
      const transactionId = urlParams.get("transactionId") || "";
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData({ ...parsed, essay: "", transactionId });
      }

      const preventBack = () => {
        window.history.pushState(null, "", window.location.href);
      };
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", preventBack);
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("popstate", preventBack);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    } else if (isOpen) {
      setStep(1);
    }
  }, [isOpen, initialStep]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    essay: "",
    transactionId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("contestFormData", JSON.stringify(formData));
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.paymentUrl) {
        const url = new URL(result.paymentUrl);
        if (url.protocol === "https:" && url.hostname.includes("phonepe")) {
          window.location.href = result.paymentUrl;
        }
      } else {
        alert(result.error || "Payment failed");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  const handleEssaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.essay) {
      alert("Please write your essay");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      essay: formData.essay,
      transactionId: formData.transactionId,
    };
    console.log("Submitting contest entry:", payload);

    try {
      const response = await fetch("/api/contest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.removeItem("contestFormData");
        window.history.replaceState(null, "", "/");
        setStep(4);
      } else {
        alert(result.error || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center md:p-4 overflow-y-auto">
      <div className="bg-white md:rounded-2xl max-w-2xl w-full h-full md:h-auto md:max-h-[90vh] overflow-y-auto">
        {/* Header with Steps */}
        <div className="gradient-bg p-6 text-white md:rounded-t-2xl sticky top-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Contest Entry</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-white text-accent-violet" : "bg-white/30"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm">Details</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                step >= 2 ? "bg-white" : "bg-white/30"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-white text-accent-violet" : "bg-white/30"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm">Payment</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                step >= 3 ? "bg-white" : "bg-white/30"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-white text-accent-violet" : "bg-white/30"
                }`}
              >
                3
              </div>
              <span className="ml-2 text-sm">Final Step</span>
            </div>
          </div>
        </div>

        {/* Step 1: Contest Form */}
        {step === 1 && (
          <form onSubmit={handleContestSubmit} className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-accent-violet" />
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                  placeholder="Full Name *"
                />
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                >
                  <option value="">Select Gender *</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-accent-violet" />
                Contact Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                  placeholder="Email *"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                  placeholder="Phone *"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-accent-violet" />
                Address Details
              </h3>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                placeholder="Address *"
              />
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                  placeholder="City *"
                />
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                  placeholder="State *"
                />
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                  placeholder="Pincode *"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-accent-violet" />
                Contest Entry Fee
              </h3>
              <div className="flex items-center justify-between bg-white rounded-xl p-4 border-2 border-accent-violet-light">
                <div>
                  <div className="font-semibold text-gray-800">
                    Contest Entry
                  </div>
                  <div className="text-sm text-gray-600">
                    Single entry to lucky draw
                  </div>
                </div>
                <div className="text-2xl font-bold text-accent-violet">
                  ₹399
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                if (
                  !formData.name ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.gender ||
                  !formData.address ||
                  !formData.city ||
                  !formData.state ||
                  !formData.pincode
                ) {
                  alert("Please fill all required fields");
                  return;
                }
                try {
                  const response = await fetch("/api/contest/check", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: formData.email,
                      phone: formData.phone,
                    }),
                  });
                  const result = await response.json();
                  if (response.ok) {
                    setStep(2);
                  } else {
                    alert(result.error || "Already registered");
                  }
                } catch (error) {
                  alert("Network error");
                }
              }}
              className="w-full gradient-bg text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all"
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-accent-violet" />
                Complete Payment
              </h3>
              <div className="bg-white rounded-xl p-6 border-2 border-accent-violet-light mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold text-gray-800">
                      Contest Entry Fee
                    </div>
                    <div className="text-sm text-gray-600">
                      Single entry to lucky draw
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-accent-violet">
                    ₹399
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-gray-200 text-gray-700 py-4 rounded-xl text-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleContestSubmit}
                  className="w-2/3 gradient-bg text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Congratulations */}
        {step === 4 && (
          <div className="p-6 space-y-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Congratulations!
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Your contest entry has been submitted successfully!
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <p className="text-gray-800 font-semibold mb-2">
                📞 Important Notice
              </p>
              <p className="text-gray-700 text-sm">
                We will contact you via your registered email (
                <strong>{formData.email}</strong>) and phone number (
                <strong>{formData.phone}</strong>) if you win any prize.
              </p>
              <p className="text-red-600 text-sm mt-3 font-medium">
                ⚠️ Please ensure your phone number and email are valid and
                active.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                setStep(1);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  gender: "",
                  address: "",
                  city: "",
                  state: "",
                  pincode: "",
                  essay: "",
                  transactionId: "",
                });
              }}
              className="w-full gradient-bg text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all"
            >
              Close
            </button>
          </div>
        )}

        {/* Step 3: Essay Form */}
        {step === 3 && (
          <form onSubmit={handleEssaySubmit} className="p-6 space-y-6">
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                Q. How would owning a home transform your life or the lives of
                your community? Describe one concrete scenario?(In 200 words)
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-red-800 font-semibold text-sm">
                  ⚠️ Warning: Do not use AI tools to write your essay. Only
                  original, personally written content will be accepted. We want
                  the best not the followers.
                </p>
              </div>
              <textarea
                name="essay"
                required
                value={formData.essay}
                onChange={handleChange}
                maxLength={200}
                rows={10}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet outline-none"
                placeholder="Write your essay here..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.essay.length}/200 words
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full gradient-bg text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all"
            >
              Submit Essay
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
