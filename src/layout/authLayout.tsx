

// import React from 'react'

import { ReactNode } from 'react';

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="h-screen flex">
      {/* Left side with stethoscope image */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center ">
        <div className="relative w-full ">
          <img
            src="/oversabinurse/Image Placeholder.png"
            alt="Blue stethoscope"
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
       {children}
      </div>
    </div>
  )
}

export default AuthLayout
