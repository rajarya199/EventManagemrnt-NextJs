import React from 'react';

const Items1 = () => {
  return (
    <div>
      <div
        className="bg-[url('/assets/images/ktm.jpg')] bg-cover bg-center h-[400px] flex justify-center items-center flex-col relative"
      >
        <div className="absolute inset-0 bg-black opacity-45"></div>

        <div className="relative z-10  "> 
          {/* <h1 className="text-[32px] md:text-[48px] font-bold text-white">Explore Events, Create Memories</h1>
          <h2 className="text-[24px] md:text-[48px] font-bold mb-4 text-white">Find your Next Experiences with us</h2> */}
 <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Find your Next Experiences with us</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
          {/* Discover Amazing Events,Explore Events, Create Memories, */}
          "Discover incredible events near you, explore new experiences, and create lasting memories. Your next great adventure awaits!"

          </p>
          <div className="flex flex-col md:flex-row justify-center w-full mb-4">
            <input
              type="search"
              placeholder="Search events"
              className="p-4 w-full md:w-4/6 mr-0 md:mr-2 border text-white bg-gray-50 border-gray-300 rounded-full bg-transparent"
            />
            <button
              className="p-2 w-full md:w-2/6 rounded-2xl bg-blue-500 text-white hover:bg-blue-700 mt-2 md:mt-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items1;
