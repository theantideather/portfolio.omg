import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/Experience.jsx';
import Skills from './sections/Skills.jsx';
import Speaking from './sections/Speaking.jsx';
import Links from './sections/Links.jsx';

const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <WorkExperience />
      <Speaking />
      <Links />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
