import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import ToolsCapabilities from './components/ToolsCapabilities';
import Portfolio from './components/Portfolio';
import WorkExperience from './components/WorkExperience';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <AboutMe />
      <ToolsCapabilities />
      <Portfolio />
      <WorkExperience />
      <Contact />
    </div>
  );
}

export default App;
