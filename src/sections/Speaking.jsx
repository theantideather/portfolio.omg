import { speakingEvents } from '../constants/index.js';

const SpeakingCard = ({ event }) => (
  <div className="shadow-card p-6 rounded-3xl">
    <div className="flex flex-col gap-5 items-start">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-white/10">
          <img src="assets/microphone.svg" alt="speaking" className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">{event.name}</h3>
      </div>
      <p className="text-neutral-400 leading-relaxed">{event.description}</p>
    </div>
  </div>
);

const Speaking = () => {
  return (
    <section className="c-space my-20" id="speaking">
      <div className="w-full">
        <p className="section-subtitle">Speaking Achievements</p>
        <p className="section-title">Where I've Shared My Knowledge</p>

        <div className="mt-20 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8">
          {speakingEvents.map((event) => (
            <SpeakingCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speaking; 