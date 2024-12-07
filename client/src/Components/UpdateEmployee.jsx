import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'HR',
    gender: '',
    courses: [],
    img: null,
  });

  const [errors, setErrors] = useState({});
  const [imgError, setImgError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/employee/getEmployee/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        courses: checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value),
      }));
    } else if (type === 'file') {
      const file = files[0];
      if (file && !['image/png', 'image/jpeg'].includes(file.type)) {
        setImgError('Only PNG and JPG files are allowed.');
      } else {
        setImgError('');
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.mobile) errors.mobile = "Mobile No is required.";
    if (!formData.gender) errors.gender = "Gender is required.";
    if (formData.courses.length === 0) errors.courses = "At least one course must be selected.";
    if (imgError) errors.img = imgError;
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const data = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => {
            data.append(key, item);
          });
        } else {
          data.append(key, formData[key]);
        }
      }
  
      // Log the FormData to verify the updated values
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
  
      try {
        const response = await axios.put(`http://localhost:7000/employee/updateEmployee/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("Employee updated:", response.data);
        navigate("/list");
      } catch (err) {
        console.error(err);
      }
    }
  };
  
  

  return (
    <div className="row w-100 mt-5">
      <div className="col-12 d-flex justify-content-center align-items-center">
        <h1 className='p-3'>Update Employee</h1>
      </div>
      <div className="col-12 d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} noValidate className="w-50">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" value={formData.name} id="name" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} onChange={handleChange} />
            <div className="invalid-feedback">{errors.name}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" value={formData.email} id="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={handleChange} />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile No</label>
            <input type="number" value={formData.mobile} id="mobile" name="mobile" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} onChange={handleChange} />
            <div className="invalid-feedback">{errors.mobile}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="designation" className="form-label">Designation</label>
            <select id="designation" value={formData.designation} name="designation" className="form-select" onChange={handleChange}>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label><br />
            <div className="form-check form-check-inline">
              <input type="radio" id="male" name="gender" value="Male" className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`} onChange={handleChange} checked={formData.gender === 'Male'} />
              <label htmlFor="male" className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" id="female" name="gender" value="Female" className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`} onChange={handleChange} checked={formData.gender === 'Female'} />
              <label htmlFor="female" className="form-check-label">Female</label>
            </div>
            <div className="invalid-feedback d-block">{errors.gender}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Course</label><br />
            <div className="form-check form-check-inline">
              <input type="checkbox" id="mca" name="course" value="MCA" className={`form-check-input ${errors.courses ? 'is-invalid' : ''}`} onChange={handleChange} checked={formData.courses.includes('MCA')} />
              <label htmlFor="mca" className="form-check-label">MCA</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" id="bca" name="course" value="BCA" className={`form-check-input ${errors.courses ? 'is-invalid' : ''}`} onChange={handleChange} checked={formData.courses.includes('BCA')} />
              <label htmlFor="bca" className="form-check-label">BCA</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" id="bsc" name="course" value="BSC" className={`form-check-input ${errors.courses ? 'is-invalid' : ''}`} onChange={handleChange} checked={formData.courses.includes('BSC')} />
              <label htmlFor="bsc" className="form-check-label">BSC</label>
            </div>
            <div className="invalid-feedback d-block">{errors.courses}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">Img Upload</label>
            <input type="file" id="img" name="img" className={`form-control ${errors.img ? 'is-invalid' : ''}`} onChange={handleChange} />
            <div className="invalid-feedback">{errors.img}</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
