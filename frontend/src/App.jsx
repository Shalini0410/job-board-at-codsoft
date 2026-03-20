import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// Import these when created:
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetails from './pages/JobDetails';
import Jobs from './pages/Jobs';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

const DashboardRouter = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Login />;
  return user.role === 'employer' ? <EmployerDashboard /> : <CandidateDashboard />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
