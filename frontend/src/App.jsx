// // // // import { useState } from "react";

// // // // import {

// // // //   LayoutDashboard,

// // // //   Sparkles,

// // // //   Search,

// // // //   Mail,

// // // //   LoaderCircle,

// // // //   ArrowRight,

// // // //   Users,

// // // //   Target,

// // // //   Wallet,

// // // //   AlertTriangle,

// // // //   ExternalLink,

// // // //   Pencil,

// // // //   CheckCircle2,

// // // // } from "lucide-react";

// // // // import "./App.css";

// // // // import CompetitorResearch from "./components/CompetitorResearch";
// // // // import EmailCampaigns from "./components/EmailCampaigns";

// // // // // Read the backend URL from frontend/.env.

// // // // // API keys are never stored in the frontend.

// // // // const API_URL =

// // // //   import.meta.env.VITE_API_URL || "http\://localhost:5000";

// // // // function App() {

// // // //   // Stores the information entered by the restaurant owner.

// // // //   const [form, setForm] = useState({

// // // //     restaurantName: "",

// // // //     location: "",

// // // //     goal: "",

// // // //     budget: 200,

// // // //   });

// // // //   // Stores the complete response from our backend.

// // // //   const [campaign, setCampaign] = useState(null);

// // // //   // Tracks whether campaign generation is in progress.

// // // //   const [loading, setLoading] = useState(false);

// // // //   // Stores errors so we can show them in the dashboard.

// // // //   const [error, setError] = useState("");

// // // //   // Stores editable email fields separately from the AI response.

// // // //   const [emailDraft, setEmailDraft] = useState({

// // // //     subject: "",

// // // //     body: "",

// // // //   });

// // // //   // Tracks which page is currently visible in our dashboard.

// // // //   const [activePage, setActivePage] = useState("studio");

// // // //   // Tracks whether the owner has confirmed the campaign details.

// // // //   const [detailsConfirmed, setDetailsConfirmed] = useState(false);

// // // //   // Update an email field and invalidate any prior review confirmation.
// // // //   function updateEmailDraft(field, value) {
// // // //     setEmailDraft((previous) => ({ ...previous, [field]: value }));
// // // //     setDetailsConfirmed(false);
// // // //   }

// // // //   // Update one form field without deleting the others.

// // // //   function updateForm(field, value) {

// // // //     setForm((previous) => ({

// // // //       ...previous,

// // // //       [field]: value,

// // // //     }));

// // // //   }

// // // //   // Send restaurant details to our backend for AI generation.

// // // //   async function generateCampaign(event) {

// // // //     event.preventDefault();

// // // //     setLoading(true);

// // // //     setError("");

// // // //     setCampaign(null);

// // // //     setDetailsConfirmed(false);

// // // //     try {

// // // //       const response = await fetch(

// // // //         `${API_URL}/api/campaigns/generate`,

// // // //         {

// // // //           method: "POST",

// // // //           headers: {

// // // //             "Content-Type": "application/json",

// // // //           },

// // // //           body: JSON.stringify(form),

// // // //         }

// // // //       );

// // // //       // Parse the response whether the request succeeds or fails.

// // // //       const data = await response.json();

// // // //       if (!response.ok || !data.success) {

// // // //         throw new Error(

// // // //           data.error || "Campaign generation failed."

// // // //         );

// // // //       }

// // // //       // Save the structured strategy returned by Nemotron.

// // // //       setCampaign(data);

// // // //       // Copy the generated email into editable React state.

// // // //       setEmailDraft({

// // // //         subject: data.strategy?.email?.subject || "",

// // // //         body: data.strategy?.email?.body || "",

// // // //       });

// // // //     } catch (err) {

// // // //       setError(err.message || "Something went wrong.");

// // // //     } finally {

// // // //       setLoading(false);

// // // //     }

// // // //   }

// // // //   // Marks the current draft as reviewed in the frontend only.

// // // //   // This does NOT send emails or save approval to the backend.

// // // //   function reviewDraft() {

// // // //     if (!detailsConfirmed) return;

// // // //     window.alert(

// // // //       "Draft reviewed locally. No emails have been sent."

// // // //     );

// // // //   }

// // // //   // Short names make the JSX easier to read.

// // // //   const strategy = campaign?.strategy;

// // // //   // Calculate the budget total from the AI's returned allocations.

// // // //   const allocatedBudget = (

// // // //     strategy?.budgetBreakdown || []

// // // //   ).reduce((total, item) => total + Number(item.amount || 0), 0);

// // // //   const remainingBudget = Number(form.budget) - allocatedBudget;

// // // //   return (

// // // //     <div className="app-shell">

// // // //       {/* =========================================

// // // //           SIDEBAR

// // // //           ========================================= */}

// // // //       <aside className="sidebar">

// // // //         <div className="brand">

// // // //           <div className="brand-icon">

// // // //             <Sparkles size={22} />

// // // //           </div>

// // // //           <span>

// // // //             LaunchLoop <span className="brand-ai">AI</span>

// // // //           </span>

// // // //         </div>

// // // //         <div className="sidebar-label">WORKSPACE</div>

// // // //         <nav className="navigation">

// // // //           {/* Campaign Studio navigation */}

// // // //           <button

// // // //             type="button"

// // // //             className={`nav-item ${activePage === "studio" ? "active" : ""}`}

// // // //             onClick={() => setActivePage("studio")}

// // // //           >

// // // //             <LayoutDashboard size={18} />

// // // //             Campaign Studio

// // // //           </button>

// // // //           {/* Competitor Research navigation */}

// // // //           <button

// // // //             type="button"

// // // //             className={`nav-item ${activePage === "research" ? "active" : ""}`}

// // // //             onClick={() => setActivePage("research")}

// // // //           >

// // // //             <Search size={18} />

// // // //             Competitor Research

// // // //           </button>

// // // //                       {/* Open the email editor without regenerating the campaign. */}
// // // //             <button
// // // //               type="button"
// // // //               className={`nav-item ${activePage === "email" ? "active" : ""}`}
// // // //               onClick={() => setActivePage("email")}
// // // //             >
// // // //               <Mail size={18} />
// // // //               Email Campaigns
// // // //             </button>
// // // // </nav>

// // // //         <div className="sidebar-footer">

// // // //           <div className="status-dot" />

// // // //           NVIDIA Nemotron + Tavily

// // // //         </div>

// // // //       </aside>

// // // //       {/* =========================================

// // // //           MAIN CONTENT

// // // //           ========================================= */}

// // // //       <main className="main-content">

// // // //         <header className="topbar">

// // // //           <span>Workspace / {activePage === "research" ? "Competitor Research" : activePage === "email" ? "Email Campaigns" : "Campaign Studio"}</span>

// // // //           <span className="topbar-badge">Hackathon MVP</span>

// // // //         </header>

// // // //          <div className="page-content">

// // // //   {/* Display the selected page */}

// // // //   {activePage === "research" ? (

// // // //     <CompetitorResearch />

// // // //   ) : activePage === "email" ? (
// // // //     <EmailCampaigns
// // // //       emailDraft={emailDraft}
// // // //       updateEmailDraft={updateEmailDraft}
// // // //       campaign={campaign}
// // // //       detailsConfirmed={detailsConfirmed}
// // // //       setDetailsConfirmed={setDetailsConfirmed}
// // // //       remainingBudget={remainingBudget}
// // // //       reviewDraft={reviewDraft}
// // // //       onBack={() => setActivePage("studio")}
// // // //     />
// // // //   ) : (
// // // //     <>

// // // //       {/* Existing Campaign Studio content */}

// // // //       <div className="page-heading">

// // // //             <div className="eyebrow">

// // // //               <Sparkles size={15} />

// // // //               AI-POWERED MARKETING

// // // //             </div>

// // // //             <h1>Campaign Studio</h1>

// // // //             <p>

// // // //               Turn restaurant goals into research-backed

// // // //               marketing campaigns.

// // // //             </p>

// // // //           </div>

// // // //           <div className="workspace-grid">

// // // //             {/* =========================================

// // // //                 RESTAURANT FORM

// // // //                 ========================================= */}

// // // //             <section className="panel">

// // // //               <div className="panel-heading">

// // // //                 <h2>Create a campaign</h2>

// // // //                 <p>Tell our AI what you want to achieve.</p>

// // // //               </div>

// // // //               <form onSubmit={generateCampaign}>

// // // //                 <label htmlFor="restaurantName">

// // // //                   Restaurant name

// // // //                 </label>

// // // //                 <input

// // // //                   id="restaurantName"

// // // //                   required

// // // //                   placeholder="e.g. Spice Garden"

// // // //                   value={form.restaurantName}

// // // //                   onChange={(e) =>

// // // //                     updateForm("restaurantName", e.target.value)

// // // //                   }

// // // //                 />

// // // //                 <label htmlFor="location">Location</label>

// // // //                 <input

// // // //                   id="location"

// // // //                   required

// // // //                   placeholder="e.g. Toronto, Ontario"

// // // //                   value={form.location}

// // // //                   onChange={(e) =>

// // // //                     updateForm("location", e.target.value)

// // // //                   }

// // // //                 />

// // // //                 <label htmlFor="goal">Marketing goal</label>

// // // //                 <textarea

// // // //                   id="goal"

// // // //                   required

// // // //                   rows={4}

// // // //                   placeholder="e.g. Attract more weekend buffet customers"

// // // //                   value={form.goal}

// // // //                   onChange={(e) =>

// // // //                     updateForm("goal", e.target.value)

// // // //                   }

// // // //                 />

// // // //                 <label htmlFor="budget">

// // // //                   Marketing budget (CAD)

// // // //                 </label>

// // // //                 <input

// // // //                   id="budget"

// // // //                   type="number"

// // // //                   min="1"

// // // //                   required

// // // //                   value={form.budget}

// // // //                   onChange={(e) =>

// // // //                     updateForm("budget", Number(e.target.value))

// // // //                   }

// // // //                 />

// // // //                 <button

// // // //                   className="generate-button"

// // // //                   type="submit"

// // // //                   disabled={loading}

// // // //                 >

// // // //                   {loading ? (

// // // //                     <>

// // // //                       <LoaderCircle

// // // //                         size={18}

// // // //                         className="spinner"

// // // //                       />

// // // //                       Generating campaign...

// // // //                     </>

// // // //                   ) : (

// // // //                     <>

// // // //                       <Sparkles size={18} />

// // // //                       Generate Campaign

// // // //                       <ArrowRight size={17} />

// // // //                     </>

// // // //                   )}

// // // //                 </button>

// // // //               </form>

// // // //             </section>

// // // //             {/* =========================================

// // // //                 CAMPAIGN PREVIEW

// // // //                 ========================================= */}

// // // //             <section className="panel results-panel">

// // // //               <div className="panel-heading">

// // // //                 <div className="result-title-row">

// // // //                   <h2>Campaign preview</h2>

// // // //                   {campaign && (

// // // //                     <span className="draft-badge">Draft</span>

// // // //                   )}

// // // //                 </div>

// // // //                 <p>Review the AI's recommendations.</p>

// // // //               </div>

// // // //               {error && (

// // // //                 <div className="error-box">{error}</div>

// // // //               )}

// // // //               {/* Empty state */}

// // // //               {!campaign && !loading && (

// // // //                 <div className="empty-state">

// // // //                   <div className="empty-icon">

// // // //                     <Sparkles size={30} />

// // // //                   </div>

// // // //                   <h3>Your next campaign starts here</h3>

// // // //                   <p>

// // // //                     Enter your restaurant details to generate

// // // //                     a marketing strategy.

// // // //                   </p>

// // // //                 </div>

// // // //               )}

// // // //               {/* Loading state */}

// // // //               {loading && (

// // // //                 <div className="empty-state">

// // // //                   <LoaderCircle

// // // //                     size={32}

// // // //                     className="spinner"

// // // //                   />

// // // //                   <h3>Our AI is working...</h3>

// // // //                   <p>

// // // //                     Researching competitors and generating

// // // //                     your marketing strategy.

// // // //                   </p>

// // // //                 </div>

// // // //               )}

// // // //               {/* =========================================

// // // //                   STRUCTURED CAMPAIGN RESULTS

// // // //                   ========================================= */}

// // // //               {strategy && (

// // // //                 <div className="structured-results">

// // // //                   <div className="notice">

// // // //                     <AlertTriangle size={18} />

// // // //                     <span>

// // // //                       AI-generated recommendations. Verify

// // // //                       business details, competitor claims,

// // // //                       and promotional offers before use.

// // // //                     </span>

// // // //                   </div>

// // // //                   {/* TARGET AUDIENCE */}

// // // //                   <div className="result-section">

// // // //                     <h3>

// // // //                       <Users size={18} />

// // // //                       Target Audience

// // // //                     </h3>

// // // //                     <p>{strategy.targetAudience}</p>

// // // //                   </div>

// // // //                   {/* COMPETITOR INSIGHTS */}

// // // //                   <div className="result-section">

// // // //                     <h3>

// // // //                       <Search size={18} />

// // // //                       Competitor Insights

// // // //                     </h3>

// // // //                     <p>{strategy.competitorInsights}</p>

// // // //                   </div>

// // // //                   {/* PROMOTIONAL OFFER */}

// // // //                   <div className="result-section">

// // // //                     <h3>

// // // //                       <Target size={18} />

// // // //                       Suggested Promotion

// // // //                     </h3>

// // // //                     <div className="offer-box">

// // // //                       {strategy.promotionalOffer}

