

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {
   const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [profile, setProfile] = useState(null);  

  const navigate = useNavigate();

  useEffect(() => {  

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${user?.token}`, 
          },
          withCredentials: true,
        });

        setProfile(res.data);  
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      }
    }; 

    if (user?.token) {
      fetchProfile();
    }
  }, [user]);

  const handleDelete = async (id) =>{
    try {
      let res = await axios.delete(`/delete-product/${id}`,{
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        withCredentials: true,
      });

      alert(res.data.message);
      setProfile((prev) => ({
  ...prev,
  products: prev.products.filter((p) => p._id !== id),
}));

    } catch (error) {
      console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
    }
  }

  const addProduct = () =>{
    navigate('/add-product')
  }


  return (

<div className="w-full px-4 flex flex-col min-h-screen items-center">  
  <h3 className="self-start mb-2">Welcome {profile?.userName}</h3>
  <div className="w-full flex justify-between items-center mb-4">
    <h3 className="text-2xl font-bold">My Products</h3>
    <button onClick={()=>{addProduct()}} className="bg-[#0569d5] text-white px-4 py-2 cursor-pointer rounded">
      Add Product
    </button>
  </div>

  <div className="w-full overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className="bg-[#0569d5] text-white">
        <tr>
          <th className="border-white border px-4 py-2">Name</th>
          <th className="border-white border px-4 py-2">Price</th>
          <th className="border-white border px-4 py-2">Description</th>
          <th className="border-white border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {profile?.products?.map((product) => (
          <tr key={product._id}>
            <td className="border-gray-200 border px-4 py-2">{product.name}</td>
            <td className="border-gray-200 border px-4 py-2">{product.price}</td>
            <td className="border-gray-200 border px-4 py-2">
              {product.description || "NA"}
            </td>
            <td className="border-gray-200 border px-4 py-2 space-x-2">
              <button className="text-blue-500 cursor-pointer px-2">
                Edit
              </button>
              <button onClick={() => { setDeleteId(product._id), setShowPopup(true)}} className="text-blue-300 cursor-pointer px-2 py-1 ">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
{showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                onClick={() => {
                  handleDelete(deleteId);
                  setShowPopup(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


</div>

);

};

export default Profile;
