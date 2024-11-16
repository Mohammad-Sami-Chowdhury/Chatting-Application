import React from "react";
import { useState } from "react";
import login from "../../assets/login.png";
import google from "../../assets/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email Validation
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Please enter a valid email");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <section>
      <div className="flex items-center">
        <div className="w-1/2 ml-[180px]">
          <h1 className="text-[#03014C] text-[34px] font-bold font-open leading-[45px] pb-[30px]">
            Login to your account!
          </h1>
          <button className="group flex hover:border-[#5F35F5] duration-500 py-[22px] pl-[30px] items-center gap-2 border-[1px] border-[#b3b3c9] rounded-[8px] w-[220px] mb-[35px]">
            <img
              className="group-hover:rotate-[360deg] duration-500"
              src={google}
              alt="#google"
            />
            <p className="text-[#03014C] text-[14px] font-semibold font-open leading-[18px]">
              Login with Google
            </p>
          </button>
          <div className="relative  mb-[35px]">
            <label
              className={`absolute left-8 px-1 text-sm transition-all ${
                email || emailFocused
                  ? "-top-[10px] px-4 bg-white text-[#5F35F5]"
                  : "top-[30px] text-gray-500"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className={`border-b-[1px] w-[368px] pl-[52px] py-[26px] rounded-[8px] focus:outline-[#5F35F5]  ${
                emailError ? "border-red-500" : "border-gray-400"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="relative mb-[50px]">
            <label
              className={`absolute left-8 px-1 text-sm transition-all ${
                password || passwordFocused
                  ? "-top-[10px] px-4 bg-white text-blue-900"
                  : "top-[30px] text-gray-500"
              }`}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className="border-b-[1px] border-gray-400 w-[368px] pl-[52px] py-[26px] rounded-[8px] focus:outline-[#5F35F5]"
            />
            <button
              type="button"
              className="absolute inset-y-0 left-[320px] flex items-center px-3 text-[20px] text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button className="px-[105px] py-[20px] bg-[#5F35F5] text-white rounded-[8px] duration-500 text-[20px] font-nuni font-semibold hover:bg-purple-700 focus:outline-none ">
            Login to Continue
          </button>

          <p className="text-left font-open text-[13px] text-[#13014c] mt-[35px]">
            Already have an account ?
            <a href="#" className="text-[#EA6C00] hover:text-[#ea6d00b0] duration-500 pl-1 font-bold">
              Sign Up
            </a>
          </p>
        </div>
        <div className="w-1/2">
          <img
            className="w-full h-screen object-cover"
            src={login}
            alt="#login"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
