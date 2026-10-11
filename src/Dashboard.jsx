
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Dashboard({employees , setEmployees}) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');

  function addEmployee(e) {
    e.preventDefault();

    if (!name.trim() || !role.trim()) {
      return;
    }

    setEmployees([
      ...employees,
      {
        id: Date.now(),
        name: name.trim(),
        role: role.trim(),
      },
    ]);

    setName('');
    setRole('');
  }

  function deleteEmployee(id) {
    setEmployees(employees.filter(emp => emp.id !== id));
  }

  const filteredEmployees = employees.filter(emp =>
    `${emp.name} ${emp.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="header d-flex justify-content-between align-items-center p-3">
        <h2 className="text-white fw-bold fs-4 mb-0">
          <span className="material-symbols-outlined align-middle me-2">
            dashboard
          </span>
          Employee Management
        </h2>

        <span className="material-symbols-outlined text-white">
          notifications
        </span>
      </div>

      {/* Dashboard Heading */}
      <div className="dashboard-heading mt-4 mb-3">
        <h5 className="mb-1">Dashboard Overview</h5>
        <p className="text-secondary mb-0">
          Manage your team in one place.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {/* Total Employees */}
        <div className="col-6">
          <div className="card summary-card h-100">
            <div className="card-body text-start">
              <span className="material-symbols-outlined text-primary">
                groups
              </span>

              <h4 className="mb-1">{employees.length}</h4>

              <p className="text-secondary mb-0">
                Total Employees
              </p>
            </div>
          </div>
        </div>

        {/* Add Employee */}
        <div className="col-6">
          <div
            className="card summary-card h-100"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/add-employee')}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/add-employee');
              }
            }}
          >
            <div className="card-body text-start">
              <span className="material-symbols-outlined text-success">
                person_add
              </span>

              <h4 className="mb-1">Add</h4>

              <p className="text-secondary mb-0">
                New Employee
              </p>
            </div>
          </div>
        </div>
      </div>
    

      {/* Employee List */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Employee List</h5>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search employees..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.role}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-blue btn-sm"
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-secondary">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
