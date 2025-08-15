import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';
import SessionPage from './pages/SessionPage';
import Navbar from './components/Navbar';
import { useStorage } from './hooks/useStorage';

function App() {
  const { settings } = useStorage();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(settings.theme);
  }, [settings.theme]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/session" element={<SessionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
