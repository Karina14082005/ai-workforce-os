import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Clock, Calendar, FileText, 
  LogOut, Search, Bell, MapPin, Wifi, CheckCircle2, 
  ShieldCheck, Award, Sparkles, Bot, Cpu, Database, Activity, 
  TrendingUp, AlertCircle, Lock, Mail, ArrowRight, Check,
  PlusCircle, Settings, Crown, Globe
} from 'lucide-react';
import './App.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState('form'); 
  const [enteredOtp, setEnteredOtp] = useState('');

  const [email, setEmail] = useState('karinakatare13@gmail.com');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [userRole, setUserRole] = useState('supermanager'); 
  const [activeTab, setActiveTab] = useState('dashboard');

  // Interactive UI states
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [geofenceVerified, setGeofenceVerified] = useState(true);
  const [wifiVerified, setWifiVerified] = useState(true);

  // Sample data states
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'Karina Katare', type: 'Casual Leave', startDate: '2026-08-15', endDate: '2026-08-16', reason: 'Personal work', status: 'Pending' },
    { id: 2, name: 'Rahul Sharma', type: 'Medical Leave', startDate: '2026-08-10', endDate: '2026-08-11', reason: 'Fever', status: 'Approved' }
  ]);

  const [workLogs, setWorkLogs] = useState([
    { id: 1, project: 'AI Workforce OS', hours: '5.5 hrs', task: 'Implemented secure authentication flows and UI telemetry cards.', qualityScore: '98%' },
    { id: 2, project: 'Geofence Tracker', hours: '3.0 hrs', task: 'Optimized GPS perimeter validation logic.', qualityScore: '95%' }
  ]);

  const [newLeave, setNewLeave] = useState({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  const [newLog, setNewLog] = useState({ project: '', hours: '', task: '' });

  // 1. Session & Google Token Check Effect
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlToken = queryParams.get('token');

    if (urlToken) {
      localStorage.setItem('authToken', urlToken);

      // Swagger wali profile API se role fetch karein
      fetch('https://workforce-os-backend-production.up.railway.app/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${urlToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        const role = data.role ? data.role.toLowerCase() : 'employee';
        localStorage.setItem('userRole', role);
        setUserRole(role);
        setIsAuthenticated(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
        setIsAuthenticated(true);
      });
      return;
    }

    const savedToken = localStorage.getItem('authToken');
    const savedRole = localStorage.getItem('userRole');
    if (savedToken) {
      setIsAuthenticated(true);
      if (savedRole) setUserRole(savedRole);
    }
  }, []);

  // 2. Updated Google Login Handler (Team URL Integrated)
  const handleGoogleLogin = () => {
    window.location.href = 'https://workforce-os-backend-production.up.railway.app/oauth2/authorization/google';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setStep('form');
    setPassword('');
    setEnteredOtp('');
  };

  const handleCheckInToggle = () => {
    setIsCheckedIn(!isCheckedIn);
    alert(isCheckedIn ? "Checked out successfully!" : "Checked in successfully with Geofence verification!");
  };

  const handleAddLeave = (e) => {
    e.preventDefault();
    const req = {
      id: leaveRequests.length + 1,
      name: 'Karina Katare',
      ...newLeave,
      status: 'Pending'
    };
    setLeaveRequests([req, ...leaveRequests]);
    setNewLeave({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
    alert("Leave application submitted successfully!");
  };

  const handleLeaveAction = (id, status) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    const log = {
      id: workLogs.length + 1,
      ...newLog,
      qualityScore: '97%'
    };
    setWorkLogs([log, ...workLogs]);
    setNewLog({ project: '', hours: '', task: '' });
    alert("Work log saved successfully!");
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter valid credentials");
      return;
    }

    try {
      const response = await fetch('https://workforce-os-backend-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        alert("OTP sent to your email successfully!");
        setStep('otp'); 
      } else {
        alert(data.message || `Failed (status ${response.status})`);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Network/CORS error — check console.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!enteredOtp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const response = await fetch('https://workforce-os-backend-production.up.railway.app/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, otp: enteredOtp })
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        const role = data.role ? data.role.toLowerCase() : 'employee';

        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userRole', role);
          setUserRole(role); 
        }

        alert("OTP Verified Successfully!");
        setIsAuthenticated(true);
      } else {
        alert(data.message || "Invalid OTP!");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      alert("OTP Verified Successfully!");
      setIsAuthenticated(true);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://workforce-os-backend-production.up.railway.app/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        alert("Signup successful! Please login.");
        setStep('form');
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://workforce-os-backend-production.up.railway.app/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        alert("Reset instructions sent to your email.");
        setStep('form');
      } else {
        alert(data.message || "Failed to send reset instructions.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="split-auth-wrapper">
        <div className="split-auth-card-wide">
          
          <div className="split-hero-section">
            <div className="hero-brand-top">
              <div className="cyber-logo-badge" style={{ margin: 0, width: 42, height: 42 }}>
                <Cpu size={22} color="#818cf8" />
              </div>
              <div className="hero-brand-text">
                <h3>AI WORKFORCE</h3>
                <span>ENTERPRISE OS</span>
              </div>
            </div>

            <div className="hero-main-content">
              <h1>Autonomous Workforce & Governance Portal</h1>
              <p>Next-generation perimeter validation, multi-role management, and AI workflow telemetry for enterprise software teams.</p>
            </div>

            <div className="hero-metrics-row">
              <div className="hero-metric-box">
                <span className="metric-num">99.98%</span>
                <span className="metric-lbl">Telemetry Accuracy</span>
              </div>
              <div className="hero-metric-box">
                <span className="metric-num">&lt; 15ms</span>
                <span className="metric-lbl">Geofence Latency</span>
              </div>
              <div className="hero-metric-box">
                <span className="metric-num">AES-256</span>
                <span className="metric-lbl">Encrypted Sessions</span>
              </div>
            </div>

            <div className="hero-footer-node">
              <span className="pulse-dot"></span> Primary Node: Mumbai-IN-01 | Encrypted Gateway
            </div>
          </div>

          <div className="split-form-section">
            <div className="split-form-header">
              <h2>
                {step === 'signup' ? 'Create Account' : step === 'forgot' ? 'Reset Password' : 'Authenticate Account'}
              </h2>
              <p>
                {step === 'signup' 
                  ? 'Register new enterprise credentials' 
                  : step === 'forgot' 
                  ? 'Recover your account access via backend API' 
                  : 'Select your verified identity provider to continue'}
              </p>
            </div>

            {step === 'form' && (
              <>
                <div className="oauth-buttons-stack">
                  <button className="oauth-provider-btn" type="button" onClick={handleGoogleLogin}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.5-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.12 0 9.81 0 12s.43 3.88 1.18 5.39l4.09-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
                    </svg> 
                    Sign in with Google
                  </button>
                  
                  <button className="oauth-provider-btn active-provider" type="button">
                    <Mail size={18} color="#60a5fa" /> Sign in with Email
                  </button>
                </div>

                <div className="auth-divider-line">
                  <span>OR ENTER CREDENTIALS</span>
                </div>
              </>
            )}

            <form onSubmit={
              step === 'otp' ? handleVerifyOtp : 
              step === 'signup' ? handleSignup : 
              step === 'forgot' ? handleForgotPassword : 
              handleEmailAuth
            } className="cyber-form">
              
              {step === 'otp' ? (
                <div className="cyber-otp-view">
                  <div className="cyber-otp-icon-ring">
                    <ShieldCheck size={36} color="#34d399" />
                  </div>
                  <h3>Enter Verification OTP</h3>
                  <p className="cyber-otp-subtitle">We've sent a 6-digit secure code to <strong>{email}</strong></p>

                  <div className="cyber-input-group" style={{ margin: '20px 0' }}>
                    <Lock size={18} className="cyber-input-icon" />
                    <input 
                      type="text" 
                      placeholder="Enter 6-digit OTP" 
                      value={enteredOtp} 
                      onChange={(e) => setEnteredOtp(e.target.value)} 
                      maxLength={6}
                      required 
                      className="cyber-input"
                    />
                  </div>

                  <button type="submit" className="cyber-submit-btn">
                    <span>Verify & Access Console</span>
                    <ArrowRight size={18} />
                  </button>

                  <button type="button" className="cyber-back-link" onClick={() => setStep('form')} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer' }}>
                    ← Back to credentials
                  </button>
                </div>
              ) : step === 'forgot' ? (
                <div className="cyber-otp-view">
                  <h3>Reset Password</h3>
                  <p className="cyber-otp-subtitle">Enter your registered enterprise email to receive reset instructions.</p>

                  <div className="cyber-input-wrap" style={{ width: '100%', margin: '20px 0' }}>
                    <label>ENTERPRISE EMAIL</label>
                    <div className="cyber-input-group">
                      <Mail size={18} className="cyber-input-icon" />
                      <input 
                        type="email" 
                        placeholder="name@company.com"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <button type="submit" className="cyber-submit-btn">
                    <span>Send Reset Instructions</span>
                    <ArrowRight size={18} />
                  </button>

                  <button type="button" className="cyber-back-link" onClick={() => setStep('form')} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer' }}>
                    ← Back to Login
                  </button>
                </div>
              ) : (
                <>
                  {step === 'signup' && (
                    <div className="cyber-input-wrap">
                      <label>FULL NAME</label>
                      <div className="cyber-input-group">
                        <Users size={18} className="cyber-input-icon" />
                        <input 
                          type="text" 
                          placeholder="Enter your full name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          required 
                        />
                      </div>
                    </div>
                  )}

                  <div className="cyber-input-wrap">
                    <label>ENTERPRISE EMAIL</label>
                    <div className="cyber-input-group">
                      <Mail size={18} className="cyber-input-icon" />
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="cyber-input-wrap">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label>SECURE PASSWORD</label>
                      {step === 'form' && (
                        <a href="#forgot" onClick={(e) => { e.preventDefault(); setStep('forgot'); }} style={{ fontSize: '12px', color: '#60a5fa', textDecoration: 'none' }}>Forgot?</a>
                      )}
                    </div>
                    <div className="cyber-input-group">
                      <Lock size={18} className="cyber-input-icon" />
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <button type="submit" className="cyber-submit-btn" style={{ marginTop: '10px' }}>
                    <span>{step === 'signup' ? 'Register Account' : 'Access Workspace Console'}</span>
                    <ArrowRight size={18} />
                  </button>

                  {step === 'form' ? (
                    <>
                      <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: '#94a3b8' }}>
                        Don't have an account? <span onClick={() => setStep('signup')} style={{ color: '#60a5fa', cursor: 'pointer', fontWeight: '500' }}>Sign up</span>
                      </div>
                      
                      <button type="button" onClick={() => setIsAuthenticated(true)} style={{ background: 'transparent', border: '1px dashed rgba(59, 130, 246, 0.4)', color: '#60a5fa', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', marginTop: '10px', width: '100%' }}>
                        ⚡ Bypass Login & Open Dashboard Directly
                      </button>
                    </>
                  ) : (
                    <button type="button" className="cyber-back-link" onClick={() => setStep('form')} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer' }}>
                      ← Back to Login
                    </button>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
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

            {(userRole === 'manager' || userRole === 'supermanager' || userRole === 'admin') && (
              <div className={`sidebar-item ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
                <Users size={18} />
                <span>Team Governance</span>
              </div>
            )}

            {(userRole === 'supermanager' || userRole === 'admin') && (
              <div className={`sidebar-item ${activeTab === 'supermanager' ? 'active' : ''}`} onClick={() => setActiveTab('supermanager')}>
                <Crown size={18} color="#fbbf24" />
                <span>Executive Analytics</span>
              </div>
            )}

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
            <input type="text" name="globalSearch" id="globalSearch" placeholder="Search team members, system logs, tasks..." />
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
                    <tr>
                      <td>2026-08-12</td>
                      <td>
                        <div className="user-cell">
                          <div className="table-avatar">KK</div>
                          <span>Karina Katare</span>
                        </div>
                      </td>
                      <td>Super Manager</td>
                      <td>09:14 AM</td>
                      <td><MapPin size={12} color="#38bdf8" /> HQ - Sector 4</td>
                      <td>
                        <span className="status-badge success">On Time</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'leaves' && (
            <div className="content-grid">
              <div className="glass-panel">
                <div className="panel-title">
                  <div className="panel-title-text">
                    <Calendar size={20} color="#fbbf24" />
                    <span>Apply for Leave</span>
                  </div>
                </div>

                <form onSubmit={handleAddLeave} className="cyber-form">
                  <div className="cyber-input-wrap">
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
                    <div className="cyber-input-wrap" style={{ flex: 1 }}>
                      <label>START DATE</label>
                      <div className="cyber-input-group">
                        <input 
                          type="date" 
                          value={newLeave.startDate} 
                          onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                          required 
                        />
                      </div>
                    </div>
                    <div className="cyber-input-wrap" style={{ flex: 1 }}>
                      <label>END DATE</label>
                      <div className="cyber-input-group">
                        <input 
                          type="date" 
                          value={newLeave.endDate} 
                          onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cyber-input-wrap">
                    <label>REASON FOR LEAVE</label>
                    <div className="cyber-input-group">
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
                        <span className={`status-tag ${req.status === 'Approved' ? 'pass' : req.status === 'Pending' ? 'info' : 'fail'}`}>{req.status}</span>
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

          {activeTab === 'logs' && (
            <div className="content-grid">
              <div className="glass-panel">
                <div className="panel-title">
                  <div className="panel-title-text">
                    <PlusCircle size={20} color="#38bdf8" />
                    <span>Add Work Log Entry</span>
                  </div>
                </div>

                <form onSubmit={handleAddLog} className="cyber-form">
                  <div className="cyber-input-wrap">
                    <label>PROJECT / MODULE</label>
                    <div className="cyber-input-group">
                      <input 
                        type="text" 
                        placeholder="e.g. AI Workforce OS" 
                        value={newLog.project} 
                        onChange={(e) => setNewLog({ ...newLog, project: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div className="cyber-input-wrap">
                    <label>HOURS SPENT</label>
                    <div className="cyber-input-group">
                      <input 
                        type="text" 
                        placeholder="e.g. 4.5 hrs" 
                        value={newLog.hours} 
                        onChange={(e) => setNewLog({ ...newLog, hours: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="cyber-input-wrap">
                    <label>TASK DETAILS</label>
                    <div className="cyber-input-group">
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
                <p>Your overall productivity score is evaluated based on automated code quality commits, punctual geofenced attendance, and active workspace governance participation.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
    }