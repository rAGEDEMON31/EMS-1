import React from 'react'
import { Link } from 'react-router'

const Navbar2 = () => {
  return (
    <header className='bg-base-300 border-b border-base-content'>
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <div><h1>EMS</h1></div>
            <div className='flex '>
            <Link to={""} className="btn btn-primary mr-2">My Info</Link>
            <Link to={"/"} className="btn btn-secondary ml-2">Logout</Link>
            </div>
        </div>      
    </div>
    </header>
  )
}

export default Navbar2
