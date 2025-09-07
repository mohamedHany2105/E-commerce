import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData)
  const handleSubmition = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res =await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res)
      const data =await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }
      setLoading(false);
      setError(null);
      navigate('/signin')

    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl text-gray-900 text-center w-[60%] mx-auto p-4">Sign up </h1>

      <form onSubmit={handleSubmition} className="flex flex-col gap-10 rounded-2xl p-10 shadow-xl m-10">
        <input onChange={handleChange} className=" p-3 text-gray-700 rounded-xl bg-gray-100 w-[50%] mx-auto" placeholder="Username" type="text" name="name" id="name" />
        <input onChange={handleChange} className=" p-3 text-gray-700 rounded-xl bg-gray-100 w-[50%] mx-auto" placeholder="Email" type="text" name="email" id="email" />
        <input
          onChange={handleChange}
          type="password  "
          name="password"
          className=" p-3 text-gray-700 rounded-xl bg-gray-100 w-[50%] mx-auto" placeholder="Password "
          id="password"
        />
        <button className="p-3 bg-gray-800 rounded-2xl text-white w-[50%] mx-auto" >{loading?"Loading ...":"Sign Up"}</button>
      </form>

      <p className="text-xl">
        Have an account ?<Link to="/signin">sign in</Link>
      </p>
      <p>
        {error &&<p className="text-red-500 text-xl">{error.message} </p>}
      </p>
    </div>
  );
}
