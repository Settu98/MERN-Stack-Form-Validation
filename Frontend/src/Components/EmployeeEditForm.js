import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeEditForm = ({ employeeId, onUpdated }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: []
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`/api/v1/tasks/${employeeId}`);
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/v1/tasks/${employeeId}`, employee);
      onUpdated(); // Notify parent component of update
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} />
        </div>
        <div>
          <label>Designation:</label>
          <input type="text" name="designation" value={employee.designation} onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={employee.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Course:</label>
          <input type="checkbox" name="course" value="MCA" checked={employee.course.includes('MCA')} onChange={handleChange} /> MCA
          <input type="checkbox" name="course" value="BCA" checked={employee.course.includes('BCA')} onChange={handleChange} /> BCA
          <input type="checkbox" name="course" value="BSC" checked={employee.course.includes('BSC')} onChange={handleChange} /> BSC
        </div>
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
