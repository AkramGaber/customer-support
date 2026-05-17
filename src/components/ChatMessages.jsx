import './ChatMessages.css'

function TypingDots() {
  return (
    <div className="typing-dots">
      <span /><span /><span />
    </div>
  )
}

function Message({ msg }) {
  const isBot = msg.role === 'bot'

  // Render markdown bold (**text**) and newlines
  const formatText = (text) => ({
    __html: text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
  })

  return (
    <div className={`msg-row ${isBot ? 'bot-row' : 'user-row'}`}>
      {isBot && <div className="avatar bot-avatar">SE</div>}
      <div className={`bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        <span dangerouslySetInnerHTML={formatText(msg.text)} />
        <span className="timestamp">{msg.time}</span>
      </div>
      {!isBot && <div className="avatar user-avatar">You</div>}
    </div>
  )
}

export default function ChatMessages({ messages, loading, bottomRef }) {
  return (
    <div className="messages">
      {messages.map(msg => (
        <Message key={msg.id} msg={msg} />
      ))}

      {loading && (
        <div className="msg-row bot-row">
          <div className="avatar bot-avatar">SE</div>
          <div className="bubble bot-bubble">
            <TypingDots />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
