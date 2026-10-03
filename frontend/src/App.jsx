import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Explainer from './pages/Explainer.jsx';
import AppointmentPrep from './pages/AppointmentPrep.jsx';
import Questions from './pages/Questions.jsx';
import History from './pages/History.jsx';
import HistoryDetail from './pages/HistoryDetail.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explain" element={<Explainer />} />
        <Route path="/appointment" element={<AppointmentPrep />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<HistoryDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
