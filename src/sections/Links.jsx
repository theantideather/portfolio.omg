import React, { useState, useRef, useEffect } from 'react';
import { socialLinks, ventureLinks, contactInfo, twitterEmbeds } from '../constants';

// Custom icon component that provides fallback to a circle/dot or emoji
const Icon = ({ icon, emoji }) => {
  // Check if we have a dedicated SVG icon
  if (icon === 'github' || icon === 'twitter' || icon === 'instagram' || 
      icon === 'orocare' || icon === 'resqai' || icon === 'castleblock' || 
      icon === 'pathpulse' || icon === 'callso' || icon === 'telegram') {
    return (
      <img 
        src={`/assets/${icon}.svg`} 
        alt={icon}
        className="w-5 h-5 object-contain"
      />
    );
  }
  
  // If emoji is provided, use it
  if (emoji) {
    return (
      <div className="w-5 h-5 flex items-center justify-center text-lg">
        {emoji}
      </div>
    );
  }
  
  // Fallbacks for common icons
  if (icon === 'globe') {
    return (
      <div className="w-5 h-5 flex items-center justify-center">
        <span>🌐</span>
      </div>
    );
  }
  
  if (icon === 'message') {
    return (
      <div className="w-5 h-5 flex items-center justify-center">
        <span>💬</span>
      </div>
    );
  }
  
  if (icon === 'briefcase') {
    return (
      <div className="w-5 h-5 flex items-center justify-center">
        <span>💼</span>
      </div>
    );
  }
  
  if (icon === 'mail') {
    return (
      <div className="w-5 h-5 flex items-center justify-center">
        <span>✉️</span>
      </div>
    );
  }
  
  if (icon === 'phone') {
    return (
      <div className="w-5 h-5 flex items-center justify-center">
        <span>📱</span>
      </div>
    );
  }
  
  if (icon === 'linkedin') {
    return (
      <div className="w-5 h-5 flex items-center justify-center">
        <span>💼</span>
      </div>
    );
  }
  
  // Default dot/circle for any other icon
  return (
    <div className="w-5 h-5 flex items-center justify-center">
      <div className="w-3 h-3 bg-white rounded-full"></div>
    </div>
  );
};

const LinkCard = ({ name, url, icon, emoji }) => (
  <a 
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-3 hover:bg-tertiary rounded-md transition-colors"
  >
    <div className="bg-primary-500/20 w-8 h-8 rounded-full flex items-center justify-center">
      <Icon icon={icon} emoji={emoji} />
    </div>
    <span className="text-white text-[16px]">{name}</span>
  </a>
);

const VentureSection = ({ name, links }) => (
  <div className="bg-black-200/30 backdrop-blur-sm p-5 rounded-2xl w-full mb-5 border border-white/10">
    <h3 className="text-white font-bold text-[20px] mb-3">{name}</h3>
    <div className="flex flex-col gap-2">
      {links.map((link, index) => (
        <LinkCard 
          key={index}
          {...link}
        />
      ))}
    </div>
  </div>
);

const SocialLink = ({ title, link, icon, emoji }) => (
  <div className="bg-tertiary p-4 rounded-full hover:bg-primary transition-colors">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center"
    >
      {icon && ['github', 'twitter', 'instagram', 'telegram'].includes(icon) ? (
        <img
          src={`/assets/${icon}.svg`}
          alt={title}
          className="w-8 h-8 object-contain"
        />
      ) : (
        <span className="text-2xl">{emoji || '•'}</span>
      )}
    </a>
  </div>
);

const ContactCard = ({ name, url, icon, value }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-4 hover:bg-tertiary rounded-md transition-colors bg-black-200/30 backdrop-blur-sm border border-white/10"
  >
    <div className="bg-primary-500/20 w-10 h-10 rounded-full flex items-center justify-center">
      <Icon icon={icon} />
    </div>
    <div className="flex flex-col">
      <span className="text-secondary text-[14px]">{name}</span>
      <span className="text-white text-[16px]">{value}</span>
    </div>
  </a>
);

