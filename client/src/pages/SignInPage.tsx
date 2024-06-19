import React, { useState } from "react";
import Copyright from "../components/Copyright";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {};

function SignInPage({}: Props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">
      <div className="flex flex-1 h-screen">
        <div className="h-screen flex-[10]">
          <img
            src="https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="computers"
            className="w-full h-full"
          />
        </div>
        <div className="flex-[2] flex flex-col justify-between md:px-4 2xl:px-10 py-3">
          <div className="w-40 mt-4">
            <img
              src="https://cdn.svgporn.com/logos/datasette.svg?response-content-disposition=attachment%3Bfilename%3Ddatasette.svg"
              alt="logo"
              className="max-w-full max-h-full"
            />
          </div>
          <div>
            <form action="" className="mb-20">
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 text-lg font-medium">
                  Email
                </label>
                <input
                  className="text-[16px] text-gray-800 leading-3 w-full border-[0.5px] border-slate-400 px-3 rounded-md outline-none py-2 focus:border-slate-600 ease-in-out"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-gray-900 text-lg font-medium">
                  Password
                </label>
                <div className="flex text-[16px] text-gray-800 leading-3 w-full border-[0.5px] border-slate-400  rounded-md outline-none focus:border-slate-600 ease-in-out">
                  <input
                    className="text-[16px] text-gray-800 leading-3 w-full  px-3 rounded-md outline-none py-2 ease-in-out"
                    placeholder="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <div
                    className="cursor-pointer px-2  rounded-sm hover:bg-slate-200 ease-in-out h-full py-2.5 rounded-r-md duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
              <div className="mt-[36px]">
                <button
                  type="submit"
                  className="px-10 py-4 rounded-md text-xl bg-green-600 text-white font-medium leading-3 w-full border-[0.5px] border-green-500 hover:border-green-400"
                >
                  Login
                </button>
              </div>
              <div className="mt-[36px]">
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="px-10 py-4 rounded-md text-xl bg-slate-200 text-gray-800 font-medium leading-3 w-full border-[0.5px] border-slate-500 hover:border-slate-400"
                >
                  Register
                </button>
              </div>
            </form>
            <Copyright />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
