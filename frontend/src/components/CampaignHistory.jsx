
/**
 * LaunchLoop AI - Campaign History
 *
 * Displays previously saved marketing campaigns so restaurant
 * owners can review their strategies without regenerating them.
 *
 * Features:
 * - Saved campaign information and creation dates
 * - Marketing budgets and execution progress
 * - Campaign completion status
 * - Open and track campaign actions
 * - Delete individual campaigns with confirmation
 *
 * Campaign data is managed by the parent component and
 * stored locally in the user's browser for the MVP.
 */

import {
  ArrowRight,
  CalendarDays,
  FolderOpen,
  History,
  ListChecks,
  Plus,
  Trash2,
  Wallet
} from "lucide-react";

/**
 * Calculate execution progress for a saved campaign.
 *
 * @param {Array} tasks - Campaign execution tasks.
 * @returns {Object} Completed count, percentage, total,
 *                   and campaign execution status.
 */
function getProgress(tasks = []) {
  // Support missing or invalid task arrays.
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const completed = safeTasks.filter(
    (task) => task?.completed
  ).length;

  const percent = safeTasks.length
    ? Math.round((completed / safeTasks.length) * 100)
    : 0;

  return {
    completed,
    percent,
    total: safeTasks.length,
    status:
      safeTasks.length && completed === safeTasks.length
        ? "Completed"
        : completed
          ? "In Progress"
          : "Not Started"
  };
}

/**
 * Campaign History page.
 *
 * @param {Array} campaigns - Previously saved campaigns.
 * @param {Function} onOpenCampaign - Opens a selected campaign.
 * @param {Function} onTrackCampaign - Opens campaign tracking.
 * @param {Function} onNewCampaign - Starts a new campaign.
 * @param {Function} onDeleteCampaign - Deletes a saved campaign by ID.
 */
export default function CampaignHistory({
  campaigns = [],
  onOpenCampaign,
  onTrackCampaign,
  onNewCampaign,
  onDeleteCampaign
}) {

  /**
   * Confirm the deletion of a selected campaign.
   *
   * The parent component is responsible for updating
   * application state and browser storage.
   *
   * @param {Object} item - Campaign to delete.
   */
  function handleDeleteCampaign(item) {
    const name =
      item.campaign?.selectedOption?.name ||
      "Marketing Campaign";

    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\n` +
      "This will permanently remove the saved campaign " +
      "and its tracking progress from this browser."
    );

    if (!confirmed) {
      return;
    }

    if (typeof onDeleteCampaign === "function") {
      onDeleteCampaign(item.id);
    }
  }

  return (
    <div className="history-page">

      {/* Page heading and new campaign action */}
      <div className="history-header">
        <div className="page-heading">
          <div className="eyebrow">
            <History size={15} />
            SAVED CAMPAIGNS
          </div>

          <h1>Campaign History</h1>

          <p>
            Reopen your finalized campaigns without regenerating
            strategies or using AI tokens.
          </p>
        </div>

        <button
          className="history-new-button"
          type="button"
          onClick={onNewCampaign}
        >
          <Plus size={17} />
          New Campaign
        </button>
      </div>

      {/* Empty state when there are no saved campaigns */}
      {!campaigns.length ? (
        <section className="panel history-empty">
          <FolderOpen size={34} />

          <h2>No saved campaigns yet</h2>

          <p>
            Generate three strategies, choose one, and finalize it
            in Campaign Studio. It will appear here automatically.
          </p>

          <button
            className="history-new-button"
            type="button"
            onClick={onNewCampaign}
          >
            Create Your First Campaign
            <ArrowRight size={16} />
          </button>
        </section>
      ) : (
        <>
          {/* Total number of saved campaigns */}
          <p className="history-count">
            {campaigns.length} saved{" "}
            {campaigns.length === 1
              ? "campaign"
              : "campaigns"}
            {" "}· Stored in this browser
          </p>

          {/* Saved campaign cards */}
          <div className="history-grid">
            {campaigns.map((item) => {

              // Calculate execution progress.
              const {
                completed,
                percent,
                total,
                status
              } = getProgress(item.tasks);

              // Campaign title.
              const name =
                item.campaign?.selectedOption?.name ||
                "Marketing Campaign";

              // Campaign creation date.
              const date =
                item.createdAt &&
                !Number.isNaN(Date.parse(item.createdAt))
                  ? new Date(item.createdAt).toLocaleDateString(
                      "en-CA",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      }
                    )
                  : "Date unavailable";

              // Saved marketing budget.
              const budget = Number(item.input?.budget);

              return (
                <article
                  className="panel history-card"
                  key={item.id}
                >

                  {/* Date and campaign status */}
                  <div className="history-card-top">
                    <span className="history-date">
                      <CalendarDays size={14} />
                      {date}
                    </span>

                    <span
                      className={`history-status ${status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Campaign name */}
                  <h2>{name}</h2>

                  {/* Restaurant information */}
                  <p className="history-restaurant">
                    {item.input?.restaurantName || "Restaurant"}
                    {" "}·{" "}
                    {item.input?.location || "Location not set"}
                  </p>

                  {/* Marketing strategy summary */}
                  <p className="history-summary">
                    {item.campaign?.selectedOption?.summary ||
                      "Saved marketing strategy"}
                  </p>

                  {/* Campaign marketing budget */}
                  {Number.isFinite(budget) && (
                    <p className="history-budget">
                      <Wallet size={15} />
                      Budget:{" "}
                      {budget.toLocaleString("en-CA", {
                        style: "currency",
                        currency: "CAD"
                      })}
                    </p>
                  )}

                  {/* Execution progress */}
                  <div className="history-progress-label">
                    <span>Execution progress</span>
                    <strong>{percent}%</strong>
                  </div>

                  <div
                    className="history-progress-track"
                    role="progressbar"
                    aria-label={`${name} completion`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percent}
                  >
                    <div
                      className="history-progress-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Completed task count */}
                  <p className="history-tasks">
                    {completed} of {total} tasks completed
                  </p>

                  {/* Campaign actions */}
                  <div className="history-actions">

                    {/* Open saved campaign */}
                    <button
                      type="button"
                      className="history-open-button"
                      onClick={() => onOpenCampaign(item.id)}
                    >
                      Open Campaign
                      <ArrowRight size={16} />
                    </button>

                    {/* Open campaign tracker */}
                    <button
                      type="button"
                      className="history-track-button"
                      onClick={onTrackCampaign}
                    >
                      <ListChecks size={16} />
                      Track
                    </button>

                    {/* Delete individual campaign */}
                    <button
                      type="button"
                      className="history-delete-button"
                      onClick={() => handleDeleteCampaign(item)}
                      disabled={
                        typeof onDeleteCampaign !== "function"
                      }
                      aria-label={`Delete ${name}`}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {/* Explain browser-based MVP storage limitations */}
      <p className="history-footnote">
        Campaigns are saved only in this browser. Clearing site
        data or switching devices may remove access. No emails
        or ads are sent automatically.
      </p>
    </div>
  );
}
