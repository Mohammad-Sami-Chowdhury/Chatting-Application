import React from "react";
import { useState } from "react";
import login from "../../assets/login.png";
import google from "../../assets/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // EMAIL VALIDATION
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  // PASSWORD VALIDATION
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
    <section>
      <div className="md:flex items-center md:m-0 m-4 md:mt-0 mt-5">
        <div className="md:w-1/2 md:ml-[180px]">
          <h1 className="text-[#03014C] md:text-left text-center md:text-[34px] text-[22px] font-bold font-open md:leading-[45px] pb-[30px]">
            Login to your account!
          </h1>
          <button className="group flex mx-auto md:mx-0 hover:border-[#5F35F5] duration-500 py-[22px] pl-[30px] items-center gap-2 border-[1px] border-[#b3b3c9] rounded-[8px] w-[220px] mb-[35px]">
            <img
              className="group-hover:rotate-[360deg] duration-500"
              src={google}
              alt="#google"
            />
            <p className="text-[#03014C] text-[14px] font-semibold font-open leading-[18px]">
              Login with Google
            </p>
          </button>
          {/* Email Field */}
          <div className="relative mb-[35px]">
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
            <p className="absolute uppercase top-[100%] left-[2%] font-nuni font-bold text-base text-red-600">{emailError}</p>
          </div>
          {/* Password Field */}

          <div className="relative mb-[50px]">
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
            <p className="absolute uppercase top-[100%] left-[2%] font-nuni font-bold text-base text-red-600">{passwordError}</p>
          </div>
          <button
            onClick={handleLogin}
            className="md:w-[368px] w-full py-[20px] bg-[#5F35F5] text-white rounded-[8px] duration-500 text-[20px] font-nuni font-semibold hover:bg-purple-700 focus:outline-none "
          >
            Login to Continue
          </button>

          <p className="md:text-left text-center font-open text-[13px] text-[#13014c] mt-[35px]">
            Already have an account ?
            <a
              href="#"
              className="text-[#EA6C00] hover:text-[#ea6d00b0] duration-500 pl-1 font-bold"
            >
              Sign Up
            </a>
          </p>
        </div>
        <div className="w-1/2 hidden md:block">
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
