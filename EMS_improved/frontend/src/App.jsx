import React from 'react'
import { Routes, Route } from 'react-router'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div data-theme="sunset">
      {/* <button className="btn btn-neutral">Neutral</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-info">Info</button>
<button className="btn btn-success">Success</button>
<button className="btn btn-warning">Warning</button>
<button className="btn btn-error">Error</button> */}
      <Routes>
        {/* <Route path="" element={</>}/> */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signUp" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/> }/>
        {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
      </Routes>


    </div>
  )
}

export default App
