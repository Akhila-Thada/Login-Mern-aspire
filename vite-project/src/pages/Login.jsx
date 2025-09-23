import react, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


function Login ({user, setUser}) {
const [data, setData] = useState({
    userName : '',
    password: ''
})

const navigate = useNavigate();


const handleChange = (e) =>{
    setData({ ...data, [e.target.name]:e.target.value});
    
}



const handleSublit = async (e) =>{
    e.preventDefault();
   
  try {
  const res = await axios.post('/login', data, {
    withCredentials: true
  });
  
  console.log(res);
  setUser(res.data.exist);
  navigate('/profile')

} catch (err) {
  if (err.response) {
    console.error('Login failed:', err.response.data.message);
  } else {
    console.error(err.message);
  }

};

    
}







    return (
         <div className="flex w-full min-h-screen justify-center items-center bg-gray-200 px-4">
      <form
        onSubmit={handleSublit}
        className="flex flex-col bg-blue-400 w-full max-w-md h-auto rounded-2xl p-6 sm:p-10"
      >
        <input
          onChange={handleChange}
          className="bg-white p-2 px-3 m-1 rounded-md"
          placeholder="UserName"
          type="text"
          name="userName"
        />
        <input
          onChange={handleChange}
          className="bg-white p-2 px-3 m-1 rounded-md"
          placeholder="Password"
          type="password"
          name="password"
        />

        <button
          className="bg-blue-800 text-white rounded-2xl p-2 mt-2 hover:bg-blue-900 transition"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
    )
}


export default Login;
