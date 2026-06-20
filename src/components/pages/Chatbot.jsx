import React, { useState, useRef, useEffect } from "react";
import chatIconImg from "../../assets/ai-planner/chat_icon.svg";
import sendIconImg from "../../assets/ai-planner/material-symbols_send-outline.svg";
import aiService from "../../services/aiService";
import "./AiPlanner.css";

const STATIC_GREETING =
  "Hi! I'm Mindy, your AI travel assistant\nI can help you plan your perfect trip in Egypt.\nWhat would you like to do today?";

const EMPTY_COLLECTED = {
  destination: null,
  days: null,
  budget: null,
  interests: [],
  people: null,
  mustInclude: [],
};

const hasAnyValue = (obj) =>
  !!obj &&
  Object.values(obj).some((v) => (Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined && v !== ""));

// ── Chatbot component ──
const ChatBot = ({ userName = "Laila", onClose, userId = "guest", initialCollected = null }) => {
  // True when the user already picked something in the AiPlanner wizard
  // before opening the chat (destination, dates, people, interests, budget...).
  const startedFromSelections = hasAnyValue(initialCollected);

  // The chat always starts by asking the API for the opening message —
  // the AI is designed to introduce itself, so we never hardcode that text.
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [chatError, setChatError] = useState(null);
  const [sessionId] = useState(() => `session-${Date.now()}`);

  // Accumulated answers from the conversation — sent with every message
  const [collected, setCollected] = useState({
    ...EMPTY_COLLECTED,
    ...(initialCollected || {}),
  });
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, bottomRef]);

  // Always kick the conversation off via the API on open:
  // - if the user already answered things in the wizard, the AI asks about
  //   whatever is still missing instead of starting over.
  // - if nothing was selected yet, the AI introduces itself and starts the
  //   conversation on its own (it's designed to greet first).
  useEffect(() => {
    kickoffConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kickoffConversation = async () => {
    setIsTyping(true);
    setChatError(null);
    try {
      const chatPayload = {
        sessionId,
        message: startedFromSelections
          ? "Let's continue planning my trip with what I've already chosen."
          : "Hi",
        collected: { ...collected },
        cardAnswers: {
          destination: collected.destination,
          days: collected.days,
          budget: collected.budget,
          interests: collected.interests,
          people: collected.people,
          must_include: collected.mustInclude,
        },
      };
      const response = await aiService.chat(chatPayload);
      const data = response.data;

      if (data?.collected) {
        setCollected((prev) => ({ ...prev, ...data.collected }));
      }

      const reply =
        data?.output ??
        data?.reply ??
        data?.message ??
        data?.content?.[0]?.text ??
        "Sorry, I didn't get a usable response from the server.";

      setMessages([
        {
          id: Date.now(),
          from: "ai",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      // If the kickoff call fails, fall back to the normal static greeting
      // so the user isn't stuck looking at an empty chat.
      const errorMsg =
        err.response?.data?.output ??
        err.response?.data?.message ??
        err.message ??
        "Failed to get response. Please try again.";
      setChatError(errorMsg);
      setMessages([
        {
          id: Date.now(),
          from: "ai",
          text: STATIC_GREETING,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async () => {
    if (!inputVal.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg = { id: Date.now(), from: "user", text: inputVal.trim(), time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);
    setChatError(null);

    try {
      // POST /api/v1/ai/chat — full schema per integration guide
      const chatPayload = {
        sessionId,
        message: userMsg.text,
        collected: {
          destination: collected.destination,
          days: collected.days,
          budget: collected.budget,
          interests: collected.interests,
          people: collected.people,
          mustInclude: collected.mustInclude,   // array per docs
        },
        cardAnswers: {
          destination: collected.destination,
          days: collected.days,
          budget: collected.budget,
          interests: collected.interests,
          people: collected.people,
          must_include: collected.mustInclude,  // snake_case per docs
        },
      };
      const response = await aiService.chat(chatPayload);

      // Real backend response shape (per Swagger):
      // { status, output, collected, missing }
      // status examples: "budget_unfeasible", "incomplete", "complete", etc.
      // output  -> the human-readable assistant message to show
      // collected -> merged/updated answers gathered so far
      // missing -> array of field names still needed
      const data = response.data;

      // If backend returns updated collected fields, merge them in
      if (data?.collected) {
        setCollected((prev) => ({ ...prev, ...data.collected }));
      }

      // Prefer the real API fields; fall back to other common shapes
      // only if the backend response doesn't match the documented schema.
      const reply =
        data?.output ??
        data?.reply ??
        data?.message ??
        data?.content?.[0]?.text ??
        "Sorry, I didn't get a usable response from the server.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "ai",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      // Optional: surface a plan-ready trip card once the backend says so.
      // Adjust the condition below once you confirm the exact "ready" status
      // string the backend sends (e.g. "complete" / "plan_ready").
      if (data?.status === "complete" || data?.status === "plan_ready") {
        // TODO: hook this up to your trip-summary-card UI (see image mock)
        // e.g. setTripSummary(data.plan ?? data.collected)
      }
    } catch (err) {
      // Real failure (network/server error) — show it plainly, don't fake a reply.
      const errorMsg =
        err.response?.data?.output ??
        err.response?.data?.message ??
        err.message ??
        "Failed to get response. Please try again.";
      setChatError(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "ai",
          text: `⚠️ ${errorMsg}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chatbot-header">
          <button className="chatbot-back-btn" onClick={onClose}>←</button>
          <h2 className="chatbot-title">Hello, {userName}</h2>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg-row chatbot-msg-row--${msg.from}`}>
              {msg.from === "ai" && (
                <div className="chatbot-avatar">
                  <img src={chatIconImg} alt="AI" className="chatbot-avatar-icon" />
                </div>
              )}
              <div className={`chatbot-bubble-wrap`}>
                {msg.from === "ai" && (
                  <div className="chatbot-sender-info">
                    <span className="chatbot-time">{msg.time}</span>
                    <span className="chatbot-sender-name">Ai Assistant</span>
                  </div>
                )}
                <div className={`chatbot-bubble chatbot-bubble--${msg.from}`}>
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>{line}{i < msg.text.split("\n").length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-msg-row chatbot-msg-row--ai">
              <div className="chatbot-avatar">
                <img src={chatIconImg} alt="AI" className="chatbot-avatar-icon" />
              </div>
              <div className="chatbot-bubble-wrap">
                <div className="chatbot-sender-info">
                  <span className="chatbot-sender-name">Ai Assistant</span>
                </div>
                <div className="chatbot-bubble chatbot-bubble--ai chatbot-typing">
                  <span className="chatbot-dot" /><span className="chatbot-dot" /><span className="chatbot-dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {chatError && <div className="chatbot-error">{chatError}</div>}
        <div className="chatbot-input-row">
          <div className="chatbot-input-wrap">
            <input
              ref={inputRef}
              className="chatbot-input"
              placeholder="Type a message"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          <button className="chatbot-send-btn" onClick={sendMessage} disabled={!inputVal.trim()}>
            <img src={sendIconImg} alt="Send" className="chatbot-send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;