// Twitter embed preview component
const TwitterPreview = ({ tweetUrl, description }) => {
  // Extract tweet ID from URL if available
  const tweetId = tweetUrl.split('/').pop().split('?')[0];
  
  return (
    <div className="bg-black-200/30 backdrop-blur-sm p-5 rounded-2xl w-full min-w-[280px] max-w-[350px] border border-white/10 h-[350px] flex flex-col shadow-lg hover:shadow-xl transition-all hover:border-white/20">
      <div className="flex items-center gap-3 mb-3">
        <img src="/assets/twitter.svg" alt="Twitter" className="w-6 h-6" />
        <h3 className="text-white font-bold text-[18px]">Twitter Post</h3>
      </div>
      
      <div className="rounded-lg overflow-hidden mb-3 flex-shrink-0 h-[150px] bg-gradient-to-br from-black to-tertiary/30 relative flex items-center justify-center">
        {/* Tweet preview content - dynamically generated */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1DA1F2]/10 to-tertiary/5"></div>
          <div className="absolute top-4 left-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
              <span>{description.charAt(0)}</span>
            </div>
            <div className="ml-3">
              <div className="text-white text-sm font-semibold">Om.G</div>
              <div className="text-gray-400 text-xs">@omg14doteth</div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between text-gray-400 text-xs">
              <span>{Math.floor(Math.random() * 50) + 10} Replies</span>
              <span>{Math.floor(Math.random() * 100) + 50} Retweets</span>
              <span>{Math.floor(Math.random() * 200) + 100} Likes</span>
            </div>
          </div>
        </div>
        
        <div className="z-10 relative px-4 py-2 max-w-[85%] bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
          <p className="text-white text-sm line-clamp-2 text-center">{description.substring(0, 60)}{description.length > 60 ? '...' : ''}</p>
        </div>
      </div>
      
      <p className="text-white/80 mb-4 flex-grow line-clamp-3">{description}</p>
      
      <div className="border border-white/20 rounded-lg p-3 bg-tertiary/50 hover:bg-tertiary transition-colors cursor-pointer mt-auto">
        <a 
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 block"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔗</span>
            <span>View Original Tweet</span>
          </div>
          <p className="text-sm text-white/70">@omg14doteth • {new Date().toLocaleDateString()}</p>
        </a>
      </div>
    </div>
  );
};

// Horizontal slider for Twitter embeds
const TwitterSlider = ({ tweets }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const scrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
      setActiveIndex(prev => Math.min(prev + 1, tweets.length - 1));
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowPrevButton(scrollLeft > 0);
      setShowNextButton(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate which card is most visible
      const cardWidth = 350; // approx width of card + gap
      const currentIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(currentIndex);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => {
        slider.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Indicator dots for mobile
  const renderIndicators = () => {
    return (
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {tweets.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-primary' : 'bg-tertiary/50'}`}
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.scrollTo({
                  left: index * 350,
                  behavior: 'smooth'
                });
              }
            }}
            aria-label={`Go to tweet ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <div 
        className="flex overflow-x-auto hide-scrollbar gap-5 py-4 cursor-grab"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {tweets.map((tweet, index) => (
          <div 
            key={index}
            className={`transition-all duration-300 ${index === activeIndex ? 'scale-100' : 'scale-95 opacity-80'}`}
          >
            <TwitterPreview {...tweet} />
          </div>
        ))}
      </div>
      
      {showPrevButton && (
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 bg-tertiary p-3 rounded-full text-white z-10 shadow-lg opacity-90 hover:opacity-100 transition-opacity"
          onClick={scrollPrev}
          aria-label="Previous tweets"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>
      )}
      
      {showNextButton && (
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 bg-tertiary p-3 rounded-full text-white z-10 shadow-lg opacity-90 hover:opacity-100 transition-opacity"
          onClick={scrollNext}
          aria-label="Next tweets"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      )}
      
      {renderIndicators()}
    </div>
  );
};

const Links = () => {
  return (
    <section className="c-space my-20" id="links">
      <div className="w-full">
        <p className="section-subtitle">Connect With Me</p>
        <p className="section-title">Find Me Online</p>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Social Media</h2>
          <div className="flex flex-wrap gap-5">
            {socialLinks.map((link, index) => (
              <SocialLink key={index} {...link} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">My Ventures</h2>
          <div className="flex flex-col gap-5">
            {ventureLinks.map((venture, index) => (
              <VentureSection key={index} {...venture} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Me</h2>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {contactInfo.map((item, index) => (
              <ContactCard key={index} {...item} />
            ))}
          </div>
        </div>

        {twitterEmbeds.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Latest Tweets</h2>
            <TwitterSlider tweets={twitterEmbeds} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Links; 