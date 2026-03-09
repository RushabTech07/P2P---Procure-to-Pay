import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateRequest() {

  const [form, setForm] = useState({
    item_name: "",
    description: "",
    quantity: ""
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};
    if (!form.item_name) errs.item_name = 'Item name is required';
    if (!form.quantity) errs.quantity = 'Quantity is required';
    else if (Number(form.quantity) <= 0) errs.quantity = 'Quantity must be > 0';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    await API.post("/procurement/create", form);
    navigate("/dashboard");
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="brand">
          <h1>Mastek Procurement</h1>
        </div>
      </div>

      <div className="card">
        <h2 className="page-title">Create Procurement Request</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <input className="form-control" placeholder="Item Name"
            value={form.item_name}
            onChange={(e) => setForm({...form, item_name: e.target.value})} />
          {errors.item_name && <div style={{color: 'red', fontSize: 13}}>{errors.item_name}</div>}

          <input className="form-control" placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})} />

          <input className="form-control" type="number" placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({...form, quantity: e.target.value})} />
          {errors.quantity && <div style={{color: 'red', fontSize: 13}}>{errors.quantity}</div>}

          <div style={{display: 'flex', gap: 8}}>
            <button className="btn" type="submit">Submit</button>
            <button type="button" className="btn secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRequest;