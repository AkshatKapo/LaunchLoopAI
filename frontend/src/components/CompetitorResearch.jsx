
import { useState } from "react";
import {
  Search,
  ExternalLink,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";

// Our Express backend URL.
// Tavily API keys remain safely on the backend.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function CompetitorResearch() {
  // Restaurant details entered by the user.
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");

  // Stores research results returned by Tavily.
  const [results, setResults] = useState([]);

  // Tracks the API request and any errors.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // True after a search has completed successfully.
  const [hasSearched, setHasSearched] = useState(false);

  // Send the restaurant information to our backend.
  async function handleResearch(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(false);

    try {
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

      const data = await response.json();

      // Stop if the backend reports an error.
      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Competitor research failed."
        );
      }

      // Store Tavily's source results in React state.
      setResults(Array.isArray(data.results) ? data.results : []);
      setHasSearched(true);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="research-page">
      {/* Page heading */}
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

      {/* Research form */}
      <section className="panel research-form-panel">
        <div className="panel-heading">
          <h2>Research your market</h2>
          <p>Enter your restaurant and target location.</p>
        </div>

        <form onSubmit={handleResearch}>
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

      {/* Display API errors */}
      {error && <div className="error-box">{error}</div>}

      {/* Initial state before searching */}
      {!loading && !hasSearched && !error && (
        <div className="research-empty-state">
          <Search size={28} />
          <h3>Ready to explore your market?</h3>
          <p>
            Search for publicly available competitor information.
          </p>
        </div>
      )}

      {/* Results from Tavily */}
      {hasSearched && (
        <section className="research-results">
          <div className="research-results-heading">
            <h2>Research Results</h2>
            <span>{results.length} sources found</span>
          </div>

          <div className="research-warning">
            <AlertTriangle size={17} />
            <span>
              Search results may be outdated or unrelated.
              Verify prices and offers on the original websites.
            </span>
          </div>

          {results.length === 0 ? (
            <p>No research sources were found.</p>
          ) : (
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

                  <h3>{result.title || "Untitled source"}</h3>

                  <p>
                    {result.content ||
                      "No description available."}
                  </p>

                  {/* Open the original research source */}
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
