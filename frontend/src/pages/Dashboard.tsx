import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, Code2, MessageSquare, ChevronRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const mockHistory = [
        { id: 'int-1234', date: 'Oct 24, 2024', role: 'Frontend Engineer', techScore: 85, commScore: 92, status: 'Completed' },
        { id: 'int-1235', date: 'Oct 18, 2024', role: 'Fullstack Dev', techScore: 78, commScore: 88, status: 'Completed' },
        { id: 'int-1236', date: 'Oct 10, 2024', role: 'React Developer', techScore: 92, commScore: 85, status: 'Completed' },
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Candidate Dashboard</h1>
                <p>Track your interview performance and progress over time.</p>
            </div>

            <div className="metrics-grid">
                <div className="metric-card glass-panel">
                    <div className="metric-icon bg-indigo">
                        <TrendingUp size={24} color="white" />
                    </div>
                    <div className="metric-data">
                        <p className="metric-label">Average Tech Score</p>
                        <h2 className="metric-value">85%</h2>
                        <span className="metric-trend positive">+4% from last month</span>
                    </div>
                </div>

                <div className="metric-card glass-panel">
                    <div className="metric-icon bg-purple">
                        <MessageSquare size={24} color="white" />
                    </div>
                    <div className="metric-data">
                        <p className="metric-label">Avg Communication</p>
                        <h2 className="metric-value">88%</h2>
                        <span className="metric-trend positive">+2% from last month</span>
                    </div>
                </div>

                <div className="metric-card glass-panel">
                    <div className="metric-icon bg-orange">
                        <Code2 size={24} color="white" />
                    </div>
                    <div className="metric-data">
                        <p className="metric-label">Problems Solved</p>
                        <h2 className="metric-value">12</h2>
                        <span className="metric-trend neutral">Across 3 interviews</span>
                    </div>
                </div>

                <div className="metric-card glass-panel">
                    <div className="metric-icon bg-emerald">
                        <Clock size={24} color="white" />
                    </div>
                    <div className="metric-data">
                        <p className="metric-label">Total Time Practiced</p>
                        <h2 className="metric-value">4.5h</h2>
                        <span className="metric-trend neutral">This month</span>
                    </div>
                </div>
            </div>

            <div className="history-section glass-panel">
                <div className="section-header">
                    <h2>Recent Interview Sessions</h2>
                    <button className="secondary-btn" onClick={() => navigate('/setup')}>
                        Start New Session
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Target Role</th>
                                <th>Scores</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockHistory.map((session) => (
                                <tr key={session.id}>
                                    <td>{session.date}</td>
                                    <td className="font-medium">{session.role}</td>
                                    <td>
                                        <div className="score-bars">
                                            <div className="score-item" title={`Tech: ${session.techScore}%`}>
                                                <div className="bar-bg">
                                                    <div className="bar-fill bg-indigo" style={{ width: `${session.techScore}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="score-item" title={`Comm: ${session.commScore}%`}>
                                                <div className="bar-bg">
                                                    <div className="bar-fill bg-purple" style={{ width: `${session.commScore}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="status-badge success">{session.status}</span>
                                    </td>
                                    <td>
                                        <button
                                            className="view-report-btn"
                                            onClick={() => navigate(`/report/${session.id}`)}
                                        >
                                            View Report <ChevronRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