// // // //                     </div>

// // // //                   </div>

// // // //                   {/* BUDGET BREAKDOWN */}

// // // //                   <div className="result-section">

// // // //                     <h3>

// // // //                       <Wallet size={18} />

// // // //                       Budget Breakdown

// // // //                     </h3>

// // // //                     <div className="budget-table-wrapper">

// // // //                       <table className="budget-table">

// // // //                         <thead>

// // // //                           <tr>

// // // //                             <th>Activity</th>

// // // //                             <th>Amount</th>

// // // //                             <th>Reason</th>

// // // //                           </tr>

// // // //                         </thead>

// // // //                         <tbody>

// // // //                           {(strategy.budgetBreakdown || []).map(

// // // //                             (item, index) => (

// // // //                               <tr key={index}>

// // // //                                 <td>{item.item}</td>

// // // //                                 <td>

// // // //                                   ${Number(item.amount).toFixed(2)}

// // // //                                 </td>

// // // //                                 <td>{item.reason}</td>

// // // //                               </tr>

// // // //                             )

// // // //                           )}

// // // //                         </tbody>

// // // //                       </table>

// // // //                     </div>

// // // //                     <div className="budget-summary">

// // // //                       <div>

// // // //                         <span>Allocated</span>

// // // //                         <strong>

// // // //                           ${allocatedBudget.toFixed(2)}

// // // //                         </strong>

// // // //                       </div>

// // // //                       <div>

// // // //                         <span>Remaining</span>

// // // //                         <strong>

// // // //                           ${remainingBudget.toFixed(2)}

// // // //                         </strong>

// // // //                       </div>

// // // //                     </div>

// // // //                     {remainingBudget < 0 && (

// // // //                       <div className="error-box">

// // // //                         The AI exceeded your budget.

// // // //                         Please revise the allocations.

// // // //                       </div>

// // // //                     )}

// // // //                   </div>

// // // //                   {/* =========================================

// // // //                       EDITABLE EMAIL PREVIEW

// // // //                       ========================================= */}

// // // //                   <div className="result-section">

// // // //                     <h3>

// // // //                       <Mail size={18} />

// // // //                       Email Campaign

// // // //                     </h3>

// // // //                     <div className="email-editor">

// // // //                       <div className="email-editor-heading">

// // // //                         <Pencil size={16} />

// // // //                         Edit your email draft

// // // //                       </div>

// // // //                       <label htmlFor="emailSubject">

// // // //                         Subject line

// // // //                       </label>

// // // //                       <input

// // // //                         id="emailSubject"

// // // //                         value={emailDraft.subject}

// // // //                         onChange={(e) => updateEmailDraft("subject", e.target.value)}

// // // //                       />

// // // //                       <label htmlFor="emailBody">

// // // //                         Email body

// // // //                       </label>

// // // //                       <textarea

// // // //                         id="emailBody"

// // // //                         rows={12}

// // // //                         value={emailDraft.body}

// // // //                         onChange={(e) => updateEmailDraft("body", e.target.value)}

// // // //                       />

// // // //                     </div>

// // // //                   </div>

// // // //                   {/* WARNINGS */}

// // // //                   <div className="result-section">

// // // //                     <h3>

// // // //                       <AlertTriangle size={18} />

// // // //                       Things to Verify

// // // //                     </h3>

// // // //                     <ul className="warning-list">

// // // //                       {(strategy.warnings || []).map(

// // // //                         (warning, index) => (

// // // //                           <li key={index}>{warning}</li>

// // // //                         )

// // // //                       )}

// // // //                     </ul>

// // // //                   </div>

// // // //                   {/* TAVILY RESEARCH SOURCES */}

// // // //                   <div className="result-section">

// // // //                     <h3>

// // // //                       <ExternalLink size={18} />

// // // //                       Research Sources

// // // //                     </h3>

// // // //                     <div className="research-list">

// // // //                       {(campaign.research || []).map(

// // // //                         (source, index) => (

// // // //                           <a

// // // //                             key={`${source.url}-${index}`}

// // // //                             href={source.url}

// // // //                             target="_blank"

// // // //                             rel="noopener noreferrer"

// // // //                             className="research-source"

// // // //                           >

// // // //                             <Search size={15} />

// // // //                             <span>{source.title}</span>

// // // //                             <ExternalLink size={15} />

// // // //                           </a>

// // // //                         )

// // // //                       )}

// // // //                     </div>

// // // //                   </div>

// // // //                   {/* =========================================

// // // //                       OWNER REVIEW

// // // //                       ========================================= */}

// // // //                   <div className="approval-section">

// // // //                     <label className="confirmation-row">

// // // //                       <input

// // // //                         type="checkbox"

// // // //                         checked={detailsConfirmed}

// // // //                         onChange={(e) =>

// // // //                           setDetailsConfirmed(e.target.checked)

// // // //                         }

// // // //                       />

// // // //                       <span>

// // // //                         I have reviewed the suggested

// // // //                         promotion, email, and business

// // // //                         details.

// // // //                       </span>

// // // //                     </label>

// // // //                     <button

// // // //                       type="button"

// // // //                       className="review-button"

// // // //                       disabled={

// // // //                         !detailsConfirmed ||

// // // //                         remainingBudget < 0 ||

// // // //                         !emailDraft.subject.trim() ||

// // // //                         !emailDraft.body.trim()

// // // //                       }

// // // //                       onClick={reviewDraft}

// // // //                     >

// // // //                       <CheckCircle2 size={18} />

// // // //                       Mark Draft as Reviewed

// // // //                     </button>

// // // //                     <p className="approval-note">

// // // //                       Review is local to this page.

// // // //                       No emails will be sent.

// // // //                     </p>

// // // //                   </div>

// // // //                 </div>

// // // //               )}

// // // //             </section>

// // // //           </div>

// // // //         </>

// // // //       )}

// // // //         </div>

// // // //       </main>

// // // //     </div>

// // // //   );

// // // // }

// // // // export default App;

// // // import { useState } from "react";

// // // import {
// // //   LayoutDashboard,
// // //   Sparkles,
// // //   Search,
// // //   Mail,
// // //   LoaderCircle,
// // //   ArrowRight,
// // //   Users,
// // //   Target,
// // //   Wallet,
// // //   AlertTriangle,
// // //   ExternalLink,
// // //   Pencil,
// // //   CheckCircle2,
// // // } from "lucide-react";

// // // import "./App.css";
// // // import CompetitorResearch from "./components/CompetitorResearch";
// // // import EmailCampaigns from "./components/EmailCampaigns";

// // // // The frontend only knows the backend URL.
// // // // Nebius and Tavily API keys must remain on the backend.
// // // const API_URL =
// // //   import.meta.env.VITE_API_URL || "http://localhost:5000";

// // // function App() {
// // //   // Restaurant information entered by the owner.
// // //   const [form, setForm] = useState({
// // //     restaurantName: "",
// // //     location: "",
// // //     goal: "",
// // //     budget: 200,
// // //   });

// // //   // Three AI-generated campaign options.
// // //   const [campaignChoices, setCampaignChoices] = useState(null);

// // //   // Which of the three options the owner has selected.
// // //   const [selectedOptionId, setSelectedOptionId] = useState("");

// // //   // Preserve the input used to generate the options.
// // //   const [campaignInput, setCampaignInput] = useState(null);

// // //   // Final detailed campaign, generated after selection.
// // //   const [campaign, setCampaign] = useState(null);

// // //   // Loading and error states.
// // //   const [loading, setLoading] = useState(false);
// // //   const [finalizing, setFinalizing] = useState(false);
// // //   const [error, setError] = useState("");

// // //   // Editable email fields.
// // //   const [emailDraft, setEmailDraft] = useState({
// // //     subject: "",
// // //     body: "",
// // //   });

// // //   // Dashboard navigation.
// // //   const [activePage, setActivePage] = useState("studio");

// // //   // Local owner verification.
// // //   // This does not authorize any backend email sending.
// // //   const [detailsConfirmed, setDetailsConfirmed] = useState(false);

// // //   // Update an email field and reset the verification checkbox.
// // //   function updateEmailDraft(field, value) {
// // //     setEmailDraft((previous) => ({
// // //       ...previous,
// // //       [field]: value,
// // //     }));

// // //     setDetailsConfirmed(false);
// // //   }

// // //   // Update a restaurant form field.
// // //   function updateForm(field, value) {
// // //     setForm((previous) => ({
// // //       ...previous,
// // //       [field]: value,
// // //     }));
// // //   }

// // //   /**
// // //    * STEP 1
// // //    * Generate three different marketing strategies.
// // //    *
// // //    * Backend:
// // //    * POST /api/campaigns/options
// // //    *
// // //    * Tavily researches competitors once.
// // //    * Nemotron generates three concise options.
// // //    */
// // //   async function generateCampaign(event) {
// // //     event.preventDefault();

// // //     if (loading || finalizing) return;

// // //     setLoading(true);
// // //     setError("");

// // //     // Clear results from the previous generation.
// // //     setCampaignChoices(null);
// // //     setSelectedOptionId("");
// // //     setCampaignInput(null);
// // //     setCampaign(null);
// // //     setEmailDraft({ subject: "", body: "" });
// // //     setDetailsConfirmed(false);

// // //     try {
// // //       const input = { ...form };

// // //       const response = await fetch(
// // //         `${API_URL}/api/campaigns/options`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify(input),
// // //         }
// // //       );

// // //       const data = await response.json();

// // //       if (!response.ok || !data.success) {
// // //         throw new Error(
// // //           data.error || "Unable to generate campaign options."
// // //         );
// // //       }

// // //       if (
// // //         !Array.isArray(data.campaignOptions) ||
// // //         data.campaignOptions.length !== 3
// // //       ) {
// // //         throw new Error(
// // //           "The AI did not return three valid campaign options."
// // //         );
// // //       }

// // //       setCampaignChoices(data);
// // //       setCampaignInput(input);

// // //       // Preselect Nemotron's recommended option.
// // //       const recommendedExists = data.campaignOptions.some(
// // //         (option) => option.id === data.recommendedOptionId
// // //       );

// // //       setSelectedOptionId(
// // //         recommendedExists
// // //           ? data.recommendedOptionId
// // //           : data.campaignOptions[0].id
// // //       );
// // //     } catch (err) {
// // //       setError(err.message || "Something went wrong.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }

// // //   /**
// // //    * STEP 2
// // //    * Generate the detailed marketing campaign for
// // //    * the option selected by the restaurant owner.
// // //    *
// // //    * Backend:
// // //    * POST /api/campaigns/finalize
// // //    *
// // //    * This reuses the research from Step 1.
// // //    */
// // //   async function finalizeCampaign() {
// // //     if (
// // //       !campaignChoices ||
// // //       !campaignInput ||
// // //       finalizing ||
// // //       loading
// // //     ) {
// // //       return;
// // //     }

// // //     const selectedOption =
// // //       campaignChoices.campaignOptions.find(
// // //         (option) => option.id === selectedOptionId
// // //       );

// // //     if (!selectedOption) {
// // //       setError("Please select a marketing strategy.");
// // //       return;
// // //     }

// // //     setFinalizing(true);
// // //     setError("");
// // //     setCampaign(null);
// // //     setEmailDraft({ subject: "", body: "" });
// // //     setDetailsConfirmed(false);

// // //     try {
// // //       const response = await fetch(
// // //         `${API_URL}/api/campaigns/finalize`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify({
// // //             ...campaignInput,
// // //             selectedOption,
// // //             research: campaignChoices.research,
// // //           }),
// // //         }
// // //       );

// // //       const data = await response.json();

// // //       if (!response.ok || !data.success) {
// // //         throw new Error(
// // //           data.error || "Unable to generate the selected campaign."
// // //         );
// // //       }

// // //       if (
// // //         !data.strategy ||
// // //         !data.strategy.email ||
// // //         !Array.isArray(data.strategy.budgetBreakdown)
// // //       ) {
// // //         throw new Error(
// // //           "The backend returned an incomplete campaign."
// // //         );
// // //       }

// // //       // Save the detailed strategy.
// // //       setCampaign(data);

// // //       // Copy the generated email into editable state.
// // //       setEmailDraft({
// // //         subject: data.strategy.email.subject || "",
// // //         body: data.strategy.email.body || "",
// // //       });
// // //     } catch (err) {
// // //       setError(err.message || "Something went wrong.");
// // //     } finally {
// // //       setFinalizing(false);
// // //     }
// // //   }

// // //   /**
// // //    * STEP 3
// // //    * Let the owner confirm the email draft locally.
// // //    *
// // //    * No email is sent here.
// // //    */
// // //   function reviewDraft() {
// // //     if (!detailsConfirmed || !campaign) return;

// // //     window.alert(
// // //       "Draft reviewed locally. No emails have been sent."
// // //     );
// // //   }

// // //   // The detailed strategy only exists after finalization.
// // //   const strategy = campaign?.strategy;

// // //   // Use the original submitted budget, not a form value
// // //   // that the owner might have edited afterward.
// // //   const activeBudget =
// // //     campaignInput?.budget ?? Number(form.budget);

// // //   const allocatedBudget = (
// // //     strategy?.budgetBreakdown || []
// // //   ).reduce(
// // //     (total, item) => total + Number(item.amount || 0),
// // //     0
// // //   );

// // //   const remainingBudget = activeBudget - allocatedBudget;

// // //   return (
// // //     <div className="app-shell">
// // //       {/* ======================================
// // //           SIDEBAR
// // //           ====================================== */}

