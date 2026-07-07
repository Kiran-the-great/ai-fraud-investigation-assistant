import { useState } from "react";
import API from "../services/api";
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, Cpu, Loader2, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function UploadPage() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult("");
      
      const response = await API.post("/analyze-transaction", formData);
      setResult(response.data.analysis);
    } catch (error) {
      console.error(error);
      setResult("System failure. Failed to properly parse transaction structure or extract target vectors.");
    } finally {
      setLoading(false);
    }
  };

  // Helper utility to convert bytes to readable formats
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-full p-8 font-sans w-full max-w-[1400px] mx-auto">
      
      {/* HEADER BLOCK */}
      <div className="mb-10 pb-6 border-b border-slate-100">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">Upload Documents</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Upload case files, transaction records, or any documents for AI-powered fraud analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
        
        {/* LEFT COMPONENT: DRAG & DROP ACTION HUB */}
        <div className="lg:col-span-2 space-y-6">
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-10 transition-all duration-200 text-center flex flex-col items-center justify-center min-h-[320px] bg-white ${
              dragActive
                ? 'border-blue-500 bg-blue-50/40'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl mb-4 shadow-sm">
              <UploadCloud size={32} strokeWidth={2} />
            </div>

            <h3 className="text-base font-bold text-slate-800 mb-1">
              Drop files here or <span className="text-blue-600 cursor-pointer hover:underline">click to browse</span>
            </h3>
            <p className="text-xs font-medium text-slate-400 max-w-xs mb-6 leading-relaxed">
              Supports PDF, Word, Excel, or Images up to 10MB per file.
            </p>

            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide rounded-xl shadow-sm transition-all duration-150">
                Select Files
              </span>
            </label>
          </div>

          {/* ACTIVE QUEUE CONTAINER CARD */}
          {file && (
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all duration-200">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-500 shadow-sm">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 truncate max-w-sm md:max-w-md">
                    {file.name}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <CheckCircle2 size={13} strokeWidth={2.5} /> Ready
                </div>
                
                <button
                  onClick={uploadFile}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-150 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={13} className="animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COMPONENT: STRUCTURAL ANALYSIS PANEL */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm h-full flex flex-col min-h-[320px]">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
              <Cpu size={16} className="text-slate-400" />
              <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                AI Intelligence Output
              </h3>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 animate-pulse">
                <Loader2 size={24} className="text-blue-500 animate-spin mb-2" />
                <p className="text-xs font-semibold text-slate-500 max-w-[200px] leading-normal">
                  Parsing structures, performing data layer verification matrix...
                </p>
              </div>
            ) : result ? (
              <div className="flex-1 bg-slate-50/50 border border-slate-100 rounded-xl p-5 overflow-y-auto max-h-[500px]">
                <h4 className="text-xs font-bold text-slate-800 mb-4 uppercase tracking-wide">
                  Analysis Result Summary
                </h4>

                <div
                  className="
                    prose
                    prose-sm
                    max-w-none
                    prose-slate

                    prose-headings:font-bold
                    prose-headings:text-slate-900

                    prose-p:text-slate-700
                    prose-p:leading-7

                    prose-strong:text-slate-900
                    prose-strong:font-semibold

                    prose-ul:my-3
                    prose-ol:my-3
                    prose-li:my-1

                    prose-table:border
                    prose-th:border
                    prose-td:border

                    prose-code:text-blue-600
                    prose-code:bg-slate-100
                    prose-code:px-1
                    prose-code:rounded

                    prose-pre:bg-slate-900
                    prose-pre:text-slate-100
                    prose-pre:rounded-lg
                  "
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 rounded-2xl bg-white/40">
                <ShieldAlert size={24} className="text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-400 max-w-[180px] leading-normal">
                  Select and run verification mapping to observe intelligence weights.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default UploadPage;