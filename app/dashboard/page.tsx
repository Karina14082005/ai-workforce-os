"use client";
import React, { useState } from 'react';
import { 
  MapPin, 
  Wifi, 
  CheckCircle2, 
  Clock, 
  Send, 
  Sparkles 
} from 'lucide-react';

export default function DashboardPage() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState('');
  const [issuesBlockers, setIssuesBlockers] = useState('');
  const [planForTomorrow, setPlanForTomorrow] = useState('');

  const handleAttendance = () => {
    setIsCheckedIn(!isCheckedIn);
    alert(isCheckedIn ? 'Checked Out Successfully!' : 'Checked In Successfully!');
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Daily Work Log Submitted Successfully!');
    setTasksCompleted('');
    setIssuesBlockers('');
    setPlanForTomorrow('');
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-6 bg-slate-950 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back 👋</h1>
          <p className="text-slate-400 text-sm mt-1">
            Role: <span className="text-indigo-400 font-semibold">Software Engineer</span> | Office: HQ Tech Park
          </p>
        </div>

        {/* Verification Status Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
            <MapPin className="w-3.5 h-3.5" />
            Geofence Valid
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
            <Wifi className="w-3.5 h-3.5" />
            Office WiFi Connected
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Card */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" /> Auto Check-In
            </h2>
            <p className="text-slate-400 text-xs mt-1">Automatic verification via WiFi SSID & Geofence</p>
          </div>

          <div className="my-8 text-center">
            <div className="text-4xl font-extrabold tracking-widest font-mono text-indigo-400">09:42:15 AM</div>
            <p className="text-xs text-slate-500 mt-1">Shift Time: 09:00 AM - 06:00 PM</p>
          </div>

          <button
            onClick={handleAttendance}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
              isCheckedIn
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isCheckedIn ? 'Check Out' : 'Check In Now'}
          </button>
        </div>

        {/* Daily Log Form */}
        <div className="lg:col-span-2 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-4">Submit Daily Work Log</h2>
          <form onSubmit={handleLogSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Tasks Completed Today</label>
              <textarea 
                rows={2}
                value={tasksCompleted}
                onChange={(e) => setTasksCompleted(e.target.value)}
                placeholder="Implemented Next.js frontend pages and integrated UI..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Blockers / Issues</label>
                <input 
                  type="text" 
                  value={issuesBlockers}
                  onChange={(e) => setIssuesBlockers(e.target.value)}
                  placeholder="None / Waiting for API" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Plan for Tomorrow</label>
                <input 
                  type="text" 
                  value={planForTomorrow}
                  onChange={(e) => setPlanForTomorrow(e.target.value)}
                  placeholder="Spring Boot API integration" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ml-auto"
            >
              <Send className="w-4 h-4" /> Submit Daily Log
            </button>
          </form>
        </div>
      </div>

      {/* AI Copilot Insights */}
      <div className="bg-indigo-950/30 p-6 rounded-2xl border border-indigo-500/20 flex items-start gap-4">
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-indigo-300">AI Copilot Insights</h3>
          <p className="text-sm text-slate-300 mt-1">
            Attendance score is <strong>94.2%</strong> this month. Work log consistency is high with zero recorded blockers.
          </p>
        </div>
      </div>
    </div>
  );
}