// // //       <aside className="sidebar">
// // //         <div className="brand">
// // //           <div className="brand-icon">
// // //             <Sparkles size={22} />
// // //           </div>

// // //           <span>
// // //             LaunchLoop <span className="brand-ai">AI</span>
// // //           </span>
// // //         </div>

// // //         <div className="sidebar-label">WORKSPACE</div>

// // //         <nav className="navigation">
// // //           <button
// // //             type="button"
// // //             className={`nav-item ${
// // //               activePage === "studio" ? "active" : ""
// // //             }`}
// // //             onClick={() => setActivePage("studio")}
// // //           >
// // //             <LayoutDashboard size={18} />
// // //             Campaign Studio
// // //           </button>

// // //           <button
// // //             type="button"
// // //             className={`nav-item ${
// // //               activePage === "research" ? "active" : ""
// // //             }`}
// // //             onClick={() => setActivePage("research")}
// // //           >
// // //             <Search size={18} />
// // //             Competitor Research
// // //           </button>

// // //           <button
// // //             type="button"
// // //             className={`nav-item ${
// // //               activePage === "email" ? "active" : ""
// // //             }`}
// // //             onClick={() => setActivePage("email")}
// // //           >
// // //             <Mail size={18} />
// // //             Email Campaigns
// // //           </button>
// // //         </nav>

// // //         <div className="sidebar-footer">
// // //           <div className="status-dot" />
// // //           NVIDIA Nemotron + Tavily
// // //         </div>
// // //       </aside>

// // //       {/* ======================================
// // //           MAIN CONTENT
// // //           ====================================== */}

// // //       <main className="main-content">
// // //         <header className="topbar">
// // //           <span>
// // //             Workspace /{" "}
// // //             {activePage === "research"
// // //               ? "Competitor Research"
// // //               : activePage === "email"
// // //               ? "Email Campaigns"
// // //               : "Campaign Studio"}
// // //           </span>

// // //           <span className="topbar-badge">
// // //             Hackathon MVP
// // //           </span>
// // //         </header>

// // //         <div className="page-content">
// // //           {activePage === "research" ? (
// // //             <CompetitorResearch />
// // //           ) : activePage === "email" ? (
// // //             <EmailCampaigns
// // //               emailDraft={emailDraft}
// // //               updateEmailDraft={updateEmailDraft}
// // //               campaign={campaign}
// // //               detailsConfirmed={detailsConfirmed}
// // //               setDetailsConfirmed={setDetailsConfirmed}
// // //               remainingBudget={remainingBudget}
// // //               reviewDraft={reviewDraft}
// // //               onBack={() => setActivePage("studio")}
// // //             />
// // //           ) : (
// // //             <>
// // //               {/* CAMPAIGN STUDIO HEADER */}

// // //               <div className="page-heading">
// // //                 <div className="eyebrow">
// // //                   <Sparkles size={15} />
// // //                   AI-POWERED MARKETING
// // //                 </div>

// // //                 <h1>Campaign Studio</h1>

// // //                 <p>
// // //                   Explore three research-backed marketing
// // //                   strategies and choose the best fit for
// // //                   your restaurant.
// // //                 </p>
// // //               </div>

// // //               <div className="workspace-grid">
// // //                 {/* ======================================
// // //                     RESTAURANT FORM
// // //                     ====================================== */}

// // //                 <section className="panel">
// // //                   <div className="panel-heading">
// // //                     <h2>Create a campaign</h2>

// // //                     <p>
// // //                       Tell our AI what you want to achieve.
// // //                     </p>
// // //                   </div>

// // //                   <form onSubmit={generateCampaign}>
// // //                     <label htmlFor="restaurantName">
// // //                       Restaurant name
// // //                     </label>

// // //                     <input
// // //                       id="restaurantName"
// // //                       required
// // //                       placeholder="e.g. Spice Garden"
// // //                       value={form.restaurantName}
// // //                       onChange={(e) =>
// // //                         updateForm(
// // //                           "restaurantName",
// // //                           e.target.value
// // //                         )
// // //                       }
// // //                     />

// // //                     <label htmlFor="location">
// // //                       Location
// // //                     </label>

// // //                     <input
// // //                       id="location"
// // //                       required
// // //                       placeholder="e.g. Toronto, Ontario"
// // //                       value={form.location}
// // //                       onChange={(e) =>
// // //                         updateForm(
// // //                           "location",
// // //                           e.target.value
// // //                         )
// // //                       }
// // //                     />

// // //                     <label htmlFor="goal">
// // //                       Marketing goal
// // //                     </label>

// // //                     <textarea
// // //                       id="goal"
// // //                       required
// // //                       rows={4}
// // //                       placeholder="e.g. Attract more weekend customers"
// // //                       value={form.goal}
// // //                       onChange={(e) =>
// // //                         updateForm("goal", e.target.value)
// // //                       }
// // //                     />

// // //                     <label htmlFor="budget">
// // //                       Marketing budget (CAD)
// // //                     </label>

// // //                     <input
// // //                       id="budget"
// // //                       type="number"
// // //                       min="1"
// // //                       step="0.01"
// // //                       required
// // //                       value={form.budget}
// // //                       onChange={(e) =>
// // //                         updateForm(
// // //                           "budget",
// // //                           Number(e.target.value)
// // //                         )
// // //                       }
// // //                     />

// // //                     <button
// // //                       className="generate-button"
// // //                       type="submit"
// // //                       disabled={loading || finalizing}
// // //                     >
// // //                       {loading ? (
// // //                         <>
// // //                           <LoaderCircle
// // //                             size={18}
// // //                             className="spinner"
// // //                           />
// // //                           Generating 3 strategies...
// // //                         </>
// // //                       ) : (
// // //                         <>
// // //                           <Sparkles size={18} />
// // //                           Explore 3 Strategies
// // //                           <ArrowRight size={17} />
// // //                         </>
// // //                       )}
// // //                     </button>
// // //                   </form>
// // //                 </section>

// // //                 {/* ======================================
// // //                     CAMPAIGN PREVIEW
// // //                     ====================================== */}

// // //                 <section className="panel results-panel">
// // //                   <div className="panel-heading">
// // //                     <div className="result-title-row">
// // //                       <h2>Campaign preview</h2>

// // //                       {campaign && (
// // //                         <span className="draft-badge">
// // //                           Draft
// // //                         </span>
// // //                       )}
// // //                     </div>

// // //                     <p>
// // //                       Compare AI recommendations and develop
// // //                       your selected strategy.
// // //                     </p>
// // //                   </div>

// // //                   {error && (
// // //                     <div className="error-box" role="alert">
// // //                       {error}
// // //                     </div>
// // //                   )}

// // //                   {/* EMPTY STATE */}

// // //                   {!campaignChoices &&
// // //                     !campaign &&
// // //                     !loading && (
// // //                       <div className="empty-state">
// // //                         <div className="empty-icon">
// // //                           <Sparkles size={30} />
// // //                         </div>

// // //                         <h3>
// // //                           Your next campaign starts here
// // //                         </h3>

// // //                         <p>
// // //                           Enter your restaurant details to
// // //                           explore three marketing strategies.
// // //                         </p>
// // //                       </div>
// // //                     )}

// // //                   {/* FIRST REQUEST LOADING STATE */}

// // //                   {loading && (
// // //                     <div className="empty-state">
// // //                       <LoaderCircle
// // //                         size={32}
// // //                         className="spinner"
// // //                       />

// // //                       <h3>
// // //                         Finding your marketing opportunities...
// // //                       </h3>

// // //                       <p>
// // //                         Tavily is researching competitors,
// // //                         and Nemotron is preparing three
// // //                         distinct strategies.
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* ======================================
// // //                       THREE CAMPAIGN OPTIONS
// // //                       ====================================== */}

// // //                   {campaignChoices && !campaign && (
// // //                     <div className="campaign-options-section">
// // //                       <div className="campaign-options-heading">
// // //                         <div>
// // //                           <h3>
// // //                             Choose Your Marketing Strategy
// // //                           </h3>

// // //                           <p>
// // //                             Compare three AI-generated
// // //                             approaches before creating
// // //                             your complete campaign.
// // //                           </p>
// // //                         </div>

// // //                         <span className="draft-badge">
// // //                           3 AI Options
// // //                         </span>
// // //                       </div>

// // //                       {/* AI recommendation explanation */}

// // //                       <div className="ai-recommendation-box">
// // //                         <div className="ai-recommendation-title">
// // //                           <Sparkles size={18} />
// // //                           Nemotron's Recommendation
// // //                         </div>

// // //                         <p>
// // //                           {
// // //                             campaignChoices.recommendationReason
// // //                           }
// // //                         </p>

// // //                         <small>
// // //                           AI-generated analysis. Verify
// // //                           competitor claims and business
// // //                           assumptions before acting.
// // //                         </small>
// // //                       </div>

// // //                       {/* Three selectable strategy cards */}

// // //                       <div className="campaign-option-list">
// // //                         {campaignChoices.campaignOptions.map(
// // //                           (option) => {
// // //                             const isSelected =
// // //                               selectedOptionId === option.id;

// // //                             const isRecommended =
// // //                               campaignChoices.recommendedOptionId ===
// // //                               option.id;

// // //                             return (
// // //                               <button
// // //                                 key={option.id}
// // //                                 type="button"
// // //                                 className={`campaign-option-card ${
// // //                                   isSelected ? "selected" : ""
// // //                                 }`}
// // //                                 onClick={() => {
// // //                                   setSelectedOptionId(option.id);
// // //                                   setError("");
// // //                                 }}
// // //                                 disabled={finalizing}
// // //                                 aria-pressed={isSelected}
// // //                               >
// // //                                 <div className="campaign-option-top">
// // //                                   <div className="campaign-option-title">
// // //                                     <span className="campaign-option-radio">
// // //                                       {isSelected ? "●" : "○"}
// // //                                     </span>

// // //                                     <strong>
// // //                                       {option.name}
// // //                                     </strong>
// // //                                   </div>

// // //                                   {isRecommended && (
// // //                                     <span className="ai-pick-badge">
// // //                                       <Sparkles size={13} />
// // //                                       AI Pick
// // //                                     </span>
// // //                                   )}
// // //                                 </div>

// // //                                 <p className="campaign-option-summary">
// // //                                   {option.summary}
// // //                                 </p>

// // //                                 <div className="campaign-option-details">
// // //                                   <div>
// // //                                     <span>Goal</span>
// // //                                     <p>{option.goal}</p>
// // //                                   </div>

// // //                                   <div>
// // //                                     <span>Target Audience</span>
// // //                                     <p>
// // //                                       {option.targetAudience}
// // //                                     </p>
// // //                                   </div>

// // //                                   <div>
// // //                                     <span>Approach</span>
// // //                                     <p>{option.approach}</p>
// // //                                   </div>
// // //                                 </div>

// // //                                 <p className="campaign-option-reason">
// // //                                   <strong>
// // //                                     Why this could work:
// // //                                   </strong>{" "}
// // //                                   {option.reasoning}
// // //                                 </p>

// // //                                 <div className="campaign-option-footer">
// // //                                   <span>
// // //                                     Available campaign budget
// // //                                   </span>

// // //                                   <strong>
// // //                                     CAD $
// // //                                     {Number(
// // //                                       option.budget
// // //                                     ).toFixed(2)}
// // //                                   </strong>
// // //                                 </div>
// // //                               </button>
// // //                             );
// // //                           }
// // //                         )}
// // //                       </div>

// // //                       {/* Generate only the chosen campaign */}

// // //                       <button
// // //                         type="button"
// // //                         className="generate-button"
// // //                         onClick={finalizeCampaign}
// // //                         disabled={
// // //                           !selectedOptionId || finalizing
// // //                         }
// // //                       >
// // //                         {finalizing ? (
// // //                           <>
// // //                             <LoaderCircle
// // //                               size={18}
// // //                               className="spinner"
// // //                             />
// // //                             Creating your campaign...
// // //                           </>
// // //                         ) : (
// // //                           <>
// // //                             <Sparkles size={18} />
// // //                             Generate Selected Campaign
// // //                             <ArrowRight size={17} />
// // //                           </>
// // //                         )}
// // //                       </button>

// // //                       <p className="campaign-options-note">
// // //                         This generates a draft only.
// // //                         No advertisements are purchased,
// // //                         and no emails are sent.
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* ======================================
// // //                       DETAILED CAMPAIGN RESULTS
// // //                       ====================================== */}

// // //                   {strategy && (
// // //                     <div className="structured-results">
// // //                       <div className="notice">
// // //                         <AlertTriangle size={18} />

// // //                         <span>
// // //                           AI-generated recommendations.
// // //                           Verify business details,
// // //                           competitor claims, and promotional
// // //                           offers before use.
// // //                         </span>
// // //                       </div>

// // //                       {/* SELECTED STRATEGY */}

// // //                       {campaign.selectedOption && (
// // //                         <div className="result-section">
// // //                           <h3>
// // //                             <Sparkles size={18} />
// // //                             Selected Marketing Strategy
// // //                           </h3>

// // //                           <div className="offer-box">
// // //                             <strong>
// // //                               {campaign.selectedOption.name}
// // //                             </strong>

// // //                             <p>
// // //                               {
// // //                                 campaign.selectedOption.summary
// // //                               }
// // //                             </p>
// // //                           </div>

