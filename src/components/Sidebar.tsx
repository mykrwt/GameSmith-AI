import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import {
  LayoutDashboard, Plus, Gamepad2, LogOut, Zap
} from 'lucide-react';

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/build', icon: <Zap size={18} />, label: 'New Game' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px 24px', marginBottom: '8px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '9px',
          background: 'var(--gradient-brand)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Gamepad2 size={17} color="white" />
        </div>
        <span style={{
          fontFamily: 'Space Grotesk', fontWeight: 700,
          fontSize: '16px', letterSpacing: '-0.02em',
        }}>
          GameSmith <span className="text-gradient">AI</span>
        </span>
      </div>

      {/* New Game CTA */}
      <button
        onClick={() => navigate('/build')}
        className="btn-primary"
        style={{ width: '100%', marginBottom: '20px', justifyContent: 'center', borderRadius: '12px' }}
      >
        <Plus size={17} /> New Game
      </button>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div className="sidebar-link" style={{ cursor: 'default' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'var(--gradient-brand)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, flexShrink: 0,
          }}>
            {user?.email?.[0].toUpperCase()}
          </div>
          <span style={{ fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.email}
          </span>
        </div>
        <button className="sidebar-link" onClick={handleSignOut}>
          <LogOut size={17} style={{ color: '#f87171' }} />
          <span style={{ color: '#f87171' }}>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

