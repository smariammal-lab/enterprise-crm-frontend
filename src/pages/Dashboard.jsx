import { useEffect,useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
  const [data,setData] = useState({
    totalCustomers:0,
    totalLeads:0,
    wonDeals:0,
    lostDeals:0,
  })
  
  useEffect(() =>  {
     document.title = "CRM Dashboard";
  }, []);
  
  useEffect(() => {
    // Simulate an API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try{
        const res = await api.get("/dashboard");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "20px" }}>
          <h2>Dashboard</h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                background: "#4CAF50",
                color: "white",
                padding: "20px",
                width: "200px",
                borderRadius: "10px",
              }}
            >
              <h3>Total Customers</h3>
              <h1>{data.totalCustomers}</h1>
            </div>

            <div
              style={{
                background: "#2196F3",
                color: "white",
                padding: "20px",
                width: "200px",
                borderRadius: "10px",
              }}
            >
              <h3>Total Leads</h3>
              <h1>{data.totalLeads}</h1>
            </div>

            <div
              style={{
                background: "#FF9800",
                color: "white",
                padding: "20px",
                width: "200px",
                borderRadius: "10px",
              }}
            >
              <h3>Won Deals</h3>
              <h1>{data.wonDeals}</h1>
            </div>

            <div
              style={{
                background: "#F44336",
                color: "white",
                padding: "20px",
                width: "200px",
                borderRadius: "10px",
              }}
            >
              <h3>Lost Deals</h3>
              <h1>{data.lostDeals}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;