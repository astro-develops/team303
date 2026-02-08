import React from "react";
import Image from "next/image";

const advisors = [
  { name: "Jim Griffin", title: "Head Advisor", img: "/assets/Jim-Griffin.png" },
  { name: "Novena Petryk-Cordi", title: "Assistant Advisor", img: "/assets/Ms-Novena Pic.png" },
  { name: "Kristen Mehrbach", title: "Assistant Advisor", img: "/assets/Ms. Merhbach pic.png" },
  { name: "Marialena Di Marco", title: "Assistant Advisor", img: null }, // No image found
];

const mentors = [
  { name: "Corey Kurachik", img: "/assets/Corey-Pic.png" },
  { name: "Jessica Levitt", img: "/assets/Jessic Levitt Pic.png" },
];

export default function AdvisorsMentorsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Advisors & Mentors</h1>
      {/* Advisors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Advisors</h2>
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs text-center mb-4 border-2 border-[#008080] flex flex-col items-center">
            <div className="w-24 h-24 bg-[#DBE9EE] rounded-full mb-3 flex items-center justify-center overflow-hidden">
              {advisors[0].img ? (
                <Image src={advisors[0].img} alt={advisors[0].name} width={96} height={96} className="object-cover w-24 h-24 rounded-full" />
              ) : (
                <span className="text-gray-400">Photo</span>
              )}
            </div>
            <div className="text-xl font-bold mb-2">{advisors[0].name}</div>
            <div className="text-[#008080] font-semibold">{advisors[0].title}</div>
          </div>
          <div className="flex flex-row gap-4 w-full justify-center">
            {advisors.slice(1).map((a) => (
              <div key={a.name} className="bg-white shadow rounded-lg p-4 flex-1 max-w-xs text-center border border-[#008080]/40 flex flex-col items-center">
                <div className="w-20 h-20 bg-[#DBE9EE] rounded-full mb-2 flex items-center justify-center overflow-hidden">
                  {a.img ? (
                    <Image src={a.img} alt={a.name} width={80} height={80} className="object-cover w-20 h-20 rounded-full" />
                  ) : (
                    <span className="text-gray-400">Photo</span>
                  )}
                </div>
                <div className="font-semibold mb-1">{a.name}</div>
                <div className="text-[#008080] text-sm">{a.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Mentors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Mentors</h2>
        <div className="flex flex-row gap-4 justify-center">
          {mentors.map((m) => (
            <div key={m.name} className="bg-white shadow rounded-lg p-4 flex-1 max-w-xs text-center border border-[#008080]/40 flex flex-col items-center">
              <div className="w-20 h-20 bg-[#DBE9EE] rounded-full mb-2 flex items-center justify-center overflow-hidden">
                {m.img ? (
                  <Image src={m.img} alt={m.name} width={80} height={80} className="object-cover w-20 h-20 rounded-full" />
                ) : (
                  <span className="text-gray-400">Photo</span>
                )}
              </div>
              <div className="font-semibold">{m.name}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Ramp Board section will go here */}
    </main>
  );
}
