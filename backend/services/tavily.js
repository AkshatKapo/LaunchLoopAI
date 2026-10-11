
async function researchCompetitors(restaurantName, location) {
  const query = `Indian restaurant weekend buffet competitors near ${location}, prices, promotions, excluding ${restaurantName}`;

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TAVILY_API_KEY}`
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: 5,
      include_answer: false
    }),
    signal: AbortSignal.timeout(20000)
  });

  if (!response.ok) {
    throw new Error(`Tavily API error: ${response.status}`);
  }

  const data = await response.json();

  return (data.results || []).map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content
  }));
}

module.exports = { researchCompetitors };
