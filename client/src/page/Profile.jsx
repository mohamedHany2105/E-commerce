import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/store/userSlice";
import { supabase } from "../supabase";

export default function Profile() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imgPreview, setImgPreview] = useState(currentUser.user.profile_image);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(currentUser);
  console.log(currentUser.user._id);
  console.log(currentUser.user.profile_image);
  console.log(formData);
  const handleSubmition = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(res);
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(signOutUserStart);
      const res = await fetch("http://localhost:3000/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      console.log(res);
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      }
      dispatch(signOutUserSuccess());
      navigate("/signin");
    } catch (error) {
      dispatch(signOutUserFailure(error));
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const filename = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("img")
      .upload(filename, file);
    console.log(data);
    if (error) {
      console.log(error);
      return;
    }
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from("img")
      .getPublicUrl(filename);
    // Add the image URL to formData
    setFormData((prev) => ({
      ...prev,
      img_profile: urlData.publicUrl,
    }));
  };
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl text-gray-900 text-center w-[60%] mx-auto p-4">
        Profile
      </h1>

      <form
        onSubmit={handleSubmition}
        className="flex flex-col gap-10 rounded-2xl p-10 shadow-xl m-10"
      >
        <input
          ref={fileRef}
          type="file"
          hidden
          onChange={(e) => {
            handleFileChange(e);
            handleChange(e);
          }}
          accept="image/*"
        />
        <img
          id="img_profile"
          onClick={() => fileRef.current.click()}
          src={imgPreview || "/default-profile.png"}
          alt={currentUser.user.name}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <input
          onChange={handleChange}
          className=" p-3 text-gray-700 rounded-xl bg-gray-100 w-[50%] mx-auto"
          placeholder="Username"
          type="text"
          name="name"
          id="name"
          defaultValue={currentUser.user.name}
        />
        <input
          onChange={handleChange}
          className=" p-3 text-gray-700 rounded-xl bg-gray-100 w-[50%] mx-auto"
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          defaultValue={currentUser.user.email}
        />
        <input
          onChange={handleChange}
          type="password  "
          name="password"
          className=" p-3 text-gray-700 rounded-xl bg-gray-100 w-[50%] mx-auto"
          placeholder="Password "
          id="password"
        />
        <button
          onClick={handleFileUpload}
          className="p-3 bg-green-800 rounded-2xl text-white w-[50%] mx-auto"
        >
          {loading ? "Loading ..." : "Update"}
        </button>
        <button
          onClick={handleSignOut}
          className="p-3 bg-red-800 rounded-2xl text-white w-[50%] mx-auto"
        >
          {loading ? "Loading ..." : "Sign Out"}
        </button>
      </form>

      <div className="flex gap-10 ">
        <Link
          to="/create"
          className="p-3 cursor-pointer text-center  bg-blue-800 rounded-2xl text-white w-[30%] mx-auto"
        >
          Create
        </Link>
        <Link
          to="/update"
          className="p-3 text-center bg-gray-800 rounded-2xl text-white w-[30%] mx-auto"
        >
          update
        </Link>
      </div>

      <p>{error && <p className="text-red-500 text-xl">{error.message} </p>}</p>
    </div>
  );
}
