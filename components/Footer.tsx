import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative">
      <div className="absolute top-0 left-0 w-full h-1 gradient-bg"></div>

      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Aaditya BuildCons
              </h3>
              <p className="text-gray-600 mb-4">
                A trusted name in real estate, empowering people to own their
                dream homes through fair and transparent contests.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>✉️ ar.aadityasharma@gmail.com</div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-gray-600 hover:text-accent-violet transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-accent-violet transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/terms"
                  className="block text-gray-600 hover:text-accent-violet transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
              <div className="space-y-2">
                <Link
                  href="/policy"
                  className="block text-gray-600 hover:text-accent-violet transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-600">
              © 2023 Aaditya BuildCons. All rights reserved. | Licensed Real
              Estate Company
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
