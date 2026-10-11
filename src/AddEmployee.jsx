
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee({ onAddEmployee }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !role.trim()) {
      setError('Please enter employee name and role.');
      return;
    }

    onAddEmployee(name, role);

    navigate('/');
  }

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-1">Add Employee</h4>

          <p className="text-secondary">
            Enter employee details below.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Employee name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Employee role"
              value={role}
              onChange={e => setRole(e.target.value)}
            />

            {error && (
              <p className="text-danger">{error}</p>
            )}

            <button type="submit" className="btn btn-primary">
              Save Employee
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
