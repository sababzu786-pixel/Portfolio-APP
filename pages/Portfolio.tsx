
import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  { id: 1, title: "NextGen SaaS Campaign", category: "Digital Marketing", image: "https://picsum.photos/seed/p1/800/600", description: "AI-driven content strategy for a leading SaaS platform." },
  { id: 2, title: "Organic Growth Audit", category: "SEO Strategy", image: "https://picsum.photos/seed/p2/800/600", description: "Boosting search visibility by 140% for e-commerce." },
  { id: 3, title: "Lumina AI Video Ads", category: "Content Creation", image: "https://picsum.photos/seed/p3/800/600", description: "Hyper-personalized video generation for targeted audiences." },
  { id: 4, title: "Crypto Finance Portal", category: "Web Design", image: "https://picsum.photos/seed/p4/800/600", description: "UI/UX revamp for a decentralized exchange." },
];

const Portfolio: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="px-6 pt-20 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tight">
          Crafting the <span className="gradient-text">Future</span> with AI.
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          I'm a Digital Content Architect specializing in SEO, AI-powered generation, and scalable marketing strategies. Let's build your presence.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
            <span className="text-blue-500 font-bold">10+</span>
            <span className="text-sm">Years Exp</span>
          </div>
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
            <span className="text-purple-500 font-bold">500+</span>
            <span className="text-sm">Articles Ranked</span>
          </div>
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
            <span className="text-cyan-500 font-bold">50k+</span>
            <span className="text-sm">Assets Created</span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Selected Works</h2>
            <p className="text-slate-400 mt-2">A showcase of recent AI-integrated projects.</p>
          </div>
          <button className="text-blue-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            View All <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(project => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl mb-4 aspect-[4/3]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-8">
                  <p className="text-slate-200">{project.description}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-blue-400 transition">{project.title}</h3>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">{project.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-6 max-w-7xl mx-auto py-20 bg-slate-900/50 rounded-[4rem]">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-pen-nib text-blue-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold">SEO Copywriting</h3>
            <p className="text-slate-400">Search engine optimized long-form content that converts readers into customers.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-image text-purple-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold">AI Image Synth</h3>
            <p className="text-slate-400">Prompt engineering for high-fidelity brand assets, backgrounds, and conceptual art.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-video text-cyan-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold">Neural Video Ads</h3>
            <p className="text-slate-400">Generating short-form video content using state-of-the-art generative models like Veo.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
