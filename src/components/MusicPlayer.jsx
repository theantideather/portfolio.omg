import { useState, useEffect, useRef } from "react";

// Create fallback icon components to avoid errors
const FaPlayFallback = () => (
  <svg viewBox="0 0 448 512" width="1em" height="1em">
    <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
  </svg>
);

const FaPauseFallback = () => (
  <svg viewBox="0 0 448 512" width="1em" height="1em">
    <path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" />
  </svg>
);

const MusicPlayer = () => {
  console.log("MusicPlayer component rendered");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [iconsLoaded, setIconsLoaded] = useState(false);
  const [IconPlay, setIconPlay] = useState(() => FaPlayFallback);
  const [IconPause, setIconPause] = useState(() => FaPauseFallback);

  // Try to load icons asynchronously
  useEffect(() => {
    let isMounted = true;
    
    const loadIcons = async () => {
      try {
        const faModule = await import("react-icons/fa");
        if (isMounted) {
          console.log("Successfully loaded react-icons/fa");
          setIconPlay(() => faModule.FaPlay || FaPlayFallback);
          setIconPause(() => faModule.FaPause || FaPauseFallback);
          setIconsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load react-icons:", error);
        // Keep using fallback icons
      }
    };

    loadIcons();
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Setup audio element
    audioRef.current = new Audio("/assets/lofi.mp3");
    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Create a promise to handle autoplay restrictions
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio started playing");
          })
          .catch(error => {
            console.error("Playback prevented by browser:", error);
            // Don't update isPlaying state if autoplay was prevented
            setIsPlaying(false);
            return;
          });
      }
    }
    
    setIsPlaying(!isPlaying);
  };

  // Don't render anything if music playback is disabled or not functional
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black-200 p-3 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300" onClick={togglePlay}>
      {isPlaying ? 
        <IconPause className="text-white text-xl" /> : 
        <IconPlay className="text-white text-xl" />
      }
    </div>
  );
};

export default MusicPlayer; 