// // //                           <button
// // //                             type="button"
// // //                             className="change-strategy-button"
// // //                             onClick={() => {
// // //                               setCampaign(null);
// // //                               setEmailDraft({
// // //                                 subject: "",
// // //                                 body: "",
// // //                               });
// // //                               setDetailsConfirmed(false);
// // //                               setError("");
// // //                             }}
// // //                           >
// // //                             Choose a Different Strategy
// // //                           </button>
// // //                         </div>
// // //                       )}

// // //                       {/* TARGET AUDIENCE */}

// // //                       <div className="result-section">
// // //                         <h3>
// // //                           <Users size={18} />
// // //                           Target Audience
// // //                         </h3>

// // //                         <p>{strategy.targetAudience}</p>
// // //                       </div>

// // //                       {/* COMPETITOR INSIGHTS */}

// // //                       <div className="result-section">
// // //                         <h3>
// // //                           <Search size={18} />
// // //                           Competitor Insights
// // //                         </h3>

// // //                         <p>{strategy.competitorInsights}</p>
// // //                       </div>

// // //                       {/* SUGGESTED PROMOTION */}

// // //                       <div className="result-section">
// // //                         <h3>
// // //                           <Target size={18} />
// // //                           Suggested Promotion
// // //                         </h3>

// // //                         <div className="offer-box">
// // //                           {strategy.promotionalOffer}
// // //                         </div>
// // //                       </div>

// // //                       {/* BUDGET BREAKDOWN */}

// // //                       <div className="result-section">
// // //                         <h3>
// // //                           <Wallet size={18} />
// // //                           Budget Breakdown
// // //                         </h3>

// // //                         <div className="budget-table-wrapper">
// // //                           <table className="budget-table">
// // //                             <thead>
// // //                               <tr>
// // //                                 <th>Activity</th>
// // //                                 <th>Amount</th>
// // //                                 <th>Reason</th>
// // //                               </tr>
// // //                             </thead>

// // //                             <tbody>
// // //                               {(
// // //                                 strategy.budgetBreakdown || []
// // //                               ).map((item, index) => (
// // //                                 <tr key={index}>
// // //                                   <td>{item.item}</td>

// // //                                   <td>
// // //                                     $
// // //                                     {Number(
// // //                                       item.amount
// // //                                     ).toFixed(2)}
// // //                                   </td>

// // //                                   <td>{item.reason}</td>
// // //                                 </tr>
// // //                               ))}
// // //                             </tbody>
// // //                           </table>
// // //                         </div>

// // //                         <div className="budget-summary">
// // //                           <div>
// // //                             <span>Allocated</span>

// // //                             <strong>
// // //                               ${allocatedBudget.toFixed(2)}
// // //                             </strong>
// // //                           </div>

// // //                           <div>
// // //                             <span>Remaining</span>

// // //                             <strong>
// // //                               ${remainingBudget.toFixed(2)}
// // //                             </strong>
// // //                           </div>
// // //                         </div>

// // //                         {remainingBudget < 0 && (
// // //                           <div className="error-box">
// // //                             The AI exceeded your budget.
// // //                             Please revise the allocations.
// // //                           </div>
// // //                         )}
// // //                       </div>

// // //                       {/* EDITABLE EMAIL */}

// // //                       <div className="result-section">
// // //                         <h3>
// // //                           <Mail size={18} />
// // //                           Email Campaign
// // //                         </h3>

// // //                         <div className="email-editor">
// // //                           <div className="email-editor-heading">
// // //                             <Pencil size={16} />
// // //                             Edit your email draft
// // //                           </div>

// // //                           <label htmlFor="emailSubject">
// // //                             Subject line
// // //                           </label>

// // //                           <input
// // //                             id="emailSubject"
// // //                             value={emailDraft.subject}
// // //                             onChange={(e) =>
// // //                               updateEmailDraft(
// // //                                 "subject",
// // //                                 e.target.value
// // //                               )
// // //                             }
// // //                           />

// // //                           <label htmlFor="emailBody">
// // //                             Email body
// // //                           </label>

// // //                           <textarea
// // //                             id="emailBody"
// // //                             rows={12}
// // //                             value={emailDraft.body}
// // //                             onChange={(e) =>
// // //                               updateEmailDraft(
// // //                                 "body",
// // //                                 e.target.value
// // //                               )
// // //                             }
// // //                           />
// // //                         </div>
// // //                       </div>

// // //                       {/* WARNINGS */}

// // //                       <div className="result-section">
// // //                         <h3>
// // //                           <AlertTriangle size={18} />
// // //                           Things to Verify
// // //                         </h3>

// // //                         <ul className="warning-list">
// // //                           {(strategy.warnings || []).map(
// // //                             (warning, index) => (
// // //                               <li key={index}>
// // //                                 {warning}
// // //                               </li>
// // //                             )
// // //                           )}
// // //                         </ul>
// // //                       </div>

// // //                       {/* RESEARCH SOURCES */}

// // //                       <div className="result-section">
// // //                         <h3>
// // //                           <ExternalLink size={18} />
// // //                           Research Sources
// // //                         </h3>

// // //                         <div className="research-list">
// // //                           {(campaign.research || []).map(
// // //                             (source, index) => (
// // //                               <a
// // //                                 key={`${source.url}-${index}`}
// // //                                 href={source.url}
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                                 className="research-source"
// // //                               >
// // //                                 <Search size={15} />

// // //                                 <span>
// // //                                   {source.title}
// // //                                 </span>

// // //                                 <ExternalLink size={15} />
// // //                               </a>
// // //                             )
// // //                           )}
// // //                         </div>
// // //                       </div>

// // //                       {/* OWNER REVIEW */}

// // //                       <div className="approval-section">
// // //                         <label className="confirmation-row">
// // //                           <input
// // //                             type="checkbox"
// // //                             checked={detailsConfirmed}
// // //                             onChange={(e) =>
// // //                               setDetailsConfirmed(
// // //                                 e.target.checked
// // //                               )
// // //                             }
// // //                           />

// // //                           <span>
// // //                             I have reviewed the suggested
// // //                             promotion, email, and business
// // //                             details.
// // //                           </span>
// // //                         </label>

// // //                         <button
// // //                           type="button"
// // //                           className="review-button"
// // //                           disabled={
// // //                             !detailsConfirmed ||
// // //                             remainingBudget < 0 ||
// // //                             !emailDraft.subject.trim() ||
// // //                             !emailDraft.body.trim()
// // //                           }
// // //                           onClick={reviewDraft}
// // //                         >
// // //                           <CheckCircle2 size={18} />
// // //                           Mark Draft as Reviewed
// // //                         </button>

// // //                         <p className="approval-note">
// // //                           Review is local to this page.
// // //                           No emails will be sent.
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </section>
// // //               </div>
// // //             </>
// // //           )}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // export default App;


// // import { useState } from "react";
// // import {
// //   LayoutDashboard,
// //   Sparkles,
// //   Search,
// //   Mail,
// //   LoaderCircle,
// //   ArrowRight,
// //   Users,
// //   Target,
// //   Wallet,
// //   AlertTriangle,
// //   ExternalLink,
// //   Pencil,
// //   CheckCircle2,
// //   CalendarDays,
// //   BarChart3,
// // } from "lucide-react";

// // import "./App.css";
// // import CompetitorResearch from "./components/CompetitorResearch";
// // import EmailCampaigns from "./components/EmailCampaigns";

// // const API_URL =
// //   import.meta.env.VITE_API_URL || "http://localhost:5000";

// // function App() {
// //   // ----------------------------------------
// //   // Restaurant form
// //   // ----------------------------------------

// //   const [form, setForm] = useState({
// //     restaurantName: "",
// //     location: "",
// //     goal: "",
// //     budget: 200,
// //   });

// //   // ----------------------------------------
// //   // Campaign workflow state
// //   // ----------------------------------------

// //   const [campaignChoices, setCampaignChoices] = useState(null);
// //   const [selectedOptionId, setSelectedOptionId] = useState("");
// //   const [campaignInput, setCampaignInput] = useState(null);
// //   const [campaign, setCampaign] = useState(null);

// //   const [loading, setLoading] = useState(false);
// //   const [finalizing, setFinalizing] = useState(false);
// //   const [error, setError] = useState("");

// //   // ----------------------------------------
// //   // Email state
// //   // ----------------------------------------

// //   const [emailDraft, setEmailDraft] = useState({
// //     subject: "",
// //     body: "",
// //   });

// //   const [detailsConfirmed, setDetailsConfirmed] = useState(false);
// //   const [draftReviewed, setDraftReviewed] = useState(false);

// //   // ----------------------------------------
// //   // Navigation
// //   // ----------------------------------------

// //   const [activePage, setActivePage] = useState("studio");

// //   function updateForm(field, value) {
// //     setForm((previous) => ({
// //       ...previous,
// //       [field]: value,
// //     }));
// //   }

// //   function updateEmailDraft(field, value) {
// //     setEmailDraft((previous) => ({
// //       ...previous,
// //       [field]: value,
// //     }));

// //     // Any edit invalidates the previous review.
// //     setDetailsConfirmed(false);
// //     setDraftReviewed(false);
// //   }

// //   // ----------------------------------------
// //   // STEP 1: Generate three campaign options
// //   // ----------------------------------------

// //   async function generateCampaign(event) {
// //     event.preventDefault();

// //     if (loading || finalizing) return;

// //     setLoading(true);
// //     setError("");
// //     setCampaignChoices(null);
// //     setSelectedOptionId("");
// //     setCampaignInput(null);
// //     setCampaign(null);
// //     setEmailDraft({ subject: "", body: "" });
// //     setDetailsConfirmed(false);
// //     setDraftReviewed(false);

// //     try {
// //       const input = { ...form };

// //       const response = await fetch(
// //         `${API_URL}/api/campaigns/options`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(input),
// //         }
// //       );

// //       const data = await response.json();

// //       if (!response.ok || !data.success) {
// //         throw new Error(
// //           data.error || "Unable to generate campaign options."
// //         );
// //       }

// //       if (
// //         !Array.isArray(data.campaignOptions) ||
// //         data.campaignOptions.length !== 3
// //       ) {
// //         throw new Error(
// //           "The backend did not return three campaign options."
// //         );
// //       }

// //       setCampaignChoices(data);
// //       setCampaignInput(input);

// //       const recommendedExists = data.campaignOptions.some(
// //         (option) => option.id === data.recommendedOptionId
// //       );

// //       setSelectedOptionId(
// //         recommendedExists
// //           ? data.recommendedOptionId
// //           : data.campaignOptions[0].id
// //       );
// //     } catch (err) {
// //       setError(err.message || "Something went wrong.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // ----------------------------------------
// //   // STEP 2: Finalize the owner's choice
// //   // ----------------------------------------

// //   async function finalizeCampaign() {
// //     if (!campaignChoices || !campaignInput || finalizing) {
// //       return;
// //     }

// //     const selectedOption = campaignChoices.campaignOptions.find(
// //       (option) => option.id === selectedOptionId
// //     );

// //     if (!selectedOption) {
// //       setError("Please select a campaign strategy.");
// //       return;
// //     }

// //     setFinalizing(true);
// //     setError("");
// //     setCampaign(null);
// //     setEmailDraft({ subject: "", body: "" });
// //     setDetailsConfirmed(false);
// //     setDraftReviewed(false);

// //     try {
// //       const response = await fetch(
// //         `${API_URL}/api/campaigns/finalize`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             ...campaignInput,
// //             selectedOption,
// //             research: campaignChoices.research,
// //           }),
// //         }
// //       );

// //       const data = await response.json();

// //       if (!response.ok || !data.success) {
// //         throw new Error(
// //           data.error || "Unable to finalize the campaign."
// //         );
// //       }

// //       if (!data.strategy || !data.strategy.email) {
// //         throw new Error("The campaign response is incomplete.");
// //       }

// //       setCampaign(data);

// //       setEmailDraft({
// //         subject: data.strategy.email.subject || "",
// //         body: data.strategy.email.body || "",
// //       });
// //     } catch (err) {
// //       setError(err.message || "Something went wrong.");
// //     } finally {
// //       setFinalizing(false);
// //     }
// //   }

// //   // ----------------------------------------
// //   // Local draft review — no email sending
// //   // ----------------------------------------

// //   function reviewDraft() {
// //     if (!detailsConfirmed || !campaign) return;

// //     if (
// //       !emailDraft.subject.trim() ||
// //       !emailDraft.body.trim()
// //     ) {
// //       setError("Please complete the email draft.");
// //       return;
// //     }

// //     setDraftReviewed(true);
// //     window.alert(
// //       "Draft reviewed locally. No emails have been sent."
// //     );
// //   }

// //   function changeStrategy() {
// //     setCampaign(null);
// //     setEmailDraft({ subject: "", body: "" });
// //     setDetailsConfirmed(false);
// //     setDraftReviewed(false);
// //     setError("");
// //   }

// //   // ----------------------------------------
// //   // Derived campaign data
// //   // ----------------------------------------

// //   const strategy = campaign?.strategy;

// //   const activeBudget =
// //     Number(campaignInput?.budget ?? form.budget);

// //   const budgetItems = strategy?.budgetBreakdown || [];

// //   const allocatedBudget = budgetItems.reduce(
// //     (total, item) => total + Number(item.amount || 0),
// //     0
// //   );

// //   const remainingBudget = activeBudget - allocatedBudget;

// //   const money = (amount) =>
// //     Number(amount || 0).toLocaleString("en-CA", {
// //       style: "currency",
// //       currency: "CAD",
// //     });

