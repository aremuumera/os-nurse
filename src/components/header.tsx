"use client";
import { useState } from "react";
import { AlignJustifyIcon, X } from "lucide-react";
import { allPaths } from "../utils/path";
import { Link } from "react-router-dom";

const topNavItems = [
  { name: "Blog", href: "/" },
  { name: "About Us", href: "/" },
  { name: "Contact Us", href: "/" },
];


export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeTopIndex, setActiveTopIndex] = useState(0);

  return (
    <header >
      <div className="fixed top-0 left-0 w-full !z-[995500] px-[10px] ">
        <div className="w-full max-w-[1280px]  sm:mt-6 mt-3 rounded-[500px] bg-primary-main !text-white  mx-auto">
            {/* Top Navigation */}
            <div className="flex justify-between items-center px-4 sm:px-10  md:h-[85px] h-[70px]  lg:pr-16 lg:pl-2 ">
                
                 <div className="px-10 py-[16px] hidden lg:block  rounded-full bg-primary-mainPink text-white">
                    <Link to={allPaths.auth.login} className="font-[400] text-[18px] " >
                        Shop
                    </Link>
                </div>

                <div className="flex lg:justify-end justify-between gap-[220px] items-center  w-full">
                  {/* Logo */}
                <div className="-mt-6">
                    <Link to={"/"}>
                        <img
                        src={"/Oversabi-Nurse-logo.png"}
                        alt="nama Africa logo"
                        width={94}
                        height={85}
                        className='md:w-[95px]  w-[80px]'

                        />
                    </Link>
                </div>


                {/* Desktop Navigation */}
                <nav className="hidden font-roboto lg:flex gap-[80px]">
                {topNavItems.map((item, index) => (
                    <Link
                    key={`${item.name}}-${index}`}
                    to={item.href}
                    className={`relative text-[1rem] hover:text-light-primary-main   transition duration-300 ease-in-out transform hover:scale-105 font-[500]  `}
                    >
                    <h2
                        className={` py-2 text-[16px]  font-[400] `}
                        onClick={() => setActiveTopIndex(index)}
                    >
                        {item.name}
                        {activeTopIndex === index && (
                        <div>
                            {/* <span
                        className="absolute -bottom-[10px] px-[30px] z-[111000] -ml-[5px] w-[150px] mx-auto left-0 rotate-180   h-[20px] bg-[white] rounded-[45px]"
                        > </span>   */}
                        </div>
                        )}
                    </h2>
                    </Link>
                ))}
                </nav>

                
                </div>
                

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden flex items-center"
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    <AlignJustifyIcon size={24} />
                    {/* <span className="material-icons">menu</span> */}
                </button>
            </div>
        </div>
      </div>



      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 !z-[995500] right-0 w-full h-full bg-primary-main  transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg z-50`}
      >
        <div className="flex justify-between items-center mt-4 p-4">
          <span className="font-bold text-lg">
          <div className="-mt-6">
              <Link to={"/"}>
                  <img
                  src={"/Oversabi-Nurse-logo.png"}
                  alt="nama Africa logo"
                  width={94}
                  height={85}
                  className='md:w-[95px]  w-[80px]'

                  />
              </Link>
          </div>
            </span>
          <button className="" onClick={() => setMenuOpen(false)}>
            <span className="material-icons text-white">
              <X />{" "}
            </span>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 mb-4 p-4">
          {topNavItems.map((item, index) => (
            <Link key={item.name} to={item.href}>
              <div
                className={`block  p-[10px] hover:bg-primary-background text-white rounded-md text-lg font-medium ${
                  activeTopIndex === index
                    ? " bg-primary-background"
                    : ""
                }`}
                onClick={() => {
                  setActiveTopIndex(index);
                  setMenuOpen(false); // Close menu on click
                }}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
        <div className="px-6 text-center mt-8 w-full  text-white">
            <Link to={allPaths.auth.login} className="font-[700] text-center  text-white px-6 py-4 rounded-full block  !w-full text-[16px] bg-primary-mainPink " >
               Shop
            </Link>
        </div>
      </div>
    </header>
  );
}
