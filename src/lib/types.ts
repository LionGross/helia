export type MuscleGroup = "push" | "pull" | "legs" | "core" | "cardio" | "full";

export type ExercisePreset = {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  category: MuscleGroup;
  defaultSets: number;
  defaultReps: number;
  defaultRestSec: number;
  custom?: boolean;
};

export type RoutineExercise = {
  exerciseId: string;
  sets: number;
  reps: number;
  restSec: number;
  notes?: string;
};

export type Routine = {
  id: string;
  name: string;
  dayOfWeek: number; // 0=Mon
  exercises: RoutineExercise[];
};

export type WorkoutSet = {
  reps: number;
  weight?: number;
  rpe?: number;
  done: boolean;
};

export type WorkoutExercise = {
  exerciseId: string;
  sets: WorkoutSet[];
  notes?: string;
};

export type Workout = {
  id: string;
  date: string;
  startedAt: number;
  endedAt?: number;
  exercises: WorkoutExercise[];
  notes?: string;
};

export type Food = {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  unit: string;
  per: number;
};

export type NutritionEntry = {
  id: string;
  date: string;
  foodId: string;
  amount: number;
  meal?: string;
};

export type MacroTargets = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type WeightEntry = {
  id: string;
  date: string;
  kg: number;
};

export type PolarSession = {
  id: string;
  startedAt: number;
  endedAt?: number;
  samples: number[];
  avgBpm?: number;
  maxBpm?: number;
};

export type HeliaSettings = {
  displayName: string;
  units: "metric" | "imperial";
};
