"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { getAllWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWorkouts()
      .then(setWorkouts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      <section
        id="library"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold uppercase mb-1"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          The Library
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Twelve lifts covering every major muscle group.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#111318] rounded-xl overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-[4/3] bg-white/5" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-24 bg-white/10 rounded-full" />
                  <div className="h-4 w-40 bg-white/10 rounded" />
                  <div className="h-3 w-28 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}