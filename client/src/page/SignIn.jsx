import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/store/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData)
 
  const handleSubmition = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div>
      <h1>Sign in </h1>

      <form
        onSubmit={handleSubmition}
        className="flex flex-col gap-10 rounded-2xl p-10 shadow-xl m-10"
      >
 
        <input
          onChange={handleChange}
          className=" p-3 text-gray-700 rounded-xl bg-gray-100 w-[50%] mx-auto"
          placeholder="Email"
          type="text"
          name="email"
          id="email"
        />
        <input
          onChange={handleChange}
          type="password  "
          name="password"
          className=" p-3 text-gray-700 rounded-xl bg-gray-100 w-[50%] mx-auto"
          placeholder="Password "
          id="password"
        />
        <button className="p-3 bg-gray-800 rounded-2xl text-white w-[50%] mx-auto">
          {loading ? "Loading ..." : "Sign Up"}
        </button>
      </form>

      <p>
        Don't have an account ?<Link to="/signup">sign up</Link>
      </p>
        {error &&<p className="text-red-500 text-xl">{error.message} </p>}
    </div>
  );
}
