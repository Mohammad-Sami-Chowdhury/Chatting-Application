import React from "react";
import { useState } from "react";
import login from "../../assets/login.png";
import google from "../../assets/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleLogin = () => {
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
    <section className="min-h-screen flex flex-col lg:flex-row items-center lg:justify-between bg-cover bg-center bg-no-repeat md:bg-mobile">
      <div className="lg:w-1/2 w-full flex flex-col items-center md:pt-10 lg:pt-0">
        <img
          className="absolute md:top-5 top-3 w-[100px] md:w-[130px] lg:l-[10%]"
          src={logo}
          alt="#logo"
        />
        <div className="bg-[#e5e5e5] mt-[150px] lg:mt-0 backdrop-blur-xl opacity-85 rounded-2xl w-[90%] md:w-[600px] lg:w-[500px] h-auto p-6 flex flex-col items-center">
          <h1 className="text-[22px] md:text-[34px] text-center font-bold font-nuni text-[#11175D] pb-5">
            Login to your account!
          </h1>
          <button className="group flex items-center justify-center gap-2 md:py-[26px] py-4 w-[220px] border border-gray-300 rounded-lg mb-5 hover:border-[#5F35F5] transition duration-300">
            <img
              className="group-hover:rotate-[360deg] transition-transform duration-500"
              src={google}
              alt="#google"
            />
            <p className="text-[#03014C] font-semibold text-sm">Login with Google</p>
          </button>
          {/* Email Field */}
          <div className="relative w-full md:w-[300px] mb-5">
            <label
              className={`absolute left-4 px-1 text-sm transition-all ${
                email || emailFocused
                  ? "-top-2 bg-[#e5e5e5] text-[#5F35F5]"
                  : "top-4 md:top-7 text-gray-500"
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
              className="w-full border border-gray-300 bg-[#E5E5E5] md:py-[26px] md:pl-[52px] p-4 rounded-lg focus:outline-[#5F35F5]"
            />
            {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
          </div>
          {/* Password Field */}
          <div className="relative w-full md:w-[300px] mb-5">
            <label
              className={`absolute left-4 px-1 text-sm transition-all ${
                password || passwordFocused
                  ? "-top-2 bg-[#e5e5e5] text-blue-900"
                  : "top-4 md:top-7 text-gray-500"
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
              className="w-full border border-gray-300 bg-[#E5E5E5] md:py-[26px] md:pl-[52px] p-4 rounded-lg focus:outline-[#5F35F5]"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            {passwordError && (
              <p className="text-red-600 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            onClick={handleLogin}
            className="w-full md:w-[300px] md:py-[26px] py-4 bg-[#5F35F5] text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Login to Continue
          </button>
          <p className="mt-5 text-sm text-center text-[#13014c]">
            Already have an account?
            <a
              href="#"
              className="text-[#EA6C00] font-bold pl-1 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 hidden lg:block">
        <img
          className="w-full h-screen object-cover"
          src={login}
          alt="#login"
        />
      </div>
    </section>
  );
};

export default Login;
