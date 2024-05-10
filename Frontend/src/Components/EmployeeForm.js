import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: null
  });

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

  const { name, email, mobile, designation, gender, course, image } = formData;

  const onChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    // Validate form fields
    if (!name || !email || !mobile || !designation || !gender || !course || !image) {
      alert('Please fill in all fields');
      return;
    }
    // Submit form data to the backend
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('designation', designation);
      formData.append('gender', gender);
      formData.append('course', course);
      formData.append('image', image);

      const res = await axios.post('/api/v1/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      // Optionally, you can reset the form fields here
      setFormData({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
        image: null
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Employee List</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Mobile No.:</label>
          <input
            type='number'
            name='mobile'
            value={mobile}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <select
            name='designation'
            value={designation}
            onChange={onChange}
            required
          >
            <option value=''>Select</option>
            <option value='HR'>HR</option>
            <option value='Manager'>Manager</option>
            <option value='Sales'>Sales</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input
              type='radio'
              name='gender'
              value='Male'
              checked={gender === 'Male'}
              onChange={onChange}
              required
            />{' '}
            Male
          </label>
          <label>
            <input
              type='radio'
              name='gender'
              value='Female'
              checked={gender === 'Female'}
              onChange={onChange}
              required
            />{' '}
            Female
          </label>
        </div>
        <div>
          <label>Course:</label>
          <label>
            <input
              type='checkbox'
              name='course'
              value='MCA'
              checked={course === 'MCA'}
              onChange={onChange}
              required
            />{' '}
            MCA
          </label>
          <label>
            <input
              type='checkbox'
              name='course'
              value='BCA'
              checked={course === 'BCA'}
              onChange={onChange}
              required
            />{' '}
            BCA
          </label>
          <label>
            <input
              type='checkbox'
              name='course'
              value='BSC'
              checked={course === 'BSC'}
              onChange={onChange}
              required
            />{' '}
            BSC
          </label>
        </div>
        <div>
          <label>Image:</label>
          <input
            type='file'
            name='image'
            accept='image/jpeg,image/png'
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input type='submit' value='Submit' />
        </div>
      </form>
    </div>
  );
};

export default EmployeeList;
