import axios from "axios"

const baseURL = "http://127.0.0.1:8000/employee"

class Service{
    fetchEmployees(){
        return axios.get(baseURL)
    }

    addEmployee(data){
        return axios.post(baseURL, data)
    }

    updateEmployee(id, data){
        return axios.put(baseURL + "/" + id, data)
    }

    fetchEmployeeById(id){
        return axios.get(baseURL + "/" + id)
    }

    deleteEmployee(id){
        return axios.delete(baseURL + "/" + id)
    }
}

export default new Service();