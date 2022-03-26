import React from "react";

const FullSpinner = () => {
  return (
    <div className="w-screen flex justify-center items-center h-screen fixed inset-0">
      {/* <div
        style={{ borderTopColor: "transparent" }}
        className="w-52 h-52 border-8 border-indigo-500 border-dotted rounded-full animate-spin"
      ></div> */}
      <div className="flex flex-col justify-center items-center">
        <img src="/logo1.png" className="w-1/3" />
        {/* <div className="text-center font-medium">Rise-n-Shine</div> */}
        <div class="flex items-center justify-center space-x-2 my-3">
          <div class="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
          <div class="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
          <div class="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default FullSpinner;
