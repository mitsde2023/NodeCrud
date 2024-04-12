import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState([]);


  const [formData, setFormData] = useState({
    EmployeeName: "",
    EmployeeEmail: "",
  });

  const [showEditPopup, setShowEditPopup] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/get");
      if (res) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);

    try {
      const response = await axios.get(
        `http://localhost:4000/employees/search?query=${searchTerm}`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/add", formData);
      fetchData();
      setFormData({
        EmployeeName: "",
        EmployeeEmail: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      id: employee.EmployeeID,
      EmployeeName: employee.EmployeeName,
      EmployeeEmail: employee.EmployeeEmail,
    });
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setFormData({
      id: null,
      EmployeeName: "",
      EmployeeEmail: "",
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:4000/edit", formData);
      fetchData();
      setShowEditPopup(false);
      setFormData({
        id: null,
        EmployeeName: "",
        EmployeeEmail: "",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container border p-2">
        <h4 className="text-center mt-5">Employee Management</h4>
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="EmployeeName"
                className="form-control my-2"
                placeholder="Employee Name"
                value={formData.EmployeeName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="EmployeeEmail"
                className="form-control my-2"
                placeholder="Employee Email"
                value={formData.EmployeeEmail}
                onChange={handleChange}
              />
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="input-group m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search employees by name or email"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <ul className="list-group">
        {employees.map(employee => (
          <li key={employee.EmployeeID} className="list-group-item">
            {employee.EmployeeName} - {employee.EmployeeEmail}
          </li>
        ))}
      </ul>

      {query ? (
        <> </>
      ) : (
        <>
          {" "}
          <div className="row mt-5">
            <div className="col-md-12 offset-md-2">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((employee, index) => (
                    <tr key={index}>
                      <td>{employee.EmployeeName}</td>
                      <td>{employee.EmployeeEmail}</td>
                      <td>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => handleDelete(employee.EmployeeID)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(employee)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showEditPopup && (
        <div className="edit-popup">
          <h2>Edit Employee</h2>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="EmployeeName"
                placeholder="Employee Name"
                value={formData.EmployeeName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name="EmployeeEmail"
                placeholder="Employee Email"
                value={formData.EmployeeEmail}
                onChange={handleChange}
              />
            </div>

            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleCloseEditPopup}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
