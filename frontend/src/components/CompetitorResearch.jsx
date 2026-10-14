
/**
 * LaunchLoop AI - Competitor Research
 *
 * Allows restaurant owners to research nearby competitors
 * using publicly available information from Tavily.
 *
 * Features:
 * - Collect restaurant name and location
 * - Request competitor research through the Express backend
 * - Display search results with original source links
 * - Handle API errors and loading states
 * - Remind users to verify third-party information
 *
 * Tavily requests are handled by the backend so the
 * Tavily API key is never exposed in the frontend.
 */

import { useState } from "react";
import {
  Search,
  ExternalLink,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";

// Base URL of the LaunchLoop AI Express backend.
// Uses the configured environment variable or localhost for development.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Competitor Research page.
 *
 * Manages restaurant search inputs, communicates with the backend,
 * and displays competitor information returned by Tavily.
 */
function CompetitorResearch() {
  // Store the restaurant name and location entered by the user.
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");

  // Store competitor research results returned by the backend.
  const [results, setResults] = useState([]);

  // Track the current request's loading and error states.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Track whether a research request has completed successfully.
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Submit restaurant details to the competitor research API.
   *
   * The backend uses Tavily to retrieve public research sources.
   * Results are stored in React state and displayed to the user.
   *
   * @param {Event} event - Research form submission event.
   */
  async function handleResearch(event) {
    // Prevent the browser from reloading the page on submission.
    event.preventDefault();

    // Reset previous results and show the loading state.
    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(false);

    try {
      // Send the restaurant details to the Express backend.
      // The backend communicates with Tavily using its private API key.
      const response = await fetch(
        `${API_URL}/api/research/competitors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurantName,
            location,
          }),
        }
      );

      // Parse the JSON response from the backend.
      const data = await response.json();

      // Stop processing if the request was unsuccessful.
      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Competitor research failed."
        );
      }

      // Save the research results and mark the search as complete.
      // Use an empty array if the response contains no valid result list.
      setResults(Array.isArray(data.results) ? data.results : []);
      setHasSearched(true);
    } catch (err) {
      // Display a helpful message when the request fails.
      setError(err.message || "Something went wrong.");
    } finally {
      // Hide the loading indicator after success or failure.
      setLoading(false);
    }
  }

  return (
    <div className="research-page">

      {/* Page heading and feature description */}
      <div className="page-heading">
        <div className="eyebrow">
          <Search size={15} />
          MARKET INTELLIGENCE
        </div>

        <h1>Competitor Research</h1>
        <p>
          Discover public competitor information and marketing
          opportunities using Tavily.
        </p>
      </div>

      {/* Restaurant information form */}
      <section className="panel research-form-panel">
        <div className="panel-heading">
          <h2>Research your market</h2>
          <p>Enter your restaurant and target location.</p>
        </div>

        <form onSubmit={handleResearch}>
          {/* Restaurant name input */}
          <label htmlFor="researchRestaurant">
            Restaurant name
          </label>
          <input
            id="researchRestaurant"
            required
            value={restaurantName}
            onChange={(event) =>
              setRestaurantName(event.target.value)
            }
            placeholder="e.g. Spice Garden"
          />

          {/* Target location input */}
          <label htmlFor="researchLocation">
            Location
          </label>
          <input
            id="researchLocation"
            required
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            placeholder="e.g. Toronto, Ontario"
          />

          {/* Submit button with a loading indicator during research */}
          <button
            className="generate-button"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={18}
                  className="spinner"
                />
                Researching competitors...
              </>
            ) : (
              <>
                <Search size={18} />
                Research Competitors
              </>
            )}
          </button>
        </form>
      </section>

      {/* Show any errors returned during the research request */}
      {error && <div className="error-box">{error}</div>}

      {/* Initial message displayed before the first search */}
      {!loading && !hasSearched && !error && (
        <div className="research-empty-state">
          <Search size={28} />
          <h3>Ready to explore your market?</h3>
          <p>
            Search for publicly available competitor information.
          </p>
        </div>
      )}

      {/* Research results displayed after a successful API request */}
      {hasSearched && (
        <section className="research-results">

          {/* Display the number of research sources found */}
          <div className="research-results-heading">
            <h2>Research Results</h2>
            <span>{results.length} sources found</span>
          </div>

          {/* Remind users that third-party information is unverified */}
          <div className="research-warning">
            <AlertTriangle size={17} />
            <span>
              Search results may be outdated or unrelated.
              Verify prices and offers on the original websites.
            </span>
          </div>

          {/* Handle searches with no available results */}
          {results.length === 0 ? (
            <p>No research sources were found.</p>
          ) : (

            /* Render a card for each research source */
            <div className="research-cards">
              {results.map((result, index) => (
                <article
                  className="research-card"
                  key={`${result.url}-${index}`}
                >
                  <div className="research-card-top">
                    <span>Source {index + 1}</span>
                    <Search size={17} />
                  </div>

                  {/* Research source title */}
                  <h3>{result.title || "Untitled source"}</h3>

                  {/* Description returned by Tavily */}
                  <p>
                    {result.content ||
                      "No description available."}
                  </p>

                  {/* Link to the original source for verification */}
                  {result.url && (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View original source
                      <ExternalLink size={15} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default CompetitorResearch;
