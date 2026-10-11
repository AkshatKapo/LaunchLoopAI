import { ArrowLeft, Mail, Pencil, ShieldCheck, CheckCircle2 } from "lucide-react";

// This page uses the same email draft as Campaign Studio.
// Editing the draft automatically resets the review confirmation.
export default function EmailCampaigns({
  emailDraft,
  updateEmailDraft,
  campaign,
  detailsConfirmed,
  setDetailsConfirmed,
  remainingBudget,
  reviewDraft,
  onBack,
}) {
  const hasDraft = Boolean(campaign?.strategy?.email);
  const canReview = hasDraft && detailsConfirmed && remainingBudget >= 0 &&
    emailDraft.subject.trim() && emailDraft.body.trim();

  return (
    <div className="email-campaigns-page">
      <div className="page-heading">
        <div className="eyebrow"><Mail size={15} /> EMAIL AUTOMATION</div>
        <h1>Email Campaigns</h1>
        <p>Review and prepare your AI-generated promotional email.</p>
      </div>

      {!hasDraft ? (
        <section className="panel">
          <h2>No email draft yet</h2>
          <p>Generate a campaign in Campaign Studio first.</p>
          <button type="button" className="generate-button" onClick={onBack}>
            <ArrowLeft size={18} /> Go to Campaign Studio
          </button>
        </section>
      ) : (
        <section className="panel">
          <div className="panel-heading">
            <h2><Pencil size={18} /> Edit campaign email</h2>
            <p>Generated for {campaign.strategy?.restaurantName || "your restaurant"}.</p>
          </div>

          <div className="email-editor">
            <label htmlFor="campaignEmailSubject">Subject line</label>
            <input
              id="campaignEmailSubject"
              value={emailDraft.subject}
              onChange={(e) => updateEmailDraft("subject", e.target.value)}
            />
            <label htmlFor="campaignEmailBody">Email body</label>
            <textarea
              id="campaignEmailBody"
              rows={14}
              value={emailDraft.body}
              onChange={(e) => updateEmailDraft("body", e.target.value)}
            />
          </div>

          <div className="email-review-notice">
            <ShieldCheck size={19} />
            <span>Verify all prices, offers, dates, and business details before approval.
              This page does not send emails.</span>
          </div>

          {remainingBudget < 0 && (
            <div className="error-box">The proposed campaign exceeds the budget.</div>
          )}

          <div className="approval-section">
            <label className="confirmation-row">
              <input
                type="checkbox"
                checked={detailsConfirmed}
                onChange={(e) => setDetailsConfirmed(e.target.checked)}
              />
              <span>I have checked the promotion and email details.</span>
            </label>
            <button
              type="button"
              className="review-button"
              disabled={!canReview}
              onClick={reviewDraft}
            >
              <CheckCircle2 size={18} /> Mark Draft as Reviewed
            </button>
            <p className="approval-note">Local review only. No emails are sent.</p>
          </div>
        </section>
      )}
    </div>
  );
}
