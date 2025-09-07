import React from "react";
import { useState } from "react";
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

export default function Profile() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(currentUser);
  console.log(currentUser.user._id);
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
      dispatch(signOutUserSuccess())
      navigate('/signin')
    } catch (error) {
      dispatch(signOutUserFailure(error));
    }
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
        <img
          src={currentUser.user.profile_image}
          className="rounded-full w-30 h-30 mx-auto"
          alt="profile photo"
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
        <button className="p-3 bg-green-800 rounded-2xl text-white w-[50%] mx-auto">
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
        <Link to='/create'
          className="p-3 cursor-pointer text-center  bg-blue-800 rounded-2xl text-white w-[30%] mx-auto"
        >
           
        
          Create 
          </Link>
        <Link to='/update'
          className="p-3 text-center bg-gray-800 rounded-2xl text-white w-[30%] mx-auto"
        >
        
         update
         </Link>
      </div>

   
      <p>{error && <p className="text-red-500 text-xl">{error.message} </p>}</p>
    </div>
  );
}
