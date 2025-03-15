import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useRef, useEffect, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
// Lazy load the DemoComputer component
const DemoComputer = lazy(() => import('../components/DemoComputer.jsx'));

const ProjectCard = ({ project, index }) => {
  const projectRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (projectRef.current) {
      observer.observe(projectRef.current);
    }
    
    return () => {
      if (projectRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        projectRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, delay: index * 0.2, ease: 'power2.out' }
      );
    }
  }, [isVisible, index]);

  return (
    <div 
      ref={projectRef}
      className="grid lg:grid-cols-2 grid-cols-1 mb-20 gap-8 w-full"
    >
      <div>
        <div className="absolute top-0 right-0">
          <img 
            src={project.spotlight} 
            alt="spotlight" 
            className="w-full h-96 object-cover rounded-xl"
            loading="lazy" 
          />
        </div>

        <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={project.logoStyle}>
          <img 
            className="w-10 h-10 shadow-sm" 
            src={project.logo} 
            alt="logo"
            loading="lazy" 
          />
        </div>

        <div className="flex flex-col gap-5 text-white-600 my-5">
          <p className="text-white text-2xl font-semibold">{project.title}</p>
          <p>{project.desc}</p>
          <p>{project.subdesc}</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-5">
          <div className="flex items-center gap-3">
            {project.tags.map((tag, idx) => (
              <div key={idx} className="tech-logo">
                <img src={tag.path} alt={tag.name} loading="lazy" />
              </div>
            ))}
          </div>

          <a
            className="flex items-center gap-2 cursor-pointer text-white-600"
            href={project.href}
            target="_blank"
            rel="noreferrer">
            <p>Check Live Site</p>
            <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" loading="lazy" />
          </a>
        </div>
      </div>

      <div className="border border-black-300 bg-black-200 rounded-lg h-96">
        {isVisible && (
          <Canvas 
            dpr={[1, 2]} // Limit pixel ratio for better performance
            performance={{ min: 0.1 }} // Allow frame rate to drop for better performance
          >
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={project.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls 
              maxPolarAngle={Math.PI / 2} 
              enableZoom={false}
              enablePan={false} // Disable panning for better performance
            />
          </Canvas>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  useGSAP(() => {
    gsap.fromTo(".projects-title", 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);

  return (
    <section className="c-space my-20" id="projects">
      <p className="head-text projects-title">My Selected Work</p>

      <div className="mt-16 flex flex-col">
        {myProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
