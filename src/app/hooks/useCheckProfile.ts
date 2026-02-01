"use client";

import { useEffect, useState } from "react";

export default function useCheckProfile() {
  const [profileData, setProfileData] = useState<any | null>(null);

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const response = await fetch("/api/getuser_profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          setProfileData(false);
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        setProfileData(false);
      }
    };

    checkUserProfile();
  }, []);

  return profileData;
}
