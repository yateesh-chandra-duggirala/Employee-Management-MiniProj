import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import Service from "../Services/Service";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sal, setSal] = useState(0);

    const navigate = useNavigate()

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [salError, setSalError] = useState('');

    const {employeeId} = useParams();
    const isUpdating = employeeId !== undefined;


    useEffect(() => {
        if(isUpdating){
            console.log("response")
            fetchEmployee();
        }
    }, [])

    const fetchEmployee = async() => {
        await Service.fetchEmployeeById(employeeId)
        .then((response) => {
            console.log(response.data)
            const {name, email, sal} = response.data;
            setName(name)
            setEmail(email)
            setSal(sal);
        })
    }

    const handleNameChange = (e) =>{
        const validName = e.target.value;
        setName(validName);
        if(!validName){
            setNameError("Enter Valid Name");
        } else{
            setNameError("");
        }
    }

    const handleEmailChange = (e) =>{
        const validEmail = e.target.value;
        setEmail(validEmail);
        if(!validEmail){
            setEmailError("Enter Valid Email");
        } else{
            setEmailError("");
        }
    }

    const handleSalaryChange = (e) =>{
        const validSal = e.target.value;
        setSal(validSal);
        if(validSal <= 0){
            setSalError("Enter Valid Salary");
        } else{
            setSalError("");
        }
    }

    const validForm = () => {
        let isValid = true;
        if(!name){
            setNameError("Enter Employee's Name");
            isValid = false;
        } else if(name.startsWith(" ")){
            setNameError("Name can not start with white spaces");
            isValid = false
        } else {
            setNameError('')
        }

        if(!email){
            setEmailError("Enter Employee's Email ");
            isValid = false;
        } else {
            setEmailError('')
        }

        if(sal <=0 ){
            setSalError("Enter Valid Salary")
            isValid = false
        } else {
            setSalError('')
        }
        return isValid;
    }

    const AddOrUpdateEmp = async(e) => {
        e.preventDefault();

        if(!validForm()){
            Swal.fire({
                title : "Error Credentials",
                text : "Please post valid credentials",
                icon : "error"                ,
                confirmButtonText : "Modify"
            })
            return
        }

        const data = {
            name,
            email,
            sal
        }

        if(isUpdating){
            try{
                await Service.updateEmployee(employeeId, data);
                Swal.fire({
                    title : "Success",
                    timer : 2000,
                    showCancelButton : false,
                    icon : "success"
                })
                navigate("/");
            } catch(err){
                console.log(err);
            }
        } else {
            try{
            await Service.addEmployee(data);
            Swal.fire({
                title : "Success",
                timer : 2000,
                showCancelButton : false,
                icon : "success"
            })
            navigate("/");
        } catch(err){
            console.log(err);
        }
        }
    }

    return(
        <div>
            <div className="table-center">
                <form className="container" onSubmit={AddOrUpdateEmp}>
                    <h1>{isUpdating ? "Update Employee" : "Add Employee"}</h1>
                    <div className="form-group">
                        <label>Employee Name</label>
                        <input
                        className="input-field"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        />
                        {nameError && <div className="error">{nameError}</div>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                        className="input-field"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        />
                        {emailError && <div className="error">{emailError}</div>}
                    </div>
                    <div className="form-group">
                        <label>Salary</label>
                        <input
                        className="input-field"
                        type="text"
                        value={sal}
                        onChange={handleSalaryChange}
                        />
                        {salError && <div className="error">{salError}</div>}
                    </div>
                    <div className="button-container">
                        <button className="add-employee" onClick={AddOrUpdateEmp}>{isUpdating ? "Edit": "Add"}</button>
                        <button className="delete-button" onClick={() => navigate("/")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee;