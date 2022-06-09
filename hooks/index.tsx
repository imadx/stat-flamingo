import { useCallback, useState } from "react";

export const useFetch = <T,>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const trigger = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      setData(await response.json());
    } catch (exception) {
      setData(null);
      setError((exception as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { isLoading, error, data, trigger };
};
