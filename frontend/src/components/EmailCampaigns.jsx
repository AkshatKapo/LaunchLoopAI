
/**
 * LaunchLoop AI - Email Campaigns
 *
 * Provides a review interface for promotional emails generated
 * as part of a restaurant's AI-powered marketing campaign.
 *
 * Features:
 * - Display and edit an AI-generated email draft
 * - Validate that the campaign remains within budget
 * - Require owner confirmation before marking a draft as reviewed
 * - Navigate back to Campaign Studio
 *
 * This component shares its email draft and review state with
 * Campaign Studio through props managed by the parent component.
 *
 * Emails are not sent automatically. Review is a local action only.
 */

import {
  ArrowLeft,
  Mail,
  Pencil,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

/**
 * Email Campaigns component.
 *
 * @param {Object} emailDraft - Current email subject and body.
 * @param {Function} updateEmailDraft - Updates the email draft.
 * @param {Object} campaign - Generated marketing campaign.
 * @param {boolean} detailsConfirmed - Owner's review confirmation.
 * @param {Function} setDetailsConfirmed - Updates confirmation state.
 * @param {number} remainingBudget - Unallocated campaign budget.
 * @param {Function} reviewDraft - Marks the draft as reviewed.
 * @param {Function} onBack - Returns to Campaign Studio.
 */
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
  // Check whether the generated campaign contains an email draft.
  const hasDraft = Boolean(campaign?.strategy?.email);

  // Enable review only when the draft exists, the owner has
  // confirmed its details, the budget is valid, and both
  // email fields contain text.
  const canReview =
    hasDraft &&
    detailsConfirmed &&
    remainingBudget >= 0 &&
    emailDraft.subject.trim() &&
    emailDraft.body.trim();

  return (
    <div className="email-campaigns-page">

      {/* Page heading and description */}
      <div className="page-heading">
        <div className="eyebrow">
          <Mail size={15} /> EMAIL AUTOMATION
        </div>

        <h1>Email Campaigns</h1>

        <p>
          Review and prepare your AI-generated promotional email.
        </p>
      </div>

      {/* Show a message when no campaign email has been generated */}
      {!hasDraft ? (
        <section className="panel">
          <h2>No email draft yet</h2>

          <p>
            Generate a campaign in Campaign Studio first.
          </p>

          <button
            type="button"
            className="generate-button"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            Go to Campaign Studio
          </button>
        </section>
      ) : (
        <section className="panel">

          {/* Email editor heading */}
          <div className="panel-heading">
            <h2>
              <Pencil size={18} />
              Edit campaign email
            </h2>

            <p>
              Generated for{" "}
              {campaign.strategy?.restaurantName || "your restaurant"}.
            </p>
          </div>

          {/* Editable email subject and message body */}
          <div className="email-editor">

            <label htmlFor="campaignEmailSubject">
              Subject line
            </label>

            <input
              id="campaignEmailSubject"
              value={emailDraft.subject}
              onChange={(e) =>
                updateEmailDraft("subject", e.target.value)
              }
            />

            <label htmlFor="campaignEmailBody">
              Email body
            </label>

            <textarea
              id="campaignEmailBody"
              rows={14}
              value={emailDraft.body}
              onChange={(e) =>
                updateEmailDraft("body", e.target.value)
              }
            />
          </div>

          {/* Remind owners to verify AI-generated promotional details */}
          <div className="email-review-notice">
            <ShieldCheck size={19} />

            <span>
              Verify all prices, offers, dates, and business
              details before approval. This page does not send emails.
            </span>
          </div>

          {/* Warn the user if the proposed campaign exceeds its budget */}
          {remainingBudget < 0 && (
            <div className="error-box">
              The proposed campaign exceeds the budget.
            </div>
          )}

          {/* Owner confirmation and draft review actions */}
          <div className="approval-section">

            {/* Confirmation must be checked before review is enabled */}
            <label className="confirmation-row">
              <input
                type="checkbox"
                checked={detailsConfirmed}
                onChange={(e) =>
                  setDetailsConfirmed(e.target.checked)
                }
              />

              <span>
                I have checked the promotion and email details.
              </span>
            </label>

            {/* Mark the draft as reviewed without sending emails */}
            <button
              type="button"
              className="review-button"
              disabled={!canReview}
              onClick={reviewDraft}
            >
              <CheckCircle2 size={18} />
              Mark Draft as Reviewed
            </button>

            {/* Clarify that approval is only recorded locally */}
            <p className="approval-note">
              Local review only. No emails are sent.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
