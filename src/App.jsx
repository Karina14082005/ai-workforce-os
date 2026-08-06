import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Clock, Calendar, FileText, 
  LogOut, Search, Bell, MapPin, Wifi, CheckCircle2, 
  ShieldCheck, Award, Sparkles, Bot, Cpu, Database, Activity, 
  TrendingUp, AlertCircle, Lock, Mail, ArrowRight, Check,
  PlusCircle, Settings, Crown
} from 'lucide-react';
import './App.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  
  // Auth Form States
  const [email, setEmail] = useState('karinakatare13@gmail.com');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // App Active Tab & States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('supermanager'); // Options: employee, manager, supermanager, admin
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [wifiVerified, setWifiVerified] = useState(true);
  const [geofenceVerified, setGeofenceVerified] = useState(true);

  // Sample Data States
  const [attendanceLogs, setAttendanceLogs] = useState([
    { id: 1, date: '2026-08-06', name: 'Karina Katare', role: 'Frontend Lead', time: '09:15 AM', status: 'On Time', location: 'Office Desk A-12', avatar: 'KK' },
    { id: 2, date: '2026-08-06', name: 'Ishika Kag', role: 'UI/UX Designer', time: '09:28 AM', status: 'On Time', location: 'Office Desk B-04', avatar: 'IK' },
    { id: 3, date: '2026-08-06', name: 'Yashashvini', role: 'Backend Engg', time: '10:05 AM', status: 'Late', location: 'Remote / Home', avatar: 'YS' },
    { id: 4, date: '2026-08-06', name: 'Yogesh', role: 'QA Specialist', time: '09:40 AM', status: 'On Time', location: 'Office Desk C-02', avatar: 'YG' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, type: 'Casual Leave', name: 'Ishika Kag', startDate: '2026-08-10', endDate: '2026-08-11', reason: 'Personal work at home', status: 'Pending' },
    { id: 2, type: 'Medical Leave', name: 'Yashashvini', startDate: '2026-07-15', endDate: '2026-07-16', reason: 'Fever and rest', status: 'Approved' }
  ]);

  const [workLogs, setWorkLogs] = useState([
    { id: 1, project: 'AI Workforce OS', task: 'Created Level 1 ER Diagram & Schema Design', hours: '4.5 hrs', qualityScore: '98%' },
    { id: 2, project: 'Telemetry Dashboard', task: 'Integrated Lucide Icons and Auth Flow UI', hours: '3.0 hrs', qualityScore: '95%' }
  ]);

  // Form states for adding data
  const [newLeave, setNewLeave] = useState({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  const [newLog, setNewLog] = useState({ project: '', task: '', hours: '' });

  const handleEmailAuth = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter valid credentials");
      return;
    }
    setIsAuthenticated(true);
  };

  const handleEmailQuickLogin = () => {
    setEmail("karinakatare13@gmail.com");
    setIsAuthenticated(true);
  };

  const handleGoogleAuth = () => {
    setEmail("developer@enterprise.com");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleCheckInToggle = () => {
    if (!wifiVerified || !geofenceVerified) {
      alert("⚠️ Access Denied: Office WiFi (Office_5G) and Geofence Verification Required.");
      return;
    }
    setIsCheckedIn(!isCheckedIn);
  };

  const handleAddLeave = (e) => {
    e.preventDefault();
    if (!newLeave.startDate || !newLeave.reason) return;
    setLeaveRequests([...leaveRequests, { id: Date.now(), name: 'Karina Katare', ...newLeave, status: 'Pending' }]);
    setNewLeave({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  };

  const handleLeaveAction = (id, newStatus) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLog.project || !newLog.task) return;
    setWorkLogs([...workLogs, { id: Date.now(), ...newLog, qualityScore: '96%' }]);
    setNewLog({ project: '', task: '', hours: '' });
  };

  // 1. AUTHENTICATION PAGE
  if (!isAuthenticated) {
    return (
      <div className="unique-auth-wrapper">
        <div className="auth-background-grid"></div>
        <div className="auth-glow-orb orb-1"></div>
        <div className="auth-glow-orb orb-2"></div>

        <div className="unique-auth-container">
          <div className="auth-hero-panel">
            <div className="hero-brand">
              <div className="brand-icon-pulse">
                <Cpu size={32} color="#6366f1" />
              </div>
              <div className="brand-name-group">
                <span className="brand-title">AI WORKFORCE</span>
                <span className="brand-subtitle">ENTERPRISE OS</span>
              </div>
            </div>

            <div className="hero-headline">
              <h1>Autonomous Workforce & Governance Portal</h1>
              <p>Next-generation perimeter validation, multi-role management, and AI workflow telemetry for enterprise software teams.</p>
            </div>

            <div className="hero-telemetry-badge">
              <div className="telemetry-badge-item">
                <div className="badge-value text-indigo">99.98%</div>
                <div className="badge-label">Telemetry Accuracy</div>
              </div>
              <div className="badge-divider"></div>
              <div className="telemetry-badge-item">
                <div className="badge-value text-emerald">&lt; 15ms</div>
                <div className="badge-label">Geofence Latency</div>
              </div>
              <div className="badge-divider"></div>
              <div className="telemetry-badge-item">
                <div className="badge-value text-cyan">AES-256</div>
                <div className="badge-label">Encrypted Sessions</div>
              </div>
            </div>

            <div className="hero-footer-status">
              <span className="status-indicator-dot"></span>
              <span>Primary Node: Mumbai-IN-01 | Encrypted Gateway</span>
            </div>
          </div>

          <div className="auth-form-panel">
            <div className="form-card-glass">
              <div className="card-top-header">
                <h3>{authMode === 'login' ? 'Authenticate Account' : 'Initialize Workspace'}</h3>
                <p>Select your verified identity provider to continue</p>
              </div>

              <div className="auth-providers-grid">
                <button className="provider-btn google-btn" onClick={handleGoogleAuth}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                <button type="button" className="provider-btn email-provider-btn" onClick={handleEmailQuickLogin}>
                 <Mail size={18} color="#818cf8" />
                 <span>Sign in with Email</span>
                </button>
              </div>

              <div className="custom-divider">
                <div className="divider-line"></div>
                <span className="divider-text">OR ENTER CREDENTIALS</span>
                <div className="divider-line"></div>
              </div>

              <form onSubmit={handleEmailAuth} className="modern-auth-form">
                {authMode === 'register' && (
                  <div className="form-field">
                    <label>FULL NAME</label>
                    <div className="modern-input-box">
                      <Sparkles size={16} className="input-icon" />
                      <input 
                        type="text" 
                        placeholder="e.g. Karina Katare" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                      />
                    </div>
                  </div>
                )}

                <div className="form-field">
                  <label>ENTERPRISE EMAIL</label>
                  <div className="modern-input-box">
                    <Mail size={16} className="input-icon" />
                    <input 
                      type="email" 
                      placeholder="karinakatare13@gmail.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-field">
                  <div className="label-row">
                    <label>SECURE PASSWORD</label>
                    {authMode === 'login' && <span className="forgot-pass-link">Forgot?</span>}
                  </div>
                  <div className="modern-input-box">
                    <Lock size={16} className="input-icon" />
                    <input 
                      type="password" 
                      placeholder="••••••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <button type="submit" className="cyber-submit-btn">
                  <span>{authMode === 'login' ? 'Access Workspace Console' : 'Complete Registration'}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD PAGE
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div>
          <div className="sidebar-brand">
            <div className="brand-logo">
              <Cpu size={22} color="#818cf8" />
            </div>
            <div className="brand-text">
              <span>AI WORKFORCE</span>
              <small>ENTERPRISE OS</small>
            </div>
          </div>

          <nav className="sidebar-menu">
            <div className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <LayoutDashboard size={18} />
              <span>Dashboard Overview</span>
            </div>
            
            <div className={`sidebar-item ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
              <Clock size={18} />
              <span>Auto Attendance</span>
              <span className="badge-pulse">Live</span>
            </div>

            <div className={`sidebar-item ${activeTab === 'leaves' ? 'active' : ''}`} onClick={() => setActiveTab('leaves')}>
              <Calendar size={18} />
              <span>Leave Requests</span>
              <span className="count-badge">{leaveRequests.filter(l => l.status === 'Pending').length}</span>
            </div>

            <div className={`sidebar-item ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
              <FileText size={18} />
              <span>Daily Work Logs</span>
            </div>

            <div className={`sidebar-item ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}>
              <Award size={18} />
              <span>AI Performance</span>
            </div>

            {/* Manager / Super Manager Exclusive Tab */}
            {(userRole === 'manager' || userRole === 'supermanager' || userRole === 'admin') && (
              <div className={`sidebar-item ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
                <Users size={18} />
                <span>Team Governance</span>
              </div>
            )}

            {/* Super Manager / Admin Exclusive Tab */}
            {(userRole === 'supermanager' || userRole === 'admin') && (
              <div className={`sidebar-item ${activeTab === 'supermanager' ? 'active' : ''}`} onClick={() => setActiveTab('supermanager')}>
                <Crown size={18} color="#fbbf24" />
                <span>Executive Analytics</span>
              </div>
            )}

            {/* System Admin Exclusive Tab */}
            {userRole === 'admin' && (
              <div className={`sidebar-item ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>
                <Settings size={18} color="#f87171" />
                <span>Admin Config</span>
              </div>
            )}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="avatar-glow">KK</div>
            <div className="user-info">
              <span className="user-name">Karina Katare</span>
              <span className="user-role" style={{ textTransform: 'capitalize' }}>Role: {userRole}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Exit Workspace
          </button>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="top-navbar">
          <div className="search-box">
            <Search size={16} color="#64748b" />
            <input type="text" placeholder="Search team members, system logs, tasks..." />
          </div>

          <div className="nav-actions">
            <div className="role-badge-wrapper">
              <span>Role Context:</span>
              <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="role-select">
                <option value="employee">Employee Portal</option>
                <option value="manager">Manager Portal</option>
                <option value="supermanager">Super Manager / VP</option>
                <option value="admin">System Admin</option>
              </select>
            </div>
            
            <button className="icon-btn">
              <Bell size={18} />
              <span className="notification-dot"></span>
            </button>
            <button className="primary-cta-btn" onClick={handleCheckInToggle}>
              <Clock size={16} /> {isCheckedIn ? 'Check Out' : 'Quick Check-In'}
            </button>
          </div>
        </header>

        <main className="page-container">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <>
              <div className="welcome-banner">
                <div>
                  <h2>Enterprise Workspace Summary ({userRole.toUpperCase()})</h2>
                  <p>All AI telemetry, geofence validations, and team activity are synced real-time.</p>
                </div>
                <div className="status-pill-glow">
                  <span className="pulse-dot"></span> System Status: Operational
                </div>
              </div>

              <div className="metrics-grid">
                <div className="glow-card">
                  <div className="metric-header">
                    <span>Attendance Status</span>
                    <Clock size={18} className="icon-purple" />
                  </div>
                  <div className="metric-value">
                    {isCheckedIn ? <span className="text-success">Checked In</span> : <span className="text-warning">Checked Out</span>}
                  </div>
                  <div className="metric-footer">
                    <MapPin size={13} /> Geofence & WiFi Verified
                  </div>
                </div>

                <div className="glow-card">
                  <div className="metric-header">
                    <span>AI Performance Rating</span>
                    <Award size={18} className="icon-blue" />
                  </div>
                  <div className="metric-value">92 <small>/ 100</small></div>
                  <div className="metric-footer text-success">
                    <TrendingUp size={13} /> Top 5% Performance Tier
                  </div>
                </div>

                <div className="glow-card">
                  <div className="metric-header">
                    <span>Pending Leave Requests</span>
                    <Calendar size={18} className="icon-amber" />
                  </div>
                  <div className="metric-value">{leaveRequests.filter(l => l.status === 'Pending').length} Pending</div>
                  <div className="metric-footer text-amber">
                    <AlertCircle size={13} /> Needs Approval
                  </div>
                </div>

                <div className="glow-card">
                  <div className="metric-header">
                    <span>Synced Work Logs</span>
                    <FileText size={18} className="icon-cyan" />
                  </div>
                  <div className="metric-value">{workLogs.length} Records</div>
                  <div className="metric-footer text-cyan">
                    <CheckCircle2 size={13} /> AI Quality Score 98%
                  </div>
                </div>
              </div>

              <div className="content-grid">
                <div className="glass-panel">
                  <div className="panel-title">
                    <div className="panel-title-text">
                      <ShieldCheck color="#34d399" size={20} />
                      <span>Security & Infrastructure Telemetry</span>
                    </div>
                    <span className="sub-badge">Live Monitor</span>
                  </div>

                  <div className="validation-list">
                    <div className="val-item">
                      <div className="val-left">
                        <MapPin size={16} color="#38bdf8" />
                        <div>
                          <strong>Geofence Perimeter (200m)</strong>
                          <p>GPS Coordinates matched with office location</p>
                        </div>
                      </div>
                      <span className={`status-tag ${geofenceVerified ? 'pass' : 'fail'}`}>
                        {geofenceVerified ? 'VERIFIED' : 'FAILED'}
                      </span>
                    </div>

                    <div className="val-item">
                      <div className="val-left">
                        <Wifi size={16} color="#38bdf8" />
                        <div>
                          <strong>Office Network SSID</strong>
                          <p>SSID: Office_5G | BSSID Validated</p>
                        </div>
                      </div>
                      <span className={`status-tag ${wifiVerified ? 'pass' : 'fail'}`}>
                        {wifiVerified ? 'CONNECTED' : 'DISCONNECTED'}
                      </span>
                    </div>

                    <div className="val-item">
                      <div className="val-left">
                        <Database size={16} color="#818cf8" />
                        <div>
                          <strong>Database Connection</strong>
                          <p>Supabase PostgreSQL (Latency: 24ms)</p>
                        </div>
                      </div>
                      <span className="status-tag info">ONLINE</span>
                    </div>
                  </div>
                </div>

                <div className="glass-panel ai-copilot-panel">
                  <div className="panel-title">
                    <div className="panel-title-text">
                      <Bot size={20} color="#c084fc" />
                      <span>AI Workforce Assistant</span>
                    </div>
                    <Sparkles size={16} color="#fbbf24" />
                  </div>

                  <div className="ai-insight-card">
                    <div className="insight-header">
                      <Activity size={16} color="#c084fc" />
                      <span>Daily Automation Insight</span>
                    </div>
                    <p>Attendance fidelity score is <strong>98.4%</strong>. Worklogs have been parsed and verified against code commits for today's tasks.</p>
                  </div>

                  <div className="sandbox-panel">
                    <span className="sandbox-title">System Rule Controls:</span>
                    <div className="sandbox-grid">
                      <button className={`toggle-pill ${geofenceVerified ? 'active' : ''}`} onClick={() => setGeofenceVerified(!geofenceVerified)}>
                        Geofence: {geofenceVerified ? 'PASS' : 'FAIL'}
                      </button>
                      <button className={`toggle-pill ${wifiVerified ? 'active' : ''}`} onClick={() => setWifiVerified(!wifiVerified)}>
                        WiFi SSID: {wifiVerified ? 'PASS' : 'FAIL'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: AUTO ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="glass-panel full-width-panel">
              <div className="panel-title">
                <div className="panel-title-text">
                  <Clock size={20} color="#818cf8" />
                  <span>Automated Attendance Logs & Geofence Sync</span>
                </div>
                <button className="primary-cta-btn" onClick={handleCheckInToggle}>
                  {isCheckedIn ? 'Mark Check-Out' : 'Mark Check-In'}
                </button>
              </div>

              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Team Member</th>
                      <th>Role</th>
                      <th>Check-in Time</th>
                      <th>Location / Desk</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.date}</td>
                        <td>
                          <div className="user-cell">
                            <div className="table-avatar">{log.avatar}</div>
                            <span>{log.name}</span>
                          </div>
                        </td>
                        <td>{log.role}</td>
                        <td>{log.time}</td>
                        <td><MapPin size={12} color="#38bdf8" /> {log.location}</td>
                        <td>
                          <span className={`status-badge ${log.status === 'On Time' ? 'success' : 'warning'}`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LEAVE REQUESTS */}
          {activeTab === 'leaves' && (
            <div className="content-grid">
              <div className="glass-panel">
                <div className="panel-title">
                  <div className="panel-title-text">
                    <Calendar size={20} color="#fbbf24" />
                    <span>Apply for Leave</span>
                  </div>
                </div>

                <form onSubmit={handleAddLeave} className="modern-auth-form">
                  <div className="form-field">
                    <label>LEAVE TYPE</label>
                    <select 
                      value={newLeave.type} 
                      onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                      className="role-select" style={{ width: '100%', padding: '12px' }}
                    >
                      <option value="Casual Leave">Casual Leave</option>
                      <option value="Medical Leave">Medical Leave</option>
                      <option value="Earned Leave">Earned Leave</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-field" style={{ flex: 1 }}>
                      <label>START DATE</label>
                      <div className="modern-input-box">
                        <input 
                          type="date" 
                          value={newLeave.startDate} 
                          onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-field" style={{ flex: 1 }}>
                      <label>END DATE</label>
                      <div className="modern-input-box">
                        <input 
                          type="date" 
                          value={newLeave.endDate} 
                          onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>REASON FOR LEAVE</label>
                    <div className="modern-input-box">
                      <input 
                        type="text" 
                        placeholder="Explain reason..." 
                        value={newLeave.reason} 
                        onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <button type="submit" className="cyber-submit-btn">
                    <PlusCircle size={16} /> Submit Application
                  </button>
                </form>
              </div>

              <div className="glass-panel">
                <div className="panel-title">
                  <div className="panel-title-text">
                    <FileText size={20} color="#818cf8" />
                    <span>Leave Approval Panel</span>
                  </div>
                </div>

                <div className="validation-list">
                  {leaveRequests.map((req) => (
                    <div key={req.id} className="val-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <strong>{req.name} - {req.type}</strong>
                        <span className={`status-tag ${req.status === 'Approved' ? 'pass' : 'fail'}`}>{req.status}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{req.reason} ({req.startDate} to {req.endDate || req.startDate})</p>
                      
                      {(userRole === 'manager' || userRole === 'supermanager' || userRole === 'admin') && req.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                          <button onClick={() => handleLeaveAction(req.id, 'Approved')} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>Approve</button>
                          <button onClick={() => handleLeaveAction(req.id, 'Rejected')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>Reject</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DAILY WORK LOGS */}
          {activeTab === 'logs' && (
            <div className="content-grid">
              <div className="glass-panel">
                <div className="panel-title">
                  <div className="panel-title-text">
                    <PlusCircle size={20} color="#38bdf8" />
                    <span>Add Work Log Entry</span>
                  </div>
                </div>

                <form onSubmit={handleAddLog} className="modern-auth-form">
                  <div className="form-field">
                    <label>PROJECT / MODULE</label>
                    <div className="modern-input-box">
                      <input 
                        type="text" 
                        placeholder="e.g. AI Workforce OS" 
                        value={newLog.project} 
                        onChange={(e) => setNewLog({ ...newLog, project: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>HOURS SPENT</label>
                    <div className="modern-input-box">
                      <input 
                        type="text" 
                        placeholder="e.g. 4.5 hrs" 
                        value={newLog.hours} 
                        onChange={(e) => setNewLog({ ...newLog, hours: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>TASK DETAILS</label>
                    <div className="modern-input-box">
                      <input 
                        type="text" 
                        placeholder="Detail work done..." 
                        value={newLog.task} 
                        onChange={(e) => setNewLog({ ...newLog, task: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <button type="submit" className="cyber-submit-btn">
                    <Check size={16} /> Save Daily Log
                  </button>
                </form>
              </div>

              <div className="glass-panel">
                <div className="panel-title">
                  <div className="panel-title-text">
                    <FileText size={20} color="#38bdf8" />
                    <span>Work Logs</span>
                  </div>
                </div>

                <div className="validation-list">
                  {workLogs.map((log) => (
                    <div key={log.id} className="val-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <strong style={{ color: '#818cf8' }}>{log.project} ({log.hours})</strong>
                        <span className="status-tag pass">AI Quality: {log.qualityScore}</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{log.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AI PERFORMANCE */}
          {activeTab === 'performance' && (
            <div className="glass-panel full-width-panel">
              <div className="panel-title">
                <div className="panel-title-text">
                  <Award size={20} color="#c084fc" />
                  <span>AI Performance & Telemetry Scorecard</span>
                </div>
                <span className="status-tag pass">Tier 1 Elite</span>
              </div>
              <div style={{ padding: '20px 0', color: '#cbd5e1', lineHeight: '1.6' }}>
                <p>Your overall productivity score is evaluated based on automated code quality commits, punctual geofenced attendance check-ins, and consistent daily task logs.</p>
                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                  <div className="glow-card" style={{ padding: '15px' }}>
                    <strong>Code Review Accuracy</strong>
                    <div style={{ fontSize: '1.5rem', color: '#34d399', marginTop: '5px' }}>98.2%</div>
                  </div>
                  <div className="glow-card" style={{ padding: '15px' }}>
                    <strong>Attendance Compliance</strong>
                    <div style={{ fontSize: '1.5rem', color: '#38bdf8', marginTop: '5px' }}>100%</div>
                  </div>
                  <div className="glow-card" style={{ padding: '15px' }}>
                    <strong>Task Velocity</strong>
                    <div style={{ fontSize: '1.5rem', color: '#c084fc', marginTop: '5px' }}>+14% vs Avg</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TEAM GOVERNANCE (Manager View) */}
          {activeTab === 'team' && (
            <div className="glass-panel full-width-panel">
              <div className="panel-title">
                <div className="panel-title-text">
                  <Users size={20} color="#38bdf8" />
                  <span>Team Governance & Oversight</span>
                </div>
                <span className="status-tag info">Active Directory</span>
              </div>
              <div style={{ padding: '20px 0', color: '#cbd5e1' }}>
                <p>Manage and audit your direct reporting engineering team members across various modules.</p>
                <div className="table-wrapper" style={{ marginTop: '15px' }}>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Weekly Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ishika Kag</td>
                        <td>UI/UX Designer</td>
                        <td><span className="status-tag pass">Active</span></td>
                        <td>38.5 hrs</td>
                      </tr>
                      <tr>
                        <td>Yashashvini</td>
                        <td>Backend Engineer</td>
                        <td><span className="status-tag pass">Active</span></td>
                        <td>40.0 hrs</td>
                      </tr>
                      <tr>
                        <td>Yogesh</td>
                        <td>QA Specialist</td>
                        <td><span className="status-tag pass">Active</span></td>
                        <td>39.2 hrs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: EXECUTIVE ANALYTICS (Super Manager View) */}
          {activeTab === 'supermanager' && (
            <div className="glass-panel full-width-panel">
              <div className="panel-title">
                <div className="panel-title-text">
                  <Crown size={20} color="#fbbf24" />
                  <span>Executive Analytics & Global Telemetry</span>
                </div>
                <span className="status-tag pass">VP Level Access</span>
              </div>
              <div style={{ padding: '20px 0', color: '#cbd5e1' }}>
                <p>High-level enterprise workforce operational metrics, geofence compliance tracking, and overall deployment distribution.</p>
              </div>
            </div>
          )}

          {/* TAB 8: ADMIN CONFIG (Admin View) */}
          {activeTab === 'admin' && (
            <div className="glass-panel full-width-panel">
              <div className="panel-title">
                <div className="panel-title-text">
                  <Settings size={20} color="#f87171" />
                  <span>System Administration & Security Configuration</span>
                </div>
                <span className="status-tag fail">Root Access</span>
              </div>
              <div style={{ padding: '20px 0', color: '#cbd5e1' }}>
                <p>Configure global server endpoints, IP/BSSID whitelists, and database connection strings.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}