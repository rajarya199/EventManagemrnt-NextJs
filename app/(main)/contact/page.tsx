"use client"
import Image from 'next/image';
import {useState, useEffect } from 'react';




const ContactPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 748);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <>
    <section id="contact-page" className="bg-gray-100 dark:bg-primary-900 py-12">
      <div className=" wrapper container mx-auto p-4 md:p-6 lg:p-12">
        <div className="flex flex-col items-center mb-8">
          <span className="text-lg uppercase text-grey-500 dark:text-gray-300 font-bold mb-2">Contact Us</span>
          <h2 className="text-[36px] font-semibold text-gray-700 dark:text-gray-400 text-center max-w-md mx-auto">We Love to Hear from Our Happy Customers</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
        <form className="md:w-1/2 bg-white dark:bg-primary-600 p-6 rounded-3xl">
            <div className="mb-4">
              <label className="block text-lg  mb-2">Name</label>
              <input
                type="text"
                id="name-1150"
                name="name"
                placeholder="Name"
                required
                className="block w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg  mb-2">Email</label>
              <input
                type="email"
                id="email-1150"
                name="email"
                placeholder="Email"
                required
                className="block w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">Phone</label>
              <input
                type="number"
                id="phone-1150"
                name="phone"
                placeholder="Phone"
                required
                className="block w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">Message</label>
              <textarea
                name="Message"
                id="message-1150"
                placeholder="Write message..."
                required
                className="block w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500 h-32"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
          <div className="md:w-1/2">
            {/* <picture className="mb-4">
              <source media="(max-width: 768px)" srcSet="/assests/images/abc.jpg" />
              <source media="(min-width: 769px)" srcSet="/assets/images/cont.jpg" />
              <img
              src="/assets/images/abc.jpg"
                // src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/group.jpg"
                alt="people"
                width={630}
                height={300}
                // objectFit="cover"
                className="rounded-3xl"
              />
            </picture> */}
            {isMobile ? (
        <Image
          src="/assets/images/cont2.jpg"
          alt="people"
          width={630}
          height={300}
          objectFit="cover"
          className="rounded-3xl mb-4"
        />
      ) : (
        <Image
          src="/assets/images/cont.jpg"
          alt="people"
          width={630}
          height={300}
          objectFit="cover"
          className="rounded-3xl mb-4"/>
      )}
            <p className="text-lg leading-relaxed mb-4">
             If you are looking for the platform where every event are listed then,you are at right place .EventGlobe is a platform where you can find variety of event of your choices.
            </p>
            <ul>
              <li className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex justify-center items-center border border-gray-300">
                  <Image
                    src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/mech-phone.svg"
                    alt="phone icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <span className="block text-lg font-bold mb-1">Phone</span>
                  <a href="tel:888-4565-789" className="block text-gray-600">9800000000</a>
                </div>
              </li>
              <li className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex justify-center items-center border border-gray-300">
                  <Image
                    src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/mech-pin.svg"
                    alt="address icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <span className="block text-lg font-bold mb-1">Address</span>
                  <a href="" className="block text-gray-600">Satdobato,Lalitpur</a>
                </div>
              </li>
            </ul>
          </div>
         
        </div>
      </div>
    </section>
    </>
  
  );
};

export default ContactPage;
