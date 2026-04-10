import { useEffect, useState } from "react";
import { fetchAllPetSitters } from "../api/petSittersApi";
import DisplayData from "../data/petSitters.json";
import { isDisplayMode } from "../../../shared/config/env";

export function usePetSitters() {
  const [petSitters, setPetSitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      if (isDisplayMode) {
        setPetSitters(DisplayData.PetSitters || DisplayData);
        setError(null);
        setLoading(false);
        return;
      }

      const response = await fetchAllPetSitters();

      if (response.error) {
        setError(response.error);
        setPetSitters([]);
      } else {
        setPetSitters(response.data);
        setError(null);
      }

      setLoading(false);
    };

    load();
  }, []);

  return { petSitters, loading, error };
}