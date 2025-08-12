import React, { useState } from 'react';
import DisplayCards from './sub_components/DisplayCards';
import { useFetchJobs } from './hooks/useFetchJobs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const statuses = [
  { label: 'To Do', bg: 'bg-[var(--todo-bg)]' },
  { label: 'In Progress', bg: 'bg-[var(--progress-bg)]' },
  { label: 'Completed', bg: 'bg-[var(--completed-bg)]' },
];

const DisplayItems: React.FC = () => {
  const { loading } = useFetchJobs();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? statuses.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === statuses.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Mobile view: one section at a time */}
      <section className="flex flex-col items-center md:hidden w-full h-full">
        <div className="flex items-center justify-between w-full px-4 py-2">
          <button onClick={handlePrev}>
            <FaChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">{statuses[currentIndex].label}</h1>
          <button onClick={handleNext}>
            <FaChevronRight size={20} />
          </button>
        </div>

        <div className="flex-1 w-full overflow-y-auto p-4">
          {loading && <p className="text-center">Loading...</p>}
          <DisplayCards
            key={statuses[currentIndex].label}
            status={statuses[currentIndex].label as 'To Do' | 'In Progress' | 'Completed'}
            bgColor={statuses[currentIndex].bg}
          />

        </div>
      </section>

      {/* Desktop view: all sections side-by-side */}
      <section className="hidden md:flex flex-1 h-full overflow-hidden">
        {statuses.map((s) => (
          <section key={s.label} className="flex-1 flex flex-col p-4 overflow-hidden">
            <h1 className="text-center font-bold text-xl mb-4">{s.label}</h1>
            <div className="flex-1 overflow-y-auto">
              {loading && <p className="text-center">Loading...</p>}
              <DisplayCards status={s.label as 'To Do' | 'In Progress' | 'Completed'} bgColor={s.bg} />
            </div>
          </section>
        ))}
      </section>
    </>
  );
};

export default DisplayItems;
