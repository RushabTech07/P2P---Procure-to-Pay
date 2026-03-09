import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const res = await API.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side: Login Form */}
        <div className="login-left">
          <div className="login-logo">
            Mastek <span className="login-logo-accent">P2P</span>
          </div>
          <h2 className="login-heading">Supplier Login</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <div>
              <input
                type="email"
                placeholder="User Name"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
              {errors.email && <div style={{color: '#d32f2f', fontSize: 12, marginTop: 4}}>{errors.email}</div>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
              {errors.password && <div style={{color: '#d32f2f', fontSize: 12, marginTop: 4}}>{errors.password}</div>}
            </div>

            <button className="login-btn" type="submit" disabled={!form.email || !form.password}>
              Login
            </button>

            <div style={{textAlign: 'center', marginTop: 12}}>
              <a href="#forgot" style={{color: 'var(--primary)', textDecoration: 'none', fontSize: 12}}>Forgot Username or Password</a>
            </div>

            <div style={{textAlign: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee'}}>
              <span style={{fontSize: 12, color: '#666'}}>Don't have an account? </span>
              <Link to="/register" style={{color: 'var(--primary)', textDecoration: 'none', fontSize: 12, fontWeight: 600}}>Register</Link>
            </div>
          </form>
        </div>

        {/* Right Side: Promotional Content */}
        <div className="login-right">
          <div>
            <h3 className="promo-title">Discover our new webinar hub</h3>
            <div className="promo-image">
              [Promotional Image]
            </div>
            <p className="promo-text">
              We've moved our webinars to a fresh page. Visit to register for upcoming sessions and explore our library of on-demand webinars.
            </p>
            <button className="promo-btn">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;