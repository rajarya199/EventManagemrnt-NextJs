import React from 'react'

const AboutComp1 = () => {
  return (
    <div>

<section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80"
                alt="Global events collaboration"
                className="w-full h-[350px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg dark:text-gray-300 text-gray-600">
                To create a world where every event finds its audience and every
                person finds their perfect event. We're committed to making
                event discovery and management seamless and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  )
}

export default AboutComp1