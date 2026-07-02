const API_BASE_URL = "http://localhost:5000/api";

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
}

export async function getAlerts() {
  const response = await fetch(`${API_BASE_URL}/alerts`);

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return response.json();
}

export async function createAlert(alert: {
  title: string;
  severity: string;
  status: string;
  source: string;
}) {
  const response = await fetch(`${API_BASE_URL}/alerts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(alert)
  });

  if (!response.ok) {
    throw new Error("Failed to create alert");
  }

  return response.json();
}

export async function updateAlertStatus(id: number, status: string) {
  const response = await fetch(`${API_BASE_URL}/alerts/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error("Failed to update alert status");
  }

  return response.json();
}
