import React, {useState} from "react";

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sal, setSal] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [salError, setSalError] = useState('');

    const handleNameChange = (e) =>{
        const validName = e.target.value;
        setName(validName);
        if(!validName){
            setNameError("Enter Valid Name");
        } else{
            setNameError("");
        }
    }
}

export default AddEmployee;