import { Header } from "./components/Header";
import { Hero } from './components/Hero';
import { Gallery } from "./components/Gallery";
import { Sessions } from "./components/Sessions";
import { About } from "./components/About";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Gallery />
      <Sessions />
      <About />
    </div>
  );
}

export default App;