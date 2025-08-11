import React from 'react';
import DisplayCards from './sub_components/DisplayCards';
import { useFetchJobs } from './hooks/useFetchJobs';


const DisplayItems: React.FC = () => {

  const { loading, jobData } = useFetchJobs();


  return (
    <section className="flex flex-1 h-full overflow-hidden">
      {/* To Do */}
      <section className="flex-1 flex flex-col p-4 overflow-hidden">
        <h1 className="text-center font-bold text-xl mb-4">To Do</h1>
        <div className="flex-1 overflow-y-auto">
          {loading && <p className="text-center">Loading...</p>}
          <DisplayCards jobData={jobData} status={'To Do'} bgColor={'bg-[var(--todo-bg)]'} />
        </div>
      </section>

      {/* In Progress */}
      <section className="flex-1 flex flex-col p-4 overflow-hidden">
        <h1 className="text-center font-bold text-xl mb-4">In Progress</h1>
        <div className="flex-1 overflow-y-auto">
          {loading && <p className="text-center">Loading...</p>}
          <DisplayCards jobData={jobData} status={'In Progress'} bgColor={'bg-[var(--progress-bg)]'} />
        </div>
      </section>

      {/* Completed */}
      <section className="flex-1 flex flex-col p-4 overflow-hidden">
        <h1 className="text-center font-bold text-xl mb-4">Completed</h1>
        <div className="flex-1 overflow-y-auto">
          {loading && <p className="text-center">Loading...</p>}
          <DisplayCards jobData={jobData} status={'Completed'} bgColor={'bg-[var(--completed-bg)]'} />
        </div>
      </section>
    </section>
  );
};

export default DisplayItems;
