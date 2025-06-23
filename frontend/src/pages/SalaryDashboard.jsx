import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar3 from '../components/Navbar3';

const SalaryDashboard = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(async() => {
    // Replace with real API
    const res = await axios.get(`http://localhost:8081/api/manager/myTeam/${user.username}`);

    console.log(res);
    setTeamData(res.data)
  }, []);

  return (
    <div>
      <Navbar3/>
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Salary Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Team CTC</p>
          <p className="text-xl font-semibold">
            ₹{teamData.reduce((acc, emp) => acc + emp.ctc, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Avg In-Hand Salary</p>
          <p className="text-xl font-semibold">
            ₹
            {(
              teamData.reduce((acc, emp) => acc + emp.inHand, 0) /
              teamData.length
            ).toFixed(0)}
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total LOP Days</p>
          <p className="text-xl font-semibold">
            {teamData.reduce((acc, emp) => acc + emp.lop, 0)}
          </p>
        </div>
      </div>

      {/* Team Table */}
      <table className="w-full table-auto mt-4 bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Role</th>
            <th className="text-right p-3">CTC (₹)</th>
            <th className="text-right p-3">In-hand (₹)</th>
            <th className="text-right p-3">LOP</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((emp, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-3">{emp.name}</td>
              <td className="p-3">{emp.roles[0]}</td>
              <td className="p-3 text-right">{emp.salary}</td>
              <td className="p-3 text-right">{emp.inHand}</td>
              <td className="p-3 text-right">{emp.lop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default SalaryDashboard;
