import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import EmployeeEditForm from './EmployeeEditForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('/api/v1/tasks');
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    setEditEmployeeId(id);
  };

  const handleUpdated = () => {
    setEditEmployeeId(null); // Reset edit mode
    // Refresh employee list after update
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('/api/v1/tasks');
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  };

  return (
    <div>
      <h1>Employee List</h1>
      {editEmployeeId ? (
        <EmployeeEditForm employeeId={editEmployeeId} onUpdated={handleUpdated} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course.join(', ')}</td>
                <td>{new Date(employee.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
