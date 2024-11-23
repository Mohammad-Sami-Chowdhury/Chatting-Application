import React, { useState } from "react";
import registration from "../../assets/registration.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // EMAIL VALIDATION
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  // USERNAME VALIDATION
  const handleName = (e) => {
    setName(e.target.value);
    setEmailError("");
  };

  // PASSWORD VALIDATION
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSignup = () => {
    if (!email) {
      setEmailError("Please Enter Your Mail");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setEmailError("Please Enter A Valid Email");
      return;
    }
    setEmailError("");

    if (!name) {
      setNameError("Please Enter Your Name");
      return;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError("Please Enter Your Valid Name");
      return;
    }
    setNameError("");

    if (!password) {
      setPasswordError("Please Set A Password");
      return;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must include at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must include at least one lowercase letter.");
      return;
    } else if (!/\d/.test(password)) {
      setPasswordError("Password must include at least one number.");
      return;
    } else if (!/[@$!%*?&]/.test(password)) {
      setPasswordError(
        "Password must include at least one special character (@, $, !, %, *, ?, &)."
      );
      return;
    }
    setPasswordError("");
  };

  return (
    <div className="md:flex items-center md:m-0 m-4 md:mt-0 mt-5">
      <div className="md:w-1/2 h-1/2 md:h-full md:pl-[190px]">
        <h2 className="md:text-[34px] text-[22px] text-center font-bold md:text-left font-nuni text-[#11175D] md:leading-[47px] pb-[13px]">
          Get started with easily register
        </h2>
        <p className="md:text-left text-center text-gray-500 md:text-[20px] text-base font-nuni leading-[28px] pb-[40px]">
          Free register and you can enjoy it
        </p>

        {/* Email Field */}
        <div className="relative mb-[35px] md:block flex justify-center">
          <label
            className={`absolute left-8 px-1 text-sm transition-all duration-200 ${
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
            onChange={handleEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            className="border border-gray-300 md:w-[368px] w-full pl-[52px] py-[26px] rounded-[8px] focus:outline-[#5F35F5]"
          />
          <p className="absolute uppercase top-[100%] left-[2%] font-nuni font-bold text-base text-red-600">
            {emailError}
          </p>
        </div>

        {/* Name Field */}
        <div className="relative mb-[35px] md:block flex justify-center">
          <label
            className={`absolute left-8 px-1 text-sm transition-all duration-200 ${
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
            onChange={handleName}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            className="border border-gray-300 md:w-[368px] w-full pl-[52px] py-[26px] rounded-[8px] focus:outline-[#5F35F5]"
          />
          <p className="absolute uppercase top-[100%] left-[2%] font-nuni font-bold text-base text-red-600">
            {nameError}
          </p>
        </div>

        {/* Password Field */}

        <div className="relative mb-[50px] md:block flex justify-center">
          <label
            className={`absolute left-8 px-1 text-sm transition-all duration-200 ${
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
            onChange={handlePassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className="border border-gray-300 md:w-[368px] w-full pl-[52px] py-[26px] rounded-[8px] focus:outline-[#5F35F5]"
          />
          <button
            type="button"
            className="absolute inset-y-0 md:left-[320px] md:right-0 right-[20px] flex items-center px-3 text-[20px] text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <p className="absolute uppercase top-[100%] left-[2%] font-nuni font-bold text-base text-red-600">
            {passwordError}
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSignup}
          className=" md:w-[368px] w-full md:mx-0 py-[20px] bg-[#5F35F5] text-white md:rounded-[86px] rounded-lg duration-500 text-[20px] font-nuni font-semibold hover:bg-purple-700 focus:outline-none "
        >
          Sign up
        </button>

        {/* Sign In Link */}
        <p className="md:pl-16 pl-0 md:text-left text-center font-open text-[13px] text-[#13014c] mt-[35px]">
          Already have an account ?
          <a
            href="#"
            className="text-[#EA6C00] hover:text-[#ea6d00b0] duration-500 pl-1 font-bold"
          >
            Sign In
          </a>
        </p>
      </div>
      <div className="hidden md:flex w-1/2">
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
