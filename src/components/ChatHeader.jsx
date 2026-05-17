import './ChatHeader.css'

export default function ChatHeader({ showConfig, onToggleConfig }) {
  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <div>
          <h1 className="header-title">ShopEase Support</h1>
          <p className="header-subtitle">AI Agent · Powered by n8n</p>
        </div>
      </div>
      <div className="header-right">
        <div className="status-indicator">
          <span className="status-dot" />
          Online
        </div>
        <button
          className="config-toggle"
          onClick={onToggleConfig}
          title="Configure webhook"
          aria-label="Toggle configuration panel"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M2 12h2M20 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41" />
          </svg>
        </button>
      </div>
    </div>
  )
}
