import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function EmployeeList() {
  
  const [EmployeeList, setEmployeeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const getAllEmployee = await axios.get('http://localhost:7000/employee');
        setEmployeeList(getAllEmployee.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deletedItem = await axios.delete('http://localhost:7000/employee/deleteEmployee/' + id);
      console.log(deletedItem, 'Deleted Successfully');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  //filter for search 
  const filteredEmployees = EmployeeList.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.mobile.includes(searchQuery)
    );
  });

  return (
    <>
      <style>
        {`
        .custom-table {
          border-radius: 10px;
          overflow: hidden;
        }
        .profile-pic {
          height: 50px;
          width: 50px;
        }
        .search-input {
          margin-bottom: 15px;
          float: right;
          width: 200px;
        }
        .total-count {
          margin-bottom: 10px;
          text-align: right;
          font-weight: bold;
        }
        `}
      </style>

      <div className="row-12 mt-5 ">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <h1>Employee List</h1>
        </div>
        <div className="col vh-100">
          <div className="total-count">Total Employees: {filteredEmployees.length}</div>
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">UID</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile NO</th>
                <th scope="col">Designation</th>
                <th scope="col">Gender</th>
                <th scope="col">Course</th>
                <th scope="col">Created At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => {
                const createdAt = new Date(employee.createdAt).toLocaleDateString();
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img className="profile-pic" src={`http://localhost:7000/uploads/${employee.img}`} alt="pic" />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.courses.join(', ')}</td>
                    <td>{createdAt}</td>
                    <td>
                      <Link to={`/update/${employee._id}`} className="btn btn-success me-3">Update</Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
