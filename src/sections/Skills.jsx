import { skills } from '../constants/index.js';

const SkillBar = ({ skill }) => {
  const filledStars = Array(skill.level).fill('★');
  const emptyStars = Array(5 - skill.level).fill('☆');
  
  return (
    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">{skill.name}</h3>
        <div className="text-primary-500">
          {filledStars.map((_, index) => (
            <span key={`filled-${index}`} className="text-yellow-500">★</span>
          ))}
          {emptyStars.map((_, index) => (
            <span key={`empty-${index}`} className="text-gray-500">☆</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const businessSkills = skills.filter(skill => skill.category === 'business');
  const personalSkills = skills.filter(skill => skill.category === 'personal');

  return (
    <section className="c-space my-20" id="skills">
      <div className="w-full">
        <p className="section-subtitle">My Expertise</p>
        <p className="section-title">Skills & Technologies</p>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Technical Skills</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {technicalSkills.map((skill, index) => (
              <SkillBar key={`tech-${index}`} skill={skill} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Business Skills</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {businessSkills.map((skill, index) => (
              <SkillBar key={`biz-${index}`} skill={skill} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Personal Skills</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {personalSkills.map((skill, index) => (
              <SkillBar key={`personal-${index}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 