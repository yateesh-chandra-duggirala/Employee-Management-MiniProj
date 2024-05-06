import React from "react";

const Employee = () => {
    return(
        <div className="App">
            <h1>Employee Management</h1>
            <button className="add-employee">Add Employee</button>
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
                        <tr>
                            <td>1</td>
                            <td>Jayanth</td>
                            <td>jay@gmail.com</td>
                            <td>89783.90</td>
                            <td>
                                <div className="button-table-container">
                                    <button className="edit-button">Edit</button>
                                    <button className="delete-button">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Employee;