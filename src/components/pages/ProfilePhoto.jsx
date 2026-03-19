import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePhoto = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Image is missing");
      return;
    }
    const formData = new FormData();
    formData.append("profilePhoto", image);
    try {
      await axios.post("http://localhost:3000/api/profilephotoadd", formData, {
        withCredentials: true,
      }).then(() => {
        alert("Profile picture has been updated!");
        navigate("/login");
      });
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 p-8 sm:p-10 transition-all duration-300">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Photo
          </h2>
          <p className="text-sm text-gray-500">
            Upload a picture to personalize your account
          </p>
        </div>

        <form onSubmit={handleImage}>
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Avatar Preview Area */}
            <div className="relative group cursor-pointer w-40 h-40">
              <div className="w-full h-full rounded-full ring-4 ring-indigo-50 bg-gray-50 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:ring-indigo-100 shadow-inner">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg
                    className="w-20 h-20 text-gray-300 transition-colors duration-300 group-hover:text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>

              {/* Upload Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>

              {/* Hidden Input field on the container area */}
              <input
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>

            <div className="text-center">
              <h3 className="text-gray-900 font-medium mb-1">
                Click to browse or drag and drop
              </h3>
              <p className="text-xs text-gray-500">
                PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>

            <div className="w-full space-y-3 mt-4">
              <button type="submit" className="flex w-full justify-center items-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 hover:shadow-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200">
                Upload Image
              </button>
              <button type="button" onClick={() => navigate("/login")} className="flex w-full justify-center items-center rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all duration-200">
                Skip for now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePhoto;
