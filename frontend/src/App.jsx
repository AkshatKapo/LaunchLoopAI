import { useState } from "react";

import {

  LayoutDashboard,

  Sparkles,

  Search,

  Mail,

  LoaderCircle,

  ArrowRight,

  Users,

  Target,

  Wallet,

  AlertTriangle,

  ExternalLink,

  Pencil,

  CheckCircle2,

} from "lucide-react";

import "./App.css";

import CompetitorResearch from "./components/CompetitorResearch";
import EmailCampaigns from "./components/EmailCampaigns";

// Read the backend URL from frontend/.env.

// API keys are never stored in the frontend.

const API_URL =

  import.meta.env.VITE_API_URL || "http\://localhost:5000";

function App() {

  // Stores the information entered by the restaurant owner.

  const [form, setForm] = useState({

    restaurantName: "",

    location: "",

    goal: "",

    budget: 200,

  });

  // Stores the complete response from our backend.

  const [campaign, setCampaign] = useState(null);

  // Tracks whether campaign generation is in progress.

  const [loading, setLoading] = useState(false);

  // Stores errors so we can show them in the dashboard.

  const [error, setError] = useState("");

  // Stores editable email fields separately from the AI response.

  const [emailDraft, setEmailDraft] = useState({

    subject: "",

    body: "",

  });

  // Tracks which page is currently visible in our dashboard.

  const [activePage, setActivePage] = useState("studio");

  // Tracks whether the owner has confirmed the campaign details.

  const [detailsConfirmed, setDetailsConfirmed] = useState(false);

  // Update an email field and invalidate any prior review confirmation.
  function updateEmailDraft(field, value) {
    setEmailDraft((previous) => ({ ...previous, [field]: value }));
    setDetailsConfirmed(false);
  }

  // Update one form field without deleting the others.

  function updateForm(field, value) {

    setForm((previous) => ({

      ...previous,

      [field]: value,

    }));

  }

  // Send restaurant details to our backend for AI generation.

  async function generateCampaign(event) {

    event.preventDefault();

    setLoading(true);

    setError("");

    setCampaign(null);

    setDetailsConfirmed(false);

    try {

      const response = await fetch(

        `${API_URL}/api/campaigns/generate`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(form),

        }

      );

      // Parse the response whether the request succeeds or fails.

      const data = await response.json();

      if (!response.ok || !data.success) {

        throw new Error(

          data.error || "Campaign generation failed."

        );

      }

      // Save the structured strategy returned by Nemotron.

      setCampaign(data);

      // Copy the generated email into editable React state.

      setEmailDraft({

        subject: data.strategy?.email?.subject || "",

        body: data.strategy?.email?.body || "",

      });

    } catch (err) {

      setError(err.message || "Something went wrong.");

    } finally {

      setLoading(false);

    }

  }

  // Marks the current draft as reviewed in the frontend only.

  // This does NOT send emails or save approval to the backend.

  function reviewDraft() {

    if (!detailsConfirmed) return;

    window.alert(

      "Draft reviewed locally. No emails have been sent."

    );

  }

  // Short names make the JSX easier to read.

  const strategy = campaign?.strategy;

  // Calculate the budget total from the AI's returned allocations.

  const allocatedBudget = (

    strategy?.budgetBreakdown || []

  ).reduce((total, item) => total + Number(item.amount || 0), 0);

  const remainingBudget = Number(form.budget) - allocatedBudget;

  return (

    <div className="app-shell">

      {/* =========================================

          SIDEBAR

          ========================================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">

            <Sparkles size={22} />

          </div>

          <span>

            LaunchLoop <span className="brand-ai">AI</span>

          </span>

        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="navigation">

          {/* Campaign Studio navigation */}

          <button

            type="button"

            className={`nav-item ${activePage === "studio" ? "active" : ""}`}

            onClick={() => setActivePage("studio")}

          >

            <LayoutDashboard size={18} />

            Campaign Studio

          </button>

          {/* Competitor Research navigation */}

          <button

            type="button"

            className={`nav-item ${activePage === "research" ? "active" : ""}`}

            onClick={() => setActivePage("research")}

          >

            <Search size={18} />

            Competitor Research

          </button>

                      {/* Open the email editor without regenerating the campaign. */}
            <button
              type="button"
              className={`nav-item ${activePage === "email" ? "active" : ""}`}
              onClick={() => setActivePage("email")}
            >
              <Mail size={18} />
              Email Campaigns
            </button>
</nav>

        <div className="sidebar-footer">

          <div className="status-dot" />

          NVIDIA Nemotron + Tavily

        </div>

      </aside>

      {/* =========================================

          MAIN CONTENT

          ========================================= */}

      <main className="main-content">

        <header className="topbar">

          <span>Workspace / {activePage === "research" ? "Competitor Research" : activePage === "email" ? "Email Campaigns" : "Campaign Studio"}</span>

          <span className="topbar-badge">Hackathon MVP</span>

        </header>

         <div className="page-content">

  {/* Display the selected page */}

  {activePage === "research" ? (

    <CompetitorResearch />

  ) : activePage === "email" ? (
    <EmailCampaigns
      emailDraft={emailDraft}
      updateEmailDraft={updateEmailDraft}
      campaign={campaign}
      detailsConfirmed={detailsConfirmed}
      setDetailsConfirmed={setDetailsConfirmed}
      remainingBudget={remainingBudget}
      reviewDraft={reviewDraft}
      onBack={() => setActivePage("studio")}
    />
  ) : (
    <>

      {/* Existing Campaign Studio content */}

      <div className="page-heading">

            <div className="eyebrow">

              <Sparkles size={15} />

              AI-POWERED MARKETING

            </div>

            <h1>Campaign Studio</h1>

            <p>

              Turn restaurant goals into research-backed

              marketing campaigns.

            </p>

          </div>

          <div className="workspace-grid">

            {/* =========================================

                RESTAURANT FORM

                ========================================= */}

            <section className="panel">

              <div className="panel-heading">

                <h2>Create a campaign</h2>

                <p>Tell our AI what you want to achieve.</p>

              </div>

              <form onSubmit={generateCampaign}>

                <label htmlFor="restaurantName">

                  Restaurant name

                </label>

                <input

                  id="restaurantName"

                  required

                  placeholder="e.g. Spice Garden"

                  value={form.restaurantName}

                  onChange={(e) =>

                    updateForm("restaurantName", e.target.value)

                  }

                />

                <label htmlFor="location">Location</label>

                <input

                  id="location"

                  required

                  placeholder="e.g. Toronto, Ontario"

                  value={form.location}

                  onChange={(e) =>

                    updateForm("location", e.target.value)

                  }

                />

                <label htmlFor="goal">Marketing goal</label>

                <textarea

                  id="goal"

                  required

                  rows={4}

                  placeholder="e.g. Attract more weekend buffet customers"

                  value={form.goal}

                  onChange={(e) =>

                    updateForm("goal", e.target.value)

                  }

                />

                <label htmlFor="budget">

                  Marketing budget (CAD)

                </label>

                <input

                  id="budget"

                  type="number"

                  min="1"

                  required

                  value={form.budget}

                  onChange={(e) =>

                    updateForm("budget", Number(e.target.value))

                  }

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

                      Generating campaign...

                    </>

                  ) : (

                    <>

                      <Sparkles size={18} />

                      Generate Campaign

                      <ArrowRight size={17} />

                    </>

                  )}

                </button>

              </form>

            </section>

            {/* =========================================

                CAMPAIGN PREVIEW

                ========================================= */}

            <section className="panel results-panel">

              <div className="panel-heading">

                <div className="result-title-row">

                  <h2>Campaign preview</h2>

                  {campaign && (

                    <span className="draft-badge">Draft</span>

                  )}

                </div>

                <p>Review the AI's recommendations.</p>

              </div>

              {error && (

                <div className="error-box">{error}</div>

              )}

              {/* Empty state */}

              {!campaign && !loading && (

                <div className="empty-state">

                  <div className="empty-icon">

                    <Sparkles size={30} />

                  </div>

                  <h3>Your next campaign starts here</h3>

                  <p>

                    Enter your restaurant details to generate

                    a marketing strategy.

                  </p>

                </div>

              )}

              {/* Loading state */}

              {loading && (

                <div className="empty-state">

                  <LoaderCircle

                    size={32}

                    className="spinner"

                  />

                  <h3>Our AI is working...</h3>

                  <p>

                    Researching competitors and generating

                    your marketing strategy.

                  </p>

                </div>

              )}

              {/* =========================================

                  STRUCTURED CAMPAIGN RESULTS

                  ========================================= */}

              {strategy && (

                <div className="structured-results">

                  <div className="notice">

                    <AlertTriangle size={18} />

                    <span>

                      AI-generated recommendations. Verify

                      business details, competitor claims,

                      and promotional offers before use.

                    </span>

                  </div>

                  {/* TARGET AUDIENCE */}

                  <div className="result-section">

                    <h3>

                      <Users size={18} />

                      Target Audience

                    </h3>

                    <p>{strategy.targetAudience}</p>

                  </div>

                  {/* COMPETITOR INSIGHTS */}

                  <div className="result-section">

                    <h3>

                      <Search size={18} />

                      Competitor Insights

                    </h3>

                    <p>{strategy.competitorInsights}</p>

                  </div>

                  {/* PROMOTIONAL OFFER */}

                  <div className="result-section">

                    <h3>

                      <Target size={18} />

                      Suggested Promotion

                    </h3>

                    <div className="offer-box">

                      {strategy.promotionalOffer}

                    </div>

                  </div>

                  {/* BUDGET BREAKDOWN */}

                  <div className="result-section">

                    <h3>

                      <Wallet size={18} />

                      Budget Breakdown

                    </h3>

                    <div className="budget-table-wrapper">

                      <table className="budget-table">

                        <thead>

                          <tr>

                            <th>Activity</th>

                            <th>Amount</th>

                            <th>Reason</th>

                          </tr>

                        </thead>

                        <tbody>

                          {(strategy.budgetBreakdown || []).map(

                            (item, index) => (

                              <tr key={index}>

                                <td>{item.item}</td>

                                <td>

                                  ${Number(item.amount).toFixed(2)}

                                </td>

                                <td>{item.reason}</td>

                              </tr>

                            )

                          )}

                        </tbody>

                      </table>

                    </div>

                    <div className="budget-summary">

                      <div>

                        <span>Allocated</span>

                        <strong>

                          ${allocatedBudget.toFixed(2)}

                        </strong>

                      </div>

                      <div>

                        <span>Remaining</span>

                        <strong>

                          ${remainingBudget.toFixed(2)}

                        </strong>

                      </div>

                    </div>

                    {remainingBudget < 0 && (

                      <div className="error-box">

                        The AI exceeded your budget.

                        Please revise the allocations.

                      </div>

                    )}

                  </div>

                  {/* =========================================

                      EDITABLE EMAIL PREVIEW

                      ========================================= */}

                  <div className="result-section">

                    <h3>

                      <Mail size={18} />

                      Email Campaign

                    </h3>

                    <div className="email-editor">

                      <div className="email-editor-heading">

                        <Pencil size={16} />

                        Edit your email draft

                      </div>

                      <label htmlFor="emailSubject">

                        Subject line

                      </label>

                      <input

                        id="emailSubject"

                        value={emailDraft.subject}

                        onChange={(e) => updateEmailDraft("subject", e.target.value)}

                      />

                      <label htmlFor="emailBody">

                        Email body

                      </label>

                      <textarea

                        id="emailBody"

                        rows={12}

                        value={emailDraft.body}

                        onChange={(e) => updateEmailDraft("body", e.target.value)}

                      />

                    </div>

                  </div>

                  {/* WARNINGS */}

                  <div className="result-section">

                    <h3>

                      <AlertTriangle size={18} />

                      Things to Verify

                    </h3>

                    <ul className="warning-list">

                      {(strategy.warnings || []).map(

                        (warning, index) => (

                          <li key={index}>{warning}</li>

                        )

                      )}

                    </ul>

                  </div>

                  {/* TAVILY RESEARCH SOURCES */}

                  <div className="result-section">

                    <h3>

                      <ExternalLink size={18} />

                      Research Sources

                    </h3>

                    <div className="research-list">

                      {(campaign.research || []).map(

                        (source, index) => (

                          <a

                            key={`${source.url}-${index}`}

                            href={source.url}

                            target="_blank"

                            rel="noopener noreferrer"

                            className="research-source"

                          >

                            <Search size={15} />

                            <span>{source.title}</span>

                            <ExternalLink size={15} />

                          </a>

                        )

                      )}

                    </div>

                  </div>

                  {/* =========================================

                      OWNER REVIEW

                      ========================================= */}

                  <div className="approval-section">

                    <label className="confirmation-row">

                      <input

                        type="checkbox"

                        checked={detailsConfirmed}

                        onChange={(e) =>

                          setDetailsConfirmed(e.target.checked)

                        }

                      />

                      <span>

                        I have reviewed the suggested

                        promotion, email, and business

                        details.

                      </span>

                    </label>

                    <button

                      type="button"

                      className="review-button"

                      disabled={

                        !detailsConfirmed ||

                        remainingBudget < 0 ||

                        !emailDraft.subject.trim() ||

                        !emailDraft.body.trim()

                      }

                      onClick={reviewDraft}

                    >

                      <CheckCircle2 size={18} />

                      Mark Draft as Reviewed

                    </button>

                    <p className="approval-note">

                      Review is local to this page.

                      No emails will be sent.

                    </p>

                  </div>

                </div>

              )}

            </section>

          </div>

        </>

      )}

        </div>

      </main>

    </div>

  );

}

export default App;
