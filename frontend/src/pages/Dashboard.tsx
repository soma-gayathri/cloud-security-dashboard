import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAlerts } from "../services/api";
import "./Dashboard.css";

type Alert = {
  id: number;
  title: string;
  severity: string;
  status: string;
  source: string;
};

function Dashboard() {
  const { user, logout } = useAuth();

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch {
        setError("Unable to load alerts. Please check backend server.");
      }
    }

    loadAlerts();
  }, []);

  const filteredAlerts = alerts.filter((alert) =>
    alert.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const highSeverityCount = alerts.filter(
    (alert) => alert.severity === "High"
  ).length;

  const openAlertsCount = alerts.filter(
    (alert) => alert.status === "Open"
  ).length;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Cloud Security Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>

        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </header>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Alerts</h3>
          <p>{alerts.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>High Severity</h3>
          <p>{highSeverityCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Open Issues</h3>
          <p>{openAlertsCount}</p>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="panel-header">
          <h2>Security Alerts</h2>

          <input
            type="text"
            placeholder="Search alerts..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>

        {error && <p className="dashboard-error">{error}</p>}

        <table className="alerts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Source</th>
            </tr>
          </thead>

          <tbody>
            {filteredAlerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.id}</td>
                <td>{alert.title}</td>
                <td>{alert.severity}</td>
                <td>{alert.status}</td>
                <td>{alert.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;
