export async function handler() {
  const key = process.env.REACT_APP_OWM_KEY;

  if (!key) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ key }),
  };
}