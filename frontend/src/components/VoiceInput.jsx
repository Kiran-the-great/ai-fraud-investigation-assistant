import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, Disc } from 'lucide-react';

function VoiceInput({ setQuestion, onFinalTranscript }) {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  // State tracking flag to lock execution runs
  const [hasFired, setHasFired] = useState(false);

  const startListening = () => {
    resetTranscript();
    setHasFired(false); // Reset lock state for the new session
    SpeechRecognition.startListening({
      continuous: false,
      language: 'en-US',
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    setQuestion(transcript);
  }, [transcript, setQuestion]);

  useEffect(() => {
    // Check if listening has stopped, a transcript exists, and we haven't fired yet
    if (!listening && transcript.trim() !== '' && !hasFired) {
      setHasFired(true); // Lock execution immediately
      onFinalTranscript?.(transcript);
      resetTranscript(); // Wipe out old values so re-renders won't re-match criteria
    }
  }, [listening, transcript, onFinalTranscript, hasFired, resetTranscript]);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={listening ? stopListening : startListening}
        className={`p-3 rounded-xl transition-all duration-200 border flex items-center justify-center relative group ${
          listening
            ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
        }`}
        title={listening ? 'Stop listening' : 'Speak your query'}
      >
        {listening ? (
          <Disc size={20} className="animate-spin text-red-500" />
        ) : (
          <Mic size={20} className="text-slate-500 group-hover:text-slate-800" />
        )}
      </button>

      {listening && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-semibold text-red-600 tracking-wide uppercase">
            Listening
          </span>
        </div>
      )}
    </div>
  );
}

export default VoiceInput;