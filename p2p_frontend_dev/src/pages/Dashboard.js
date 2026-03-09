import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/procurement/my-requests")
      .then(res => {
        const data = res.data.requests || res.data.result || res.data || [];
        setRequests(Array.isArray(data) ? data : []);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="brand">
          <h1>Mastek Procurement</h1>
        </div>
        <div>
          <Link className="link" to="/create">Create New</Link>
        </div>
      </div>

      <div className="card">
        <h2 className="page-title">My Procurement Requests</h2>

        <ul className="requests-list">
          {requests.map((r, index) => (
            <li key={index}>
              <div>
                <strong>{r.request_number}</strong> — {r.item_name}
              </div>
              <div className="requests-meta">{r.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;