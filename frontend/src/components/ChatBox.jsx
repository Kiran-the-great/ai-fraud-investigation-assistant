import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import VoiceInput from './VoiceInput';

function ChatBox() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: "Hello! I'm your fraud investigation assistant. I can help you analyze cases, identify patterns, and provide insights based on the documents you've uploaded. How can I assist you today?",
      time: '7:40 PM',
    },
  ]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend) => {
    const query = textToSend || question;
    if (!query.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // User message
    const userMsg = { id: Date.now(), role: 'user', text: query, time: currentTime };
    
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');

    // Mock response trigger (Replace with your actual FastAPI stream/fetch)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: `Analyzing document context for query: "${query}". No explicit structural cross-correlation anomalies detected over standard margins.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-50/50 rounded-2xl border border-slate-100 p-6 font-sans">
      {/* Chat History Streams */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {msg.role === 'assistant' ? (
              <div className="w-10 h-10 bg-blue-600 rounded-xl text-white flex items-center justify-center shadow-md shadow-blue-100 shrink-0">
                <Bot size={20} />
              </div>
            ) : (
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center font-bold text-sm text-slate-700 shrink-0">
                U
              </div>
            )}

            <div className="space-y-1">
              <div
                className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm border ${
                  msg.role === 'assistant'
                    ? 'bg-white border-slate-100 text-slate-800'
                    : 'bg-blue-600 border-blue-600 text-white'
                }`}
              >
                {msg.text}
              </div>
              <p className={`text-[11px] font-medium text-slate-400 ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Integrated Input Action Control Container */}
      <div className="mt-4 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your question about your cases..."
          className="flex-1 px-3 py-2 text-sm text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
        />

        {/* Action Tray */}
        <div className="flex items-center gap-1.5 border-l border-slate-100 pl-2">
          <VoiceInput setQuestion={setQuestion} onFinalTranscript={handleSend} />
          
          <button
            onClick={() => handleSend()}
            disabled={!question.trim()}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 shadow-sm transition-all duration-200 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;