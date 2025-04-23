import React from 'react'
import {
    Calendar,
    Users,
    Ticket,
    Search,
    Award,
    Mail,
    Globe,
  } from "lucide-react";
const AboutComp2 = () => {
  return (
    <div>
          <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Event Creation</h3>
              <p className="text-gray-600">
                Powerful tools for organizers to create and manage successful
                events
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Search className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Easy Discovery</h3>
              <p className="text-gray-600">
                Intelligent search and recommendations to find the perfect
                events
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Ticket className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure Ticketing</h3>
              <p className="text-gray-600">
                Hassle-free booking and ticket management system
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutComp2