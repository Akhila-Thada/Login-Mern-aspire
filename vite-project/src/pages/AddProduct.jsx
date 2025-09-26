import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AddProduct ({user}) {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
    name: "",
    description: "",
    price:""
})


const handleChange = (e) =>{
    setProduct({...product, [e.target.name]: e.target.value});
}


const handleSubmit = async (e) => {
    e.preventDefault();

   try {
     const res= await axios.post('http://localhost:5000/add-product',product, {
        headers: {
            Authorization: `Bearer ${user?.token}`
        },
         withCredentials: true,
    });

    alert(res.data.message);
    navigate('/profile');
    
   } catch (error) {
    alert(error.response?.data?.message);
    console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
   }
    

}

    return (
        <div className="flex w-full min-h-screen justify-center items-center bg-gray-200 px-4">
  <form
    onSubmit={handleSubmit}
    className="flex flex-col w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-lg p-6 sm:p-10"
  >
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Product</h2>

    <label className="text-gray-700 mb-1 font-medium">Name</label>
    <input
      onChange={handleChange}
      name="name"
      type="text"
      className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0569d5]"
      placeholder="Enter product name"
    />

    <label className="text-gray-700 mb-1 font-medium">Description</label>
    <input
      onChange={handleChange}
      name="description"
      type="text"
      className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0569d5]"
      placeholder="Enter product description"
    />

    <label className="text-gray-700 mb-1 font-medium">Price</label>
    <input
      onChange={handleChange}
      name="price"
      type="number"
      className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0569d5]"
      placeholder="Enter product price"
    />

    <button
      type="submit"
      className="bg-[#0569d5] text-white font-semibold rounded-lg py-2 mt-2 hover:bg-blue-600 transition-colors"
    >
      Add Product
    </button>
  </form>
</div>

    )
} 


export default AddProduct;