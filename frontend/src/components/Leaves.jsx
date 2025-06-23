import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';


const Leaves = () => {
    const [date, setDates] = useState(new Date());
    const {user,setUser} = useUser();

    useEffect(()=>{
        //leaves taken
    },[])
    const getLengthOfLeave = () => {
        if (date.length > 0) {
            return moment(date[1]).diff(moment(date[0]), 'days') + 1;
        }
    }

    const submitLeaves=async()=>{
        console.log(date);
        await axios.post("http://localhost:8081/api/employee/editLeaves",
            {empId:user._id, 
            startDate:date[0],
            endDate:date[1]}).then(async()=>{
                setDates([]);
                const updatedUser = await axios.get(`http://localhost:8081/api/employee/getEmployee/${user.username}`)
                setUser(updatedUser);
            })
        
    }

    return (
        <div>
            <Calendar onChange={setDates} value={date} selectRange={true} />
            {date.length ==2 ? (
                <div>
                    <p className='text-center'>
                        <span className='bold'>Start:</span>{' '}
                        {date[0].toDateString()}
                        &nbsp;|&nbsp;
                        <span className='bold'>End:</span> {date[1].toDateString()}
                    </p>
                    <p>Leaves for {getLengthOfLeave()} days</p>
                </div>
            ) : (
                <p className='text-center'>
                    <span className='bold'>Default selected date:</span>{' '}
                    {date.toDateString()}
                </p>
            )}
            <p>Leave Balance {user.leaveBalance}</p>
            <button type="submit" onClick={submitLeaves}>Submit</button>
        </div>
    );
}
export default Leaves