// //   return (
// //     <div className="app-shell">
// //       {/* ====================================
// //           SIDEBAR
// //           ==================================== */}

// //       <aside className="sidebar">
// //         <div className="brand">
// //           <div className="brand-icon">
// //             <Sparkles size={22} />
// //           </div>

// //           <span>
// //             LaunchLoop <span className="brand-ai">AI</span>
// //           </span>
// //         </div>

// //         <div className="sidebar-label">WORKSPACE</div>

// //         <nav className="navigation">
// //           <button
// //             type="button"
// //             className={`nav-item ${
// //               activePage === "studio" ? "active" : ""
// //             }`}
// //             onClick={() => setActivePage("studio")}
// //           >
// //             <LayoutDashboard size={18} />
// //             Campaign Studio
// //           </button>

// //           <button
// //             type="button"
// //             className={`nav-item ${
// //               activePage === "research" ? "active" : ""
// //             }`}
// //             onClick={() => setActivePage("research")}
// //           >
// //             <Search size={18} />
// //             Competitor Research
// //           </button>

// //           <button
// //             type="button"
// //             className={`nav-item ${
// //               activePage === "email" ? "active" : ""
// //             }`}
// //             onClick={() => setActivePage("email")}
// //           >
// //             <Mail size={18} />
// //             Email Campaigns
// //           </button>
// //         </nav>

// //         <div className="sidebar-footer">
// //           <div className="status-dot" />
// //           NVIDIA Nemotron + Tavily
// //         </div>
// //       </aside>

// //       {/* ====================================
// //           MAIN CONTENT
// //           ==================================== */}

// //       <main className="main-content">
// //         <header className="topbar">
// //           <span>
// //             Workspace /{" "}
// //             {activePage === "research"
// //               ? "Competitor Research"
// //               : activePage === "email"
// //               ? "Email Campaigns"
// //               : "Campaign Studio"}
// //           </span>

// //           <span className="topbar-badge">
// //             Hackathon MVP
// //           </span>
// //         </header>

// //         <div className="page-content">
// //           {/* EXISTING COMPETITOR RESEARCH PAGE */}

// //           {activePage === "research" ? (
// //             <CompetitorResearch />
// //           ) : activePage === "email" ? (
// //             /* EXISTING EMAIL CAMPAIGNS PAGE */

// //             <EmailCampaigns
// //               emailDraft={emailDraft}
// //               setEmailDraft={(next) => {
// //                 setEmailDraft(next);
// //                 setDetailsConfirmed(false);
// //                 setDraftReviewed(false);
// //               }}
// //               updateEmailDraft={updateEmailDraft}
// //               campaign={campaign}
// //               detailsConfirmed={detailsConfirmed}
// //               setDetailsConfirmed={(value) => {
// //                 setDetailsConfirmed(value);
// //                 if (!value) setDraftReviewed(false);
// //               }}
// //               draftReviewed={draftReviewed}
// //               reviewDraft={reviewDraft}
// //               remainingBudget={remainingBudget}
// //               onBack={() => setActivePage("studio")}
// //             />
// //           ) : (
// //             <>
// //               {/* CAMPAIGN STUDIO HEADER */}

// //               <div className="page-heading">
// //                 <div className="eyebrow">
// //                   <Sparkles size={15} />
// //                   AI-POWERED MARKETING
// //                 </div>

// //                 <h1>Campaign Studio</h1>

// //                 <p>
// //                   Explore three marketing strategies,
// //                   select your favorite, and build an
// //                   actionable campaign.
// //                 </p>
// //               </div>

// //               <div className="workspace-grid">
// //                 {/* ================================
// //                     RESTAURANT FORM
// //                     ================================ */}

// //                 <section className="panel">
// //                   <div className="panel-heading">
// //                     <h2>Create a campaign</h2>
// //                     <p>
// //                       Tell our AI what you want to achieve.
// //                     </p>
// //                   </div>

// //                   <form onSubmit={generateCampaign}>
// //                     <label htmlFor="restaurantName">
// //                       Restaurant name
// //                     </label>

// //                     <input
// //                       id="restaurantName"
// //                       required
// //                       placeholder="e.g. Spice Garden"
// //                       value={form.restaurantName}
// //                       onChange={(event) =>
// //                         updateForm(
// //                           "restaurantName",
// //                           event.target.value
// //                         )
// //                       }
// //                     />

// //                     <label htmlFor="location">
// //                       Location
// //                     </label>

// //                     <input
// //                       id="location"
// //                       required
// //                       placeholder="e.g. Toronto, Ontario"
// //                       value={form.location}
// //                       onChange={(event) =>
// //                         updateForm(
// //                           "location",
// //                           event.target.value
// //                         )
// //                       }
// //                     />

// //                     <label htmlFor="goal">
// //                       Marketing goal
// //                     </label>

// //                     <textarea
// //                       id="goal"
// //                       rows={4}
// //                       required
// //                       placeholder="e.g. Attract more weekend customers"
// //                       value={form.goal}
// //                       onChange={(event) =>
// //                         updateForm(
// //                           "goal",
// //                           event.target.value
// //                         )
// //                       }
// //                     />

// //                     <label htmlFor="budget">
// //                       Marketing budget (CAD)
// //                     </label>

// //                     <input
// //                       id="budget"
// //                       type="number"
// //                       min="1"
// //                       step="0.01"
// //                       required
// //                       value={form.budget}
// //                       onChange={(event) =>
// //                         updateForm(
// //                           "budget",
// //                           Number(event.target.value)
// //                         )
// //                       }
// //                     />

// //                     <button
// //                       type="submit"
// //                       className="generate-button"
// //                       disabled={loading || finalizing}
// //                     >
// //                       {loading ? (
// //                         <>
// //                           <LoaderCircle
// //                             size={18}
// //                             className="spinner"
// //                           />
// //                           Generating 3 strategies...
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Sparkles size={18} />
// //                           Explore 3 Strategies
// //                           <ArrowRight size={17} />
// //                         </>
// //                       )}
// //                     </button>
// //                   </form>
// //                 </section>

// //                 {/* ================================
// //                     RESULTS PANEL
// //                     ================================ */}

// //                 <section className="panel results-panel">
// //                   <div className="panel-heading">
// //                     <div className="result-title-row">
// //                       <h2>Campaign preview</h2>

// //                       {campaign && (
// //                         <span className="draft-badge">
// //                           Draft
// //                         </span>
// //                       )}
// //                     </div>

// //                     <p>
// //                       AI-generated strategies and campaign
// //                       recommendations.
// //                     </p>
// //                   </div>

// //                   {error && (
// //                     <div className="error-box" role="alert">
// //                       {error}
// //                     </div>
// //                   )}

// //                   {/* EMPTY STATE */}

// //                   {!campaignChoices &&
// //                     !campaign &&
// //                     !loading && (
// //                       <div className="empty-state">
// //                         <div className="empty-icon">
// //                           <Sparkles size={30} />
// //                         </div>

// //                         <h3>
// //                           Your next campaign starts here
// //                         </h3>

// //                         <p>
// //                           Enter your restaurant details to
// //                           explore three marketing strategies.
// //                         </p>
// //                       </div>
// //                     )}

// //                   {/* GENERATION LOADING */}

// //                   {loading && (
// //                     <div className="empty-state">
// //                       <LoaderCircle
// //                         size={32}
// //                         className="spinner"
// //                       />

// //                       <h3>
// //                         Finding marketing opportunities...
// //                       </h3>

// //                       <p>
// //                         Tavily is researching competitors,
// //                         and Nemotron is preparing your
// //                         campaign options.
// //                       </p>
// //                     </div>
// //                   )}

// //                   {/* ================================
// //                       THREE CAMPAIGN OPTIONS
// //                       ================================ */}

// //                   {campaignChoices && !campaign && (
// //                     <div className="campaign-options-section">
// //                       <div className="campaign-options-heading">
// //                         <div>
// //                           <h3>
// //                             Choose Your Marketing Strategy
// //                           </h3>

// //                           <p>
// //                             Compare three approaches before
// //                             creating the full campaign.
// //                           </p>
// //                         </div>

// //                         <span className="draft-badge">
// //                           3 AI Options
// //                         </span>
// //                       </div>

// //                       <div className="ai-recommendation-box">
// //                         <div className="ai-recommendation-title">
// //                           <Sparkles size={18} />
// //                           Nemotron's Recommendation
// //                         </div>

// //                         <p>
// //                           {
// //                             campaignChoices.recommendationReason
// //                           }
// //                         </p>

// //                         <small>
// //                           Verify competitor claims and
// //                           business assumptions before acting.
// //                         </small>
// //                       </div>

// //                       <div className="campaign-option-list">
// //                         {campaignChoices.campaignOptions.map(
// //                           (option) => {
// //                             const isSelected =
// //                               selectedOptionId === option.id;

// //                             const isRecommended =
// //                               campaignChoices.recommendedOptionId ===
// //                               option.id;

// //                             return (
// //                               <button
// //                                 key={option.id}
// //                                 type="button"
// //                                 className={`campaign-option-card ${
// //                                   isSelected ? "selected" : ""
// //                                 }`}
// //                                 aria-pressed={isSelected}
// //                                 disabled={finalizing}
// //                                 onClick={() => {
// //                                   setSelectedOptionId(option.id);
// //                                   setError("");
// //                                 }}
// //                               >
// //                                 <div className="campaign-option-top">
// //                                   <div className="campaign-option-title">
// //                                     <span className="campaign-option-radio">
// //                                       {isSelected ? "●" : "○"}
// //                                     </span>

// //                                     <strong>
// //                                       {option.name}
// //                                     </strong>
// //                                   </div>

// //                                   {isRecommended && (
// //                                     <span className="ai-pick-badge">
// //                                       <Sparkles size={13} />
// //                                       AI Pick
// //                                     </span>
// //                                   )}
// //                                 </div>

// //                                 <p className="campaign-option-summary">
// //                                   {option.summary}
// //                                 </p>

// //                                 <div className="campaign-option-details">
// //                                   <div>
// //                                     <span>Goal</span>
// //                                     <p>{option.goal}</p>
// //                                   </div>

// //                                   <div>
// //                                     <span>Target Audience</span>
// //                                     <p>
// //                                       {option.targetAudience}
// //                                     </p>
// //                                   </div>

// //                                   <div>
// //                                     <span>Approach</span>
// //                                     <p>{option.approach}</p>
// //                                   </div>
// //                                 </div>

// //                                 <p className="campaign-option-reason">
// //                                   <strong>
// //                                     Why this could work:
// //                                   </strong>{" "}
// //                                   {option.reasoning}
// //                                 </p>

// //                                 <div className="campaign-option-footer">
// //                                   <span>
// //                                     Available campaign budget
// //                                   </span>

// //                                   <strong>
// //                                     {money(option.budget)}
// //                                   </strong>
// //                                 </div>
// //                               </button>
// //                             );
// //                           }
// //                         )}
// //                       </div>

// //                       <button
// //                         type="button"
// //                         className="generate-button"
// //                         disabled={
// //                           !selectedOptionId || finalizing
// //                         }
// //                         onClick={finalizeCampaign}
// //                       >
// //                         {finalizing ? (
// //                           <>
// //                             <LoaderCircle
// //                               size={18}
// //                               className="spinner"
// //                             />
// //                             Creating your campaign...
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Sparkles size={18} />
// //                             Generate Selected Campaign
// //                             <ArrowRight size={17} />
// //                           </>
// //                         )}
// //                       </button>

// //                       <p className="campaign-options-note">
// //                         No advertising budget is spent,
// //                         and no emails are sent.
// //                       </p>
// //                     </div>
// //                   )}

// //                   {/* ================================
// //                       FINAL DETAILED CAMPAIGN
// //                       ================================ */}

// //                   {strategy && (
// //                     <div className="structured-results">
// //                       <div className="notice">
// //                         <AlertTriangle size={18} />

// //                         <span>
// //                           AI-generated recommendations.
// //                           Verify prices, offers, dates, and
// //                           competitor information before use.
// //                         </span>
// //                       </div>

// //                       {/* SELECTED OPTION */}

// //                       {campaign.selectedOption && (
// //                         <div className="result-section">
// //                           <h3>
// //                             <Sparkles size={18} />
// //                             Selected Strategy
// //                           </h3>

// //                           <div className="offer-box">
// //                             <strong>
// //                               {campaign.selectedOption.name}
// //                             </strong>

// //                             <p>
// //                               {
// //                                 campaign.selectedOption.summary
// //                               }
// //                             </p>
// //                           </div>

// //                           <button
// //                             type="button"
// //                             className="change-strategy-button"
// //                             onClick={changeStrategy}
// //                           >
// //                             Choose a Different Strategy
// //                           </button>
// //                         </div>
// //                       )}

// //                       {/* TARGET AUDIENCE */}

// //                       <div className="result-section">
// //                         <h3>
// //                           <Users size={18} />
// //                           Target Audience
// //                         </h3>

// //                         <p>{strategy.targetAudience}</p>
// //                       </div>

// //                       {/* COMPETITOR INSIGHTS */}

// //                       <div className="result-section">
// //                         <h3>
// //                           <Search size={18} />
// //                           Competitor Insights
// //                         </h3>

// //                         <p>{strategy.competitorInsights}</p>
// //                       </div>

// //                       {/* SUGGESTED PROMOTION */}

// //                       <div className="result-section">
// //                         <h3>
// //                           <Target size={18} />
// //                           Suggested Promotion
// //                         </h3>

