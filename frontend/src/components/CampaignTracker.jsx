// import { useState } from "react";
// import { ClipboardList, CheckCircle2, ArrowRight, CalendarDays } from "lucide-react";

// // This tracker never makes AI requests. It uses the campaign timeline already generated.
// export default function CampaignTracker({ campaigns = [], onTasksChange, onOpenCampaign }) {
//   const [selectedId, setSelectedId] = useState("");
//   const selected = campaigns.find((campaign) => campaign.id === selectedId) || campaigns[0];
//   const tasks = selected?.tasks || [];
//   const completed = tasks.filter((task) => task.completed).length;
//   const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
//   const status = tasks.length === 0 || completed === 0
//     ? "Not Started"
//     : completed === tasks.length ? "Completed" : "In Progress";

//   function toggleTask(taskId, checked) {
//     if (!selected) return;
//     onTasksChange(selected.id, tasks.map((task) =>
//       task.id === taskId ? { ...task, completed: checked } : task
//     ));
//   }

//   return (
//     <div className="tracker-page">
//       <div className="page-heading">
//         <div className="eyebrow"><ClipboardList size={15} /> CAMPAIGN MANAGEMENT</div>
//         <h1>Campaign Tracker</h1>
//         <p>Follow your AI-generated execution plan and save your progress.</p>
//       </div>

//       {campaigns.length === 0 ? (
//         <section className="panel tracker-empty">
//           <ClipboardList size={32} />
//           <h2>No campaigns to track yet</h2>
//           <p>Finalize a marketing strategy in Campaign Studio to create its checklist.</p>
//         </section>
//       ) : (
//         <div className="tracker-layout">
//           <section className="panel tracker-campaign-list">
//             <h2>Your Campaigns</h2>
//             <p className="tracker-muted">Select a campaign to manage its progress.</p>
//             {campaigns.map((item) => {
//               const total = item.tasks?.length || 0;
//               const done = (item.tasks || []).filter((task) => task.completed).length;
//               return (
//                 <button
//                   type="button"
//                   key={item.id}
//                   className={`tracker-campaign-choice ${selected?.id === item.id ? "selected" : ""}`}
//                   onClick={() => setSelectedId(item.id)}
//                 >
//                   <strong>{item.campaign?.selectedOption?.name || "Marketing Campaign"}</strong>
//                   <span>{item.input?.restaurantName || "Restaurant"} · {done}/{total} steps</span>
//                 </button>
//               );
//             })}
//           </section>

//           <section className="panel tracker-details">
//             <div className="tracker-details-heading">
//               <div>
//                 <p className="tracker-kicker">CAMPAIGN OVERVIEW</p>
//                 <h2>{selected?.campaign?.selectedOption?.name || "Marketing Campaign"}</h2>
//                 <p className="tracker-muted">{selected?.input?.restaurantName} · {selected?.input?.location}</p>
//               </div>
//               <span className="tracker-status">{status}</span>
//             </div>

//             <div className="tracker-stats">
//               <div><span>Progress</span><strong>{percent}%</strong></div>
//               <div><span>Tasks completed</span><strong>{completed}/{tasks.length}</strong></div>
//               <div><span>Campaign status</span><strong className="tracker-stat-status">{status}</strong></div>
//             </div>

//             <div className="tracker-progress-heading"><strong>Execution progress</strong><span>{percent}%</span></div>
//             <div className="tracker-progress-track" role="progressbar" aria-label="Campaign completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
//               <div className="tracker-progress-fill" style={{ width: `${percent}%` }} />
//             </div>

//             <h3 className="tracker-checklist-title"><CalendarDays size={18} /> Execution Checklist</h3>
//             {tasks.length ? tasks.map((task) => (
//               <label className={`tracker-task ${task.completed ? "completed" : ""}`} key={task.id}>
//                 <input type="checkbox" checked={Boolean(task.completed)} onChange={(event) => toggleTask(task.id, event.target.checked)} />
//                 <span className="tracker-task-content">
//                   <strong>{task.phase}</strong>
//                   <span>{task.action}</span>
//                 </span>
//                 {task.completed && <CheckCircle2 size={20} className="tracker-check-icon" />}
//               </label>
//             )) : (
//               <p className="tracker-muted">This campaign has no timeline tasks. Generate a campaign with a timeline to track its progress.</p>
//             )}

//             <button type="button" className="tracker-open-button" onClick={() => onOpenCampaign(selected.id)}>
//               View Campaign Details <ArrowRight size={17} />
//             </button>
//             <p className="tracker-disclaimer">Progress is manually updated and saved in this browser. It does not launch ads or verify campaign results.</p>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { ClipboardList, CheckCircle2, ArrowRight, CalendarDays, BarChart3, Save } from "lucide-react";

