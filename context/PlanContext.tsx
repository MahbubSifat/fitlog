"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
const PLAN_KEY = "fitlog-todays-plan";
const SAVED_KEY = "fitlog-saved";

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todaysPlan, setTodaysPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      if (storedPlan) setTodaysPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (err) {
      console.error("Failed to load FitLog data from localStorage", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(todaysPlan));
    } catch (err) {
      console.error("Failed to save plan to localStorage", err);
    }
  }, [todaysPlan, hydrated]);

  
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch (err) {
      console.error("Failed to save saved-list to localStorage", err);
    }
  }, [saved, hydrated]);

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