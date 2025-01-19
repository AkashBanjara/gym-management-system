// import React, { useState } from "react";
// import Login from "../../components/login/Login";
// import Register from "../../components/register/Register";

// const Home = () => {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div className="w-full h-screen bg-gray-900">
//       {/* Header */}
//       <div className="border-b-4 border-teal-500 bg-gray-800 text-white p-5 font-bold text-2xl text-center shadow-lg">
//         Welcome to Gym Management System
//       </div>

//       {/* Background Section */}
//       <div className='w-full h-[calc(100%-70px)] flex justify-center items-center bg-cover bg-fixed bg-[url("https://wallpapercave.com/wp/wp2482997.jpg")]'>
//         <div className="w-full lg:w-2/3 xl:w-1/2 max-h-[90%] overflow-y-auto p-12 bg-black bg-opacity-70 rounded-2xl shadow-2xl">
//           {/* Toggle Buttons */}
//           <div className="flex justify-center mb-10">
//             <button
//               onClick={() => setShowLogin(true)}
//               className={`px-6 py-3 text-lg font-semibold rounded-l-full transition-all duration-300 ${
//                 showLogin
//                   ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
//                   : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setShowLogin(false)}
//               className={`px-6 py-3 text-lg font-semibold rounded-r-full transition-all duration-300 ${
//                 !showLogin
//                   ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
//                   : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             >
//               Register
//             </button>
//           </div>

//           {/* Toggle Components */}
//           <div className="flex justify-center">
//             {showLogin ? <Login /> : <Register />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="w-full h-screen bg-gray-900">
      {/* Header */}
      <div className="border-b-4 border-teal-500 bg-gray-800 text-white p-5 font-bold text-2xl text-center shadow-lg">
        Welcome to Gym Management System
      </div>

      {/* Background Section */}
      <div className='w-full h-[calc(100%-70px)] flex justify-center items-center bg-cover bg-fixed bg-[url("https://wallpapercave.com/wp/wp2482997.jpg")]'>
        <div className="w-full lg:w-2/3 xl:w-1/2 max-h-[90%] overflow-y-auto p-12 bg-black bg-opacity-70 rounded-2xl shadow-2xl">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setShowLogin(true)}
              className={`px-6 py-3 text-lg font-semibold rounded-l-full transition-all duration-300 ${
                showLogin
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`px-6 py-3 text-lg font-semibold rounded-r-full transition-all duration-300 ${
                !showLogin
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Toggle Components */}
          <div className="flex justify-center">
            {showLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