// This tracker never makes AI requests. It uses the campaign timeline already generated.
export default function CampaignTracker({ campaigns = [], onTasksChange, onOpenCampaign }) {
  const [selectedId, setSelectedId] = useState("");
  // Performance results are separate from task progress and keyed by campaign ID.
  const [performanceByCampaign, setPerformanceByCampaign] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("launchloop-performance-v1") || "{}");
      return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
    } catch {
      return {};
    }
  });
  const selected = campaigns.find((campaign) => campaign.id === selectedId) || campaigns[0];
  const tasks = selected?.tasks || [];
  const completed = tasks.filter((task) => task.completed).length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const status = tasks.length === 0 || completed === 0
    ? "Not Started"
    : completed === tasks.length ? "Completed" : "In Progress";

  const metricNames = Array.isArray(selected?.campaign?.strategy?.successMetrics)
    ? selected.campaign.strategy.successMetrics.filter((name) => typeof name === "string")
    : [];
  const currentMetrics = selected ? (performanceByCampaign[selected.id] || {}) : {};

  function updateMetric(index, value) {
    if (!selected) return;
    const next = {
      ...performanceByCampaign,
      [selected.id]: { ...currentMetrics, [index]: value },
    };
    setPerformanceByCampaign(next);
    try {
      localStorage.setItem("launchloop-performance-v1", JSON.stringify(next));
    } catch {
      // The form still works if browser storage is unavailable or full.
    }
  }

  function toggleTask(taskId, checked) {
    if (!selected) return;
    onTasksChange(selected.id, tasks.map((task) =>
      task.id === taskId ? { ...task, completed: checked } : task
    ));
  }

  return (
    <div className="tracker-page">
      <div className="page-heading">
        <div className="eyebrow"><ClipboardList size={15} /> CAMPAIGN MANAGEMENT</div>
        <h1>Campaign Tracker</h1>
        <p>Follow your AI-generated execution plan and save your progress.</p>
      </div>

      {campaigns.length === 0 ? (
        <section className="panel tracker-empty">
          <ClipboardList size={32} />
          <h2>No campaigns to track yet</h2>
          <p>Finalize a marketing strategy in Campaign Studio to create its checklist.</p>
        </section>
      ) : (
        <div className="tracker-layout">
          <section className="panel tracker-campaign-list">
            <h2>Your Campaigns</h2>
            <p className="tracker-muted">Select a campaign to manage its progress.</p>
            {campaigns.map((item) => {
              const total = item.tasks?.length || 0;
              const done = (item.tasks || []).filter((task) => task.completed).length;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`tracker-campaign-choice ${selected?.id === item.id ? "selected" : ""}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <strong>{item.campaign?.selectedOption?.name || "Marketing Campaign"}</strong>
                  <span>{item.input?.restaurantName || "Restaurant"} · {done}/{total} steps</span>
                </button>
              );
            })}
          </section>

          <section className="panel tracker-details">
            <div className="tracker-details-heading">
              <div>
                <p className="tracker-kicker">CAMPAIGN OVERVIEW</p>
                <h2>{selected?.campaign?.selectedOption?.name || "Marketing Campaign"}</h2>
                <p className="tracker-muted">{selected?.input?.restaurantName} · {selected?.input?.location}</p>
              </div>
              <span className="tracker-status">{status}</span>
            </div>

            <div className="tracker-stats">
              <div><span>Progress</span><strong>{percent}%</strong></div>
              <div><span>Tasks completed</span><strong>{completed}/{tasks.length}</strong></div>
              <div><span>Campaign status</span><strong className="tracker-stat-status">{status}</strong></div>
            </div>

            <div className="tracker-progress-heading"><strong>Execution progress</strong><span>{percent}%</span></div>
            <div className="tracker-progress-track" role="progressbar" aria-label="Campaign completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
              <div className="tracker-progress-fill" style={{ width: `${percent}%` }} />
            </div>

            <h3 className="tracker-checklist-title"><CalendarDays size={18} /> Execution Checklist</h3>
            {tasks.length ? tasks.map((task) => (
              <label className={`tracker-task ${task.completed ? "completed" : ""}`} key={task.id}>
                <input type="checkbox" checked={Boolean(task.completed)} onChange={(event) => toggleTask(task.id, event.target.checked)} />
                <span className="tracker-task-content">
                  <strong>{task.phase}</strong>
                  <span>{task.action}</span>
                </span>
                {task.completed && <CheckCircle2 size={20} className="tracker-check-icon" />}
              </label>
            )) : (
              <p className="tracker-muted">This campaign has no timeline tasks. Generate a campaign with a timeline to track its progress.</p>
            )}

            <section className="tracker-performance">
              <h3><BarChart3 size={18} /> Campaign Performance</h3>
              <p className="tracker-muted">Enter your real campaign results below. These are manually recorded values, not automatically verified by advertising platforms.</p>
              {metricNames.length > 0 ? (
                <div className="tracker-metric-grid">
                  {metricNames.map((name, index) => (
                    <label className="tracker-metric-field" key={`${index}-${name}`}>
                      <span>{name}</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        maxLength={80}
                        placeholder="e.g. 120, 3.2%, $50"
                        value={currentMetrics[index] ?? ""}
                        onChange={(event) => updateMetric(index, event.target.value)}
                      />
                    </label>
                  ))}
                </div>
              ) : (
                <p className="tracker-muted">No suggested metrics were generated for this campaign.</p>
              )}
              <p className="tracker-save-note"><Save size={14} /> Results are saved automatically in this browser.</p>
            </section>

            <button type="button" className="tracker-open-button" onClick={() => onOpenCampaign(selected.id)}>
              View Campaign Details <ArrowRight size={17} />
            </button>
            <p className="tracker-disclaimer">Progress is manually updated and saved in this browser. It does not launch ads or verify campaign results.</p>
          </section>
        </div>
      )}
    </div>
  );
}
