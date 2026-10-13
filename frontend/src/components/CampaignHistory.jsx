import { ArrowRight, CalendarDays, FolderOpen, History, ListChecks, Plus, Wallet } from "lucide-react";

function getProgress(tasks = []) {
  const completed = tasks.filter((task) => task.completed).length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  return { completed, percent, total: tasks.length, status: tasks.length && completed === tasks.length ? "Completed" : completed ? "In Progress" : "Not Started" };
}

export default function CampaignHistory({ campaigns = [], onOpenCampaign, onTrackCampaign, onNewCampaign }) {
  return (
    <div className="history-page">
      <div className="history-header">
        <div className="page-heading">
          <div className="eyebrow"><History size={15} /> SAVED CAMPAIGNS</div>
          <h1>Campaign History</h1>
          <p>Reopen your finalized campaigns without regenerating strategies or using AI tokens.</p>
        </div>
        <button className="history-new-button" type="button" onClick={onNewCampaign}><Plus size={17} /> New Campaign</button>
      </div>

      {!campaigns.length ? (
        <section className="panel history-empty">
          <FolderOpen size={34} />
          <h2>No saved campaigns yet</h2>
          <p>Generate three strategies, choose one, and finalize it in Campaign Studio. It will appear here automatically.</p>
          <button className="history-new-button" type="button" onClick={onNewCampaign}>Create Your First Campaign <ArrowRight size={16} /></button>
        </section>
      ) : (
        <>
          <p className="history-count">{campaigns.length} saved {campaigns.length === 1 ? "campaign" : "campaigns"} · Stored in this browser</p>
          <div className="history-grid">
            {campaigns.map((item) => {
              const { completed, percent, total, status } = getProgress(item.tasks);
              const name = item.campaign?.selectedOption?.name || "Marketing Campaign";
              const date = item.createdAt && !Number.isNaN(Date.parse(item.createdAt))
                ? new Date(item.createdAt).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })
                : "Date unavailable";
              const budget = Number(item.input?.budget);
              return (
                <article className="panel history-card" key={item.id}>
                  <div className="history-card-top">
                    <span className="history-date"><CalendarDays size={14} /> {date}</span>
                    <span className={`history-status ${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>
                  </div>
                  <h2>{name}</h2>
                  <p className="history-restaurant">{item.input?.restaurantName || "Restaurant"} · {item.input?.location || "Location not set"}</p>
                  <p className="history-summary">{item.campaign?.selectedOption?.summary || "Saved marketing strategy"}</p>
                  {Number.isFinite(budget) && <p className="history-budget"><Wallet size={15} /> Budget: {budget.toLocaleString("en-CA", { style: "currency", currency: "CAD" })}</p>}
                  <div className="history-progress-label"><span>Execution progress</span><strong>{percent}%</strong></div>
                  <div className="history-progress-track" role="progressbar" aria-label={`${name} completion`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
                    <div className="history-progress-fill" style={{ width: `${percent}%` }} />
                  </div>
                  <p className="history-tasks">{completed} of {total} tasks completed</p>
                  <div className="history-actions">
                    <button type="button" className="history-open-button" onClick={() => onOpenCampaign(item.id)}>Open Campaign <ArrowRight size={16} /></button>
                    <button type="button" className="history-track-button" onClick={onTrackCampaign}><ListChecks size={16} /> Track</button>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
      <p className="history-footnote">Campaigns are saved only in this browser. Clearing site data or switching devices may remove access. No emails or ads are sent automatically.</p>
    </div>
  );
}
