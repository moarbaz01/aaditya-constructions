import { Bell, Calendar } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function NoticePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-accent-violet to-accent-violet-dark p-4 rounded-full">
                <Bell className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-6">
              Important Notice
            </h1>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Contest Result Announcement
                  </h2>
                  <p className="text-gray-700 text-lg">
                    The results of the contest will be declared on{" "}
                    <span className="font-bold text-accent-violet">
                      25th December 2025
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Thank you for participating in our contest! We have received an
                overwhelming response from all participants.
              </p>
              <p className="text-lg">
                Winners will be contacted via their registered email and phone
                number. Please ensure your contact details are active and
                accessible.
              </p>
              <p className="text-lg font-semibold text-accent-violet">
                Stay tuned for the announcement!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
