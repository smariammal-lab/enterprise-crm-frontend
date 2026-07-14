import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [company,setCompany] = useState("");
  const [editId,setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    document.title = "CRM Customers";
  }, []);
  
  const editCustomer = (customer) => {
    setEditId(customer._id);
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setCompany(customer.company);
    setIsEditing(true);
  }
  const updateCustomer = async () => {
  try {
    await api.put(`/customers/${editId}`, {
      name: name,
      email: email,
      phone: phone,
      company: company,
    });

    alert("Customer Updated Successfully");

    const res = await api.get("/customers");
    setCustomers(res.data);

    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setEditId(null);
    setIsEditing(false);
  } catch (err) {
    console.log(err);
    alert("Update Failed");
  }
};
  const addCustomer = async () => {
    try {
      const res = await api.post("/customers", { name, email, phone, company });
      setCustomers([...customers, res.data.customer]);
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCustomer = async (id) => {
  try {
    await api.delete(`/customers/${id}`);

    setCustomers(customers.filter((customer) => customer._id !== id));

    alert("Customer Deleted Successfully");
  } catch (err) {
    console.log(err);
    alert("Delete Failed");
  }
};

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/customers");
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "20px" }}>
          <h2>Customers</h2>
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
  />

  <input
    type="text"
    placeholder="Phone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />

  <input
    type="text"
    placeholder="Company"
    value={company}
    onChange={(e) => setCompany(e.target.value)}
  />

  <button onClick={addCustomer}>
    Add Customer
  </button>
  <button onClick={isEditing ? updateCustomer : addCustomer}>
    {isEditing ? "Update Customer" : "Add Customer"}
  </button>
</div>

          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Action </th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.company}</td>
                  <td>
                    <button onClick={() => editCustomer(customer)}>
                      Edit
                    </button>
                    <button onClick={() => deleteCustomer(customer._id)}>
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

export default Customers;