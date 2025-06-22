import React from 'react'
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>
      <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <h4 className="py-6">
        Welcome to the Employee Management System.
      </h4>
    </div>
  </div>
</div>
    </div>
  );
}

export default HomePage;
