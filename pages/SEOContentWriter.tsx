
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { SEOAnalysis } from '../types';

const SEOContentWriter: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('Professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOAnalysis | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await GeminiService.generateSEOContent(topic, keywords, tone);
      setResult(data);
    } catch (err) {
      alert("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-5 gap-10">
      <div className="md:col-span-2 space-y-6">
        <div className="glass p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-wand-magic-sparkles text-blue-400"></i> Writer Config
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Primary Topic</label>
            <input 
              type="text" 
              className="w-full bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="e.g. Benefits of Remote Work"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Target Keywords (Comma separated)</label>
            <input 
              type="text" 
              className="w-full bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="productivity, work-life balance..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Writing Tone</label>
            <select 
              className="w-full bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-white"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Professional</option>
              <option>Conversational</option>
              <option>Technical</option>
              <option>Witty & Bold</option>
              <option>Educational</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-pen"></i>}
            {loading ? "Generating Ideas..." : "Generate SEO Article"}
          </button>
        </div>
      </div>

      <div className="md:col-span-3">
        {!result && !loading && (
          <div className="h-full min-h-[400px] glass rounded-3xl flex flex-col items-center justify-center text-slate-500 border-dashed border-2 border-slate-700">
            <i className="fas fa-file-alt text-4xl mb-4"></i>
            <p>Your AI-generated content will appear here.</p>
          </div>
        )}

        {loading && (
          <div className="h-full min-h-[400px] glass rounded-3xl flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="animate-pulse">Gemini is analyzing search patterns and drafting your article...</p>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  SEO Score: {result.score}/100
                </span>
                <button className="text-slate-400 hover:text-white" onClick={() => navigator.clipboard.writeText(result.content)}>
                  <i className="fas fa-copy"></i> Copy
                </button>
              </div>
              <h1 className="text-3xl font-bold mb-4">{result.title}</h1>
              <div className="bg-slate-900 p-4 rounded-xl mb-6">
                <p className="text-sm text-slate-400 italic">Meta Description:</p>
                <p className="text-slate-200">{result.metaDescription}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {result.keywords.map((kw, i) => (
                  <span key={i} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-sm">#{kw}</span>
                ))}
              </div>
              <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                {result.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOContentWriter;
