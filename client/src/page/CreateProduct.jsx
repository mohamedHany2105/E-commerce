import React from "react";
import { useState } from "react";
import { supabase } from "../supabase";
export default function CreateProduct() {
  // Remove image from formData.product_image by index

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(formData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
    const handleDeleteImage = (idx) => {
    setFormData((prev) => ({
      ...prev,
      product_image: prev.product_image.filter((_, i) => i !== idx),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const urls = [];
      for (const file of files) {
        const url = await storeImage(file);
        if (url) urls.push(url);
      }
      setFormData((prev) => ({
        ...prev,
        product_image: prev.product_image ? [...prev.product_image, ...urls] : urls,
      }));
      console.log("this is image urls", urls);
    } catch (error) {
      setError(error.message || error);
    }
  };
  const storeImage = async (file) => {
    const fileName = `product_Image-${file.name}-${Date.now()}`;
    if (file) {
      const { data, error } = await supabase.storage
        .from("product")
        .upload(fileName, file);
      if (error) {
        setError(error.message || error);
        return null;
      }
      const { data: urlData } = supabase.storage
        .from("product")
        .getPublicUrl(fileName);
      return urlData.publicUrl;
    }
    return null;
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
          <div className="flex gap-4 items-center">
            <input
              type="file"
              id="images"
              name="images"
              multiple
              className="p-2"
              onChange={handleFileChange}
              accept="image/*"
            />
            <button
              type="button"
              className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50"
              onClick={() => document.getElementById('images').click()}
            >
              UPLOAD
            </button>
          </div>
          {/* Image previews with delete buttons */}
          {Array.isArray(formData.product_image) && formData.product_image.length > 0 && (
            <div className="flex flex-col gap-4 mt-4">
              {formData.product_image.map((img, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <img src={img} alt={`product-${idx}`} className="h-16 w-16 object-cover rounded bg-gray-400" />
                  <button
                    type="button"
                    className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
                    onClick={() => handleDeleteImage(idx)}
                  >
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="p-3 rounded-2xl bg-green-500 text-white text-xl mx-auto w-full mt-4"
        >
          {loading ? "Loading ..." : "Create Product"}
        </button>
        {error && (
          <p className="text-xl text-red-500 text-center mt-2">{typeof error === 'string' ? error : error.message}</p>
        )}
      </form>
    </div>
  );
}
