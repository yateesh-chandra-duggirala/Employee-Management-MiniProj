import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import Employee from './Components/Employee';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element = {<Employee/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
