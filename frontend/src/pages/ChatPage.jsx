import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import VoiceInput from "../components/VoiceInput";
import { Send, Bot, ShieldAlert, FileText, Compass, CornerDownRight, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatPage() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: "init",
      role: "assistant",
      text: "Hello! I'm your fraud investigation assistant. I can help you analyze cases, identify patterns, and provide insights based on the documents you've uploaded. How can I assist you today?",
      time: "7:40 PM",
    }
  ]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const askQuestion = async (query) => {
    const finalQuery = query || question;
    if (!finalQuery.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Append user message to history
    const userMessage = { id: Date.now().toString(), role: "user", text: finalQuery, time: currentTime };
    setChatHistory((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      setLoading(true);

      const response = await API.post("/chat", {
        question: finalQuery,
      });

      const aiResponseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setChatHistory((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: response.data.answer || "No analytical anomalies detected within the specified margins.",
          time: aiResponseTime,
        }
      ]);
      setSources(response.data.sources || []);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: "System communication fault. Verification failed to establish server stream link.",
          time: currentTime,
        }
      ]);
      setSources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceQuery = async (voiceText) => {
    setQuestion(voiceText);
    await askQuestion(voiceText);
  };

  return (
    <div className="h-full flex font-sans w-full">
      
      {/* LEFT CHAT CONSOLE AREA */}
      <div className="flex-1 flex flex-col h-screen border-r border-slate-100 bg-white">
        
        {/* HEADER BLOCK */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-950">Investigation Chat</h1>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              Ask questions about your cases and get AI-powered insights
            </p>
          </div>
        </div>

        {/* CHAT MESSAGES STREAM */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
              {msg.role === "assistant" ? (
                <div className="w-9 h-9 bg-blue-600 rounded-xl text-white flex items-center justify-center shadow-sm shadow-blue-200 shrink-0">
                  <Bot size={18} strokeWidth={2.2} />
                </div>
              ) : (
                <div className="w-9 h-9 bg-slate-900 rounded-xl text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  U
                </div>
              )}

              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-[14px] leading-relaxed border ${
                  msg.role === "assistant"
                    ? "bg-slate-50/50 border-slate-100 text-slate-800"
                    : "bg-blue-600 border-blue-600 text-white shadow-sm"
                }`}>
                  <div className="prose prose-sm max-w-none prose-slate">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
                <p className={`text-[10px] font-semibold text-slate-400 tracking-wide ${msg.role === "user" ? "text-right" : ""}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {/* LOADING PLACEHOLDER */}
          {loading && (
            <div className="flex gap-4 max-w-xl">
              <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 flex items-center justify-center shrink-0 animate-pulse">
                <Loader2 size={16} className="animate-spin" />
              </div>
              <div className="bg-slate-50/60 border border-slate-100 p-4 rounded-2xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INTEGRATED INPUT COMPONENT ACTION BLOCK */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-sm focus-within:border-slate-300 transition-all flex items-center gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askQuestion()}
              placeholder="Ask about transaction anomalies or fraud patterns..."
              className="flex-1 px-3 py-2 text-sm text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
              disabled={loading}
            />

            <div className="flex items-center gap-1.5 border-l border-slate-100 pl-2">
              <VoiceInput setQuestion={setQuestion} onFinalTranscript={handleVoiceQuery} />
              
              <button
                onClick={() => askQuestion()}
                disabled={loading || !question.trim()}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 transition-all duration-150 flex items-center justify-center shadow-sm"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: RAG EVIDENCE SOURCES CONSOLE */}
      <div className="w-80 bg-slate-50/60 h-screen overflow-y-auto p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-200/60">
          <Compass size={16} className="text-slate-400" />
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            Evidence Sources
          </h3>
        </div>

        {sources.length > 0 ? (
          <div className="space-y-3.5 flex-1 overflow-y-auto pr-1">
            {sources.map((source, index) => (
              <div
                key={index}
                className="border border-slate-200/60 rounded-xl p-4 bg-white shadow-sm hover:border-slate-300/80 transition-all duration-150"
              >
                <div className="flex items-start gap-2 mb-2">
                  <FileText size={15} className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                    {source.title || "Retrieved Segment"}
                  </p>
                </div>

                <div className="flex items-start gap-1">
                  <CornerDownRight size={12} className="text-slate-300 shrink-0 mt-1" />
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed text-pretty">
                    {source.snippet || source}
                  </p>
                </div>

                {source.score && (
                  <div className="mt-3 border-t border-slate-50 pt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confidence</span>
                    <div className="flex items-center gap-2 w-1/2">
                      <div className="w-full bg-slate-100 rounded-full h-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full" 
                          style={{ width: `${parseFloat(source.score) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-blue-600 font-mono">
                        {source.score}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 rounded-2xl bg-white/40">
            <ShieldAlert size={24} className="text-slate-300 mb-2" />
            <p className="text-xs font-semibold text-slate-400 max-w-[180px] leading-normal">
              No vectors retrieved. Execute a query to parse structural references.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default ChatPage;