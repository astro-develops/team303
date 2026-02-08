import React from "react";

export default function RampPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 pt-24">
      <h1 className="text-5xl font-bold mb-6 text-center font-etnocentric">Parents and Mentors</h1>
      <p className="text-base text-center mb-8 max-w-2xl mx-auto">
        The team’s parents and mentors are part of Team 303 RAMP, or, the Robotics Alliance of Mentors and Parents. Team 303 RAMP is a 501(c)3 organization, and works to support the students by mentoring them, providing additional funding, and organizing, such as concession stands at events and travel arrangements.
      </p>
      <div className="flex justify-center mb-6">
        <a href="https://www.team303ramp.com/what-is-ramp.php" target="_blank" rel="noopener noreferrer" className="bg-[#008080] text-white font-semibold px-6 py-4 rounded-lg shadow hover:bg-[#009999] transition-all text-lg">
          RAMP Website
        </a>
      </div>

      <section className="mb-10 flex flex-col items-center gap-6">
        <div className="text-2xl font-bold mb-4 text-center">R.A.M.P. Board</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center border-2 border-[#008080]">
            <div className="text-xl font-bold mb-2">Dora Cousineau</div>
            <div className="text-[#008080] font-semibold">President</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center border-2 border-[#008080]">
            <div className="text-xl font-bold mb-2">Mamata Vaidya</div>
            <div className="text-[#008080] font-semibold">Vice President</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center border-2 border-[#008080]">
            <div className="text-xl font-bold mb-2">Shyam Kewalia</div>
            <div className="text-[#008080] font-semibold">Treasurer</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center border-2 border-[#008080]">
            <div className="text-xl font-bold mb-2">Bill Schmidt</div>
            <div className="text-[#008080] font-semibold">Secretary</div>
          </div>
        </div>
      </section>


      <section className="mb-10 flex flex-col items-center gap-2">
        <div className="text-lg font-semibold mb-2 text-center">Voting Officers</div>
        <div className="flex flex-row gap-4 justify-center w-full max-w-2xl">
          <div className="bg-white shadow rounded-lg p-3 text-center border border-[#008080]/30 w-full max-w-xs">Rajesh Vaidya</div>
          <div className="bg-white shadow rounded-lg p-3 text-center border border-[#008080]/30 w-full max-w-xs">Li Liu</div>
          <div className="bg-white shadow rounded-lg p-3 text-center border border-[#008080]/30 w-full max-w-xs">Deepa Pakal</div>
        </div>
      </section>
    </main>
  );
}