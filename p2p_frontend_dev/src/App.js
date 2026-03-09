  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import './App.css';
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Dashboard from "./pages/Dashboard";
  import CreateRequest from "./pages/CreateRequest";
  import VendorCreation from "./pages/VendorCreation";
  import ProtectedRoute from "./components/ProtectedRoute";
  import Header from "./components/Header";

  function App() {
    return (
      <Router>
        <Header />
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor-creation"
            element={
              <ProtectedRoute>
                <VendorCreation />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    );
  }

  export default App;