import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { socialLinks } from '../constants';

const LinkCard = ({ index, title, icon, link }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
  >
    <div className='mt-1 flex justify-between items-center gap-1'>
      <div className='flex-1 flex flex-col'>
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer" 
          className='text-white font-bold text-[24px] hover:text-secondary transition-colors'
        >
          <div className='flex items-center gap-4'>
            <img 
              src={icon} 
              alt={title} 
              className='w-10 h-10 object-contain'
            />
            <h3>{title}</h3>
          </div>
        </a>
      </div>
    </div>
  </motion.div>
);

const Links = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Connect with me</p>
        <h2 className={styles.sectionHeadText}>Links.</h2>
      </motion.div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {socialLinks.map((link, index) => (
          <LinkCard 
            key={link.name} 
            index={index} 
            title={link.name}
            icon={`/${link.icon}.png`}
            link={link.url}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Links, "links"); 