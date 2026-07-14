import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>CRM</h2>
      <hr />

      <p><Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link></p>

      <p><Link to="/customers" style={{ color: "white", textDecoration: "none" }}>Customers</Link></p>

      <p><Link to="/leads" style={{ color: "white", textDecoration: "none" }}>Leads</Link></p>
    </div>
  );
}

export default Sidebar;