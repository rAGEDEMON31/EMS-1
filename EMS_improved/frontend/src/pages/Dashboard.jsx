import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext';
import Navbar2 from '../components/Navbar2';
import { Link } from 'react-router';
import axios from 'axios';

const Dashboard = () => {
  const [checkedIn, setCheckIn] = useState(false);
  const [checkedOut,setCheckOut] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const { user } = useUser();
  useEffect(()=>{
    setCheckIn(false);
    setCheckOut(false);
  })
  const checkIn = async (event)=>{
    event.preventDefault()
    await axios.post("http://localhost:8081/api/employee/checkIn",{employeeid:user._id}).then((response)=>{
      setCheckIn(true)
      console.log(checkedIn,"  ", checkedOut);
      
    })
  }
  const checkOut = async (event) => {
    event.preventDefault()
    await axios.post("http://localhost:8081/api/employee/checkOut",{employeeid:user._id}).then((response)=>{
      setCheckOut(true)
      console.log(response);
    })
  }


  return (
    <div className='min-h-screen'>
      <Navbar2 />
      <div className="flex w-full h-screen">
        <div className="card bg-base-300 rounded-box grid  grow place-items-center">
          <div class="mx-auto w-full max-w-xl">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">Check in and Check Out</h2>

            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">Today's date : {date}</h2>
            <div  class='flex  shadow-md justify-evenly md:justify-evenly rounded-lg  mt-10 py-4 px-2  md:mx-12'>
            <button onClick={checkIn} disabled={checkedIn}>
          <div class='flex group bg-purple-600 shadow-lg dark-shadow rounded-lg mx-1 cursor-pointer justify-center relative  w-16'>
           
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                  <p class='text-gray-100  mt-3 font-bold'> Check In  </p>
                  </div>
              </div>
          </div>
          </button>

          <button onClick={checkOut} disabled={checkedOut&&checkedIn}>
          <div class='flex group bg-purple-600 shadow-lg dark-shadow rounded-lg mx-1 cursor-pointer justify-center relative  w-16'>
          
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                     <p class='text-gray-100  mt-3 font-bold'> Check Out </p>
                  </div>
              </div>
          </div>
          </button>
          
        
      </div>
          </div>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid  grow place-items-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">Apply for leave</h2>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