// //                         <div className="offer-box">
// //                           {strategy.promotionalOffer}
// //                         </div>
// //                       </div>

// //                       {/* ==========================
// //                           NEW: CAMPAIGN TIMELINE
// //                           ========================== */}

// //                       {Array.isArray(strategy.timeline) &&
// //                         strategy.timeline.length > 0 && (
// //                           <div className="result-section">
// //                             <h3>
// //                               <CalendarDays size={18} />
// //                               Campaign Execution Plan
// //                             </h3>

// //                             <p className="campaign-duration">
// //                               Suggested duration:{" "}
// //                               <strong>
// //                                 {strategy.durationDays} days
// //                               </strong>
// //                             </p>

// //                             <div className="campaign-timeline">
// //                               {strategy.timeline.map(
// //                                 (step, index) => (
// //                                   <div
// //                                     className="timeline-step"
// //                                     key={index}
// //                                   >
// //                                     <div className="timeline-number">
// //                                       {index + 1}
// //                                     </div>

// //                                     <div>
// //                                       <strong>
// //                                         {step.phase}
// //                                       </strong>

// //                                       <p>{step.action}</p>
// //                                     </div>
// //                                   </div>
// //                                 )
// //                               )}
// //                             </div>
// //                           </div>
// //                         )}

// //                       {/* ==========================
// //                           NEW: SUCCESS METRICS
// //                           ========================== */}

// //                       {Array.isArray(strategy.successMetrics) &&
// //                         strategy.successMetrics.length > 0 && (
// //                           <div className="result-section">
// //                             <h3>
// //                               <BarChart3 size={18} />
// //                               Success Metrics to Track
// //                             </h3>

// //                             <div className="success-metrics-grid">
// //                               {strategy.successMetrics.map(
// //                                 (metric, index) => (
// //                                   <div
// //                                     className="success-metric-card"
// //                                     key={index}
// //                                   >
// //                                     <span>
// //                                       METRIC {index + 1}
// //                                     </span>

// //                                     <strong>{metric}</strong>

// //                                     <small>
// //                                       Not tracked yet
// //                                     </small>
// //                                   </div>
// //                                 )
// //                               )}
// //                             </div>
// //                           </div>
// //                         )}

// //                       {/* ==========================
// //                           BUDGET BREAKDOWN
// //                           ========================== */}

// //                       <div className="result-section">
// //                         <h3>
// //                           <Wallet size={18} />
// //                           Budget Breakdown
// //                         </h3>

// //                         <div className="budget-table-wrapper">
// //                           <table className="budget-table">
// //                             <thead>
// //                               <tr>
// //                                 <th>Activity</th>
// //                                 <th>Amount</th>
// //                                 <th>Reason</th>
// //                               </tr>
// //                             </thead>

// //                             <tbody>
// //                               {budgetItems.map(
// //                                 (item, index) => (
// //                                   <tr key={index}>
// //                                     <td>{item.item}</td>
// //                                     <td>
// //                                       {money(item.amount)}
// //                                     </td>
// //                                     <td>{item.reason}</td>
// //                                   </tr>
// //                                 )
// //                               )}
// //                             </tbody>
// //                           </table>
// //                         </div>

// //                         {/* NEW: BUDGET BARS */}

// //                         <div className="budget-visualization">
// //                           {budgetItems.map((item, index) => {
// //                             const percentage =
// //                               activeBudget > 0
// //                                 ? (Number(item.amount) /
// //                                     activeBudget) *
// //                                   100
// //                                 : 0;

// //                             const width = Math.min(
// //                               100,
// //                               Math.max(0, percentage)
// //                             );

// //                             return (
// //                               <div
// //                                 className="budget-bar-item"
// //                                 key={index}
// //                               >
// //                                 <div className="budget-bar-label">
// //                                   <span>{item.item}</span>

// //                                   <strong>
// //                                     {money(item.amount)}
// //                                   </strong>
// //                                 </div>

// //                                 <div
// //                                   className="budget-bar-track"
// //                                   role="progressbar"
// //                                   aria-label={`${item.item} allocation`}
// //                                   aria-valuemin={0}
// //                                   aria-valuemax={100}
// //                                   aria-valuenow={width}
// //                                 >
// //                                   <div
// //                                     className="budget-bar-fill"
// //                                     style={{
// //                                       width: `${width}%`,
// //                                     }}
// //                                   />
// //                                 </div>
// //                               </div>
// //                             );
// //                           })}
// //                         </div>

// //                         <div className="budget-summary">
// //                           <div>
// //                             <span>Allocated</span>

// //                             <strong>
// //                               {money(allocatedBudget)}
// //                             </strong>
// //                           </div>

// //                           <div>
// //                             <span>Remaining</span>

// //                             <strong>
// //                               {money(remainingBudget)}
// //                             </strong>
// //                           </div>
// //                         </div>

// //                         {remainingBudget < -0.01 && (
// //                           <div className="error-box">
// //                             The campaign exceeds the budget.
// //                           </div>
// //                         )}
// //                       </div>

// //                       {/* EMAIL EDITOR */}

// //                       <div className="result-section">
// //                         <h3>
// //                           <Mail size={18} />
// //                           Email Campaign
// //                         </h3>

// //                         <div className="email-editor">
// //                           <div className="email-editor-heading">
// //                             <Pencil size={16} />
// //                             Edit your email draft
// //                           </div>

// //                           <label htmlFor="emailSubject">
// //                             Subject line
// //                           </label>

// //                           <input
// //                             id="emailSubject"
// //                             value={emailDraft.subject}
// //                             onChange={(event) =>
// //                               updateEmailDraft(
// //                                 "subject",
// //                                 event.target.value
// //                               )
// //                             }
// //                           />

// //                           <label htmlFor="emailBody">
// //                             Email body
// //                           </label>

// //                           <textarea
// //                             id="emailBody"
// //                             rows={12}
// //                             value={emailDraft.body}
// //                             onChange={(event) =>
// //                               updateEmailDraft(
// //                                 "body",
// //                                 event.target.value
// //                               )
// //                             }
// //                           />
// //                         </div>
// //                       </div>

// //                       {/* WARNINGS */}

// //                       {strategy.warnings?.length > 0 && (
// //                         <div className="result-section">
// //                           <h3>
// //                             <AlertTriangle size={18} />
// //                             Things to Verify
// //                           </h3>

// //                           <ul className="warning-list">
// //                             {strategy.warnings.map(
// //                               (warning, index) => (
// //                                 <li key={index}>
// //                                   {warning}
// //                                 </li>
// //                               )
// //                             )}
// //                           </ul>
// //                         </div>
// //                       )}

// //                       {/* RESEARCH SOURCES */}

// //                       {Array.isArray(campaign.research) &&
// //                         campaign.research.length > 0 && (
// //                           <div className="result-section">
// //                             <h3>
// //                               <ExternalLink size={18} />
// //                               Research Sources
// //                             </h3>

// //                             <div className="research-list">
// //                               {campaign.research.map(
// //                                 (source, index) =>
// //                                   typeof source.url ===
// //                                     "string" &&
// //                                   /^https?:\/\//i.test(
// //                                     source.url
// //                                   ) ? (
// //                                     <a
// //                                       key={index}
// //                                       href={source.url}
// //                                       target="_blank"
// //                                       rel="noopener noreferrer"
// //                                       className="research-source"
// //                                     >
// //                                       <Search size={15} />

// //                                       <span>
// //                                         {source.title ||
// //                                           source.url}
// //                                       </span>

// //                                       <ExternalLink
// //                                         size={15}
// //                                       />
// //                                     </a>
// //                                   ) : null
// //                               )}
// //                             </div>
// //                           </div>
// //                         )}

// //                       {/* LOCAL EMAIL REVIEW */}

// //                       <div className="approval-section">
// //                         <label className="confirmation-row">
// //                           <input
// //                             type="checkbox"
// //                             checked={detailsConfirmed}
// //                             onChange={(event) => {
// //                               setDetailsConfirmed(
// //                                 event.target.checked
// //                               );
// //                               setDraftReviewed(false);
// //                             }}
// //                           />

// //                           <span>
// //                             I have checked the promotion,
// //                             email, and business details.
// //                           </span>
// //                         </label>

// //                         <button
// //                           type="button"
// //                           className="review-button"
// //                           disabled={
// //                             !detailsConfirmed ||
// //                             draftReviewed ||
// //                             remainingBudget < -0.01 ||
// //                             !emailDraft.subject.trim() ||
// //                             !emailDraft.body.trim()
// //                           }
// //                           onClick={reviewDraft}
// //                         >
// //                           <CheckCircle2 size={18} />

// //                           {draftReviewed
// //                             ? "Draft Reviewed"
// //                             : "Mark Draft as Reviewed"}
// //                         </button>

// //                         {draftReviewed && (
// //                           <p className="review-success">
// //                             Draft reviewed locally.
// //                             No emails have been sent.
// //                           </p>
// //                         )}

// //                         <p className="approval-note">
// //                           Reviewing a draft does not send
// //                           an email or launch the campaign.
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </section>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default App;


// import { useState } from "react";

// import {

//   LayoutDashboard,

//   Sparkles,

//   Search,

//   Mail,

//   LoaderCircle,

//   ArrowRight,

//   Users,

//   Target,

//   Wallet,

//   AlertTriangle,

//   ExternalLink,

//   Pencil,

//   CheckCircle2,

//   CalendarDays,

//   BarChart3,
//   ClipboardList,

// } from "lucide-react";



// import "./App.css";

// import CompetitorResearch from "./components/CompetitorResearch";

// import EmailCampaigns from "./components/EmailCampaigns";
// import CampaignTracker from "./components/CampaignTracker";



// const API_URL =

//   import.meta.env.VITE_API_URL || "http://localhost:5000";



// function App() {

//   // ----------------------------------------

//   // Restaurant form

//   // ----------------------------------------



//   const [form, setForm] = useState({

//     restaurantName: "",

//     location: "",

//     goal: "",

//     budget: 200,

//   });



//   // ----------------------------------------

//   // Campaign workflow state

//   // ----------------------------------------



//   const [campaignChoices, setCampaignChoices] = useState(null);

//   const [selectedOptionId, setSelectedOptionId] = useState("");

//   const [campaignInput, setCampaignInput] = useState(null);

//   const [campaign, setCampaign] = useState(null);



//   const [loading, setLoading] = useState(false);

//   const [finalizing, setFinalizing] = useState(false);

//   const [error, setError] = useState("");



//   // ----------------------------------------

//   // Email state

//   // ----------------------------------------



//   const [emailDraft, setEmailDraft] = useState({

//     subject: "",

//     body: "",

//   });



//   const [detailsConfirmed, setDetailsConfirmed] = useState(false);

//   const [draftReviewed, setDraftReviewed] = useState(false);



//   // ----------------------------------------

//   // Navigation

//   // ----------------------------------------



//   const [activePage, setActivePage] = useState("studio");

//   // Saved campaigns and their checklists are stored locally per browser.
//   const [trackedCampaigns, setTrackedCampaigns] = useState(() => {
//     try {
//       const saved = JSON.parse(localStorage.getItem("launchloop-tracked-campaigns-v1") || "[]");
//       return Array.isArray(saved) ? saved : [];
//     } catch {
//       return [];
//     }
//   });
//   const [activeCampaignId, setActiveCampaignId] = useState(null);

//   function saveTrackedCampaigns(next) {
//     setTrackedCampaigns(next);
//     try {
//       localStorage.setItem("launchloop-tracked-campaigns-v1", JSON.stringify(next));
//     } catch (storageError) {
//       console.warn("Campaign progress could not be saved locally", storageError);
//     }
//   }

//   function updateCampaignTasks(id, tasks) {
//     saveTrackedCampaigns(trackedCampaigns.map((item) =>
//       item.id === id ? { ...item, tasks } : item
//     ));
//   }

//   function openSavedCampaign(id) {
//     const saved = trackedCampaigns.find((item) => item.id === id);
//     if (!saved) return;
//     setActiveCampaignId(id);
//     setCampaign(saved.campaign);
//     setCampaignInput(saved.input);
//     setEmailDraft(saved.emailDraft || { subject: "", body: "" });
//     setCampaignChoices(null);
//     setSelectedOptionId("");
//     setDetailsConfirmed(false);
//     setDraftReviewed(false);
//     setError("");
//     setActivePage("studio");
//   }




//   function updateForm(field, value) {

//     setForm((previous) => ({

//       ...previous,

//       [field]: value,

//     }));

//   }



//   function updateEmailDraft(field, value) {

//     setEmailDraft((previous) => ({

//       ...previous,

//       [field]: value,

//     }));



//     // Any edit invalidates the previous review.

//     setDetailsConfirmed(false);

//     setDraftReviewed(false);

//   }



//   // ----------------------------------------

//   // STEP 1: Generate three campaign options

//   // ----------------------------------------



//   async function generateCampaign(event) {

//     event.preventDefault();



//     if (loading || finalizing) return;



//     setLoading(true);

//     setError("");

//     setCampaignChoices(null);

//     setSelectedOptionId("");

//     setCampaignInput(null);

//     setCampaign(null);

//     setEmailDraft({ subject: "", body: "" });

//     setDetailsConfirmed(false);

//     setDraftReviewed(false);



//     try {

//       const input = { ...form };



//       const response = await fetch(

//         `${API_URL}/api/campaigns/options`,

//         {

//           method: "POST",

//           headers: {

//             "Content-Type": "application/json",

//           },

