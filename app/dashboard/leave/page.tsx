"use client";
import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Plus, Send, FileText } from 'lucide-react';

export default function LeavePage() {
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  // Dummy Leave Requests History
  const leaveRequests = [
    { id: 'LV-101', type: 'Casual Leave', dates: '12 Aug 2026 - 13 Aug 2026', days: 2, status: 'Approved', reason: 'Personal work' },
    { id: 'LV-102', type: 'Sick Leave', dates: '02 Jul 2026 - 02 Jul 2026', days: 1, status: 'Approved', reason: 'Fever and rest' },
    { id: 'LV-103', type: 'Earned Leave', dates: '20 Aug 2026 - 25 Aug 2026', days: 5, status: 'Pending', reason: 'Family vacation' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Leave Application Submitted for ${leaveType}`);
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-6 bg-slate-950 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Apply for leaves and monitor leave balance & approvals</p>
        </div>
      </div>

      {/* Leave Balance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium">Casual Leaves (CL)</p>
            <h3 className="text-2xl font-bold text-indigo-400 mt-1">8 / 12</h3>
            <p className="text-xs text-slate-500 mt-0.5">4 Used</p>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium">Sick Leaves (SL)</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">6 / 7</h3>
            <p className="text-xs text-slate-500 mt-0.5">1 Used</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium">Earned Leaves (EL)</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">10 / 15</h3>
            <p className="text-xs text-slate-500 mt-0.5">5 Used</p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Apply Leave Form & History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" /> Apply for Leave
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Leave Type</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              >
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Earned Leave">Earned Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Reason</label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Mention reason for leave request..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Send className="w-4 h-4" /> Submit Application
            </button>
          </form>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2 bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> Recent Leave Requests
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Type</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Days</th>
                    <th className="p-4">Reason</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leaveRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-medium text-slate-200">{req.type}</td>
                      <td className="p-4 text-xs font-mono text-slate-400">{req.dates}</td>
                      <td className="p-4 text-slate-300 font-mono">{req.days}</td>
                      <td className="p-4 text-slate-400 max-w-[150px] truncate">{req.reason}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          req.status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                          'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}