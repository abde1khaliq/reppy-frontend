import { useEffect, useState } from "react";

interface ExerciseBase {
  id: number;
  name: string;
}

interface WorkoutExercise {
  id: number;
  sets: number;
  reps: number;
  exercise: ExerciseBase;
}

interface Workout {
  id: number;
  title: string;
  created_at: string;
  exercises?: WorkoutExercise[];
}

export default function useWorkouts(session: { accessToken?: string } | null) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getWorkouts() {
      if (!session?.accessToken) return;
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/reppy_api/workouts/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${session.accessToken}`,
            },
          },
        );
        const workoutsData: Workout[] = await res.json();

        const workoutsWithExercises = await Promise.all(
          workoutsData.map(async (w) => {
            const exRes = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/reppy_api/workouts/${w.id}/exercises/`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `JWT ${session.accessToken}`,
                },
              },
            );
            const exercises: WorkoutExercise[] = await exRes.json();
            return { ...w, exercises };
          }),
        );

        setWorkouts(workoutsWithExercises);
      } finally {
        setLoading(false);
      }
    }

    getWorkouts();
  }, [session]);

  return { workouts, loading };
}
