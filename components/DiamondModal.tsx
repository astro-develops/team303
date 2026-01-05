"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { RobotSeason } from "@/types/robots";

interface Props {
  open: boolean;
  season: RobotSeason | null;
  onClose: () => void;
}

export default function DiamondModal({ open, season, onClose }: Props) {
  if (!open || !season) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center text-black bg-black/50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#DBE9EE] rounded-2xl shadow-xl p-6 max-w-4xl w-[94%] lg:w-3/4 overflow-auto max-h-[90vh]"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative w-full lg:w-1/3 h-64 lg:h-96 rounded-md overflow-hidden">
            <Image
              src={season.robotImage}
              alt={`Robot ${season.year}`}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-bold">Robot {season.year}</h2>
              <div className="text-sm text-gray-600">
                Wins: <span className="font-medium">{season.totalWins}</span>{" "}
                • Losses: <span className="font-medium">{season.totalLosses}</span>
              </div>
            </div>

            <p className="mt-2 text-gray-700">
              Season overview for team 303 in {season.year}.
            </p>

            <hr className="my-4" />

            <div className="space-y-4">
              {season.events.length === 0 && (
                <div className="text-sm text-gray-500">No events recorded.</div>
              )}

              {season.events.map((ev) => (
                <div key={ev.eventKey} className="p-3 rounded-lg bg-[#008080]/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{ev.eventName}</div>
                      <div className="text-sm text-gray-600">
                        Rank:{" "}
                        {ev.rank === null || ev.rank === undefined ? (
                          <span>N/A</span>
                        ) : (
                          <span>
                            {ev.rank}{/* / {ev.totalTeams ?? "?"} */}
                          </span>
                        )}
                        {" • "}Record: {ev.wins}-{ev.losses}-{ev.ties ?? 0}
                      </div>
                    </div>

                    <div className="text-sm text-gray-700">
                      {ev.awards.length > 0 ? (
                        <div className="text-right">
                          <div className="font-medium">Awards</div>
                          <div className="text-xs text-gray-600">
                            {ev.awards.join(", ")}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500"> </div>
                      )}
                    </div>
                  </div>

                  {ev.overall_status && (
                    <div
                      className="mt-2 text-sm text-gray-700"
                      dangerouslySetInnerHTML={{ __html: ev.overall_status }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#008080] text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
