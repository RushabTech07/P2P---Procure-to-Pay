import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    await API.post("/auth/register", form);
    alert("Registration successful");
    navigate("/");
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="brand">
          <h1>Mastek Procurement</h1>
        </div>
      </div>

      <div className="card">
        <h2 className="page-title">Register</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <input className="form-control" placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})} />
          {errors.name && <div style={{color: 'red', fontSize: 13}}>{errors.name}</div>}

          <input className="form-control" placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})} />
          {errors.email && <div style={{color: 'red', fontSize: 13}}>{errors.email}</div>}

          <input className="form-control" type="password" placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})} />
          {errors.password && <div style={{color: 'red', fontSize: 13}}>{errors.password}</div>}

          <div style={{display: 'flex', gap: 8}}>
            <button className="btn" type="submit" disabled={!form.name || !form.email || !form.password}>Register</button>
            <Link className="link" to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;