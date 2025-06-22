import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext';
import Navbar2 from '../components/Navbar2';
import { Link } from 'react-router';
import axios from 'axios';



const AdminDashboard = () => {
const { user } = useUser(); // Ensure this is properly set on login
  const [leaveApprovals, setLeaveApprovals] = useState([]);
  const [timeApprovals, setTimeApprovals] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchApprovals();
    fetchTeam();
  }, []);

  const fetchApprovals = async () => {
    const config = { username: user.username };
    const leave = await axios.post('http://localhost:8081/api/manager/leaveAprrovals', config);
    const time = await axios.post('http://localhost:8081/api/manager/timeApprovals', config);
    setLeaveApprovals(Object.entries(leave.data));
    setTimeApprovals(Object.entries(time.data));
  };

  const fetchTeam = async () => {
     const res = await axios.get(`http://localhost:8081/api/manager/myTeam/${user.manager}`);
    console.log(res);
  };

  const approveLeave = async (id) => {
    await axios.post('http://localhost:8081/api/manager/updateLeaveApproval', { attendanceId: id });
    fetchApprovals(); // Refresh data
  };

  const approveTime = async (id) => {
    await axios.post('http://localhost:8081/api/manager/updatedtimeApproval', { attendanceId: id });
    fetchApprovals(); // Refresh data
  };

    
  return (
  <div className="min-h-screen bg-gray-100">
    <Navbar2 />
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <section className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700">Team Members</h2>
          <ul className="list-disc ml-6 mt-2">
            {team.map(emp => (
              <li key={emp._id} className="text-gray-600">{emp.name} - {emp.email}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700">Pending Leave Approvals</h2>
          {leaveApprovals.length === 0 ? (
            <p className="text-gray-500">No pending leave approvals.</p>
          ) : (
            leaveApprovals.map(([user, leaves], index) => (
              <div key={index} className="mt-4">
                <h3 className="font-bold text-gray-800">{user.name}</h3>
                {leaves.map(leave => (
                  <div key={leave._id} className="border border-gray-300 p-2 my-2 rounded">
                    <p className="text-gray-600">From: {leave.fromDate}, To: {leave.toDate}</p>
                    <button onClick={() => approveLeave(leave._id)} className="btn btn-success mt-2">Approve</button>
                  </div>
                ))}
              </div>
            ))
          )}
        </section>

        <section className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700">Pending Time Approvals</h2>
          {timeApprovals.length === 0 ? (
            <p className="text-gray-500">No pending time approvals.</p>
          ) : (
            timeApprovals.map(([user, times], index) => (
              <div key={index} className="mt-4">
                <h3 className="font-bold text-gray-800">{user.name}</h3>
                {times.map(att => (
                  <div key={att._id} className="border border-gray-300 p-2 my-2 rounded">
                    <p className="text-gray-600">Date: {att.date}</p>
                    <button onClick={() => approveTime(att._id)} className="btn btn-success mt-2">Approve</button>
                  </div>
                ))}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  </div>
);

};

export default AdminDashboard
