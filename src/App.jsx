import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Info, 
  PhoneCall, 
  Award, 
  Sun, 
  Moon, 
  LogOut
} from 'lucide-react';

// Components
import Home from './components/Home';
import Details from './components/Details';
import About from './components/About';
import ContactUs from './components/ContactUs';
import LoginSignup from './components/LoginSignup';

// Auth utilities
import { verifyToken, decodeToken } from './utils/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [openModal, setOpenModal] = useState(null); // null or 'auth'
  const [darkMode, setDarkMode] = useState(false);

  // --- Auth States ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // --- Check Auth Token on Mount ---
  useEffect(() => {
    const token = localStorage.getItem('td_token');
    if (token && verifyToken(token)) {
      const decoded = decodeToken(token);
      setCurrentUser({ username: decoded.username, email: decoded.email });
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('td_token');
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  }, []);

  const handleAuthSuccess = (user, token) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setOpenModal(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('td_token');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setOpenModal(null);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const rootEl = document.documentElement;
    if (darkMode) {
      rootEl.classList.add('dark-theme');
    } else {
      rootEl.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="brand" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">🐄</div>
          <span className="brand-name">Geethika's</span>
        </div>

        <nav>
          <ul className="nav-list">
            <li>
              <button 
                className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => { setActiveTab('home'); }}
              >
                <HomeIcon className="nav-item-icon" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => { setActiveTab('details'); }}
              >
                <Award className="nav-item-icon" />
                <span>Details</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => { setActiveTab('about'); }}
              >
                <Info className="nav-item-icon" />
                <span>About Us</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => { setActiveTab('contact'); }}
              >
                <PhoneCall className="nav-item-icon" />
                <span>Contact Us</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="topbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme" style={{ marginRight: '4px' }}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
                👤 {currentUser?.username}
              </span>
              <button 
                className="btn btn-outline"
                onClick={handleLogout}
                style={{ 
                  color: 'var(--text-on-dark)', 
                  borderColor: 'rgba(255,255,255,0.2)', 
                  padding: '6px 12px', 
                  fontSize: '13px', 
                  background: 'transparent',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-outline" 
                onClick={() => setOpenModal('auth')} 
                style={{ 
                  color: 'var(--text-on-dark)', 
                  borderColor: 'rgba(255,255,255,0.25)', 
                  padding: '6px 14px', 
                  fontSize: '13px', 
                  background: 'transparent',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                Sign In
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => setOpenModal('auth')} 
                style={{ 
                  padding: '6px 14px', 
                  fontSize: '13px', 
                  borderRadius: 'var(--radius-md)'
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Dynamic Section rendering */}
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        
        {activeTab === 'details' && <Details />}

        {activeTab === 'about' && <About />}

        {activeTab === 'contact' && <ContactUs />}

      </main>

      {/* Footer */}
      <footer style={{ 
        marginTop: 'auto', 
        padding: '30px 40px', 
        borderTop: '1px solid var(--border-color)', 
        backgroundColor: 'var(--bg-secondary)', 
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '13.5px'
      }}>
        <p>© 2026 Geethika's Organic Dairy Farm. All rights reserved. raised with 💚 in Vermont pastures.</p>
      </footer>

      {/* Authentication Modal */}
      {openModal === 'auth' && (
        <LoginSignup 
          onAuthSuccess={handleAuthSuccess} 
          onClose={() => setOpenModal(null)} 
        />
      )}

    </div>
  );
}
