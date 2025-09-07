import React from "react";
import { useState } from "react";

export default function UpdateProduct() {
  const [fromData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...fromData, [e.target.id]: e.target.value });
  };
  console.log(fromData.id)
  console.log(fromData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/product/update/${fromData.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fromData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center p-8">
      <h1 className="text-5xl mb-8 text-center">Create Product</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <input
            className="p-3 text-green-700 rounded-xl bg-gray-200"
            type="text"
            placeholder="PRODUCT ID"
            id="id"
            onChange={handleChange}
          />
          <input
            className="p-3 text-gray-700 rounded-xl bg-gray-100"
            type="text"
            placeholder="Product Name"
            id="productName"
            onChange={handleChange}
          />
          <input
            className="p-3 text-gray-700 rounded-xl bg-gray-100"
            type="text"
            placeholder="Description"
            id="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-4">
          <input
            className="p-3 text-gray-700 rounded-xl bg-gray-100 w-1/2"
            type="number"
            placeholder="Price"
            id="price"
            onChange={handleChange}
          />
          <input
            className="p-3 text-gray-700 rounded-xl bg-gray-100 w-1/2"
            type="number"
            placeholder="Discount"
            id="discount"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="images" className="text-gray-700">
            Product Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            className="p-2"
          />
        </div>
        <button className="p-3 rounded-2xl bg-green-500 text-white text-xl mx-auto w-full mt-4">
          {loading ? "Loading ..." : "Update Product"}
        </button>
        {error && (
          <p className="text-xl text-red-500 text-center mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}
