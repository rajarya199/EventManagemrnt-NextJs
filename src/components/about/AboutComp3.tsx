import React from 'react'

const AboutComp3 = () => {
  return (
    <div>
          <section className="py-16 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
              <p className="text-gray-600">Events Hosted</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
              <p className="text-gray-600">Happy Attendees</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <p className="text-gray-600">Event Organizers</p>
            </div>
          </div>
        </div>
      </section>
    
     

    </div>
  )
}

export default AboutComp3