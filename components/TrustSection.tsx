export default function TrustSection() {
  const badges = [
    { number: '1000+', label: 'Happy Participants' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Secure Payments' },
    { number: '50+', label: 'Projects Completed' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      city: 'Mumbai',
      text: 'I won the contest last year! The process was transparent and the flat is amazing.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      city: 'Delhi',
      text: 'Trusted company with genuine contests. Even if you don\'t win, the experience is great.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      city: 'Bangalore',
      text: 'Professional team and secure payment process. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-violet-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Why Join With Us?
          </h2>
          <p className="text-xl text-gray-600">
            Thousands of happy participants, verified process, and real prizes
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {badge.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {badge.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-semibold text-gray-800">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.city}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-2xl">✓</span>
              <span className="text-gray-700">Registered Company</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-2xl">✓</span>
              <span className="text-gray-700">Secure SSL Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-2xl">✓</span>
              <span className="text-gray-700">Transparent Process</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-2xl">✓</span>
              <span className="text-gray-700">Real Winners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}