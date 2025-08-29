// // components/Loading.jsx
// import React from 'react';

// const Loading = ({ height = "100vh" }) => {
//   return (
//     <div style={{ height }} className="flex items-center justify-center bg-white">
//       <div className="w-10 h-10 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
//     </div>
//   );
// };

// export default Loading;
import React from 'react';

const Loading = ({ height = "100vh" }) => {
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center"
    >
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full -z-10"
           style={{
             background: "linear-gradient(135deg, #fdfcfb 0%, #f5ebe0 50%, #ede7f6 100%)"
           }}
      ></div>

      {/* Spinner */}
      <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-l-[#7fd7d7] border-r-[#3bbfbf] border-b-[#2fa6a6] animate-spin" />
    </div>
  );
};

export default Loading;
