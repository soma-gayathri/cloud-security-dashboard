import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createAlert, getAlerts, updateAlertStatus } from "../services/api";
import AddAlertForm from "../components/AddAlertForm";
import "./Dashboard.css";

type Alert = {
  id: number;
  title: string;
  severity: string;
  status: string;
  source: string;
};

type NewAlert = {
  title: string;
  severity: string;
  status: string;
  source: string;
};

function Dashboard() {
  const { user, logout } = useAuth();

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchText, setSearchText] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
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

  async function handleAddAlert(newAlert: NewAlert) {
    try {
      const createdAlert = await createAlert(newAlert);
      setAlerts((currentAlerts) => [...currentAlerts, createdAlert]);
    } catch {
      setError("Unable to add alert. Please check backend server.");
    }
  }

  async function handleStatusChange(id: number, status: string) {
    try {
      const updatedAlert = await updateAlertStatus(id, status);

      setAlerts((currentAlerts) =>
        currentAlerts.map((alert) =>
          alert.id === id ? updatedAlert : alert
        )
      );
    } catch {
      setError("Unable to update alert status. Please check backend server.");
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesSeverity =
      severityFilter === "All" || alert.severity === severityFilter;

    const matchesStatus =
      statusFilter === "All" || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

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
        <AddAlertForm onAddAlert={handleAddAlert} />
      </section>

      <section className="dashboard-panel">
        <div className="panel-header">
          <h2>Security Alerts</h2>

          <div className="filter-group">
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <select
              value={severityFilter}
              onChange={(event) => setSeverityFilter(event.target.value)}
            >
              <option value="All">All Severity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Investigating">Investigating</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
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
                <td>
                  <select
                    value={alert.status}
                    onChange={(event) =>
                      handleStatusChange(alert.id, event.target.value)
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
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
