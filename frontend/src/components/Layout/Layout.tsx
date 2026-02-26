import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import './Layout.css';

const Layout: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'New Interview', path: '/setup', icon: <FileText size={20} /> },
    ];

    return (
        <div className="app-layout">
            {/* Sidebar Navigation */}
            <aside className="sidebar glass-panel">
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-orb"></div>
                        <span className="logo-text gradient-text">SimulPrep</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-link">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                    <button className="nav-link logout">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
