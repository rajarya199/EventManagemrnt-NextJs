import React from 'react';

const Items1 = () => {
  return (
    <div>
      <div
        className="bg-[url('/assets/images/ktm.jpg')] bg-cover bg-center h-screen flex justify-center items-center flex-col relative"
      >
      
        <div className="absolute inset-0 bg-black opacity-35"></div>

        <div className="relative z-10"> 
          <h1 className="text-[48px] font-bold  text-white">Explore Events, Create Memories</h1>
          <h1 className="text-[48px] font-bold mb-4 text-white">Find your's Next Experiences with us </h1>

          {/* <button
            className="p-3 mb-4 w-2/6 bg-blue-500 text-lg text-white rounded hover:bg-blue-700"
          >
            Join Events
          </button> */}
          
          <div className="flex justify-center w-full mb-4">
            <input
              type="search"
              placeholder="Search events"
              className="p-4 w-4/6 mr-2 border text-white bg-gray-50 border-gray-300 rounded-full bg-transparent"
            />
            <button
              className="p-2 w-2/6 rounded-2xl bg-blue-500 text-white hover:bg-blue-700"
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
