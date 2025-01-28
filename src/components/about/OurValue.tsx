import React from 'react'
import {
    Users,
    Award,
  } from "lucide-react";
const OurValue = () => {
  return (
    <div>  
          <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4 bg-white p-6 rounded-lg">
              <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service,
                  ensuring the best experience for organizers and attendees
                  alike.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white p-6 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  Building meaningful connections and fostering a vibrant
                  community of event enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurValue