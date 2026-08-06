"use client";
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, XCircle, AlertCircle, Plus } from 'lucide-react';

export default function AttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');

  // Dummy Attendance Records Data
  const attendanceLogs = [
    { date: '2026-08-01', day: 'Monday', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', hours: '9h 00m' },
    { date: '2026-08-02', day: 'Tuesday', checkIn: '09:15 AM', checkOut: '06:10 PM', status: 'Late', hours: '8h 55m' },
    { date: '2026-08-03', day: 'Wednesday', checkIn: '09:02 AM', checkOut: '06:00 PM', status: 'Present', hours: '8h 58m' },
    { date: '2026-08-04', day: 'Thursday', checkIn: '-', checkOut: '-', status: 'Absent', hours: '0h 00m' },
    { date: '2026-08-05', day: 'Friday', checkIn: '08:58 AM', checkOut: '06:05 PM', status: 'Present', hours: '9h 07m' },
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans p-6 bg-slate-950 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Log</h1>
          <p className="text-slate-400 text-sm mt-1">Track your daily check-in history and attendance score</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Request Regularization
        </button>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium">Present Days</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">18 Days</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium">Late Arrivals</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">2 Days</h3>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium">Absents</p>
            <h3 className="text-2xl font-bold text-rose-400 mt-1">1 Day</h3>
          </div>
          <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium">Avg Working Hours</p>
            <h3 className="text-2xl font-bold text-indigo-400 mt-1">8.5 hrs</h3>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" /> Monthly Log Records
          </h2>
          <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
            {selectedMonth}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Day</th>
                <th className="p-4">Check In</th>
                <th className="p-4">Check Out</th>
                <th className="p-4">Total Hours</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {attendanceLogs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono text-slate-200">{log.date}</td>
                  <td className="p-4 text-slate-400">{log.day}</td>
                  <td className="p-4 font-mono text-slate-300">{log.checkIn}</td>
                  <td className="p-4 font-mono text-slate-300">{log.checkOut}</td>
                  <td className="p-4 font-mono text-slate-300">{log.hours}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      log.status === 'Present' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                      log.status === 'Late' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                      'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}