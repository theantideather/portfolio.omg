import React from 'react';
import { Leva } from 'leva';
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera, useProgress } from '@react-three/drei';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Target from '../components/Target.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';

// Create a better loading component with progress
const EnhancedCanvasLoader = () => {
  const { progress, errors } = useProgress();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <CanvasLoader />
      <p className="text-white text-sm mt-4">Loading 3D scene: {progress.toFixed(0)}%</p>
      {errors.length > 0 && (
        <p className="text-red-500 text-xs mt-2">Some assets failed to load</p>
      )}
    </div>
  );
};

// Fallback component when Three.js fails completely
const ThreeJSFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-black-100">
    <img src="/assets/3d-fallback.png" alt="3D Scene" className="max-w-md w-full opacity-70" />
    <p className="text-white text-sm mt-4">3D scene unavailable</p>
    <p className="text-gray-400 text-xs mt-2">Try refreshing or using a different browser</p>
  </div>
);

const Hero = () => {
  // Use media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const [threeJSError, setThreeJSError] = useState(false);
  const [isThreeJSSupported, setIsThreeJSSupported] = useState(true);

  // Check if Three.js is supported in the current browser
  useEffect(() => {
    try {
      // Check WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.error('WebGL not supported');
        setIsThreeJSSupported(false);
        return;
      }
      
      // Check if Three.js can be initialized
      import('three').then(() => {
        console.log('Three.js successfully loaded');
      }).catch(error => {
        console.error('Three.js failed to load:', error);
        setIsThreeJSSupported(false);
      });
    } catch (error) {
      console.error('Error checking Three.js support:', error);
      setIsThreeJSSupported(false);
    }
  }, []);

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Handle errors in the Canvas
  const handleCanvasError = (error) => {
    console.error('Canvas error:', error);
    setThreeJSError(true);
  };

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Om.G <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">The Bridge Between Web3 & Healthcare Innovation</p>
      </div>

      <div className="w-full h-full absolute inset-0">
        {!isThreeJSSupported || threeJSError ? (
          <ThreeJSFallback />
        ) : (
          <ErrorBoundary fallback={<ThreeJSFallback />}>
            <Canvas 
              className="w-full h-full"
              onError={handleCanvasError}
              onCreated={state => {
                console.log('Canvas created successfully');
              }}
            >
              <Suspense fallback={<EnhancedCanvasLoader />}>
                {/* To hide controller */}
                <Leva hidden />
                <PerspectiveCamera makeDefault position={[0, 0, 30]} />

                <HeroCamera isMobile={isMobile}>
                  <HackerRoom scale={sizes.deskScale} position={sizes.deskPosition} rotation={[0.1, -Math.PI, 0]} />
                </HeroCamera>

                <group>
                  <Target position={sizes.targetPosition} />
                  <ReactLogo position={sizes.reactLogoPosition} />
                  <Rings position={sizes.ringPosition} />
                  <Cube position={sizes.cubePosition} />
                </group>

                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 10]} intensity={0.5} />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        )}
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <Button name="Explore My Work" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
        </a>
      </div>
    </section>
  );
};

// Simple ErrorBoundary component for catching Three.js errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Three.js error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default Hero;
