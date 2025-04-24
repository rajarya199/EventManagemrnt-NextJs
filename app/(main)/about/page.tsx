import AboutComp1 from '@/src/components/about/AboutComp1'
import AboutComp2 from '@/src/components/about/AboutComp2'
import AboutComp3 from '@/src/components/about/AboutComp3'
import JoinUs from '@/src/components/about/JoinUs'
import OurValue from '@/src/components/about/OurValue'
import React from 'react'

const About = () => {
  return (
    <div className=' bg-primary-50 dark:bg-primary-900'>
{/* className w-full relative bg-grey-900 py-20 px-4 */}
<section className="w-full relative  py-20 px-4">
        {/* <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div> */}
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl text-black dark:text-white font-bold ml-3">Event Globe</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white text-black">
            Connecting Events with Their Perfect Audience
          </h2>
          <p className="text-xl text-gray-800  dark:text-gray-100 max-w-2xl mx-auto">
            We're revolutionizing how people discover, organize, and attend
            events. Our platform brings together event organizers and
            enthusiasts in one seamless experience.
          </p>
        </div>
      </section>
      <AboutComp1/>
      <AboutComp2/>
      <AboutComp3/>
      <OurValue/>
      <JoinUs/>
     
    </div>
  )
}

export default About