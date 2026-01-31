"use client";

import { useEffect, useState } from "react";

export default function useCheckProfile() {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const response = await fetch("/api/getuser_profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setHasProfile(response.ok);
      } catch (error) {
        console.error("Error checking profile:", error);
        setHasProfile(false);
      }
    };

    checkUserProfile();
  }, []);

  return hasProfile;
}
