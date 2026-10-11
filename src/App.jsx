import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Dashboard from './Dashboard';
import AddEmployee from './AddEmployee';

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Rahul', role: 'Frontend Developer' },
    { id: 2, name: 'Priya', role: 'UI Developer' },
  ]);

  function addEmployee(name, role) {
    if (!name.trim() || !role.trim()) return;

    setEmployees(prev => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        role: role.trim(),
      },
    ]);
  }

  return (
    <Routes>
      <Route path="/"element={<Dashboard employees={employees} setEmployees={setEmployees}/>}/>
      <Route path="/add-employee" element={<AddEmployee onAddEmployee={addEmployee} />}/>
    </Routes>
  );
}

export default App;
