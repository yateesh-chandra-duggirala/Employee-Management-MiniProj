import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import Employee from './Components/Employee';
import AddEmployee from './Components/AddEmployee';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element = {<Employee/>}></Route>
            <Route path='/add' element = {<AddEmployee/>}></Route>
            <Route path='/add/:employeeId' element = {<AddEmployee/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
