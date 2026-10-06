import { useState } from 'react'
import {
  X,
  Sparkles,
  Send,
  Paperclip,
  Mic,
  MoreHorizontal,
  LoaderCircle,
} from 'lucide-react'

import './AIAgentChat.css'

function AIAgentChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: 'Xin chào! Tôi là AI Route Agent. Tôi có thể giúp bạn lập và tối ưu tuyến giao hàng.',
    },
  ])

  const handleSend = () => {
    const text = message.trim()

    if (!text) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text,
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage('')

    // Demo response
    setTimeout(() => {
      const agentMessage = {
        id: Date.now() + 1,
        type: 'agent',
        text: 'Tôi đã nhận được yêu cầu của bạn. Chức năng AI thật sẽ được kết nối với backend ở bước tiếp theo.',
      }

      setMessages((prev) => [...prev, agentMessage])
    }, 800)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  /*
   * =========================
   * CLOSED STATE
   * =========================
   */

  if (!isOpen) {
    return (
      <button
        className="ai-agent-button"
        onClick={() => setIsOpen(true)}
      >
        <Sparkles size={20} strokeWidth={2.2} />

        <span>AI Agent</span>
      </button>
    )
  }

  /*
   * =========================
   * OPEN STATE
   * =========================
   */

  return (
    <aside className="ai-agent-panel">

      {/* HEADER */}
      <div className="ai-agent-header">

        <div className="ai-agent-title">

          <div className="ai-agent-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <h2>AI Route Agent</h2>

            <div className="ai-agent-status">
              <span className="status-dot"></span>
              <span>Online</span>
            </div>
          </div>

        </div>

        <div className="ai-agent-header-actions">

          <button
            className="icon-button"
            title="More"
          >
            <MoreHorizontal size={20} />
          </button>

          <button
            className="icon-button"
            title="Close"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>

        </div>

      </div>


      {/* DESCRIPTION */}
      <div className="ai-agent-description">
        Plan and optimize your delivery routes
      </div>


      {/* CHAT CONTENT */}
      <div className="ai-agent-messages">

        {messages.map((item) => (
          <div
            key={item.id}
            className={`message-row ${item.type}`}
          >

            {item.type === 'agent' && (
              <div className="message-avatar">
                <Sparkles size={16} />
              </div>
            )}

            <div className="message-bubble">
              {item.text}
            </div>

          </div>
        ))}

      </div>


      {/* QUICK ACTIONS */}
      <div className="quick-actions">

        <button>
          <Sparkles size={15} />
          Tối ưu tuyến
        </button>

        <button>
          ⛽
          Tìm cây xăng
        </button>

        <button>
          $
          Tính chi phí
        </button>

        <button>
          ↓
          Xuất
        </button>

      </div>


      {/* INPUT */}
      <div className="ai-agent-input-container">

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hỏi Agent về tuyến đường..."
          rows={3}
        />

        <div className="input-actions">

          <button
            className="input-icon"
            title="Attach file"
          >
            <Paperclip size={21} />
          </button>

          <button
            className="input-icon"
            title="Voice"
          >
            <Mic size={21} />
          </button>

          <button
            className="send-button"
            onClick={handleSend}
            disabled={!message.trim()}
            title="Send"
          >
            <Send size={20} />
          </button>

        </div>

      </div>


      {/* FOOTER */}
      <div className="ai-agent-footer">
        <Sparkles size={13} />
        AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
      </div>

    </aside>
  )
}

export default AIAgentChat