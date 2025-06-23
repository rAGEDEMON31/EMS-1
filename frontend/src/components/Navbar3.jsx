import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useUser } from '../context/UserContext'

const Navbar3 = () => {
  const navigate = useNavigate()
  const { user } = useUser();
  return (
    <header className='bg-base-300 border-b border-base-content'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <div><h1 onClick={() => {
            if (user.roles.includes("manager")) {
              navigate("/AdminDashboard")
            }
            else if (user.roles.includes("user")) {
              navigate("/dashboard")
            }
          }} className="cursor-pointer text-lg font-bold">EMS</h1></div>
          <div className='flex '>
            <Link to={()=>{
            if (user.roles.includes("manager")) {
              navigate("/AdminDashboard")
            }
            else if (user.roles.includes("user")) {
              navigate("/dashboard")
            }
          }} className="btn btn-primary mr-2">Back</Link>
            <Link to={"/"} className="btn btn-secondary ml-2">Logout</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar3;