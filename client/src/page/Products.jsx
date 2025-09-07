import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem.jsx';
export default function Products() {
  const [formData, setFormData] = useState([]);
  const handleGet = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // Set formData to the array of users
      setFormData(data.user || []);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <div className='flex flex-col gap-10 p-10'>
<div className='grid grid-cols-3 gap-10'>
        {Array.isArray(formData) && formData.map((formDataOne, idx) => (
        <CartItem key={idx} product={formDataOne} />
      ))}
</div>
      <button className='bg-gray-800 rounded-xl p-3 text-white text-center mx-auto' onClick={handleGet}>Show more</button>
    </div>
  );
}
