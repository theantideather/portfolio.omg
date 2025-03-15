import { useState, lazy, Suspense } from 'react';
// Lazy load the Globe component
const Globe = lazy(() => {
  console.log('🌐 Lazy loading Globe component');
  return import('react-globe.gl')
    .then(module => {
      console.log('✅ Globe component loaded successfully');
      return module;
    })
    .catch(error => {
      console.error('❌ Failed to load Globe component:', error);
      // Return a placeholder component to avoid crashes
      return { 
        default: props => (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: '8px',
            color: 'white'
          }}>
            Globe visualization unavailable
          </div>
        )
      };
    });
});

import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [globeError, setGlobeError] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('omgurram14@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  // Handle Globe errors
  const handleGlobeError = (error) => {
    console.error('Globe error:', error);
    setGlobeError(true);
  };

  // Fallback component for the Globe
  const GlobeFallback = () => (
    <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center bg-black-200">
      <p className="text-white">Loading globe...</p>
    </div>
  );

  const GlobeErrorFallback = () => (
    <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center bg-black-200">
      <p className="text-white">Unable to load globe visualization</p>
    </div>
  );

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" loading="lazy" />

            <div>
              <p className="grid-headtext">Hi, I'm Om.G</p>
              <p className="grid-subtext">
                The bridge between Web3 and Healthcare is ME! My work focuses on creating meaningful connections between decentralized systems and healthcare solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" loading="lazy" />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in blockchain technologies including Solana Monad, Ethereum, IPFS, and smart contract development. As a vibe coder, I leverage AI-powered tools like Cursor, Lovable.ai, Bolt.new, Autodev, and integrate with Supabase, Firebase, various payment gateways and databases. I create 3D elements with Three.js, develop VR experiences, surgical simulations, on-chain games, and metaverse projects.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Suspense fallback={<GlobeFallback />}>
                <Globe
                  height={326}
                  width={326}
                  backgroundColor="rgba(0, 0, 0, 0)"
                  backgroundImageOpacity={0.5}
                  showAtmosphere
                  showGraticules
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  labelsData={[{ lat: 20, lng: 78, text: 'India', color: 'white', size: 15 }]}
                />
              </Suspense>
            </div>
            <div>
              <p className="grid-headtext">Global Speaker and Workshop Leader</p>
              <p className="grid-subtext">I speak at blockchain and healthcare conferences worldwide, sharing insights on decentralized healthcare solutions.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" loading="lazy" />

            <div>
              <p className="grid-headtext">My Passion for Healthcare Innovation</p>
              <p className="grid-subtext">
                I'm dedicated to using blockchain and Web3 technologies to revolutionize healthcare systems. By merging technical expertise with healthcare knowledge, I create secure, decentralized solutions for medical records, credential verification, and healthcare accessibility that respect both technical constraints and human needs.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
              loading="lazy"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">omgurram14@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
