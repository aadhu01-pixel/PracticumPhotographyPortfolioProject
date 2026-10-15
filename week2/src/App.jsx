import { Header } from "./components/Header";
import { Hero } from './components/Hero';
import { Gallery } from "./components/Gallery";
import { Sessions } from "./components/Sessions";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { BookingForm } from "./components/BookingForm";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Gallery />
      <Sessions />
      <About />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default App;