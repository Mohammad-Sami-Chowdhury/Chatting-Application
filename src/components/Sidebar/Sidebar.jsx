import React, { useState, useRef } from "react";
import icon1 from "../../assets/icon1.png";
import { FaRegBell } from "react-icons/fa6";
import { FaCloudUploadAlt, FaRegWindowClose } from "react-icons/fa";
import { Cropper } from "react-cropper";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "cropperjs/dist/cropper.css";
import {
  IoHomeOutline,
  IoChatbubbleEllipses,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const storage = getStorage();
  const auth = getAuth();
  const data = useSelector((data) => data.userDetails.userInfo);

  const [active, setActive] = useState("home");
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
  };
  const handleClose = () => {
    setClick(false);
  };

  // Profile Upload

  const [image, setImage] = useState(null); // Original image
  const [croppedImage, setCroppedImage] = useState(null); // Cropped image preview
  const cropperRef = useRef(null); // Reference for the cropper instance
  const [cropData, setCropData] = useState("");

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Validate file type (optional)
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Real-time cropping and preview
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;

    // Ensure the cropper instance is available
    if (cropper) {
      try {
        const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
        setCroppedImage(croppedDataUrl);
      } catch (error) {
        toast.error("Error generating cropped image:", error);
      }
    }
  };

  // Handle cancel/reset
  const handleCancel = () => {
    setImage(null); // Clear the uploaded image
    setCroppedImage(null); // Clear the cropped preview
    toast.warn("Changes were discarded.");
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    const storageRef = ref(storage, auth.currentUser.uid);
    // Data URL string
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url").then((snapshot) => {});
    getDownloadURL(storageRef, message4, "data_url").then((downloadURL) => {
      updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: downloadURL,
      }).then(() => {
        toast.success("Profile Updated Successfully");
        setImage(null);
        setCroppedImage(null);
        let sstorage = localStorage.getItem("userLoginInfo");
        let userUpdate = {
          ...JSON.parse(sstorage),
          photoURL: downloadURL,
        };
        localStorage.setItem("userLoginInfo", JSON.stringify(userUpdate));
        dispatch(userLoginInfo(userUpdate));
      });
    });
  };

  return (
    <section>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="h-full w-[120px] bg-[#5F35F5] rounded-[20px] flex flex-col items-center py-5">
        {/* Profile Picture */}
        <div className=" h-[100px] w-[100px] overflow-hidden rounded-full relative flex items-center justify-center">
          <img src={data.photoURL} alt="Profile" />
          <div className="absolute opacity-0 duration-500 hover:opacity-70 cursor-pointer text-white top-0 left-0 bg-black h-[100px] w-[100px] rounded-full flex justify-center items-center">
            <FaCloudUploadAlt onClick={handleClick} size={30} />
          </div>
        </div>

        <p className="text-xl mb-[98px] font-bold font-pops text-white">
          {data.displayName}
        </p>

        {/* Home Icon */}
        <div className="pb-[0px]">
          <div
            className={`flex items-center justify-center cursor-pointer  ${
              active === "home"
                ? "bg-white w-[90px] text-purple-600"
                : "text-white"
            } rounded-lg h-[89px] w-[150px] transition-colors duration-300`}
            onClick={() => setActive("home")}
          >
            <IoHomeOutline className="text-[40px]" />
          </div>
        </div>

        {/* Chat Icon */}
        <div className="pb-[0px]">
          <div
            className={`flex items-center justify-center cursor-pointer  ${
              active === "chat"
                ? "bg-white w-[90px] text-purple-600"
                : "text-white"
            } rounded-lg h-[89px] w-[150px] transition-colors duration-300`}
            onClick={() => setActive("chat")}
          >
            <IoChatbubbleEllipses className="text-[40px]" />
          </div>
        </div>

        {/* Notifications Icon */}
        <div className="pb-[0px] ">
          <div
            className={`flex items-center justify-center cursor-pointer ${
              active === "notifications"
                ? "bg-white w-[90px] text-purple-600"
                : "text-white"
            } rounded-lg h-[89px] w-[150px] transition-colors duration-300`}
            onClick={() => setActive("notifications")}
          >
            <FaRegBell className="text-[40px]" />
          </div>
        </div>

        {/* Settings Icon */}
        <div className="pb-[200px]">
          <div
            className={`flex items-center justify-center cursor-pointer  ${
              active === "settings"
                ? "bg-white w-[90px] text-purple-600"
                : "text-white"
            } rounded-lg h-[89px] w-[150px] transition-colors duration-300`}
            onClick={() => setActive("settings")}
          >
            <IoSettingsOutline className="text-[40px]" />
          </div>
        </div>

        {/* Logout Icon */}
        <div className="text-white cursor-pointer">
          <IoLogOutOutline className="text-[40px]" />
        </div>
      </div>

      {/*Profile Upload */}

      <div
        className={`fixed top-[50%] p-5 left-[50%] transform -translate-x-[50%] -translate-y-[50%] w-[700px] h-[700px] bg-[#5F35F5] rounded-lg transition-all duration-500 ${
          click ? "opacity-100 scale-100" : "opacity-0 scale-90 z-[-99999]"
        }`}
      >
        <div>
          <button
            className="absolute top-4 right-4 text-white text-lg"
            onClick={handleClose}
          >
            <FaRegWindowClose size={30} />
          </button>
          <button
            className="absolute top-4 right-[50px] text-white text-lg"
            onClick={handleCancel}
          >
            <TiCancel size={30} />
          </button>
        </div>
        <h2 className="text-white text-2xl font-extrabold font-open text-center mb-5">
          Change Your Profile Picture
        </h2>

        {/* Real-Time Cropped Image Preview */}
        {croppedImage && (
          <div className="flex flex-col items-center mb-5">
            <h3 className="text-white text-xl font-bold mb-2">Live Preview</h3>
            <div className="w-[100px] h-[100px] rounded-full border-2 border-white overflow-hidden">
              <img
                src={croppedImage}
                alt="Cropped Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Image Cropper */}
        {image && (
          <Cropper
            src={image}
            style={{ height: 300, width: "100%" }}
            aspectRatio={1}
            viewMode={1}
            guides={true}
            cropBoxResizable={true}
            dragMode="move"
            scalable={true}
            cropBoxMovable={true}
            ref={cropperRef}
            crop={handleCrop} // Real-time crop preview
            className="mb-5"
          />
        )}

        <div className="flex justify-between items-center">
          {/* Action Buttons */}
          {croppedImage && (
            <button
              onClick={getCropData}
              className="bg-green-600 font-bold text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          )}
          {/* File Upload */}
          {image ? (
            <label className="flex flex-col items-center justify-center w-[200px] h-[50px] bg-purple-600 text-white font-semibold rounded-lg shadow-lg cursor-pointer hover:bg-purple-700 transition-all duration-300 mb-5">
              <span>Upload Another Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <label className="flex flex-col items-center mt-[30%] mx-auto justify-center w-[200px] h-[50px] bg-purple-600 text-white font-semibold rounded-lg shadow-lg cursor-pointer hover:bg-purple-700 transition-all duration-300 mb-5">
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
