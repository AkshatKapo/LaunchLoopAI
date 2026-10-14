
/**
 * LaunchLoop AI - Competitor Research Service
 *
 * Uses the Tavily Search API to research nearby restaurants,
 * competitor pricing, promotional offers, and marketing activities.
 *
 * The collected research helps NVIDIA Nemotron generate
 * more relevant marketing strategies for restaurant owners.
 */

/**
 * Research restaurant competitors using Tavily.
 *
 * @param {string} restaurantName - Name of the owner's restaurant.
 * @param {string} location - City or location of the restaurant.
 * @param {string} goal - Optional marketing objective.
 * @returns {Promise<Array>} Search results containing titles,
 *                           source URLs, and content summaries.
 */
async function researchCompetitors(restaurantName, location, goal = "") {
  // Build a flexible search query that supports different
  // restaurant types, cuisines, and marketing objectives.
  const query = `
    Restaurants similar to ${restaurantName} near ${location}.
    ${goal ? `Marketing objective: ${goal}.` : ""}
    Find competing restaurants, menus, prices,
    promotions, and special offers.
  `.trim();

  // Send the competitor research request to Tavily.
  // The API key is read from the backend environment variables.
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

    // Cancel the request if Tavily takes longer than 20 seconds.
    signal: AbortSignal.timeout(20000)
  });

  // Throw an error if Tavily returns an unsuccessful response.
  if (!response.ok) {
    throw new Error(`Tavily API error: ${response.status}`);
  }

  // Parse the response returned by Tavily.
  const data = await response.json();

  // Keep only the information needed by LaunchLoop AI.
  // Source URLs allow users to verify competitor information.
  return (data.results || []).map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content
  }));
}

// Export the function for use in backend API routes.
module.exports = { researchCompetitors };
