import React from 'react'
import { Link, useNavigate } from 'react-router'

const Navbar3 = () => {
    const navigate = useNavigate()
  return (
    <header className='bg-base-300 border-b border-base-content'>
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
             <div><h1 onClick={()=>navigate("/dashboard")} className="cursor-pointer text-lg font-bold">EMS</h1></div>
            <div className='flex '>
            <Link to={"/dashboard"} className="btn btn-primary mr-2">Back</Link>
            <Link to={"/"} className="btn btn-secondary ml-2">Logout</Link>
            </div>
        </div>      
    </div>
    </header>
  )
}
export default Navbar3;