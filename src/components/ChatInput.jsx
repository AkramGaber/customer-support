import { useRef } from 'react'
import './ChatInput.css'

export default function ChatInput({ input, setInput, onSend, loading }) {
  const inputRef = useRef(null)

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  function handleInput(e) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  return (
    <div className="input-area">
      <textarea
        ref={inputRef}
        className="chat-input"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKey}
        placeholder="Ask anything about ShopEase..."
        rows={1}
        disabled={loading}
      />
      <button
        className="send-btn"
        onClick={() => onSend()}
        disabled={loading || !input.trim()}
        aria-label="Send message"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  )
}
