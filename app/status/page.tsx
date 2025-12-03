"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function StatusPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [contestData, setContestData] = useState<any>(null);
  const [error, setError] = useState("");
  const [essay, setEssay] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setContestData(null);

    try {
      const response = await fetch("/api/contest/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await response.json();

      if (response.ok) {
        setContestData(data.contest);
      } else {
        setError(data.error || "No entry found");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleEssaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!essay) {
      alert("Please write your essay");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/essay/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contestData.email,
          phone: contestData.phone,
          essay,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setContestData({ ...contestData, essay });
        alert("Essay submitted successfully!");
        setEssay("");
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
              Check Contest Status
            </h1>
            <p className="text-gray-600 text-lg">
              Enter your details to view your contest entry status
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-violet outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-violet outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg text-white py-4 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                {loading ? "Searching..." : "Check Status"}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-700 text-lg font-semibold">{error}</p>
            </div>
          )}

          {contestData && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Entry Found!
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Name</p>
                    <p className="text-gray-800 font-semibold text-lg">
                      {contestData.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Email</p>
                    <p className="text-gray-800 font-semibold text-lg">
                      {contestData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Phone</p>
                    <p className="text-gray-800 font-semibold text-lg">
                      {contestData.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">City</p>
                    <p className="text-gray-800 font-semibold text-lg">
                      {contestData.city}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Payment Status</p>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        contestData.paymentStatus === "completed"
                          ? "bg-green-100 text-green-800"
                          : contestData.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {contestData.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">
                      Submission Date
                    </p>
                    <p className="text-gray-800 font-semibold text-lg">
                      {new Date(contestData.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {contestData.essay ? (
                <div className="bg-white rounded-2xl p-8 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-accent-violet" />
                    <h3 className="text-xl font-bold text-gray-800">
                      Your Essay
                    </h3>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {contestData.essay}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border-2 border-yellow-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-xl font-bold text-gray-800">
                      Essay Pending
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    You haven't submitted your essay yet. Please submit it to
                    complete your entry.
                  </p>
                  <form onSubmit={handleEssaySubmit} className="space-y-4">
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                      <p className="text-red-800 font-semibold text-sm">
                        ⚠️ Warning: Do not use AI tools to write your essay.
                        Only original content will be accepted.
                      </p>
                    </div>
                    <textarea
                      required
                      value={essay}
                      onChange={(e) => setEssay(e.target.value)}
                      maxLength={200}
                      rows={10}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-violet outline-none"
                      placeholder="Write your essay here (max 200 words)..."
                    />
                    <div className="text-right text-sm text-gray-500">
                      {essay.length}/200 words
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full gradient-bg text-white py-4 rounded-xl font-semibold transition-all disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit Essay"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
