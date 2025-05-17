export async function handler() {
  const key = process.env.REACT_APP_GOOGLE_KEY;

  if (!key) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No Google API key found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ key }),
  };
}
