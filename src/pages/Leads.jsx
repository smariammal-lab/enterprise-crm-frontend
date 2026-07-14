import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Leads() {
  const [leads, setLeads] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("New");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    document.title ="CRM Leads";
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async () => {
    try {
      await api.post("/leads", {
        name,
        email,
        phone,
        status,
      });

      alert("Lead Added Successfully");

      setName("");
      setEmail("");
      setPhone("");
      setStatus("New");

      fetchLeads();
    } catch (err) {
      console.log(err);
      alert("Failed to add lead");
    }
  };

  const editLead = (lead) => {
    setEditId(lead._id);
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone);
    setStatus(lead.status);
    setIsEditing(true);
  };

  const updateLead = async () => {
    try {
      await api.put(`/leads/${editId}`, {
        name,
        email,
        phone,
        status,
      });

      alert("Lead Updated Successfully");

      setName("");
      setEmail("");
      setPhone("");
      setStatus("New");
      setEditId(null);
      setIsEditing(false);

      fetchLeads();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  const deleteLead = async (id) => {
    try {
      await api.delete(`/leads/${id}`);

      alert("Lead Deleted Successfully");

      fetchLeads();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "20px" }}>
          <h2>Leads</h2>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginLeft: "10px" }}
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ marginLeft: "10px" }}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Proposal</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

            <button
              onClick={isEditing ? updateLead : addLead}
              style={{ marginLeft: "10px" }}
            >
              {isEditing ? "Update Lead" : "Add Lead"}
            </button>
          </div>

          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.status}</td>
                  <td>
                    <button onClick={() => editLead(lead)}>
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLead(lead._id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leads;