import react, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



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
  const res = await axios.post('http://localhost:3000/login', data, {
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
        <div className='flex w-[100%]  min-h-screen justify-center items-center bg-gray-200'>
            <form onSubmit={handleSublit} className='flex flex-col bg-blue-400 w-[30%] h-[200px] rounded-2xl p-10'>
                <input onChange={handleChange} className='bg-white p-2 px-1 m-1 ' placeholder='UserName' type='text' name='userName'/>
                <input onChange={handleChange} className='bg-white p-2 px-1 m-1' placeholder='Password' type='password' name='password'/>

                <button className='bg-blue-800 rounded-2xl p-2 mt-2' type='submit'>Login</button>
            </form>
        </div>
    )
}


export default Login;