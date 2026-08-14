
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Clock, Calendar, FileText, 
  LogOut, Search, Bell, MapPin, Wifi, CheckCircle2, 
  ShieldCheck, Award, Sparkles, Bot, Cpu, Database, Activity, 
  TrendingUp, AlertCircle, Lock, Mail, ArrowRight, Check,
  PlusCircle, Settings, Crown, Globe, Zap, ChevronDown
} from 'lucide-react';
import './App.css';
 
const API_BASE = 'https://workforce-os-backend-production.up.railway.app';
 
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState('form'); 
  const [enteredOtp, setEnteredOtp] = useState('');
 
  const [email, setEmail] = useState('karinakatare13@gmail.com');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 
  const [userRole, setUserRole] = useState('supermanager'); 
  const [activeTab, setActiveTab] = useState('dashboard');
 
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [geofenceVerified, setGeofenceVerified] = useState(true);
  const [wifiVerified, setWifiVerified] = useState(true);
 
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
 
  // ---- user-controller integration state ----
  const [toasts, setToasts] = useState([]);
  const [teamUsers, setTeamUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [roleUpdatingId, setRoleUpdatingId] = useState(null);
 
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionsError, setSessionsError] = useState('');
  const [sessionsLoaded, setSessionsLoaded] = useState(false);
  const [loggingOutAll, setLoggingOutAll] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
 
  const pushToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  };
 
  const authHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };
 
  // GET /api/users
  const fetchTeamUsers = async () => {
    setUsersLoading(true);
    setUsersError('');
    try {
      const res = await fetch(`${API_BASE}/api/users`, {
        method: 'GET',
        headers: authHeaders()
      });
      const data = await res.json().catch(() => ([]));
      if (res.ok) {
        setTeamUsers(Array.isArray(data) ? data : (data.users || []));
      } else {
        setUsersError(data.message || `Failed to load team members (status ${res.status})`);
      }
    } catch (err) {
      console.error('Fetch users error:', err);
      setUsersError('Network error while loading team members.');
    } finally {
      setUsersLoading(false);
      setUsersLoaded(true);
    }
  };
 
  // PUT /api/users/{id}/role
  const handleRoleChange = async (userId, newRole) => {
    setRoleUpdatingId(userId);
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/role`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setTeamUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
        pushToast('Role updated successfully.', 'success');
      } else {
        pushToast(data.message || 'Failed to update role.', 'error');
      }
    } catch (err) {
      console.error('Role update error:', err);
      pushToast('Network error while updating role.', 'error');
    } finally {
      setRoleUpdatingId(null);
    }
  };
 
  // GET /api/users/sessions
  const fetchSessions = async () => {
    setSessionsLoading(true);
    setSessionsError('');
    try {
      const res = await fetch(`${API_BASE}/api/users/sessions`, {
        method: 'GET',
        headers: authHeaders()
      });
      const data = await res.json().catch(() => ([]));
      if (res.ok) {
        setSessions(Array.isArray(data) ? data : (data.sessions || []));
      } else {
        setSessionsError(data.message || `Failed to load sessions (status ${res.status})`);
      }
    } catch (err) {
      console.error('Fetch sessions error:', err);
      setSessionsError('Network error while loading sessions.');
    } finally {
      setSessionsLoading(false);
      setSessionsLoaded(true);
    }
  };
 
  // DELETE /api/users/sessions/logout-all
  const handleLogoutAllDevices = async () => {
    setLoggingOutAll(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/sessions/logout-all`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        pushToast('Logged out from all devices.', 'success');
        fetchSessions();
      } else {
        const data = await res.json().catch(() => ({}));
        pushToast(data.message || 'Failed to logout from all devices.', 'error');
      }
    } catch (err) {
      console.error('Logout-all error:', err);
      pushToast('Network error while logging out all devices.', 'error');
    } finally {
      setLoggingOutAll(false);
    }
  };
 
  useEffect(() => {
    if (isAuthenticated && activeTab === 'governance') {
      if (!usersLoaded) fetchTeamUsers();
      if (!sessionsLoaded) fetchSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, activeTab]);
 
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlToken = queryParams.get('token');
 
    if (urlToken) {
      localStorage.setItem('authToken', urlToken);
 
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
 
  const handleGoogleLogin = () => {
    window.location.href = 'https://workforce-os-backend-production.up.railway.app/oauth2/authorization/google';
  };
 
  const handleBypassLogin = () => {
    localStorage.setItem('authToken', 'bypass-token-12345');
    localStorage.setItem('userRole', 'supermanager');
    setUserRole('supermanager');
    setIsAuthenticated(true);
  };
 
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // DELETE /api/users/sessions/logout — invalidate this session on the backend
      await fetch(`${API_BASE}/api/users/sessions/logout`, {
        method: 'DELETE',
        headers: authHeaders()
      });
    } catch (err) {
      console.error('Logout API error:', err);
      // Even if the backend call fails, still clear the local session below.
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      setIsAuthenticated(false);
      setStep('form');
      setPassword('');
      setEnteredOtp('');
      setUsersLoaded(false);
      setSessionsLoaded(false);
      setIsLoggingOut(false);
    }
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
 
        if (token) {
          localStorage.setItem('authToken', token);
 
          // Server se user profile fetch karein taaki exact role mil sake (jaise Google OAuth me hota hai)
          try {
            const profileRes = await fetch('https://workforce-os-backend-production.up.railway.app/api/users/profile', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            const profileData = await profileRes.json();
            if (profileRes.ok && profileData.role) {
              const role = profileData.role.toLowerCase();
              localStorage.setItem('userRole', role);
              setUserRole(role);
            } else {
              // Fallback agar profile API me role na mile
              const fallbackRole = data.role ? data.role.toLowerCase() : 'supermanager';
              localStorage.setItem('userRole', fallbackRole);
              setUserRole(fallbackRole);
            }
          } catch (profileErr) {
            console.error("Profile fetch error after OTP:", profileErr);
            setUserRole('supermanager');
          }
        }
 
        alert("OTP Verified Successfully!");
        setIsAuthenticated(true);
      } else {
        alert(data.message || "Invalid OTP!");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      alert("Network error during OTP verification.");
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
 
  const ToastStack = () => (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className={`toast-item toast-${t.type}`}>
          {t.type === 'success' && <CheckCircle2 size={16} />}
          {t.type === 'error' && <AlertCircle size={16} />}
          {t.type === 'info' && <Activity size={16} />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
 
  if (!isAuthenticated) {
    return (
      <div className="split-auth-wrapper">
        <ToastStack />
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
 
                {/* FORGOT & CREATE ACCOUNT ACTION BUTTONS ROW */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button 
                    type="button" 
                    onClick={() => setStep('forgot')}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #2563eb15, #1d4ed825)',
                      border: '1px solid #2563eb50',
                      color: '#93c5fd',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Forgot Password?
                  </button>
 
                  <button 
                    type="button" 
                    onClick={() => setStep('signup')}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #2563eb15, #1d4ed825)',
                      border: '1px solid #2563eb50',
                      color: '#93c5fd',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}
 
            <form onSubmit={
              step === 'otp' ? handleVerifyOtp : 
              step === 'signup' ? handleSignup : 
              step === 'forgot' ? handleForgotPassword : 
              handleEmailAuth
            } className="cyber-form">
              
              {step === 'otp' && (
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
                  <button type="submit" className="cyber-submit-btn">Verify OTP</button>
                </div>
              )}
 
              {step === 'form' && (
                <div className="cyber-form-inner">
                  <div className="cyber-input-field-block">
                    <label className="cyber-field-label">ENTERPRISE EMAIL</label>
                    <div className="cyber-input-group">
                      <Mail size={18} className="cyber-input-icon" />
                      <input 
                        type="email" 
                        placeholder="name@enterprise.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="cyber-input"
                      />
                    </div>
                  </div>
 
                  <div className="cyber-input-field-block">
                    <label className="cyber-field-label">SECURE PASSWORD</label>
                    <div className="cyber-input-group">
                      <Lock size={18} className="cyber-input-icon" />
                      <input 
                        type="password" 
                        placeholder="••••••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="cyber-input"
                      />
                    </div>
                  </div>
 
                  <button type="submit" className="cyber-submit-btn">
                    Proceed to Verification <ArrowRight size={16} />
                  </button>
 
                  <div className="bypass-divider" style={{ margin: '16px 0' }}>
                    <span>OR</span>
                  </div>
 
                  <button type="button" className="cyber-bypass-btn" onClick={handleBypassLogin}>
                    <Zap size={16} color="#fbbf24" /> Bypass Login & Open Dashboard Directly
                  </button>
                </div>
              )}
 
              {step === 'signup' && (
                <div className="cyber-form-inner">
                  <div className="cyber-input-field-block">
                    <label className="cyber-field-label">FULL NAME</label>
                    <div className="cyber-input-group">
                      <Users size={18} className="cyber-input-icon" />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="cyber-input"
                      />
                    </div>
                  </div>
 
                  <div className="cyber-input-field-block">
                    <label className="cyber-field-label">ENTERPRISE EMAIL</label>
                    <div className="cyber-input-group">
                      <Mail size={18} className="cyber-input-icon" />
                      <input 
                        type="email" 
                        placeholder="name@enterprise.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="cyber-input"
                      />
                    </div>
                  </div>
 
                  <div className="cyber-input-field-block">
                    <label className="cyber-field-label">CREATE PASSWORD</label>
                    <div className="cyber-input-group">
                      <Lock size={18} className="cyber-input-icon" />
                      <input 
                        type="password" 
                        placeholder="Create Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="cyber-input"
                      />
                    </div>
                  </div>
 
                  <button type="submit" className="cyber-submit-btn">
                    Register Account <ArrowRight size={16} />
                  </button>
 
                  <div className="auth-footer-switch">
                    <button type="button" className="text-link-btn" onClick={() => setStep('form')}>Already have an account? Login</button>
                  </div>
                </div>
              )}
 
              {step === 'forgot' && (
                <div className="cyber-form-inner">
                  <div className="cyber-input-field-block">
                    <label className="cyber-field-label">REGISTERED EMAIL</label>
                    <div className="cyber-input-group">
                      <Mail size={18} className="cyber-input-icon" />
                      <input 
                        type="email" 
                        placeholder="Enter registered email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="cyber-input"
                      />
                    </div>
                  </div>
 
                  <button type="submit" className="cyber-submit-btn">
                    Send Reset Link <ArrowRight size={16} />
                  </button>
 
                  <div className="auth-footer-switch">
                    <button type="button" className="text-link-btn" onClick={() => setStep('form')}>Back to Login</button>
                  </div>
                </div>
              )}
 
            </form>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="app-layout">
      <ToastStack />
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo-icon">
            <Cpu size={20} color="#818cf8" />
          </div>
          <div className="brand-text">
            <h3>AI WORKFORCE</h3>
            <span>ENTERPRISE OS</span>
          </div>
        </div>
 
        <div className="sidebar-menu">
          <button className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={18} /> Dashboard Overview
          </button>
          <button className={`menu-item ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
            <Clock size={18} /> Auto Attendance <span className="live-pill">Live</span>
          </button>
          <button className={`menu-item ${activeTab === 'leaves' ? 'active' : ''}`} onClick={() => setActiveTab('leaves')}>
            <Calendar size={18} /> Leave Requests <span className="badge-count">1</span>
          </button>
          <button className={`menu-item ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
            <FileText size={18} /> Daily Work Logs
          </button>
          <button className={`menu-item ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}>
            <Award size={18} /> AI Performance
          </button>
          <button className={`menu-item ${activeTab === 'governance' ? 'active' : ''}`} onClick={() => setActiveTab('governance')}>
            <Users size={18} /> Team Governance
          </button>
          <button className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <Crown size={18} /> Executive Analytics
          </button>
        </div>
 
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="avatar-box">KK</div>
            <div className="user-info-text">
              <strong>Karina Katare</strong>
              <span>Role: Supermanager</span>
            </div>
          </div>
          <button className="exit-workspace-btn" onClick={handleLogout} disabled={isLoggingOut}>
            <LogOut size={16} /> {isLoggingOut ? 'Signing out...' : 'Exit Workspace'}
          </button>
        </div>
      </aside>
 
      {/* MAIN CONTENT AREA */}
      <main className="main-content-wrapper">
        {/* TOP HEADER BAR */}
        <header className="top-header-bar">
          <div className="header-search-box">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search team members, system logs, telemetry..." />
          </div>
 
          <div className="header-right-controls">
            <div className="role-context-dropdown">
              <span className="role-ctx-label">Role Context:</span>
              <div className="dropdown-box">
                <span>Super Manager / VP</span>
                <ChevronDown size={14} color="#94a3b8" />
              </div>
            </div>
 
            <div className="notification-dot-btn">
              <Bell size={18} color="#cbd5e1" />
              <span className="notification-red-badge"></span>
            </div>
 
            <button className="checkout-top-btn" onClick={handleCheckInToggle}>
              <Clock size={16} /> {isCheckedIn ? 'Check Out' : 'Check In'}
            </button>
          </div>
        </header>
 
        {/* DYNAMIC TABS CONTENT */}
        <div className="scrollable-dashboard-body">
          {activeTab === 'dashboard' && (
            <>
              {/* HERO BANNER SUMMARY */}
              <div className="enterprise-summary-banner">
                <div className="banner-left-info">
                  <h2>Enterprise Workspace Summary (SUPERMANAGER)</h2>
                  <p>All AI telemetry, geofence validations, and team activity are synced real-time.</p>
                </div>
                <div className="banner-status-indicator">
                  <span className="green-pulsing-dot"></span> System Status: Operational
                </div>
              </div>
 
              {/* 4 STAT CARDS ROW */}
              <div className="stats-cards-grid">
                <div className="stat-card">
                  <div className="stat-card-header">
                    <span>Attendance Status</span>
                    <Clock size={16} color="#a78bfa" />
                  </div>
                  <h3>Checked In</h3>
                  <p className="stat-subtext"><MapPin size={12} /> Geofence & WiFi Verified</p>
                </div>
 
                <div className="stat-card">
                  <div className="stat-card-header">
                    <span>AI Performance Rating</span>
                    <Award size={16} color="#38bdf8" />
                  </div>
                  <h3>92 <span className="stat-denominator">/ 100</span></h3>
                  <p className="stat-subtext"><TrendingUp size={12} /> Top 5% Performance Tier</p>
                </div>
 
                <div className="stat-card">
                  <div className="stat-card-header">
                    <span>Pending Leave Requests</span>
                    <Calendar size={16} color="#fbbf24" />
                  </div>
                  <h3>1 Pending</h3>
                  <p className="stat-subtext"><AlertCircle size={12} /> Needs Approval</p>
                </div>
 
                <div className="stat-card">
                  <div className="stat-card-header">
                    <span>Synced Work Logs</span>
                    <FileText size={16} color="#34d399" />
                  </div>
                  <h3>2 Records</h3>
                  <p className="stat-subtext"><CheckCircle2 size={12} /> AI Quality Score 98%</p>
                </div>
              </div>
 
              {/* LOWER DUAL PANELS */}
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
                      <td>2026-08-14</td>
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
 
          {activeTab === 'governance' && (
            <div className="content-grid">
              {/* TEAM MEMBERS — GET /api/users, PUT /api/users/{id}/role */}
              <div className="glass-panel">
                <div className="panel-title">
                  <div className="panel-title-text">
                    <Users size={20} color="#818cf8" />
                    <span>Team Members</span>
                  </div>
                  <button className="icon-refresh-btn" onClick={fetchTeamUsers} disabled={usersLoading}>
                    {usersLoading ? 'Loading...' : 'Refresh'}
                  </button>
                </div>
 
                {usersLoading && (
                  <div className="skeleton-list">
                    <div className="skeleton-row" />
                    <div className="skeleton-row" />
                    <div className="skeleton-row" />
                  </div>
                )}
 
                {!usersLoading && usersError && (
                  <div className="error-banner">
                    <AlertCircle size={16} /> {usersError}
                  </div>
                )}
 
                {!usersLoading && !usersError && usersLoaded && teamUsers.length === 0 && (
                  <div className="empty-state">No team members found.</div>
                )}
 
                {!usersLoading && !usersError && teamUsers.length > 0 && (
                  <div className="validation-list">
                    {teamUsers.map((u) => (
                      <div key={u.id} className="val-item team-member-row">
                        <div className="val-left">
                          <div className="table-avatar">
                            {(u.name || u.email || '?').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <strong>{u.name || u.email}</strong>
                            <p>{u.email}</p>
                          </div>
                        </div>
                        {(userRole === 'admin' || userRole === 'supermanager') ? (
                          <select
                            className="role-select-inline"
                            value={u.role || ''}
                            disabled={roleUpdatingId === u.id}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                            <option value="supermanager">Super Manager</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className="status-tag info">{u.role}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
 
              {/* ACTIVE SESSIONS — GET /api/users/sessions, DELETE /api/users/sessions/logout-all */}
              <div className="glass-panel">
                <div className="panel-title">
                  <div className="panel-title-text">
                    <ShieldCheck size={20} color="#34d399" />
                    <span>Active Sessions</span>
                  </div>
                  <button
                    className="danger-outline-btn"
                    onClick={handleLogoutAllDevices}
                    disabled={loggingOutAll || sessionsLoading}
                  >
                    {loggingOutAll ? 'Signing out...' : 'Logout All Devices'}
                  </button>
                </div>
 
                {sessionsLoading && (
                  <div className="skeleton-list">
                    <div className="skeleton-row" />
                    <div className="skeleton-row" />
                  </div>
                )}
 
                {!sessionsLoading && sessionsError && (
                  <div className="error-banner">
                    <AlertCircle size={16} /> {sessionsError}
                  </div>
                )}
 
                {!sessionsLoading && !sessionsError && sessionsLoaded && sessions.length === 0 && (
                  <div className="empty-state">No active sessions found.</div>
                )}
 
                {!sessionsLoading && !sessionsError && sessions.length > 0 && (
                  <div className="validation-list">
                    {sessions.map((s, idx) => (
                      <div key={s.id || idx} className="val-item">
                        <div className="val-left">
                          <Wifi size={16} color="#38bdf8" />
                          <div>
                            <strong>{s.device || s.userAgent || 'Unknown device'}</strong>
                            <p>{s.ipAddress || s.location || 'Location unavailable'}{s.createdAt ? ` · ${s.createdAt}` : ''}</p>
                          </div>
                        </div>
                        <span className={`status-tag ${s.current ? 'pass' : 'info'}`}>
                          {s.current ? 'THIS DEVICE' : 'ACTIVE'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
 
          {(activeTab === 'performance' || activeTab === 'analytics') && (
            <div className="glass-panel full-width-panel">
              <div className="panel-title">
                <div className="panel-title-text">
                  <Award size={20} color="#c084fc" />
                  <span>{activeTab.toUpperCase()} & Telemetry Module</span>
                </div>
                <span className="status-tag pass">Active Module</span>
              </div>
              <div style={{ padding: '20px 0', color: '#cbd5e1', lineHeight: '1.6' }}>
                <p>Enterprise data view for <strong>{activeTab}</strong>. All system controls and telemetry parameters are operating within standard SLA limits.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}