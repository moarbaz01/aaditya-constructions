"use client";

import { Trophy, Medal, Award, Star, Gift, Users } from "lucide-react";

export default function WinnersTable() {
  const luckyDrawPrizes = [
    {
      draw: "1st Prize",
      winners: 1,
      prize: "₹60 Lakh Worth Flat",
      value: "₹60 Lakhs",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      draw: "2nd Prize",
      winners: 1,
      prize: "Cash Prize",
      value: "₹1,11,000",
      icon: Medal,
      color: "text-gray-400",
    },
    {
      draw: "3rd Prize",
      winners: 1,
      prize: "Cash Prize",
      value: "₹1,11,000",
      icon: Award,
      color: "text-amber-600",
    },
    {
      draw: "4th-9th Prize",
      winners: 6,
      prize: "Cash Prize",
      value: "₹51,000 Each",
      icon: Star,
      color: "text-accent-violet",
    },
    {
      draw: "10th-100th Prize",
      winners: 91,
      prize: "Cash Prize",
      value: "₹10,000 Each",
      icon: Gift,
      color: "text-green-500",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Prize Structure & Rewards
          </h2>
          <p className="text-xl text-gray-600">
            Amazing prizes waiting for you! Check what you can win.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
          {/* Lucky Draw Prizes Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-linear-to-r from-accent-violet-light to-accent-violet p-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Trophy className="w-6 h-6 mr-3" />
                Contest Prizes
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Draw
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Winner
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Prize
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {luckyDrawPrizes.map((prize, index) => {
                    const IconComponent = prize.icon;
                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <IconComponent
                              className={`w-6 h-6 ${prize.color}`}
                            />
                            <span className="ml-2 font-semibold text-gray-800">
                              {prize.draw}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="font-semibold text-gray-800">
                              {prize.winners} Winner
                              {prize.winners > 1 ? "s" : ""}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800">
                            {prize.prize}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-accent-violet">
                            {prize.value}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Prize Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-linear-to-r  from-accent-violet to-accent-violet-dark p-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Gift className="w-6 h-6 mr-3" />
                Prize Breakdown
              </h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center">
                    <Trophy className="w-6 h-6 text-yellow-500 mr-3" />
                    <span className="font-semibold text-gray-800">
                      1st Winner
                    </span>
                  </div>
                  <span className="text-xl font-bold text-yellow-600">
                    ₹60 Lakh Worth Flat
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center">
                    <Medal className="w-6 h-6 text-gray-500 mr-3" />
                    <span className="font-semibold text-gray-800">
                      2nd & 3rd Winners
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-600">
                    ₹1,11,000 Each
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-purple-500 mr-3" />
                    <span className="font-semibold text-gray-800">
                      4th-9th Winners (6 people)
                    </span>
                  </div>
                  <span className="text-xl font-bold text-purple-600">
                    ₹51,000 Each
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center">
                    <Gift className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-semibold text-gray-800">
                      10th-100th Winners (91 people)
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    ₹10,000 Each
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-12">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              100 Lucky Winners!
            </h3>
            <p className="text-gray-600 mb-6">
              One person will win ₹60 Lakh worth flat! 99 others will win cash
              prizes!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Enter Contest Now
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
