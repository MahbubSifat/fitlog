"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Clock, Flame, Star, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";
import { PlanItem, Workout } from "@/lib/types";

type SortKey = "duration" | "calories" | "rating";
type Tab = "today" | "saved";

export default function MyPlanPage() {
  const { todaysPlan, saved, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();
  const [tab, setTab] = useState<Tab>("today");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const exercises = todaysPlan.length;
  const minutes = todaysPlan.reduce((sum, w) => sum + w.duration, 0);
  const calories = todaysPlan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const activeList = tab === "today" ? todaysPlan : saved;

  const sortedList = useMemo(() => {
    const list = [...activeList];
    list.sort((a, b) => {
      if (sortKey === "duration") return b.duration - a.duration;
      if (sortKey === "calories") return b.caloriesBurned - a.caloriesBurned;
      return b.rating - a.rating;
    });
    return list;
  }, [activeList, sortKey]);

  const handleRemove = (id: number, from: Tab) => {
    if (from === "today") {
      removeFromPlan(id);
      toast.success("Removed from today's plan");
    } else {
      removeFromSaved(id);
      toast.success("Removed from saved");
    }
  };

  const handleMarkDone = (id: number) => {
    markAsDone(id);
    toast.success("Marked as done");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1
        className="uppercase text-2xl sm:text-3xl font-bold mb-1"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        My Plan
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics summary */}
      <div className="bg-[#0d0f14] rounded-2xl grid grid-cols-3 divide-x divide-white/10 mb-8">
        <Stat label="Exercises" value={exercises} accent />
        <Stat label="Minutes" value={minutes} />
        <Stat label="Calories" value={calories} />
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="bg-[#0d0f14] rounded-full p-1 flex gap-1">
          <TabButton active={tab === "today"} onClick={() => setTab("today")}>
            Today&apos;s Plan
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            Saved
          </TabButton>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Sort By</span>
          <div className="relative">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="appearance-none bg-[#0d0f14] text-white text-sm font-semibold rounded-md pl-3 pr-8 py-2 border border-white/10 cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* List */}
      {!mounted ? (
        <p className="text-center text-gray-500 py-16">Loading workouts…</p>
      ) : sortedList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {sortedList.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              tab={tab}
              onRemove={() => handleRemove(workout.id, tab)}
              onMarkDone={() => handleMarkDone(workout.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="px-6 py-5">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p
        className={`text-3xl font-bold ${
          accent ? "text-[#ccff00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
        active ? "bg-white text-black" : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="bg-white/5 rounded-2xl py-20 text-center">
      <h3 className="uppercase font-bold text-lg mb-2">Nothing Here Yet</h3>
      <p className="text-gray-500 text-sm mb-6">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-md"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanCard({
  workout,
  tab,
  onRemove,
  onMarkDone,
}: {
  workout: PlanItem | Workout;
  tab: Tab;
  onRemove: () => void;
  onMarkDone: () => void;
}) {
  const done = "done" in workout && workout.done;

  return (
    <div
      className={`bg-[#0d0f14] rounded-xl flex items-center gap-4 p-4 ${
        done ? "opacity-50" : ""
      }`}
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-white font-bold uppercase text-sm truncate">
          {workout.name}
        </h4>
        <p className="text-gray-500 text-xs mb-1">{workout.equipment}</p>
        <div className="flex items-center gap-3 text-gray-400 text-xs">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-[#ccff00]" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} className="text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="text-sm font-semibold border border-white/10 text-white px-4 py-2 rounded-md hover:bg-white/5 transition"
        >
          View Details
        </Link>
        {tab === "today" && (
          <button
            onClick={onMarkDone}
            disabled={done}
            className="flex items-center gap-1 text-sm font-semibold bg-[#ccff00] text-black px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={14} />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          className="text-gray-500 hover:text-white p-2"
          aria-label="Remove"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}