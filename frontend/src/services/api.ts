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
