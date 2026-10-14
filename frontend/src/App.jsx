
/**
 * LaunchLoop AI - Main Application
 *
 * Coordinates the restaurant campaign workflow:
 * 1. Request three AI-generated strategies informed by Tavily research.
 * 2. Finalize the owner's selected strategy using NVIDIA Nemotron.
 * 3. Save finished campaigns, task checklists, and editable email drafts.
 * 4. Reopen campaigns and review manual progress and performance metrics.
 *
 * Nemotron is accessed through the Express backend and Nebius Token Factory.
 * Saved campaigns and performance results are stored in browser localStorage.
 * This MVP does not send emails or launch advertisements automatically.
 */
import { useEffect, useState } from "react";
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
  CalendarDays,
  BarChart3,
  ClipboardList,
  History,
} from "lucide-react";
import "./App.css";
import CompetitorResearch from "./components/CompetitorResearch";
import EmailCampaigns from "./components/EmailCampaigns";
import CampaignTracker from "./components/CampaignTracker";
import CampaignHistory from "./components/CampaignHistory";
// Use the configured Express API URL; API keys remain on the backend.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
/** Root component for dashboard navigation and campaign state. */
function App() {
  // ----------------------------------------
  // Restaurant form
  // ----------------------------------------
  const [form, setForm] = useState({
    restaurantName: "",
    location: "",
    goal: "",
    budget: 200,
  });
  // ----------------------------------------
  // Campaign workflow state
  // ----------------------------------------
  // Keep campaign generation in two steps: strategy choices, then final draft.
  const [campaignChoices, setCampaignChoices] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [campaignInput, setCampaignInput] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [error, setError] = useState("");
  // ----------------------------------------
  // Email state
  // ----------------------------------------
  const [emailDraft, setEmailDraft] = useState({
    subject: "",
    body: "",
  });
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);
  const [draftReviewed, setDraftReviewed] = useState(false);
  // ----------------------------------------
  // Navigation
  // ----------------------------------------
  const [activePage, setActivePage] = useState("studio");
  // Saved campaigns and their checklists are stored locally per browser.
  // Read previously saved campaigns once when the application starts.
  const [trackedCampaigns, setTrackedCampaigns] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("launchloop-tracked-campaigns-v1") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [activeCampaignId, setActiveCampaignId] = useState(null);
  // Read the same per-campaign results used by CampaignTracker.jsx.
  const [performanceByCampaign, setPerformanceByCampaign] = useState({});
  // Synchronize manually recorded KPIs when navigating, focusing the tab,
  // or receiving a storage event from another browser tab.
  useEffect(() => {
    function refreshPerformance() {
      try {
        const saved = JSON.parse(localStorage.getItem("launchloop-performance-v1") || "{}");
        setPerformanceByCampaign(saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {});
      } catch {
        setPerformanceByCampaign({});
      }
    }
    refreshPerformance();
    window.addEventListener("focus", refreshPerformance);
    window.addEventListener("storage", refreshPerformance);
    return () => {
      window.removeEventListener("focus", refreshPerformance);
      window.removeEventListener("storage", refreshPerformance);
    };
  }, [activePage, activeCampaignId]);
  // Only show values belonging to the currently opened saved campaign.
  const activePerformance = activeCampaignId
    ? performanceByCampaign[activeCampaignId] || {}
    : {};
  /** Update the saved campaign list and persist it in this browser. */
  function saveTrackedCampaigns(next) {
    setTrackedCampaigns(next);
    try {
      localStorage.setItem("launchloop-tracked-campaigns-v1", JSON.stringify(next));
    } catch (storageError) {
      console.warn("Campaign progress could not be saved locally", storageError);
    }
  }
  // Keep edits to the active email draft with its saved campaign.
  // This never calls the backend or the AI model.
  useEffect(() => {
    if (!activeCampaignId) return;
    setTrackedCampaigns((previous) => previous.map((item) =>
      item.id === activeCampaignId ? { ...item, emailDraft } : item
    ));
  }, [activeCampaignId, emailDraft]);
  useEffect(() => {
    try {
      localStorage.setItem("launchloop-tracked-campaigns-v1", JSON.stringify(trackedCampaigns));
    } catch (error) {
      console.warn("Could not save campaign history", error);
    }
  }, [trackedCampaigns]);
  /** Save updated checklist completion states for one campaign. */
  function updateCampaignTasks(id, tasks) {
    saveTrackedCampaigns(trackedCampaigns.map((item) =>
      item.id === id ? { ...item, tasks } : item
    ));
  }
  /** Remove one saved campaign and its separately stored performance metrics. */
  function deleteSavedCampaign(id) {
    if (!trackedCampaigns.some((item) => item.id === id)) return;

    // Keep all other campaigns and checklists intact.
    saveTrackedCampaigns(trackedCampaigns.filter((item) => item.id !== id));

    // Remove only this campaign's manually entered performance data.
    try {
      const raw = JSON.parse(localStorage.getItem("launchloop-performance-v1") || "{}");
      const savedPerformance = raw && typeof raw === "object" && !Array.isArray(raw)
        ? raw
        : {};
      const nextPerformance = { ...savedPerformance };
      delete nextPerformance[id];
      localStorage.setItem("launchloop-performance-v1", JSON.stringify(nextPerformance));
      setPerformanceByCampaign(nextPerformance);
    } catch (storageError) {
      console.warn("Could not remove campaign performance locally", storageError);
    }

    // Prevent deleted content from remaining open in Studio or Email Campaigns.
    if (activeCampaignId === id) {
      setActiveCampaignId(null);
      setCampaign(null);
      setCampaignInput(null);
      setCampaignChoices(null);
      setSelectedOptionId("");
      setEmailDraft({ subject: "", body: "" });
      setDetailsConfirmed(false);
      setDraftReviewed(false);
      setError("");
    }
  }
  /** Restore a finalized campaign without making new Tavily or AI calls. */
  function openSavedCampaign(id) {
    const saved = trackedCampaigns.find((item) => item.id === id);
    if (!saved) return;
    setActiveCampaignId(id);
    setCampaign(saved.campaign);
    setCampaignInput(saved.input);
    setEmailDraft(saved.emailDraft || { subject: "", body: "" });
    setCampaignChoices(null);
    setSelectedOptionId("");
    setDetailsConfirmed(false);
    setDraftReviewed(false);
    setError("");
    setActivePage("studio");
  }
  /** Update one restaurant form field while keeping the others unchanged. */
  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }
  /** Update the email and invalidate any earlier owner review. */
  function updateEmailDraft(field, value) {
    setEmailDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
    // Any edit invalidates the previous review.
    setDetailsConfirmed(false);
    setDraftReviewed(false);
  }
  // ----------------------------------------
  // STEP 1: Generate three campaign options
  // ----------------------------------------
  /** Step 1: Request three strategies using competitor research and Nemotron. */
  async function generateCampaign(event) {
    event.preventDefault();
    if (loading || finalizing) return;
    setLoading(true);
    setError("");
    setCampaignChoices(null);
    setSelectedOptionId("");
    setCampaignInput(null);
    setCampaign(null);
    setActiveCampaignId(null);
    setEmailDraft({ subject: "", body: "" });
    setDetailsConfirmed(false);
    setDraftReviewed(false);
    try {
      const input = { ...form };
      const response = await fetch(
        `${API_URL}/api/campaigns/options`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to generate campaign options."
        );
      }
      if (
        !Array.isArray(data.campaignOptions) ||
        data.campaignOptions.length !== 3
      ) {
        throw new Error(
          "The backend did not return three campaign options."
        );
      }
      setCampaignChoices(data);
      setCampaignInput(input);
      const recommendedExists = data.campaignOptions.some(
        (option) => option.id === data.recommendedOptionId
      );
      setSelectedOptionId(
        recommendedExists
          ? data.recommendedOptionId
          : data.campaignOptions[0].id
      );
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  // ----------------------------------------
  // STEP 2: Finalize the owner's choice
  // ----------------------------------------
  /** Step 2: Develop the selected strategy and create its saved checklist. */
  async function finalizeCampaign() {
    if (!campaignChoices || !campaignInput || finalizing) {
      return;
    }
    const selectedOption = campaignChoices.campaignOptions.find(
      (option) => option.id === selectedOptionId
    );
    if (!selectedOption) {
      setError("Please select a campaign strategy.");
      return;
    }
    setFinalizing(true);
    setError("");
    setCampaign(null);
    setActiveCampaignId(null);
    setEmailDraft({ subject: "", body: "" });
    setDetailsConfirmed(false);
    setDraftReviewed(false);
    try {
      const response = await fetch(
        `${API_URL}/api/campaigns/finalize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...campaignInput,
            selectedOption,
            research: campaignChoices.research,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to finalize the campaign."
        );
      }
      if (!data.strategy || !data.strategy.email) {
        throw new Error("The campaign response is incomplete.");
      }
      setCampaign(data);
      // Create a new independently tracked campaign after successful finalization.
      const newId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const newEntry = {
        id: newId,
        createdAt: new Date().toISOString(),
        input: campaignInput,
        campaign: data,
        emailDraft: {
          subject: data.strategy.email.subject || "",
          body: data.strategy.email.body || "",
        },
        tasks: (Array.isArray(data.strategy.timeline) ? data.strategy.timeline : []).map(
          (step, index) => ({
            id: `step-${index}`,
            phase: String(step.phase || `Step ${index + 1}`),
            action: String(step.action || "Review this campaign step"),
            completed: false,
          })
        ),
      };
      saveTrackedCampaigns([newEntry, ...trackedCampaigns]);
      setActiveCampaignId(newId);
      setEmailDraft({
        subject: data.strategy.email.subject || "",
        body: data.strategy.email.body || "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setFinalizing(false);
    }
  }
  // ----------------------------------------
  // Local draft review — no email sending
  // ----------------------------------------
  /** Record a local review confirmation; this never sends an email. */
  function reviewDraft() {
    if (!detailsConfirmed || !campaign) return;
    if (
      !emailDraft.subject.trim() ||
      !emailDraft.body.trim()
    ) {
      setError("Please complete the email draft.");
      return;
    }
    setDraftReviewed(true);
    window.alert(
      "Draft reviewed locally. No emails have been sent."
    );
  }
  /** Return to the three options without making another AI request. */
  function changeStrategy() {
    setActiveCampaignId(null);
    setCampaign(null);
    setEmailDraft({ subject: "", body: "" });
    setDetailsConfirmed(false);
    setDraftReviewed(false);
    setError("");
  }
  // ----------------------------------------
  // Derived campaign data
  // ----------------------------------------
  const strategy = campaign?.strategy;
  // Use the budget submitted for this campaign, even if the form changes.
  const activeBudget =
    Number(campaignInput?.budget ?? form.budget);
  const budgetItems = strategy?.budgetBreakdown || [];
  // Calculate remaining budget from the AI-generated allocation breakdown.
  const allocatedBudget = budgetItems.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );
  const remainingBudget = activeBudget - allocatedBudget;
  const money = (amount) =>
    Number(amount || 0).toLocaleString("en-CA", {
      style: "currency",
      currency: "CAD",
    });
  return (
    <div className="app-shell">
      {/* ====================================
          SIDEBAR
          ==================================== */}
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
          <button type="button" className={`nav-item ${activePage === "history" ? "active" : ""}`} onClick={() => setActivePage("history")}>
            <History size={18} />
            Campaign History
            <span className="history-nav-count">{trackedCampaigns.length}</span>
          </button>
          <button
            type="button"
            className={`nav-item ${activePage === "tracker" ? "active" : ""}`}
            onClick={() => setActivePage("tracker")}
          >
            <ClipboardList size={18} />
            Campaign Tracker
          </button>
          <button
            type="button"
            className={`nav-item ${
              activePage === "studio" ? "active" : ""
            }`}
            onClick={() => setActivePage("studio")}
          >
            <LayoutDashboard size={18} />
            Campaign Studio
          </button>
          <button
            type="button"
            className={`nav-item ${
              activePage === "research" ? "active" : ""
            }`}
            onClick={() => setActivePage("research")}
          >
            <Search size={18} />
            Competitor Research
          </button>
          <button
            type="button"
            className={`nav-item ${
              activePage === "email" ? "active" : ""
            }`}
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
      {/* ====================================
          MAIN CONTENT
          ==================================== */}
      <main className="main-content">
        <header className="topbar">
          <span>
            Workspace /{" "}
            {activePage === "research"
              ? "Competitor Research"
              : activePage === "history"
              ? "Campaign History"
              : activePage === "tracker"
              ? "Campaign Tracker"
              : activePage === "email"
              ? "Email Campaigns"
              : "Campaign Studio"}
          </span>
          <span className="topbar-badge">
            Hackathon MVP
          </span>
        </header>
        <div className="page-content">
          {/* EXISTING COMPETITOR RESEARCH PAGE */}
          {/* Render the active workspace page without a routing library. */}
          {activePage === "research" ? (
            <CompetitorResearch />
          ) : activePage === "history" ? (
            <CampaignHistory
              campaigns={trackedCampaigns}
              onOpenCampaign={openSavedCampaign}
              onDeleteCampaign={deleteSavedCampaign}
              onTrackCampaign={() => setActivePage("tracker")}
              onNewCampaign={() => {
                setActiveCampaignId(null);
                setCampaign(null);
                setCampaignChoices(null);
                setCampaignInput(null);
                setEmailDraft({ subject: "", body: "" });
                setActivePage("studio");
              }}
            />
          ) : activePage === "tracker" ? (
            <CampaignTracker
              campaigns={trackedCampaigns}
              onTasksChange={updateCampaignTasks}
              onOpenCampaign={openSavedCampaign}
            />
          ) : activePage === "email" ? (
            /* EXISTING EMAIL CAMPAIGNS PAGE */
            <EmailCampaigns
              emailDraft={emailDraft}
              setEmailDraft={(next) => {
                setEmailDraft(next);
                setDetailsConfirmed(false);
                setDraftReviewed(false);
              }}
              updateEmailDraft={updateEmailDraft}
              campaign={campaign}
              detailsConfirmed={detailsConfirmed}
              setDetailsConfirmed={(value) => {
                setDetailsConfirmed(value);
                if (!value) setDraftReviewed(false);
              }}
              draftReviewed={draftReviewed}
              reviewDraft={reviewDraft}
              remainingBudget={remainingBudget}
              onBack={() => setActivePage("studio")}
            />
          ) : (
            <>
              {/* CAMPAIGN STUDIO HEADER */}
              <div className="page-heading">
                <div className="eyebrow">
                  <Sparkles size={15} />
                  AI-POWERED MARKETING
                </div>
                <h1>Campaign Studio</h1>
                <p>
                  Explore three marketing strategies,
                  select your favorite, and build an
                  actionable campaign.
                </p>
              </div>
              <div className="workspace-grid">
                {/* ================================
                    RESTAURANT FORM
                    ================================ */}
                <section className="panel">
                  <div className="panel-heading">
                    <h2>Create a campaign</h2>
                    <p>
                      Tell our AI what you want to achieve.
                    </p>
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
                      onChange={(event) =>
                        updateForm(
                          "restaurantName",
                          event.target.value
                        )
                      }
                    />
                    <label htmlFor="location">
                      Location
                    </label>
                    <input
                      id="location"
                      required
                      placeholder="e.g. Toronto, Ontario"
                      value={form.location}
                      onChange={(event) =>
                        updateForm(
                          "location",
                          event.target.value
                        )
                      }
                    />
                    <label htmlFor="goal">
                      Marketing goal
                    </label>
                    <textarea
                      id="goal"
                      rows={4}
                      required
                      placeholder="e.g. Attract more weekend customers"
                      value={form.goal}
                      onChange={(event) =>
                        updateForm(
                          "goal",
                          event.target.value
                        )
                      }
                    />
                    <label htmlFor="budget">
                      Marketing budget (CAD)
                    </label>
                    <input
                      id="budget"
                      type="number"
                      min="1"
                      step="0.01"
                      required
                      value={form.budget}
                      onChange={(event) =>
                        updateForm(
                          "budget",
                          Number(event.target.value)
                        )
                      }
                    />
                    <button
                      type="submit"
                      className="generate-button"
                      disabled={loading || finalizing}
                    >
                      {loading ? (
                        <>
                          <LoaderCircle
                            size={18}
                            className="spinner"
                          />
                          Generating 3 strategies...
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} />
                          Explore 3 Strategies
                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>
                  </form>
                </section>
                {/* ================================
                    RESULTS PANEL
                    ================================ */}
                <section className="panel results-panel">
                  <div className="panel-heading">
                    <div className="result-title-row">
                      <h2>Campaign preview</h2>
                      {campaign && (
                        <span className="draft-badge">
                          Draft
                        </span>
                      )}
                    </div>
                    <p>
                      AI-generated strategies and campaign
                      recommendations.
                    </p>
                  </div>
                  {error && (
                    <div className="error-box" role="alert">
                      {error}
                    </div>
                  )}
                  {/* EMPTY STATE */}
                  {!campaignChoices &&
                    !campaign &&
                    !loading && (
                      <div className="empty-state">
                        <div className="empty-icon">
                          <Sparkles size={30} />
                        </div>
                        <h3>
                          Your next campaign starts here
                        </h3>
                        <p>
                          Enter your restaurant details to
                          explore three marketing strategies.
                        </p>
                      </div>
                    )}
                  {/* GENERATION LOADING */}
                  {loading && (
                    <div className="empty-state">
                      <LoaderCircle
                        size={32}
                        className="spinner"
                      />
                      <h3>
                        Finding marketing opportunities...
                      </h3>
                      <p>
                        Tavily is researching competitors,
                        and Nemotron is preparing your
                        campaign options.
                      </p>
                    </div>
                  )}
                  {/* ================================
                      THREE CAMPAIGN OPTIONS
                      ================================ */}
                  {/* Display the three options before the owner finalizes one. */}
                  {campaignChoices && !campaign && (
                    <div className="campaign-options-section">
                      <div className="campaign-options-heading">
                        <div>
                          <h3>
                            Choose Your Marketing Strategy
                          </h3>
                          <p>
                            Compare three approaches before
                            creating the full campaign.
                          </p>
                        </div>
                        <span className="draft-badge">
                          3 AI Options
                        </span>
                      </div>
                      <div className="ai-recommendation-box">
                        <div className="ai-recommendation-title">
                          <Sparkles size={18} />
                          Nemotron's Recommendation
                        </div>
                        <p>
                          {
                            campaignChoices.recommendationReason
                          }
                        </p>
                        <small>
                          Verify competitor claims and
                          business assumptions before acting.
                        </small>
                      </div>
                      <div className="campaign-option-list">
                        {campaignChoices.campaignOptions.map(
                          (option) => {
                            const isSelected =
                              selectedOptionId === option.id;
                            const isRecommended =
                              campaignChoices.recommendedOptionId ===
                              option.id;
                            return (
                              <button
                                key={option.id}
                                type="button"
                                className={`campaign-option-card ${
                                  isSelected ? "selected" : ""
                                }`}
                                aria-pressed={isSelected}
                                disabled={finalizing}
                                onClick={() => {
                                  setSelectedOptionId(option.id);
                                  setError("");
                                }}
                              >
                                <div className="campaign-option-top">
                                  <div className="campaign-option-title">
                                    <span className="campaign-option-radio">
                                      {isSelected ? "●" : "○"}
                                    </span>
                                    <strong>
                                      {option.name}
                                    </strong>
                                  </div>
                                  {isRecommended && (
                                    <span className="ai-pick-badge">
                                      <Sparkles size={13} />
                                      AI Pick
                                    </span>
                                  )}
                                </div>
                                <p className="campaign-option-summary">
                                  {option.summary}
                                </p>
                                <div className="campaign-option-details">
                                  <div>
                                    <span>Goal</span>
                                    <p>{option.goal}</p>
                                  </div>
                                  <div>
                                    <span>Target Audience</span>
                                    <p>
                                      {option.targetAudience}
                                    </p>
                                  </div>
                                  <div>
                                    <span>Approach</span>
                                    <p>{option.approach}</p>
                                  </div>
                                </div>
                                <p className="campaign-option-reason">
                                  <strong>
                                    Why this could work:
                                  </strong>{" "}
                                  {option.reasoning}
                                </p>
                                <div className="campaign-option-footer">
                                  <span>
                                    Available campaign budget
                                  </span>
                                  <strong>
                                    {money(option.budget)}
                                  </strong>
                                </div>
                              </button>
                            );
                          }
                        )}
                      </div>
                      <button
                        type="button"
                        className="generate-button"
                        disabled={
                          !selectedOptionId || finalizing
                        }
                        onClick={finalizeCampaign}
                      >
                        {finalizing ? (
                          <>
                            <LoaderCircle
                              size={18}
                              className="spinner"
                            />
                            Creating your campaign...
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            Generate Selected Campaign
                            <ArrowRight size={17} />
                          </>
                        )}
                      </button>
                      <p className="campaign-options-note">
                        No advertising budget is spent,
                        and no emails are sent.
                      </p>
                    </div>
                  )}
                  {/* ================================
                      FINAL DETAILED CAMPAIGN
                      ================================ */}
                  {/* Display the finalized campaign and owner review controls. */}
                  {strategy && (
                    <div className="structured-results">
                      <div className="notice">
                        <AlertTriangle size={18} />
                        <span>
                          AI-generated recommendations.
                          Verify prices, offers, dates, and
                          competitor information before use.
                        </span>
                      </div>
                      {/* SELECTED OPTION */}
                      {campaign.selectedOption && (
                        <div className="result-section">
                          <h3>
                            <Sparkles size={18} />
                            Selected Strategy
                          </h3>
                          <div className="offer-box">
                            <strong>
                              {campaign.selectedOption.name}
                            </strong>
                            <p>
                              {
                                campaign.selectedOption.summary
                              }
                            </p>
                          </div>
                          <button
                            type="button"
                            className="change-strategy-button"
                            onClick={changeStrategy}
                          >
                            Choose a Different Strategy
                          </button>
                        </div>
                      )}
                      {activeCampaignId && (
                        <button
                          type="button"
                          className="tracker-open-button"
                          onClick={() => setActivePage("tracker")}
                        >
                          <ClipboardList size={18} />
                          Track Campaign Progress
                          <ArrowRight size={16} />
                        </button>
                      )}
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
                      {/* SUGGESTED PROMOTION */}
                      <div className="result-section">
                        <h3>
                          <Target size={18} />
                          Suggested Promotion
                        </h3>
                        <div className="offer-box">
                          {strategy.promotionalOffer}
                        </div>
                      </div>
                      {/* ==========================
                          NEW: CAMPAIGN TIMELINE
                          ========================== */}
                      {Array.isArray(strategy.timeline) &&
                        strategy.timeline.length > 0 && (
                          <div className="result-section">
                            <h3>
                              <CalendarDays size={18} />
                              Campaign Execution Plan
                            </h3>
                            <p className="campaign-duration">
                              Suggested duration:{" "}
                              <strong>
                                {strategy.durationDays} days
                              </strong>
                            </p>
                            <div className="campaign-timeline">
                              {strategy.timeline.map(
                                (step, index) => (
                                  <div
                                    className="timeline-step"
                                    key={index}
                                  >
                                    <div className="timeline-number">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <strong>
                                        {step.phase}
                                      </strong>
                                      <p>{step.action}</p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {/* ==========================
                          NEW: SUCCESS METRICS
                          ========================== */}
                      {Array.isArray(strategy.successMetrics) &&
                        strategy.successMetrics.length > 0 && (
                          <div className="result-section">
                            <h3>
                              <BarChart3 size={18} />
                              Success Metrics to Track
                            </h3>
                            <div className="success-metrics-grid">
                              {strategy.successMetrics.map(
                                (metric, index) => (
                                  <div
                                    className="success-metric-card"
                                    key={index}
                                  >
                                    <span>
                                      METRIC {index + 1}
                                    </span>
                                    <strong>{metric}</strong>
                                    <small>
                                      {String(activePerformance[index] ?? "").trim() || "Not tracked yet"}
                                    </small>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {/* ==========================
                          BUDGET BREAKDOWN
                          ========================== */}
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
                              {budgetItems.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <td>{item.item}</td>
                                    <td>
                                      {money(item.amount)}
                                    </td>
                                    <td>{item.reason}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* NEW: BUDGET BARS */}
                        <div className="budget-visualization">
                          {budgetItems.map((item, index) => {
                            const percentage =
                              activeBudget > 0
                                ? (Number(item.amount) /
                                    activeBudget) *
                                  100
                                : 0;
                            const width = Math.min(
                              100,
                              Math.max(0, percentage)
                            );
                            return (
                              <div
                                className="budget-bar-item"
                                key={index}
                              >
                                <div className="budget-bar-label">
                                  <span>{item.item}</span>
                                  <strong>
                                    {money(item.amount)}
                                  </strong>
                                </div>
                                <div
                                  className="budget-bar-track"
                                  role="progressbar"
                                  aria-label={`${item.item} allocation`}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-valuenow={width}
                                >
                                  <div
                                    className="budget-bar-fill"
                                    style={{
                                      width: `${width}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="budget-summary">
                          <div>
                            <span>Allocated</span>
                            <strong>
                              {money(allocatedBudget)}
                            </strong>
                          </div>
                          <div>
                            <span>Remaining</span>
                            <strong>
                              {money(remainingBudget)}
                            </strong>
                          </div>
                        </div>
                        {remainingBudget < -0.01 && (
                          <div className="error-box">
                            The campaign exceeds the budget.
                          </div>
                        )}
                      </div>
                      {/* EMAIL EDITOR */}
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
                            onChange={(event) =>
                              updateEmailDraft(
                                "subject",
                                event.target.value
                              )
                            }
                          />
                          <label htmlFor="emailBody">
                            Email body
                          </label>
                          <textarea
                            id="emailBody"
                            rows={12}
                            value={emailDraft.body}
                            onChange={(event) =>
                              updateEmailDraft(
                                "body",
                                event.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      {/* WARNINGS */}
                      {strategy.warnings?.length > 0 && (
                        <div className="result-section">
                          <h3>
                            <AlertTriangle size={18} />
                            Things to Verify
                          </h3>
                          <ul className="warning-list">
                            {strategy.warnings.map(
                              (warning, index) => (
                                <li key={index}>
                                  {warning}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {/* RESEARCH SOURCES */}
                      {Array.isArray(campaign.research) &&
                        campaign.research.length > 0 && (
                          <div className="result-section">
                            <h3>
                              <ExternalLink size={18} />
                              Research Sources
                            </h3>
                            <div className="research-list">
                              {campaign.research.map(
                                (source, index) =>
                                  typeof source.url ===
                                    "string" &&
                                  /^https?:\/\//i.test(
                                    source.url
                                  ) ? (
                                    <a
                                      key={index}
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="research-source"
                                    >
                                      <Search size={15} />
                                      <span>
                                        {source.title ||
                                          source.url}
                                      </span>
                                      <ExternalLink
                                        size={15}
                                      />
                                    </a>
                                  ) : null
                              )}
                            </div>
                          </div>
                        )}
                      {/* LOCAL EMAIL REVIEW */}
                      <div className="approval-section">
                        <label className="confirmation-row">
                          <input
                            type="checkbox"
                            checked={detailsConfirmed}
                            onChange={(event) => {
                              setDetailsConfirmed(
                                event.target.checked
                              );
                              setDraftReviewed(false);
                            }}
                          />
                          <span>
                            I have checked the promotion,
                            email, and business details.
                          </span>
                        </label>
                        <button
                          type="button"
                          className="review-button"
                          disabled={
                            !detailsConfirmed ||
                            draftReviewed ||
                            remainingBudget < -0.01 ||
                            !emailDraft.subject.trim() ||
                            !emailDraft.body.trim()
                          }
                          onClick={reviewDraft}
                        >
                          <CheckCircle2 size={18} />
                          {draftReviewed
                            ? "Draft Reviewed"
                            : "Mark Draft as Reviewed"}
                        </button>
                        {draftReviewed && (
                          <p className="review-success">
                            Draft reviewed locally.
                            No emails have been sent.
                          </p>
                        )}
                        <p className="approval-note">
                          Reviewing a draft does not send
                          an email or launch the campaign.
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
