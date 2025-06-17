import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [newUser, setNewUser] = useState({name:"",age:"",email:"",gender:"",username:"", password:""});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    setNewUser({
      name:formValues.fullName,
      age:formValues.age,
      email:formValues.email,
      gender:formValues.gender,
      username:formValues.username,
      password:formValues.password
    })
    console.log(newUser);
    try {
      await axios.post("http://localhost:8081/api/employee/addNewEmployee",newUser);
      toast.success("Employee Registered successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Error creating user")
      console.log(error);
      
    }
  };
  return (
    <div className='flex min-h-full flex-col justify-center px-3 py-6 lg:px-4'>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">Employee Registration</h2>
      </div>
      <div>
        <form class="w-full max-w-lg justify-self-center  mt-5" onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
            <legend className="fieldset-legend">Employee details</legend>

            <label className="label">Name</label>
            <input type="text" className="input" name="fullName" placeholder="Full Name" />

            <label className="label">Age</label>
            <input type="number" className="input" name="age" placeholder="Age" />

            <label className="label">Email</label>
            <input type="email" className="input" name="email" placeholder="Email" />

            <label className="label">Gender</label>
            <input type="text" className="input" name="gender" placeholder="Name" />

            <label className="label">Username</label>
            <input type="text" className="input" name="username" placeholder="Name" />

            <label className="label">Password</label>
            <input type="password" className="input" name="password" placeholder="Name" />

            <button className="btn btn-neutral mt-4" type='submit'>Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Signup
