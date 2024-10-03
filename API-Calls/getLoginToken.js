import * as nodeFetch from 'node-fetch';

export const getLoginToken = async () => {
  const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "admin",  // Replace with your actual username
      password: "Admin123", // Replace with your actual password
    }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const body = await response.json();
  return body.token;  // Assuming the response contains a token
};
