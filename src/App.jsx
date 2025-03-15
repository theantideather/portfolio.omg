import { useState, useEffect, Suspense } from 'react';
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

// Loading component
const LoadingScreen = () => (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#010103',
    color: 'white',
    zIndex: 9999
  }}>
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading Portfolio...</h2>
      <div style={{ 
        width: '100%', 
        height: '4px', 
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div 
          style={{ 
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '30%',
            backgroundColor: 'white',
            borderRadius: '2px',
            animation: 'loading 1.5s infinite ease-in-out'
          }}
        />
      </div>
      <style>{`
        @keyframes loading {
          0% { left: -30%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error }) => (
  <div style={{ 
    padding: '2rem', 
    backgroundColor: '#010103',
    color: 'white',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h2>
    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#afb0b6' }}>
      We're having trouble loading the portfolio. Please try refreshing the page.
    </p>
    <pre style={{ 
      marginTop: '2rem', 
      padding: '1rem', 
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      overflow: 'auto',
      maxWidth: '90%',
      textAlign: 'left'
    }}>
      {error?.message || 'Unknown error occurred'}
    </pre>
    <button 
      onClick={() => window.location.reload()} 
      style={{
        marginTop: '2rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        border: 'none',
        borderRadius: '0.5rem',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      Try Again
    </button>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate checking that all resources are loaded
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Add error handling for the window
    const handleError = (event) => {
      console.error('Global error caught:', event);
      setError(new Error(event.message || 'Unknown error occurred'));
    };

    window.addEventListener('error', handleError);

    return () => {
      clearTimeout(loadTimeout);
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (error) {
    return <ErrorFallback error={error} />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="max-w-7xl mx-auto relative">
      <Suspense fallback={<LoadingScreen />}>
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
      </Suspense>
    </main>
  );
};

export default App;
