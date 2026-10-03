import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EXERCISES } from "@/lib/gym/exercises";
import { FOODS } from "@/lib/nutrition/foods";
import { nid, todayISO } from "@/lib/utils";
import type {
  ExercisePreset,
  Food,
  HeliaSettings,
  MacroTargets,
  NutritionEntry,
  PolarSession,
  Routine,
  WeightEntry,
  Workout,
} from "@/lib/types";

type HeliaState = {
  exercises: ExercisePreset[];
  foods: Food[];
  routines: Routine[];
  workouts: Workout[];
  nutrition: NutritionEntry[];
  weights: WeightEntry[];
  polarSessions: PolarSession[];
  targets: MacroTargets;
  settings: HeliaSettings;
  activeWorkoutId: string | null;

  startWorkout: (routineId?: string) => string;
  endWorkout: (id: string) => void;
  addNutrition: (entry: Omit<NutritionEntry, "id">) => void;
  addWeight: (kg: number, date?: string) => void;
  addPolarSession: (session: PolarSession) => void;
  setTargets: (t: Partial<MacroTargets>) => void;
  setDisplayName: (name: string) => void;
};

export const useHeliaStore = create<HeliaState>()(
  persist(
    (set, get) => ({
      exercises: EXERCISES,
      foods: FOODS,
      routines: [],
      workouts: [],
      nutrition: [],
      weights: [],
      polarSessions: [],
      targets: { kcal: 2200, protein: 160, carbs: 220, fat: 70 },
      settings: { displayName: "Athlete", units: "metric" },
      activeWorkoutId: null,

      startWorkout: (routineId) => {
        const id = nid();
        const routine = get().routines.find((r) => r.id === routineId);
        const exercises = routine
          ? routine.exercises.map((re) => ({
              exerciseId: re.exerciseId,
              sets: Array.from({ length: re.sets }, () => ({
                reps: re.reps,
                done: false,
              })),
            }))
          : [];
        set((s) => ({
          workouts: [
            ...s.workouts,
            {
              id,
              date: todayISO(),
              startedAt: Date.now(),
              exercises,
            },
          ],
          activeWorkoutId: id,
        }));
        return id;
      },

      endWorkout: (id) =>
        set((s) => ({
          workouts: s.workouts.map((w) =>
            w.id === id ? { ...w, endedAt: Date.now() } : w,
          ),
          activeWorkoutId: s.activeWorkoutId === id ? null : s.activeWorkoutId,
        })),

      addNutrition: (entry) =>
        set((s) => ({
          nutrition: [...s.nutrition, { ...entry, id: nid() }],
        })),

      addWeight: (kg, date = todayISO()) =>
        set((s) => ({
          weights: [...s.weights, { id: nid(), date, kg }],
        })),

      addPolarSession: (session) =>
        set((s) => ({ polarSessions: [...s.polarSessions, session] })),

      setTargets: (t) => set((s) => ({ targets: { ...s.targets, ...t } })),

      setDisplayName: (name) =>
        set((s) => ({ settings: { ...s.settings, displayName: name } })),
    }),
    { name: "helia-store" },
  ),
);
