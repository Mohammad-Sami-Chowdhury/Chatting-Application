import React, { useState } from "react";
import registration from "../../assets/registration.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email Validation
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Name Validation
  const validateName = (value) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Please enter a valid email");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value) ? "" : "Name should contain only letters");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="w-1/2 pl-[190px]">
        <h2 className="text-[34px] font-bold text-left font-nuni text-[#11175D] leading-[47px] pb-[13px]">
          Get started with easily register
        </h2>
        <p className="text-left text-gray-500 text-[20px] font-nuni leading-[28px] pb-[40px]">
          Free register and you can enjoy it
        </p>

        {/* Email Field */}
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
            className={`border w-[368px] pl-[52px] py-[26px] rounded-[8px] focus:outline-[#5F35F5] ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Name Field */}
        <div className="relative mb-[35px] ">
          <label
            className={`absolute left-8 px-1 text-sm transition-all ${
              name || nameFocused
                ? "-top-[10px] px-4 bg-white text-[#5F35F5]"
                : "top-[30px] text-gray-500"
            }`}
          >
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            className={`border w-[368px] pl-[52px] py-[26px] rounded-[8px] focus:outline-[#5F35F5] ${
              nameError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>

        {/* Password Field */}
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
            className="border w-[368px] pl-[52px] py-[26px] rounded-[8px] focus:outline-[#5F35F5]"
          />
          <button
            type="button"
            className="absolute inset-y-0 left-[320px] flex items-center px-3 text-[20px] text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit Button */}
        <button className="px-[145px] py-[20px] bg-[#5F35F5] text-white rounded-[86px] duration-500 text-[20px] font-nuni font-semibold hover:bg-purple-700 focus:outline-none ">
          Sign up
        </button>

        {/* Sign In Link */}
        <p className="pl-16 font-open text-[13px] text-[#13014c] mt-[35px]">
          Already have an account ?
          <a href="#" className="text-[#EA6C00] hover:text-[#ea6d00b0] duration-500 pl-1 font-bold">
            Sign In
          </a>
        </p>
      </div>
      <div className="w-1/2">
        <img
          className="w-full object-cover h-screen"
          src={registration}
          alt="#registration"
        />
      </div>
    </div>
  );
}

export default RegisterForm;
