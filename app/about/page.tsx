import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Award,
  Clock,
  DollarSign,
  Building,
  Users,
  CheckCircle,
  Target,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 animate-fade-in-up">
              About AadityaBuildCons
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A full-service firm specializing in integrated Architecture,
              Interior Design, and Construction. Formerly known as XCricStock11,
              we simplify the building process as your single, accountable
              partner.
            </p>
          </div>

          {/* Journey Section - Glass Card */}
          <div className="glass rounded-3xl md:p-12 mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-[var(--color-accent-violet-light)] text-[var(--color-accent-violet-dark)] rounded-full text-sm font-medium mb-6">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Our Journey
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Our Journey and Vision
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Welcome to AadityaBuildCons, a full-service firm specializing
                  in integrated Architecture, Interior Design, and Construction.
                  Our mission is to simplify the building process for our
                  clients by serving as a single, accountable partner from the
                  initial sketch to the final handover.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  While our name is new, our commitment to project excellence
                  has a solid foundation. We were formerly known as
                  XCricStock11. This strategic evolution allows us to focus
                  entirely on the built environment, offering a comprehensive
                  suite of services that ensure seamless execution and superior
                  quality in every project we undertake.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-violet-light)] to-[var(--color-accent-violet)] rounded-2xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop"
                  alt="AadityaBuildCons Office"
                  className="relative w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Services Section - Gradient Background */}
          <div className="gradient-bg rounded-3xl p-8 md:p-12 mb-20 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl transform -rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop"
                  alt="Integrated Services"
                  className="relative w-full rounded-2xl shadow-xl"
                />
              </div>
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  <Building className="w-4 h-4 mr-2" />
                  Our Integrated Services
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Complete Project Lifecycle
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Architecture & Design</h3>
                    <p className="opacity-90 text-sm">
                      Creating functional, sustainable, and aesthetically
                      striking blueprints optimized for every purpose.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Interior Design</h3>
                    <p className="opacity-90 text-sm">
                      Transforming structures into personalized spaces with
                      spatial planning, lighting, and custom fixtures.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Construction & Building</h3>
                    <p className="opacity-90 text-sm">
                      Bringing designs to life with strict adherence to
                      timelines, quality standards, and budget discipline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The AadityaBuildCons Advantage */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                The AadityaBuildCons Advantage
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                By handling design, interiors, and construction in-house, we
                offer unmatched continuity, accountability, and transparency.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--color-accent-violet-light)]">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent-violet-light)] to-[var(--color-accent-violet)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Seamless Project Flow
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our unified team ensures perfect coordination between design
                  intent and construction execution, eliminating common
                  miscommunication and delays.
                </p>
              </div>
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--color-accent-violet-light)]">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent-violet)] to-[var(--color-accent-violet-dark)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Integrity and Transparency
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Succeeding XCricStock11, we are committed to earning your
                  trust through open communication with no hidden charges from
                  consultation to completion.
                </p>
              </div>
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--color-accent-violet-light)]">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent-violet-dark)] to-[var(--color-accent-violet)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Client-Centric Approach
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your vision is the driving force behind our work. We partner
                  with you at every stage to deliver a space that perfectly
                  aligns with your needs, budget, and aspirations.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Ready to Build Your Dream?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Let's transform your vision into reality with our integrated
              approach to architecture, design, and construction.
            </p>
            <a
              href="/"
              className="inline-block gradient-bg text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
