"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { CalendarPlus, Bookmark, BookmarkCheck } from "lucide-react";
import toast from "react-hot-toast";
import { getWorkoutById } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailsPage() {
  const params = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { todaysPlan, addToPlan, addToSaved, isInPlan, isInSaved } = usePlan();

  useEffect(() => {
    if (!params.id) return;
    getWorkoutById(params.id)
      .then(setWorkout)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-400">
        Loading workout…
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-400">
        Workout not found.
      </div>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isInSaved(workout.id);
  const planFull = todaysPlan.length >= 5 && !alreadyInPlan;

  const handleAddToPlan = () => {
    const added = addToPlan(workout);
    if (added) {
      toast.success("Added to today's plan");
    } else {
      toast.error("Today's plan is full (max 5)");
    }
  };

  const handleSave = () => {
    const added = addToSaved(workout);
    if (added) {
      toast.success("Saved for later");
    }
  };

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right: details */}
      <div>
        <h1
          className="uppercase text-3xl sm:text-4xl font-bold mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {workout.name}
        </h1>
        <p className="text-gray-500 mb-4">{workout.description}</p>

        <div className="flex gap-2 mb-6">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="bg-[#ccff00] text-black text-xs font-bold uppercase px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-[#111318] rounded-xl overflow-hidden mb-6">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between px-5 py-3 border-b border-white/5 last:border-b-0"
            >
              <span className="text-gray-500 text-xs font-bold tracking-wider">
                {spec.label}
              </span>
              <span className="text-white text-sm font-semibold">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        <h2 className="font-bold uppercase text-sm mb-3">Instructions</h2>
        <ol className="space-y-2 mb-8 text-gray-600 text-sm list-decimal list-inside">
          {workout.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddToPlan}
            disabled={alreadyInPlan || planFull}
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-95 transition"
          >
            <CalendarPlus size={16} />
            {alreadyInPlan ? "Added to plan" : "Add to today's plan"}
          </button>

          <button
            onClick={handleSave}
            disabled={alreadySaved}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-bold text-sm px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            {alreadySaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {alreadySaved ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}