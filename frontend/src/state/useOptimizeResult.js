import { useState } from "react";
import { optimizeRoutes } from "../api/optimizeApi";

export function useOptimizeResult() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function runOptimize(payload) {
    setLoading(true);
    setError(null);
    try {
      const data = await optimizeRoutes(payload);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function clearResult() {
    setResult(null);
    setError(null);
  }

  return { result, loading, error, runOptimize, clearResult };
}
