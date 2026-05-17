import './ConfigPanel.css'

export default function ConfigPanel({ webhookUrl, setWebhookUrl, onSave }) {
  return (
    <div className="config-panel">
      <label className="config-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        n8n Webhook URL
      </label>
      <div className="config-row">
        <input
          type="text"
          className="config-input"
          value={webhookUrl}
          onChange={e => setWebhookUrl(e.target.value)}
          placeholder="https://your-instance.app.n8n.cloud/webhook/customer-support"
        />
        <button className="config-save" onClick={onSave}>
          Save
        </button>
      </div>
      <p className="config-hint">
        Copy the <strong>Production URL</strong> from your n8n Webhook node after activating the workflow.
      </p>
    </div>
  )
}
