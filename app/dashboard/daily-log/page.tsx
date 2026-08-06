"use client";
import React, { useState } from 'react';
import { FileText, Send, Calendar, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function DailyLogPage() {
  const [tasks, setTasks] = useState('');
  const [blockers, setBlockers] = useState('');
  const [nextPlan, setNextPlan] = useState('');

  // Dummy Past Work Logs Data
  const pastLogs = [
    {
      date: '2026-08-05',
      tasks: 'Integrated Dashboard UI & Attendance Page using Next.js and Tailwind CSS.',
      blockers: 'TypeScript types mismatch issue resolved.',
      nextPlan: 'Implement Daily Log & Performance Analytics routes.',
      status: 'Submitted'
    },
    {
      date: '2026-08-04',
      tasks: 'Created Login Page component and setup JWT Auth routing structure.',
      blockers: 'None',
      nextPlan: 'Complete dashboard sidebar & main layout integration.',
      status: 'Reviewed'
    },
    {
      date: '2026-08-03',
      tasks: 'Configured Tailwind CSS, Lucide Icons, and Next.js App Router.',
      blockers: 'None',
      nextPlan: 'Build authentication screens.',
      status: 'Reviewed'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Daily Work Log Submitted Successfully!');
    setTasks('');
    setBlockers('');
    setNextPlan('');
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-6 bg-slate-950 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Daily Work Logs</h1>
          <p className="text-slate-400 text-sm mt-1">Submit your daily updates and track previous task submissions</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Log Form */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 h-fit">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-400" /> New Log Submission
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Today's Completed Tasks</label>
              <textarea
                rows={4}
                required
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                placeholder="List down key modules, bug fixes, or features completed today..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Blockers / Dependencies</label>
              <input
                type="text"
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                placeholder="Mention if waiting for backend API, design assets, etc."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Tomorrow's Plan</label>
              <input
                type="text"
                required
                value={nextPlan}
                onChange={(e) => setNextPlan(e.target.value)}
                placeholder="Main focus areas for tomorrow..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Send className="w-4 h-4" /> Submit Today's Log
            </button>
          </form>
        </div>

        {/* Past Logs Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-indigo-400" /> Log History
          </h2>

          {pastLogs.map((log, idx) => (
            <div key={idx} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                <span className="flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  <Calendar className="w-3.5 h-3.5" /> {log.date}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${
                  log.status === 'Reviewed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  {log.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">Completed Tasks</p>
                <p className="text-sm text-slate-200 mt-0.5">{log.tasks}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Blockers
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{log.blockers}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" /> Plan for Tomorrow
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{log.nextPlan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}