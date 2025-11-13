"use client";

import { useEffect, useState } from "react";
import { X, User, Phone, MapPin, CreditCard } from "lucide-react";

interface ContestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContestModal({ isOpen, onClose }: ContestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const paymentResponse = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const paymentResult = await paymentResponse.json();

      if (paymentResponse.ok && paymentResult.paymentUrl) {
        // Validate URL before redirect to prevent XSS
        try {
          const url = new URL(paymentResult.paymentUrl);
          if (
            url.protocol === "https:" &&
            (url.hostname.includes("phonepe.com") ||
              url.hostname.includes("phonepe"))
          ) {
            window.location.href = paymentResult.paymentUrl;
          } else {
            throw new Error("Invalid payment URL");
          }
        } catch (error) {
          alert("Invalid payment URL. Please try again.");
        }
      } else {
        alert(
          paymentResult.error || "Payment initiation failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Payment error");
      alert("Network error. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center md:p-4 overflow-y-auto">
      <div className="bg-white  md:rounded-2xl h-full max-w-2xl w-full md:max-h-[90vh] ">
        {/* Header */}
        <div className="gradient-bg p-6 text-white md:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Join Lucky Draw Contest</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-2 opacity-90">
            Fill your details to enter the contest
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-accent-violet" />
              Personal Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet-light outline-none transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-accent-violet" />
              Contact Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet-light outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet-light outline-none transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-accent-violet" />
              Address Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet-lightoutline-none transition-all resize-none"
                  placeholder="Enter your complete address"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet-lightoutline-none transition-all"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet-light outline-none transition-all"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet-light outline-none transition-all"
                    placeholder="Pincode"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-accent-violet" />
              Contest Entry Fee
            </h3>
            <div className="flex items-center justify-between bg-white rounded-xl p-4 border-2 border-accent-violet-light">
              <div>
                <div className="font-semibold text-gray-800">Contest Entry</div>
                <div className="text-sm text-gray-600">
                  Single entry to lucky draw
                </div>
              </div>
              <div className="text-2xl font-bold text-accent-violet">₹100</div>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-accent-violet-light rounded-xl p-4">
            <label className="flex items-start space-x-3">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <span className="text-accent-violet-dark font-medium">
                  Terms & Conditions
                </span>{" "}
                and confirm that all information provided is accurate. I
                understand the contest entry fee is ₹100.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full gradient-bg text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            Pay ₹100 & Join Contest
          </button>
        </form>
      </div>
    </div>
  );
}
