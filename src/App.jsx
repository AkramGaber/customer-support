import { useState, useRef, useEffect } from 'react'
import ChatHeader from './components/ChatHeader.jsx'
import ChatMessages from './components/ChatMessages.jsx'
import QuickChips from './components/QuickChips.jsx'
import ChatInput from './components/ChatInput.jsx'
import ConfigPanel from './components/ConfigPanel.jsx'
import './App.css'

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

const QUICK_REPLIES = [
  "What's your return policy?",
  "How long does shipping take?",
  "Is free shipping available?",
  "How do I track my order?",
  "Contact the support team",
]

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "👋 Hey there! I'm the ShopEase AI support assistant. Ask me anything about orders, returns, shipping, or our products!",
      time: now(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState(WEBHOOK_URL)
  const [showConfig, setShowConfig] = useState(!WEBHOOK_URL)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text) {
    const message = (text || input).trim()
    if (!message || loading) return

    if (!webhookUrl) {
      setError('Please set your n8n Webhook URL in the config panel.')
      setShowConfig(true)
      return
    }

    setError('')
    setInput('')
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: message, time: now() }])
    setLoading(true)

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const data = await res.json()

      const reply =
        data.reply || data.output || data.message || data.text ||
        (typeof data === 'string' ? data : JSON.stringify(data))

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply, time: now() }])
    } catch (err) {
      const errText = err.message?.includes('fetch')
        ? '⚠️ Could not reach n8n. Check your webhook URL and enable CORS in n8n settings (Allow All Origins).'
        : `⚠️ Error: ${err.message}`
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: errText, time: now() }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="chat-container">
        <ChatHeader
          showConfig={showConfig}
          onToggleConfig={() => setShowConfig(v => !v)}
        />

        {showConfig && (
          <ConfigPanel
            webhookUrl={webhookUrl}
            setWebhookUrl={setWebhookUrl}
            onSave={() => { setShowConfig(false); setError('') }}
          />
        )}

        {error && <div className="error-bar">{error}</div>}

        <ChatMessages messages={messages} loading={loading} bottomRef={bottomRef} />

        <QuickChips chips={QUICK_REPLIES} onSelect={send} disabled={loading} />

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={send}
          loading={loading}
        />
      </div>
    </div>
  )
}
