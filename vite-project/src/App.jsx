import { useState } from 'react'


import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';

function App() {

  const [login, setlogin] = useState(false);
  const [user, setUser] = useState(null);


  return (

    <div>

    <BrowserRouter>

    <Routes>

      <Route path="/profile" element={<Profile user={user} />} />
    <Route path="/" element={<Login user={user} setUser={setUser} />} />  

    </Routes>
    
    </BrowserRouter>
    <>
      <button onClick={()=>{setlogin(!login)}}>Login</button>

      { login && <Login />

      }
    </>
    </div>




    //  <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login />} />       {/* default login page */}
    //     <Route path="/profile" element={<Profile />} />  {/* profile page */}
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
