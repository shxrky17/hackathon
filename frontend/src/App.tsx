import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ResumeSetup from './pages/ResumeSetup';
import InterviewRoom from './pages/InterviewRoom';
import Report from './pages/Report';

// Using a custom router to maintain state
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="setup" element={<ResumeSetup />} />
          <Route path="report/:id" element={<Report />} />
        </Route>
        {/* Interview Room doesn't use standard layout because it needs fullscreen */}
        <Route path="/interview/:id" element={<InterviewRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
