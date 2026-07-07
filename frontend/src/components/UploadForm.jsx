import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';


function UploadForm() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (uploadedFiles) => {
    const fileList = Array.from(uploadedFiles).map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      status: 'success' // mock initial assignment
    }));
    setFiles((prev) => [...prev, ...fileList]);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* File Drop Container Box */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-10 transition-all duration-200 text-center flex flex-col items-center justify-center min-h-[300px] relative ${
          dragActive
            ? 'border-blue-500 bg-blue-50/40'
            : 'border-slate-200 hover:border-slate-300 bg-white'
        }`}
      >
        <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl mb-4 shadow-inner">
          <UploadCloud size={32} strokeWidth={2} />
        </div>

        <h3 className="text-base font-bold text-slate-800 mb-1">
          Drop files here or <span className="text-blue-600 cursor-pointer hover:underline">click to browse</span>
        </h3>
        <p className="text-xs font-medium text-slate-400 max-w-xs mb-10 leading-relaxed">
          Supports PDF, Word, Excel, and Images up to 10MB per file.
        </p>
        <br></br>
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <span className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide rounded-xl shadow-sm transition-all duration-150">
            Select Files
          </span>
        </label>
      </div>

      {/* Uploaded File Monitoring List */}
      {files.length > 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">
            Uploaded Documents ({files.length})
          </h4>
          <div className="space-y-2.5">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white border border-slate-200/60 rounded-lg text-slate-500 shadow-sm">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 truncate max-w-md">
                      {file.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400">
                      {file.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md text-xs font-bold">
                    <CheckCircle2 size={12} /> Ready
                  </div>
                  <button 
                    onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadForm;