import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)
  return (
    <div className="w-full flex gap-10 justify-between items-center text-white bg-gray-800">
      <div className=" text-2xl p-3 ">
        <span className="text-orange-500">Best </span>
        <span> Seller</span>
      </div>

      <form
        className="flex justify-between items-center gap-5 w-70% bg-white rounded-2xl p-2 text-gray-700  "
        action=""
      >
        <input type="text" placeholder="Search ..." id="search" />
        <FaSearch />
      </form>

      <ul className="flex gap-10 p-5 text-xl max-md:hidden">
        <li className="hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:underline">
          <Link to="/product">Products</Link>
        </li>

        {currentUser ? (
          <li>
            <Link to="/profile">
              <img
                src={currentUser.user.profile_image}
                className="rounded-full h-7 w-7 object-cover "
                alt={currentUser.user.name}
              />
            </Link>
          </li> ) 
          : (
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
