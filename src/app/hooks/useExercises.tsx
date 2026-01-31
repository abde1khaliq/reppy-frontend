import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface Exercise {
  id: number;
  name: string;
  category: Category;
}

export default function useExercises(session: { accessToken?: string } | null) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getExercises() {
      if (!session?.accessToken) return;
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/reppy_api/exercises`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${session.accessToken}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch exercises: ${res.status}`);
        }

        const data: Exercise[] = await res.json();
        setExercises(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getExercises();
  }, [session]);

  return { exercises, loading, error };
}
