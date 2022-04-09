import React, { useState } from "react";

export default function Navbar() {
  const { LOCAL_HOST } = process.env;
  const [burger, setBurger] = useState("hidden");

  function revealMenu() {
    setBurger((prevState) => {
      return prevState === "hidden" ? "" : "hidden";
    });
  }

  const mobileBurger = (
    <div className="md:hidden flex items-center">
      <button
        className="outline-none mobile-menu-button hover:bg-amber-600 transition duration-300"
        onClick={revealMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <React.Fragment>
      {/* Navbar goes here  text-white temporary*/}
      <nav className="bg-blue-900 shadow-lg text-white">
        <div className="px-4 py-4">
          <div className="flex mx-4 justify-between space-x-7">
            <div className="flex">
              {/* Website Logo */}
              <div className="flex mr-8">
                <a href={LOCAL_HOST} className="flex items-center mr-2">
                  <svg
                    className=" h-8 w-8 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </a>
                <span className="flex items-center font-semibold text-white text-lg ml-2">
                  Navigation
                </span>
              </div>
              {/* Primary Navbar items */}
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href={LOCAL_HOST}
                  className="p-2 text-white rounded hover:bg-amber-600 font-semibold transition duration-300 cursor-pointer"
                >
                  Home
                </a>
                <a
                  href={LOCAL_HOST}
                  className="p-2 text-white rounded hover:bg-amber-600
                  font-semibold transition duration-300 cursor-pointer"
                >
                  Services
                </a>
                <a
                  href={LOCAL_HOST}
                  className="p-2 text-white rounded hover:bg-amber-600
                  font-semibold transition duration-300 cursor-pointer"
                >
                  About
                </a>
                <a
                  href={LOCAL_HOST}
                  className="p-2 text-white rounded hover:bg-amber-600
                  font-semibold transition duration-300 cursor-pointer"
                >
                  Contact Us
                </a>
              </div>
            </div>
            {/* Secondary Navbar items  */}
            <div className="hidden md:flex justify-end items-center  space-x-3 ">
              <a
                href={LOCAL_HOST}
                className="p-2 font-medium text-white rounded hover:bg-amber-600
                transition duration-300 cursor-pointer"
              >
                Register
              </a>
              <a
                href={LOCAL_HOST}
                className="p-2 font-medium text-white border-2 border-white
                rounded-full hover:bg-amber-600 transition duration-300 cursor-pointer"
              >
                <svg
                  className="w-6 h-6 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            {/* generate the mobile menu button if burger state is hidden */}
            {burger === "hidden" && mobileBurger}
            {/* Mobile menu */}
            <div className={`${burger} mobile-menu md:hidden`}>
              <ul className="">
                {/* !if screen is resized when the menu is open it remains open. Will this be a problem? */}
                <li className="flex justify-end py-2">{mobileBurger}</li>

                <li className="">
                  <a
                    href={LOCAL_HOST}
                    className="block text-sm px-2 py-2 font-medium text-white
                    rounded hover:bg-amber-600 transition duration-300 cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href={LOCAL_HOST}
                    className="block text-sm px-2 py-2 font-medium text-white
                    rounded hover:bg-amber-600 transition duration-300 cursor-pointer"
                  >
                    {" "}
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href={LOCAL_HOST}
                    className="block text-sm px-2 py-2 font-medium text-white
                    rounded hover:bg-amber-600 transition duration-300 cursor-pointer"
                  >
                    {" "}
                    About
                  </a>
                </li>
                <li>
                  <a
                    href={LOCAL_HOST}
                    className="block text-sm px-2 py-2 font-medium text-white
                    rounded hover:bg-amber-600 transition duration-300 cursor-pointer"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href={LOCAL_HOST}
                    className="block text-sm px-2 py-2 font-medium text-white
                    rounded hover:bg-amber-600 transition duration-300 cursor-pointer"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a
                    href={LOCAL_HOST}
                    className="block p-2 mb-2 font-medium text-white rounded
                    hover:bg-amber-600 transition duration-300 cursor-pointer"
                  >
                    <svg
                      className="w-6 h-6 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
