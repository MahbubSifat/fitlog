"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Workout, PlanItem } from "@/lib/types";

interface PlanContextType {
  todaysPlan: PlanItem[];
  saved: Workout[];
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;   
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_LIMIT = 5;

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todaysPlan, setTodaysPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const isInPlan = (id: number) => todaysPlan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id) || todaysPlan.length >= PLAN_LIMIT) return false;
    setTodaysPlan((prev) => [...prev, { ...workout, done: false }]);
    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (isInSaved(workout.id)) return false;
    setSaved((prev) => [...prev, workout]);
    return true;
  };

  const removeFromPlan = (id: number) => {
    setTodaysPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  const markAsDone = (id: number) => {
    setTodaysPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: true } : w))
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todaysPlan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isInSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used inside a PlanProvider");
  }
  return context;
}