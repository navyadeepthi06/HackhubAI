import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HackathonsPage from './pages/HackathonsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import SavedEventsPage from './pages/SavedEventsPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hackathons" element={<HackathonsPage />} />
              <Route path="/hackathon/:id" element={<HackathonDetailPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/saved" element={<SavedEventsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
