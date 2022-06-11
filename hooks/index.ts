import { RefObject, useCallback, useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const trigger = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.body) {
          const body = await response.json();
          throw new Error(body.message);
        }

        throw new Error(response.statusText);
      }

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

export const useMouseHover = (ref: RefObject<HTMLDivElement>) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    ref.current.addEventListener("mouseenter", handleMouseEnter);
    ref.current.addEventListener("mouseout", handleMouseOut);

    return () => {
      ref.current?.removeEventListener("mouseenter", handleMouseEnter);
      ref.current?.removeEventListener("mouseout", handleMouseOut);
    };
  }, [setIsHovered, ref]);

  return isHovered;
};
