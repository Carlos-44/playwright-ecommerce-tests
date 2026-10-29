const BASE_URL = process.env.SERVER_URL || "http://localhost:2221";

export const getLoginToken = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const body = await response.json();
  return body.token;
};
