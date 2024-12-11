import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Bars } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const handleEmail = (e) => setEmail(e.target.value);

  const [loader, setLoader] = useState(false);

  const handlePassReset = () => {
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
    if (
      email &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Email Sent Successfully");
          setEmail("");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("Something Wrong");
          }
        });
    }
  };

  return (
    <div className="bg-[#5F35F5] w-full h-screen flex justify-center items-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <div className="bg-white p-10 rounded-lg">
        <div className="pb-5">
          <h1 className="text-gray-500 pb-2 font-nuni font-bold text-4xl">
            Forget Your Password
          </h1>
          <h2 className="text-gray-500 font-nuni font-base">
            Enter Your Email Address
          </h2>
        </div>
        <div className="relative">
          <label
            className={`absolute tracking-[2px] left-4 px-1 text-sm transition-all duration-200 ${
              email || emailFocused
                ? "-top-2 bg-white text-[#5F35F5]"
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
          <button
            onClick={handlePassReset}
            className="md:w-[368px] mt-10 w-full py-3 font-nuni md:py-[26px] font-bold bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-300"
          >
            {loader ? (
              <Bars
                visible={true}
                height="30"
                width="30"
                ariaLabel="discuss-loading"
                wrapperStyle={{}}
                wrapperClass="discuss-wrapper flex justify-center"
                color="#fff"
                backgroundColor="#5F35F5"
              />
            ) : (
              "Enter"
            )}
          </button>
          <p className="text-sm text-center font-open text-gray-500 mt-4">
            Password Reset Successfully?{" "}
            <Link to="/login" className="text-orange-500 font-bold">
              Go Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
