import { useState, useEffect, Suspense, lazy } from 'react';
// Import the pre-configured GSAP
import { gsap } from './utils/gsapSetup.js';

// Lazy load all components to ensure proper initialization order
const Hero = lazy(() => import('./sections/Hero.jsx'));
const About = lazy(() => import('./sections/About.jsx'));
const Footer = lazy(() => import('./sections/Footer.jsx'));
const Navbar = lazy(() => import('./sections/Navbar.jsx'));
const Contact = lazy(() => import('./sections/Contact.jsx'));
const Projects = lazy(() => import('./sections/Projects.jsx'));
const WorkExperience = lazy(() => import('./sections/Experience.jsx'));
const Skills = lazy(() => import('./sections/Skills.jsx'));
const Speaking = lazy(() => import('./sections/Speaking.jsx'));
const Links = lazy(() => import('./sections/Links.jsx'));

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

// Simple header component to show even if other components fail
const SimpleHeader = () => (
  <header style={{ 
    padding: '1rem', 
    textAlign: 'center', 
    color: 'white',
    background: 'linear-gradient(to right, #0f0f0f, #121212)'
  }}>
    <h1>Om.G Portfolio</h1>
  </header>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [componentsLoaded, setComponentsLoaded] = useState({
    navbar: false,
    hero: false,
    about: false,
    projects: false
  });

  // Log component loading status
  useEffect(() => {
    console.log('📊 Components loaded status:', componentsLoaded);
  }, [componentsLoaded]);

  useEffect(() => {
    console.log('🔄 App component mounted');
    
    // Simulate checking that all resources are loaded
    const loadTimeout = setTimeout(() => {
      console.log('⏱️ Loading timeout completed');
      setIsLoading(false);
    }, 2000);

    // Add error handling for the window
    const handleError = (event) => {
      console.error('🚨 Global error caught in App component:', event);
      setError(new Error(event.message || 'Unknown error occurred'));
    };

    window.addEventListener('error', handleError);

    return () => {
      clearTimeout(loadTimeout);
      window.removeEventListener('error', handleError);
      console.log('♻️ App component cleanup');
    };
  }, []);

  // Component to handle component loading status
  const ComponentWithTracking = ({ name, children }) => {
    useEffect(() => {
      console.log(`✅ Component ${name} mounted`);
      setComponentsLoaded(prev => ({ ...prev, [name.toLowerCase()]: true }));
      
      return () => {
        console.log(`❌ Component ${name} unmounted`);
        setComponentsLoaded(prev => ({ ...prev, [name.toLowerCase()]: false }));
      };
    }, []);
    
    return children;
  };

  if (error) {
    console.error('🛑 Rendering error state due to:', error);
    return <ErrorFallback error={error} />;
  }

  if (isLoading) {
    console.log('⌛ Rendering loading screen');
    return <LoadingScreen />;
  }

  console.log('🎨 Rendering main App UI');
  return (
    <>
      {/* Always show a simple header even if components fail */}
      <SimpleHeader />
      
      <main className="max-w-7xl mx-auto relative">
        <Suspense fallback={<div>Loading Navbar...</div>}>
          <ComponentWithTracking name="Navbar">
            <Navbar />
          </ComponentWithTracking>
        </Suspense>
        
        <Suspense fallback={<div>Loading Hero Section...</div>}>
          <ComponentWithTracking name="Hero">
            <Hero />
          </ComponentWithTracking>
        </Suspense>
        
        <Suspense fallback={<div>Loading About Section...</div>}>
          <ComponentWithTracking name="About">
            <About />
          </ComponentWithTracking>
        </Suspense>
        
        <Suspense fallback={<div>Loading Projects Section...</div>}>
          <ComponentWithTracking name="Projects">
            <Projects />
          </ComponentWithTracking>
        </Suspense>
        
        <Suspense fallback={<div>Loading Skills Section...</div>}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<div>Loading Experience Section...</div>}>
          <WorkExperience />
        </Suspense>
        
        <Suspense fallback={<div>Loading Speaking Section...</div>}>
          <Speaking />
        </Suspense>
        
        <Suspense fallback={<div>Loading Links Section...</div>}>
          <Links />
        </Suspense>
        
        <Suspense fallback={<div>Loading Contact Section...</div>}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
};

export default App;