//           body: JSON.stringify(input),

//         }

//       );



//       const data = await response.json();



//       if (!response.ok || !data.success) {

//         throw new Error(

//           data.error || "Unable to generate campaign options."

//         );

//       }



//       if (

//         !Array.isArray(data.campaignOptions) ||

//         data.campaignOptions.length !== 3

//       ) {

//         throw new Error(

//           "The backend did not return three campaign options."

//         );

//       }



//       setCampaignChoices(data);

//       setCampaignInput(input);



//       const recommendedExists = data.campaignOptions.some(

//         (option) => option.id === data.recommendedOptionId

//       );



//       setSelectedOptionId(

//         recommendedExists

//           ? data.recommendedOptionId

//           : data.campaignOptions[0].id

//       );

//     } catch (err) {

//       setError(err.message || "Something went wrong.");

//     } finally {

//       setLoading(false);

//     }

//   }



//   // ----------------------------------------

//   // STEP 2: Finalize the owner's choice

//   // ----------------------------------------



//   async function finalizeCampaign() {

//     if (!campaignChoices || !campaignInput || finalizing) {

//       return;

//     }



//     const selectedOption = campaignChoices.campaignOptions.find(

//       (option) => option.id === selectedOptionId

//     );



//     if (!selectedOption) {

//       setError("Please select a campaign strategy.");

//       return;

//     }



//     setFinalizing(true);

//     setError("");

//     setCampaign(null);

//     setEmailDraft({ subject: "", body: "" });

//     setDetailsConfirmed(false);

//     setDraftReviewed(false);



//     try {

//       const response = await fetch(

//         `${API_URL}/api/campaigns/finalize`,

//         {

//           method: "POST",

//           headers: {

//             "Content-Type": "application/json",

//           },

//           body: JSON.stringify({

//             ...campaignInput,

//             selectedOption,

//             research: campaignChoices.research,

//           }),

//         }

//       );



//       const data = await response.json();



//       if (!response.ok || !data.success) {

//         throw new Error(

//           data.error || "Unable to finalize the campaign."

//         );

//       }



//       if (!data.strategy || !data.strategy.email) {

//         throw new Error("The campaign response is incomplete.");

//       }



//       setCampaign(data);

//       // Create a new independently tracked campaign after successful finalization.
//       const newId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
//       const newEntry = {
//         id: newId,
//         createdAt: new Date().toISOString(),
//         input: campaignInput,
//         campaign: data,
//         emailDraft: {
//           subject: data.strategy.email.subject || "",
//           body: data.strategy.email.body || "",
//         },
//         tasks: (Array.isArray(data.strategy.timeline) ? data.strategy.timeline : []).map(
//           (step, index) => ({
//             id: `step-${index}`,
//             phase: String(step.phase || `Step ${index + 1}`),
//             action: String(step.action || "Review this campaign step"),
//             completed: false,
//           })
//         ),
//       };
//       saveTrackedCampaigns([newEntry, ...trackedCampaigns]);
//       setActiveCampaignId(newId);




//       setEmailDraft({

//         subject: data.strategy.email.subject || "",

//         body: data.strategy.email.body || "",

//       });

//     } catch (err) {

//       setError(err.message || "Something went wrong.");

//     } finally {

//       setFinalizing(false);

//     }

//   }



//   // ----------------------------------------

//   // Local draft review — no email sending

//   // ----------------------------------------



//   function reviewDraft() {

//     if (!detailsConfirmed || !campaign) return;



//     if (

//       !emailDraft.subject.trim() ||

//       !emailDraft.body.trim()

//     ) {

//       setError("Please complete the email draft.");

//       return;

//     }



//     setDraftReviewed(true);

//     window.alert(

//       "Draft reviewed locally. No emails have been sent."

//     );

//   }



//   function changeStrategy() {

//     setCampaign(null);

//     setEmailDraft({ subject: "", body: "" });

//     setDetailsConfirmed(false);

//     setDraftReviewed(false);

//     setError("");

//   }



//   // ----------------------------------------

//   // Derived campaign data

//   // ----------------------------------------



//   const strategy = campaign?.strategy;



//   const activeBudget =

//     Number(campaignInput?.budget ?? form.budget);



//   const budgetItems = strategy?.budgetBreakdown || [];



//   const allocatedBudget = budgetItems.reduce(

//     (total, item) => total + Number(item.amount || 0),

//     0

//   );



//   const remainingBudget = activeBudget - allocatedBudget;



//   const money = (amount) =>

//     Number(amount || 0).toLocaleString("en-CA", {

//       style: "currency",

//       currency: "CAD",

//     });



//   return (

//     <div className="app-shell">

//       {/* ====================================

//           SIDEBAR

//           ==================================== */}



//       <aside className="sidebar">

//         <div className="brand">

//           <div className="brand-icon">

//             <Sparkles size={22} />

//           </div>



//           <span>

//             LaunchLoop <span className="brand-ai">AI</span>

//           </span>

//         </div>



//         <div className="sidebar-label">WORKSPACE</div>



//         <nav className="navigation">

//           <button
//             type="button"
//             className={`nav-item ${activePage === "tracker" ? "active" : ""}`}
//             onClick={() => setActivePage("tracker")}
//           >
//             <ClipboardList size={18} />
//             Campaign Tracker
//           </button>

//           <button

//             type="button"

//             className={`nav-item ${

//               activePage === "studio" ? "active" : ""

//             }`}

//             onClick={() => setActivePage("studio")}

//           >

//             <LayoutDashboard size={18} />

//             Campaign Studio

//           </button>



//           <button

//             type="button"

//             className={`nav-item ${

//               activePage === "research" ? "active" : ""

//             }`}

//             onClick={() => setActivePage("research")}

//           >

//             <Search size={18} />

//             Competitor Research

//           </button>



//           <button

//             type="button"

//             className={`nav-item ${

//               activePage === "email" ? "active" : ""

//             }`}

//             onClick={() => setActivePage("email")}

//           >

//             <Mail size={18} />

//             Email Campaigns

//           </button>

//         </nav>



//         <div className="sidebar-footer">

//           <div className="status-dot" />

//           NVIDIA Nemotron + Tavily

//         </div>

//       </aside>



//       {/* ====================================

//           MAIN CONTENT

//           ==================================== */}



//       <main className="main-content">

//         <header className="topbar">

//           <span>

//             Workspace /{" "}

//             {activePage === "research"

//               ? "Competitor Research"

//               : activePage === "email"

//               ? "Email Campaigns"

//               : "Campaign Studio"}

//           </span>



//           <span className="topbar-badge">

//             Hackathon MVP

//           </span>

//         </header>



//         <div className="page-content">

//           {/* EXISTING COMPETITOR RESEARCH PAGE */}



//           {activePage === "research" ? (

//             <CompetitorResearch />

//           ) : activePage === "tracker" ? (
//             <CampaignTracker
//               campaigns={trackedCampaigns}
//               onTasksChange={updateCampaignTasks}
//               onOpenCampaign={openSavedCampaign}
//             />
//           ) : activePage === "email" ? (

//             /* EXISTING EMAIL CAMPAIGNS PAGE */



//             <EmailCampaigns

//               emailDraft={emailDraft}

//               setEmailDraft={(next) => {

//                 setEmailDraft(next);

//                 setDetailsConfirmed(false);

//                 setDraftReviewed(false);

//               }}

//               updateEmailDraft={updateEmailDraft}

//               campaign={campaign}

//               detailsConfirmed={detailsConfirmed}

//               setDetailsConfirmed={(value) => {

//                 setDetailsConfirmed(value);

//                 if (!value) setDraftReviewed(false);

//               }}

//               draftReviewed={draftReviewed}

//               reviewDraft={reviewDraft}

//               remainingBudget={remainingBudget}

//               onBack={() => setActivePage("studio")}

//             />

//           ) : (

//             <>

//               {/* CAMPAIGN STUDIO HEADER */}



//               <div className="page-heading">

//                 <div className="eyebrow">

//                   <Sparkles size={15} />

//                   AI-POWERED MARKETING

//                 </div>



//                 <h1>Campaign Studio</h1>



//                 <p>

//                   Explore three marketing strategies,

//                   select your favorite, and build an

//                   actionable campaign.

//                 </p>

//               </div>



//               <div className="workspace-grid">

//                 {/* ================================

//                     RESTAURANT FORM

//                     ================================ */}



//                 <section className="panel">

//                   <div className="panel-heading">

//                     <h2>Create a campaign</h2>

//                     <p>

//                       Tell our AI what you want to achieve.

//                     </p>

//                   </div>



//                   <form onSubmit={generateCampaign}>

//                     <label htmlFor="restaurantName">

//                       Restaurant name

//                     </label>



//                     <input

//                       id="restaurantName"

//                       required

//                       placeholder="e.g. Spice Garden"

//                       value={form.restaurantName}

//                       onChange={(event) =>

//                         updateForm(

//                           "restaurantName",

//                           event.target.value

//                         )

//                       }

//                     />



//                     <label htmlFor="location">

//                       Location

//                     </label>



//                     <input

//                       id="location"

//                       required

//                       placeholder="e.g. Toronto, Ontario"

//                       value={form.location}

//                       onChange={(event) =>

//                         updateForm(

//                           "location",

//                           event.target.value

//                         )

//                       }

//                     />



//                     <label htmlFor="goal">

//                       Marketing goal

//                     </label>



//                     <textarea

//                       id="goal"

//                       rows={4}

//                       required

//                       placeholder="e.g. Attract more weekend customers"

//                       value={form.goal}

//                       onChange={(event) =>

//                         updateForm(

//                           "goal",

//                           event.target.value

//                         )

//                       }

//                     />



//                     <label htmlFor="budget">

//                       Marketing budget (CAD)

//                     </label>



//                     <input

//                       id="budget"

//                       type="number"

//                       min="1"

//                       step="0.01"

//                       required

//                       value={form.budget}

//                       onChange={(event) =>

//                         updateForm(

//                           "budget",

//                           Number(event.target.value)

//                         )

//                       }

//                     />



//                     <button

//                       type="submit"

//                       className="generate-button"

//                       disabled={loading || finalizing}

//                     >

//                       {loading ? (

//                         <>

//                           <LoaderCircle

//                             size={18}

//                             className="spinner"

//                           />

//                           Generating 3 strategies...

//                         </>

//                       ) : (

//                         <>

//                           <Sparkles size={18} />

//                           Explore 3 Strategies

//                           <ArrowRight size={17} />

//                         </>

//                       )}

//                     </button>

//                   </form>

//                 </section>



//                 {/* ================================

//                     RESULTS PANEL

//                     ================================ */}



//                 <section className="panel results-panel">

//                   <div className="panel-heading">

//                     <div className="result-title-row">

//                       <h2>Campaign preview</h2>



//                       {campaign && (

//                         <span className="draft-badge">

//                           Draft

//                         </span>

//                       )}

//                     </div>



//                     <p>

//                       AI-generated strategies and campaign

//                       recommendations.

//                     </p>

//                   </div>



//                   {error && (

//                     <div className="error-box" role="alert">

//                       {error}

//                     </div>

//                   )}



//                   {/* EMPTY STATE */}



//                   {!campaignChoices &&

//                     !campaign &&

//                     !loading && (

//                       <div className="empty-state">

//                         <div className="empty-icon">

//                           <Sparkles size={30} />

//                         </div>



//                         <h3>

//                           Your next campaign starts here

//                         </h3>



//                         <p>

//                           Enter your restaurant details to

//                           explore three marketing strategies.

//                         </p>

//                       </div>

//                     )}



//                   {/* GENERATION LOADING */}



//                   {loading && (

//                     <div className="empty-state">

//                       <LoaderCircle

//                         size={32}

//                         className="spinner"

//                       />



//                       <h3>

//                         Finding marketing opportunities...

//                       </h3>



//                       <p>

//                         Tavily is researching competitors,

//                         and Nemotron is preparing your

//                         campaign options.

//                       </p>

//                     </div>

//                   )}



//                   {/* ================================

//                       THREE CAMPAIGN OPTIONS

//                       ================================ */}



//                   {campaignChoices && !campaign && (

//                     <div className="campaign-options-section">

//                       <div className="campaign-options-heading">

//                         <div>

//                           <h3>

//                             Choose Your Marketing Strategy

//                           </h3>



//                           <p>

//                             Compare three approaches before

//                             creating the full campaign.

//                           </p>

//                         </div>



//                         <span className="draft-badge">

//                           3 AI Options

//                         </span>

//                       </div>



//                       <div className="ai-recommendation-box">

//                         <div className="ai-recommendation-title">

//                           <Sparkles size={18} />

//                           Nemotron's Recommendation

//                         </div>



//                         <p>

//                           {

//                             campaignChoices.recommendationReason

//                           }

//                         </p>



//                         <small>

//                           Verify competitor claims and

//                           business assumptions before acting.

//                         </small>

//                       </div>



//                       <div className="campaign-option-list">

//                         {campaignChoices.campaignOptions.map(

//                           (option) => {

//                             const isSelected =

//                               selectedOptionId === option.id;



//                             const isRecommended =

//                               campaignChoices.recommendedOptionId ===

//                               option.id;



//                             return (

//                               <button

//                                 key={option.id}

//                                 type="button"

//                                 className={`campaign-option-card ${

//                                   isSelected ? "selected" : ""

//                                 }`}

//                                 aria-pressed={isSelected}

//                                 disabled={finalizing}

//                                 onClick={() => {

//                                   setSelectedOptionId(option.id);

