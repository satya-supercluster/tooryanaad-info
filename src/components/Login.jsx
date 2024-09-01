import React from "react";
import { useAuth } from "../data/AuthContext";
import AnimatedDiv from "./AnimatedDiv";
const Login = () => {
  const { passcode, setPasscode } = useAuth();
  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-700">
      <AnimatedDiv className=" bg-black bg-opacity-30 shadow-lg rounded-lg p-6 min-h-[50vh] m-2 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center font-extrabold mb-4 text-blue-200">
          LOGIN
        </h1>
        <img src="/imgLogoXL.png" alt="TY" className="w-1/5 max-md:w-1/3" />
        <h1 className="text-xl max-md:text-lg text-center font-bold mb-4 text-green-100">
          Tooryanaad Samiti Events Information
        </h1>
        <input
          type="text"
          value={passcode}
          onChange={handlePasscodeChange}
          placeholder="Enter passcode"
          className="w-full max-w-52 px-4 py-2 border-2 rounded-md border-yellow-500 focus:outline-none focus:border-blue-500 font-bold text-slate-700"
        />
        {passcode === "" ? null : (
          <div className="text-red-200 p-2 text-sm font-semibold mt-2 text-center">
            PassCode Galat hai
          </div>
        )}
      </AnimatedDiv>
    </div>
  );
};

export default Login;
