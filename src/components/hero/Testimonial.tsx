"use client"
import React,{useState,useEffect} from 'react'
import {
    Calendar,
    Users,
    BarChart,
    Clock,
    ChevronRight,
    Menu,
    X,
    ChevronLeft,
  } from "lucide-react";
const testimonials = [
    {
      id: 1,
      name: "Elija ",
      role: "Event Director",
      company: "Tech Conference International",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
      quote:
        "EventGLobe has transformed how we manage our tech conferences. The platform's intuitive interface and comprehensive features have made our planning process incredibly efficient.",
    },
    {
      id: 2,
      name: "Michael ",
      role: " Planner",
      company: "Perfect Day Events",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
      quote:
        "As a Event planner, I need tools that are both powerful and elegant. EventGlobe has delivers exactly that, helping me create perfect moments for my clients.",
    },
    {
      id: 3,
      name: "Emily rose",
      role: "Atendee",
      company: "user",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
      quote:
        " It has been easy to find events of our choices",
    },
  ];
const Testimonial = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1,
        );
      }, 5000);
      return () => clearInterval(timer);
    }, []);
    const nextTestimonial = () => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    };
    const prevTestimonial = () => {
      setCurrentTestimonial((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1,
      );
    };
  return (
    <div>
          <section className="py-16 px-4  bg-primary-50 dark:bg-primary-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="relative">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTestimonial * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-xl p-8 text-center">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                          />
                          <p className="text-xl text-gray-600 italic mb-6">
                            "{testimonial.quote}"
                          </p>
                          <div className="text-gray-900 font-semibold">
                            {testimonial.name}
                          </div>
                          <div className="text-blue-600">
                            {testimonial.role}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
            >
              <ChevronLeft className="text-gray-600" size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
            >
              <ChevronRight className="text-gray-600" size={24} />
            </button>
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentTestimonial === index ? "bg-blue-600 w-4" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonial