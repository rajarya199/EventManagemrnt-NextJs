import React from 'react'
import Link from 'next/link';
import {
    Mail,
  } from "lucide-react";
const JoinUs = () => {
  return (
    <div>
   <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of successful event organizers and millions of
            attendees on Event Globe.
          </p>
          <Link href="/contact">
          <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            <Mail className="w-5 h-5 mr-2" />
            Contact Us
          </button>
          </Link>
         
        </div>
      </section>

    </div>
  )
}

export default JoinUs