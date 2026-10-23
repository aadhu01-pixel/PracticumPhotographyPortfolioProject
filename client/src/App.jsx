import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Hero } from './components/Hero';
import { Gallery } from "./components/Gallery";
import { Sessions } from "./components/Sessions";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { BookingForm } from "./components/BookingForm";
import { Login } from "./components/Login";

function Home() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // the chosen session's category ("" = none), shared by the cards and the form
  const [selectedSession, setSelectedSession] = useState("");

  // load the sessions from the API once, then share them with the cards and the form
  useEffect(() => {
    async function loadSessions() {
      try {
        const response = await fetch("/api/sessions");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setSessions(await response.json());
      } catch (err) {
        console.error("Failed to load sessions", err);
        setError("Sessions couldn't be loaded. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadSessions();
  }, []);

  return (
    <>
      <Hero />
      <Gallery />
      <Sessions
        sessions={sessions}
        loading={loading}
        error={error}
        selectedSession={selectedSession}
        onSelectSession={setSelectedSession}
      />
      <About />
      <BookingForm
        sessions={sessions}
        selectedSession={selectedSession}
        onSessionChange={setSelectedSession}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login mode="signin" />} />
        <Route path="/signup" element={<Login mode="signup" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
