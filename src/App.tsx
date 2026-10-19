import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
// import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  return (
    <div className="font-sans">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <About />
      {/* <Projects /> */}
      <Skills />
      <Contact />
      <footer className="bg-gray-900 text-gray-500 text-center py-6 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Evans Benyeogor. All rights reserved.
      </footer>
    </div>
  );
}
