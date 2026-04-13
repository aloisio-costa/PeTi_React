import { useEffect, useState } from "react";
import { fetchPetSitter } from "../api/petSittersApi";
import DisplayData from "../data/petSitters.json";
import { isDisplayMode } from "../../../shared/config/env"


export function usePetSitter(id) {
  const [petSitter, setPetSitter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      if (isDisplayMode) {
        const data = DisplayData.PetSitters || DisplayData;
        const found = data.find((p) => String(p.id) === String(id));

        if (!found) {
          setError("Pet sitter not found");
          setPetSitter(null);
        } else {
          setPetSitter(found);
          setError(null);
        }

        setLoading(false);
        return;
      }

      const response = await fetchPetSitter(id);

      if (response.error) {
        setError(response.error);
        setPetSitter(null);
      } else {
        setPetSitter(response.data);
        setError(null);
      }

      setLoading(false);
    };

    if (id) {
      load();
    }
  }, [id]);

  return { petSitter, loading, error };
}