
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';

const DigitalCreation: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ type: 'image' | 'video', url: string, prompt: string }[]>([]);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      const ok = await window.aistudio.hasSelectedApiKey();
      setHasKey(ok);
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
    setHasKey(true); // Assume success per guidelines
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      let url = '';
      if (mode === 'image') {
        url = await GeminiService.generateAIImage(prompt);
      } else {
        if (!hasKey) {
          alert("Please select a paid API key for video generation.");
          return;
        }
        url = await GeminiService.generateAIVideo(prompt);
      }
      setResults(prev => [{ type: mode, url, prompt }, ...prev]);
    } catch (err: any) {
      if (err.message.includes("Requested entity was not found")) {
        setHasKey(false);
      }
      alert("Generation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Asset Studio</h1>
        <p className="text-slate-400">Generate high-fidelity visuals and cinematic videos in seconds.</p>
      </div>

      <div className="glass p-8 rounded-[2rem] mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <textarea
              className="w-full bg-slate-900 border-none rounded-2xl p-6 focus:ring-2 focus:ring-blue-500 outline-none text-white h-32 resize-none"
              placeholder="Describe your creative vision... e.g. A futuristic cyberpunk city in neon rain, 4k, cinematic lighting"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div className="md:w-64 space-y-4">
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl">
              <button 
                onClick={() => setMode('image')}
                className={`py-2 rounded-lg text-sm font-bold transition ${mode === 'image' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Image
              </button>
              <button 
                onClick={() => setMode('video')}
                className={`py-2 rounded-lg text-sm font-bold transition ${mode === 'video' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Video
              </button>
            </div>
            {mode === 'video' && !hasKey && (
              <button 
                onClick={handleSelectKey}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2"
              >
                <i className="fas fa-key"></i> Link Billing Key
              </button>
            )}
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-sparkles"></i>}
              {loading ? "Generating..." : "Create Asset"}
            </button>
          </div>
        </div>
        {mode === 'video' && (
           <p className="text-xs text-slate-500 mt-4 text-center">
             *Video generation can take up to 2 minutes. Please don't close the tab.
           </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading && (
          <div className="aspect-video glass rounded-3xl animate-pulse flex items-center justify-center">
             <span className="text-slate-500 font-medium">Brewing magic...</span>
          </div>
        )}
        {results.map((res, i) => (
          <div key={i} className="glass rounded-3xl overflow-hidden group">
            <div className="aspect-video relative">
              {res.type === 'image' ? (
                <img src={res.url} alt={res.prompt} className="w-full h-full object-cover" />
              ) : (
                <video src={res.url} controls className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition duration-300 p-6 flex flex-col justify-end">
                <p className="text-xs text-slate-300 line-clamp-3 mb-4 italic">"{res.prompt}"</p>
                <a href={res.url} download={`ai-${res.type}-${i}.png`} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold py-2 px-4 rounded-lg w-fit transition">
                  Download {res.type === 'image' ? 'PNG' : 'MP4'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalCreation;
