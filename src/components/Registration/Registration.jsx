import React, { useState } from "react";
import registration from "../../assets/registration.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";

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

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignup = () => {
    if (!email) {
      setEmailError("Please Enter Your Email");
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
      setNameError("Please Enter A Valid Name");
      return;
    }
    setNameError("");

    if (!password) {
      setPasswordError("Please Enter A Password");
      return;
    } else if (password.length < 8) {
      setPasswordError("Password Must Be At Least 8 Characters");
      return;
    }
    setPasswordError("");
  };

  return (
    <section className="h-[100vh] md:bg-mobile bg-[#e5e5e5] flex flex-col md:flex-row items-center justify-center overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center lg:w-1/2 w-full p-5 md:p-20">
        <img
          src={logo}
          alt="Logo"
          className="absolute top-5 left-5 md:left-10 w-[80px] md:w-[120px]"
        />
        <div className="bg-[#e5e5e5] mt-[50px] lg:mt-0 backdrop-blur-xl opacity-85 rounded-2xl w-[90%] md:w-[600px] lg:w-[500px] h-auto p-6 md:p-12 flex flex-col items-center">
          <h2 className="text-[#11175D] font-nuni text-[22px] md:text-[34px] font-bold text-center mb-4">
            Get started with easily register
          </h2>
          <p className="text-gray-500 font-nuni text-base md:text-lg text-center mb-8">
            Free register and you can enjoy it
          </p>

          {/* Email Field */}
          <div className="relative mb-6">
            <label
              className={`absolute tracking-[2px] left-4 px-1 text-sm transition-all duration-200 ${
                email || emailFocused
                  ? "-top-2 bg-[#e5e5e5] text-[#5F35F5]"
                  : "md:top-7 top-4 text-gray-500"
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
              className="border border-gray-300 bg-transparent w-[300px] md:w-[368px] md:py-[26px] md:pl-[52px] p-4 rounded-md focus:outline-[#5F35F5]"
            />
            <p className="text-red-600 text-sm mt-1">{emailError}</p>
          </div>

          {/* Name Field */}
          <div className="relative mb-6">
            <label
              className={`absolute tracking-[2px] left-4 px-1 text-sm transition-all duration-200 ${
                name || nameFocused
                  ? "-top-2 bg-[#e5e5e5] text-[#5F35F5]"
                  : "md:top-7 top-4 text-gray-500"
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
              className="border border-gray-300 bg-transparent w-[300px] md:w-[368px] md:py-[26px] md:pl-[52px] p-4 rounded-md focus:outline-[#5F35F5]"
            />
            <p className="text-red-600 text-sm mt-1">{nameError}</p>
          </div>

          {/* Password Field */}
          <div className="relative mb-6">
            <label
              className={`absolute tracking-[2px] left-4 px-1 text-sm transition-all duration-200 ${
                password || passwordFocused
                  ? "-top-2 bg-[#e5e5e5] text-[#5F35F5]"
                  : "md:top-7 top-4 text-gray-500"
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
              className="border border-gray-300 bg-transparent w-[300px] md:w-[368px] md:py-[26px] md:pl-[52px] p-4 rounded-md focus:outline-[#5F35F5]"
            />
            <button
              type="button"
              className="absolute md:top-7 top-4 right-4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            <p className="text-red-600 text-sm mt-1">{passwordError}</p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignup}
            className="md:w-[368px] w-full py-3 font-nuni md:py-[26px] font-bold bg-[#5F35F5] text-white rounded-md hover:bg-purple-700 transition-all duration-300"
          >
            Sign up
          </button>
          <p className="text-sm text-center font-open text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="#" className="text-[#5F35F5] font-bold">
              Sign In
            </a>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-1/2">
        <img
          src={registration}
          alt="Register"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

export default RegisterForm;
