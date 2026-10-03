import type { ExercisePreset } from "@/lib/types";

export const EXERCISES: ExercisePreset[] = [
  { id: "ex-bench", name: "Bankdrücken", muscle: "Brust", equipment: "Langhantel", category: "push", defaultSets: 4, defaultReps: 8, defaultRestSec: 120 },
  { id: "ex-squat", name: "Kniebeugen", muscle: "Beine", equipment: "Langhantel", category: "legs", defaultSets: 4, defaultReps: 6, defaultRestSec: 180 },
  { id: "ex-deadlift", name: "Kreuzheben", muscle: "Rücken", equipment: "Langhantel", category: "pull", defaultSets: 3, defaultReps: 5, defaultRestSec: 180 },
  { id: "ex-ohp", name: "Schulterdrücken", muscle: "Schultern", equipment: "Langhantel", category: "push", defaultSets: 3, defaultReps: 8, defaultRestSec: 90 },
  { id: "ex-row", name: "Rudern", muscle: "Rücken", equipment: "Langhantel", category: "pull", defaultSets: 4, defaultReps: 8, defaultRestSec: 90 },
  { id: "ex-pullup", name: "Klimmzüge", muscle: "Rücken", equipment: "Körpergewicht", category: "pull", defaultSets: 3, defaultReps: 8, defaultRestSec: 90 },
  { id: "ex-dip", name: "Dips", muscle: "Brust/Trizeps", equipment: "Körpergewicht", category: "push", defaultSets: 3, defaultReps: 10, defaultRestSec: 90 },
  { id: "ex-lunges", name: "Ausfallschritte", muscle: "Beine", equipment: "Kurzhantel", category: "legs", defaultSets: 3, defaultReps: 10, defaultRestSec: 60 },
  { id: "ex-plank", name: "Unterarmstütz", muscle: "Core", equipment: "Körpergewicht", category: "core", defaultSets: 3, defaultReps: 45, defaultRestSec: 45 },
  { id: "ex-run", name: "Laufen", muscle: "Cardio", equipment: "—", category: "cardio", defaultSets: 1, defaultReps: 20, defaultRestSec: 0 },
];
