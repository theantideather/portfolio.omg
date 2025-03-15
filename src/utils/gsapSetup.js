/**
 * GSAP setup and configuration
 * This file initializes GSAP safely before any animations run
 */
import { gsap } from 'gsap';

// Initialize gsap safely
console.log('🔧 Setting up GSAP from dedicated setup file');

// Disable warnings that might clutter the console
gsap.config({
  nullTargetWarn: false,
  autoSleep: 60,
  force3D: true,
  autoKill: true,
});

// Safety fallback for plugins
if (!gsap.registerPlugin) {
  gsap.registerPlugin = function() {
    console.warn('GSAP registerPlugin called before plugins loaded');
  };
}

// Add safety wrappers around animation methods
const originalFrom = gsap.from;
gsap.from = function(...args) {
  try {
    return originalFrom.apply(this, args);
  } catch (error) {
    console.error('Error in gsap.from:', error);
    // Return a dummy tween so chaining doesn't crash
    return {
      to: () => ({ kill: () => {} }),
      kill: () => {},
      pause: () => {},
      resume: () => {},
    };
  }
};

// Export prepared gsap instance
console.log('✅ GSAP setup complete');
export { gsap }; 