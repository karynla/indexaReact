const API_URL = "http://localhost:3001";

const request = async (method, path, data = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${API_URL}${path}`, options);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  // DELETE retorna status 200 ou 204, sem body
  if (method === "DELETE") {
    return { success: true };
  }

  if (res.status === 204) {
    return null;
  }

  return await res.json();
};

export const patientsAPI = {
  getAll: () => request("GET", "/patients"),
  getById: (id) => request("GET", `/patients/${id}`),
  create: (data) => request("POST", "/patients", data),
  update: (id, data) => request("PUT", `/patients/${id}`, data),
  delete: (id) => request("DELETE", `/patients/${id}`),
};

export const recordsAPI = {
  getAll: () => request("GET", "/records"),
  getById: (id) => request("GET", `/records/${id}`),
  getByPatient: (patientId) =>
    request("GET", `/records?patientId=${patientId}`),
  create: (data) => request("POST", "/records", data),
  update: (id, data) => request("PUT", `/records/${id}`, data),
  delete: (id) => request("DELETE", `/records/${id}`),
};