//                                   setError("");

//                                 }}

//                               >

//                                 <div className="campaign-option-top">

//                                   <div className="campaign-option-title">

//                                     <span className="campaign-option-radio">

//                                       {isSelected ? "●" : "○"}

//                                     </span>



//                                     <strong>

//                                       {option.name}

//                                     </strong>

//                                   </div>



//                                   {isRecommended && (

//                                     <span className="ai-pick-badge">

//                                       <Sparkles size={13} />

//                                       AI Pick

//                                     </span>

//                                   )}

//                                 </div>



//                                 <p className="campaign-option-summary">

//                                   {option.summary}

//                                 </p>



//                                 <div className="campaign-option-details">

//                                   <div>

//                                     <span>Goal</span>

//                                     <p>{option.goal}</p>

//                                   </div>



//                                   <div>

//                                     <span>Target Audience</span>

//                                     <p>

//                                       {option.targetAudience}

//                                     </p>

//                                   </div>



//                                   <div>

//                                     <span>Approach</span>

//                                     <p>{option.approach}</p>

//                                   </div>

//                                 </div>



//                                 <p className="campaign-option-reason">

//                                   <strong>

//                                     Why this could work:

//                                   </strong>{" "}

//                                   {option.reasoning}

//                                 </p>



//                                 <div className="campaign-option-footer">

//                                   <span>

//                                     Available campaign budget

//                                   </span>



//                                   <strong>

//                                     {money(option.budget)}

//                                   </strong>

//                                 </div>

//                               </button>

//                             );

//                           }

//                         )}

//                       </div>



//                       <button

//                         type="button"

//                         className="generate-button"

//                         disabled={

//                           !selectedOptionId || finalizing

//                         }

//                         onClick={finalizeCampaign}

//                       >

//                         {finalizing ? (

//                           <>

//                             <LoaderCircle

//                               size={18}

//                               className="spinner"

//                             />

//                             Creating your campaign...

//                           </>

//                         ) : (

//                           <>

//                             <Sparkles size={18} />

//                             Generate Selected Campaign

//                             <ArrowRight size={17} />

//                           </>

//                         )}

//                       </button>



//                       <p className="campaign-options-note">

//                         No advertising budget is spent,

//                         and no emails are sent.

//                       </p>

//                     </div>

//                   )}



//                   {/* ================================

//                       FINAL DETAILED CAMPAIGN

//                       ================================ */}



//                   {strategy && (

//                     <div className="structured-results">

//                       <div className="notice">

//                         <AlertTriangle size={18} />



//                         <span>

//                           AI-generated recommendations.

//                           Verify prices, offers, dates, and

//                           competitor information before use.

//                         </span>

//                       </div>



//                       {/* SELECTED OPTION */}



//                       {campaign.selectedOption && (

//                         <div className="result-section">

//                           <h3>

//                             <Sparkles size={18} />

//                             Selected Strategy

//                           </h3>



//                           <div className="offer-box">

//                             <strong>

//                               {campaign.selectedOption.name}

//                             </strong>



//                             <p>

//                               {

//                                 campaign.selectedOption.summary

//                               }

//                             </p>

//                           </div>



//                           <button

//                             type="button"

//                             className="change-strategy-button"

//                             onClick={changeStrategy}

//                           >

//                             Choose a Different Strategy

//                           </button>

//                         </div>

//                       )}



//                       {activeCampaignId && (
//                         <button
//                           type="button"
//                           className="tracker-open-button"
//                           onClick={() => setActivePage("tracker")}
//                         >
//                           <ClipboardList size={18} />
//                           Track Campaign Progress
//                           <ArrowRight size={16} />
//                         </button>
//                       )}

//                       {/* TARGET AUDIENCE */}



//                       <div className="result-section">

//                         <h3>

//                           <Users size={18} />

//                           Target Audience

//                         </h3>



//                         <p>{strategy.targetAudience}</p>

//                       </div>



//                       {/* COMPETITOR INSIGHTS */}



//                       <div className="result-section">

//                         <h3>

//                           <Search size={18} />

//                           Competitor Insights

//                         </h3>



//                         <p>{strategy.competitorInsights}</p>

//                       </div>



//                       {/* SUGGESTED PROMOTION */}



//                       <div className="result-section">

//                         <h3>

//                           <Target size={18} />

//                           Suggested Promotion

//                         </h3>



//                         <div className="offer-box">

//                           {strategy.promotionalOffer}

//                         </div>

//                       </div>



//                       {/* ==========================

//                           NEW: CAMPAIGN TIMELINE

//                           ========================== */}



//                       {Array.isArray(strategy.timeline) &&

//                         strategy.timeline.length > 0 && (

//                           <div className="result-section">

//                             <h3>

//                               <CalendarDays size={18} />

//                               Campaign Execution Plan

//                             </h3>



//                             <p className="campaign-duration">

//                               Suggested duration:{" "}

//                               <strong>

//                                 {strategy.durationDays} days

//                               </strong>

//                             </p>



//                             <div className="campaign-timeline">

//                               {strategy.timeline.map(

//                                 (step, index) => (

//                                   <div

//                                     className="timeline-step"

//                                     key={index}

//                                   >

//                                     <div className="timeline-number">

//                                       {index + 1}

//                                     </div>



//                                     <div>

//                                       <strong>

//                                         {step.phase}

//                                       </strong>



//                                       <p>{step.action}</p>

//                                     </div>

//                                   </div>

//                                 )

//                               )}

//                             </div>

//                           </div>

//                         )}



//                       {/* ==========================

//                           NEW: SUCCESS METRICS

//                           ========================== */}



//                       {Array.isArray(strategy.successMetrics) &&

//                         strategy.successMetrics.length > 0 && (

//                           <div className="result-section">

//                             <h3>

//                               <BarChart3 size={18} />

//                               Success Metrics to Track

//                             </h3>



//                             <div className="success-metrics-grid">

//                               {strategy.successMetrics.map(

//                                 (metric, index) => (

//                                   <div

//                                     className="success-metric-card"

//                                     key={index}

//                                   >

//                                     <span>

//                                       METRIC {index + 1}

//                                     </span>



//                                     <strong>{metric}</strong>



//                                     <small>

//                                       Not tracked yet

//                                     </small>

//                                   </div>

//                                 )

//                               )}

//                             </div>

//                           </div>

//                         )}



//                       {/* ==========================

//                           BUDGET BREAKDOWN

//                           ========================== */}



//                       <div className="result-section">

//                         <h3>

//                           <Wallet size={18} />

//                           Budget Breakdown

//                         </h3>



//                         <div className="budget-table-wrapper">

//                           <table className="budget-table">

//                             <thead>

//                               <tr>

//                                 <th>Activity</th>

//                                 <th>Amount</th>

//                                 <th>Reason</th>

//                               </tr>

//                             </thead>



//                             <tbody>

//                               {budgetItems.map(

//                                 (item, index) => (

//                                   <tr key={index}>

//                                     <td>{item.item}</td>

//                                     <td>

//                                       {money(item.amount)}

//                                     </td>

//                                     <td>{item.reason}</td>

//                                   </tr>

//                                 )

//                               )}

//                             </tbody>

//                           </table>

//                         </div>



//                         {/* NEW: BUDGET BARS */}



//                         <div className="budget-visualization">

//                           {budgetItems.map((item, index) => {

//                             const percentage =

//                               activeBudget > 0

//                                 ? (Number(item.amount) /

//                                     activeBudget) *

//                                   100

//                                 : 0;



//                             const width = Math.min(

//                               100,

//                               Math.max(0, percentage)

//                             );



//                             return (

//                               <div

//                                 className="budget-bar-item"

//                                 key={index}

//                               >

//                                 <div className="budget-bar-label">

//                                   <span>{item.item}</span>



//                                   <strong>

//                                     {money(item.amount)}

//                                   </strong>

//                                 </div>



//                                 <div

//                                   className="budget-bar-track"

//                                   role="progressbar"

//                                   aria-label={`${item.item} allocation`}

//                                   aria-valuemin={0}

//                                   aria-valuemax={100}

//                                   aria-valuenow={width}

//                                 >

//                                   <div

//                                     className="budget-bar-fill"

//                                     style={{

//                                       width: `${width}%`,

//                                     }}

//                                   />

//                                 </div>

//                               </div>

//                             );

//                           })}

//                         </div>



//                         <div className="budget-summary">

//                           <div>

//                             <span>Allocated</span>



//                             <strong>

//                               {money(allocatedBudget)}

//                             </strong>

//                           </div>



//                           <div>

//                             <span>Remaining</span>



//                             <strong>

//                               {money(remainingBudget)}

//                             </strong>

//                           </div>

//                         </div>



//                         {remainingBudget < -0.01 && (

//                           <div className="error-box">

//                             The campaign exceeds the budget.

//                           </div>

//                         )}

//                       </div>



//                       {/* EMAIL EDITOR */}



//                       <div className="result-section">

//                         <h3>

//                           <Mail size={18} />

//                           Email Campaign

//                         </h3>



//                         <div className="email-editor">

//                           <div className="email-editor-heading">

//                             <Pencil size={16} />

//                             Edit your email draft

//                           </div>



//                           <label htmlFor="emailSubject">

//                             Subject line

//                           </label>



//                           <input

//                             id="emailSubject"

//                             value={emailDraft.subject}

//                             onChange={(event) =>

//                               updateEmailDraft(

//                                 "subject",

//                                 event.target.value

//                               )

//                             }

//                           />



//                           <label htmlFor="emailBody">

//                             Email body

//                           </label>



//                           <textarea

//                             id="emailBody"

//                             rows={12}

//                             value={emailDraft.body}

//                             onChange={(event) =>

//                               updateEmailDraft(

//                                 "body",

//                                 event.target.value

//                               )

//                             }

//                           />

//                         </div>

//                       </div>



//                       {/* WARNINGS */}



//                       {strategy.warnings?.length > 0 && (

//                         <div className="result-section">

//                           <h3>

//                             <AlertTriangle size={18} />

//                             Things to Verify

//                           </h3>



//                           <ul className="warning-list">

//                             {strategy.warnings.map(

//                               (warning, index) => (

//                                 <li key={index}>

//                                   {warning}

//                                 </li>

//                               )

//                             )}

//                           </ul>

//                         </div>

//                       )}



//                       {/* RESEARCH SOURCES */}



//                       {Array.isArray(campaign.research) &&

//                         campaign.research.length > 0 && (

//                           <div className="result-section">

//                             <h3>

//                               <ExternalLink size={18} />

//                               Research Sources

//                             </h3>



//                             <div className="research-list">

//                               {campaign.research.map(

//                                 (source, index) =>

//                                   typeof source.url ===

//                                     "string" &&

//                                   /^https?:\/\//i.test(

//                                     source.url

//                                   ) ? (

//                                     <a

//                                       key={index}

//                                       href={source.url}

//                                       target="_blank"

//                                       rel="noopener noreferrer"

//                                       className="research-source"

//                                     >

//                                       <Search size={15} />



//                                       <span>

//                                         {source.title ||

//                                           source.url}

//                                       </span>



//                                       <ExternalLink

//                                         size={15}

//                                       />

//                                     </a>

//                                   ) : null

//                               )}

//                             </div>

//                           </div>

//                         )}



//                       {/* LOCAL EMAIL REVIEW */}



//                       <div className="approval-section">

//                         <label className="confirmation-row">

//                           <input

//                             type="checkbox"

//                             checked={detailsConfirmed}

//                             onChange={(event) => {

//                               setDetailsConfirmed(

//                                 event.target.checked

//                               );

//                               setDraftReviewed(false);

//                             }}

//                           />



//                           <span>

//                             I have checked the promotion,

//                             email, and business details.

//                           </span>

//                         </label>



//                         <button

//                           type="button"

//                           className="review-button"

//                           disabled={

//                             !detailsConfirmed ||

//                             draftReviewed ||

//                             remainingBudget < -0.01 ||

//                             !emailDraft.subject.trim() ||

//                             !emailDraft.body.trim()

//                           }

//                           onClick={reviewDraft}

//                         >

//                           <CheckCircle2 size={18} />



//                           {draftReviewed

//                             ? "Draft Reviewed"

//                             : "Mark Draft as Reviewed"}

//                         </button>



//                         {draftReviewed && (

//                           <p className="review-success">

//                             Draft reviewed locally.

//                             No emails have been sent.

//                           </p>

//                         )}



//                         <p className="approval-note">

//                           Reviewing a draft does not send

//                           an email or launch the campaign.

//                         </p>

//                       </div>

//                     </div>

//                   )}

//                 </section>

//               </div>

//             </>

//           )}

//         </div>

//       </main>

//     </div>

//   );

// }



// export default App;

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



const API_URL =

  import.meta.env.VITE_API_URL || "http://localhost:5000";



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

  function updateCampaignTasks(id, tasks) {
    saveTrackedCampaigns(trackedCampaigns.map((item) =>
      item.id === id ? { ...item, tasks } : item
    ));
  }

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




  function updateForm(field, value) {

    setForm((previous) => ({

      ...previous,

      [field]: value,

    }));

  }



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



  const activeBudget =

    Number(campaignInput?.budget ?? form.budget);



  const budgetItems = strategy?.budgetBreakdown || [];



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



          {activePage === "research" ? (

            <CompetitorResearch />

          ) : activePage === "history" ? (
            <CampaignHistory
              campaigns={trackedCampaigns}
              onOpenCampaign={openSavedCampaign}
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
