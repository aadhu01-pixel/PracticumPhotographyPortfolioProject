import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from './components/Hero';
import { Gallery } from "./components/Gallery";
import { Sessions } from "./components/Sessions";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { BookingForm } from "./components/BookingForm";

function App() {
  // the chosen session's category ("" = none), shared by the cards and the form
  const [selectedSession, setSelectedSession] = useState("");

  return (
    <div>
      <Header />
      <Hero />
      <Gallery />
      <Sessions
        selectedSession={selectedSession}
        onSelectSession={setSelectedSession}
      />
      <About />
      <BookingForm
        selectedSession={selectedSession}
        onSessionChange={setSelectedSession}
      />
      <Footer />
    </div>
  );
}

export default App;