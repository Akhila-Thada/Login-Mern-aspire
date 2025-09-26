import { useState } from 'react'


import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';

function App() {
  const [user, setUser] = useState(null);


  return (

    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/" element={<Login user={user} setUser={setUser} />} />
          <Route path='/add-product' element={ <AddProduct user={user} /> } />
        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App
