import React, { useEffect, useState } from "react";
import Service from "../Services/Service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

const Employee = () => {
    
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = async() =>{
        try{
            await Service.fetchEmployees().then((response) => {
                console.log(response);
                setEmployee(response?.data);
            })
        } catch(error){
            console.log(error)
        }
    }

    const deleteEmployee = (employeeId) => {
        Swal.fire({
            title : "Delete ?",
            text : "IF you delete, we can not undone",
            confirmButtonText : "Delete",
            showCancelButton : true,
            cancelButtonText : "Cancel",
            icon : "warning"
        }).then((response) => {
            if(response.isConfirmed){
                Service.deleteEmployee(employeeId).then(() => getEmployees());
            }
        })
    }

    const updateEmp = (employeeId) => {
        navigate(`/add/${employeeId}`);
    }
    
    return(
        <div className="App">
            <h1>Employee Management</h1>
            <button className="add-employee" onClick={() => navigate("/add")}>Add Employee</button>
            <div className="table-center">
                <table>
                    <thead>
                        <th>Employee Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {employee.map((emp) => (
                        <tr key = {emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.sal}</td>
                            <td>
                                <div className="button-table-container">
                                    <button className="edit-button" onClick={() => updateEmp(emp.id)}>Edit</button>
                                    <button className="delete-button" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Employee;