import React from "react";

import { Link  } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="flex gap-10 flex-col bg-gray-800  w-full bottom-0 text-white text-xl">
      <div className="flex gap-10">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
        <div id="contacts"></div>
      </div>
      <div id="media"></div>

      <div>
        <p>All rights are reserved| 3pDigital.dev</p>
      </div>
    </footer>
  );
}
