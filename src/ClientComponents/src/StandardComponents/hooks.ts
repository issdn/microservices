import { useCallback, useEffect, useMemo, useRef } from "react";

// Code from https://daily-dev-tips.com/posts/react-cleaner-use-of-settimeout/
export const useTimeout = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current as number);
  }, []);

  const memoizedCallback = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      callbackRef.current?.();
    }, delay);
  }, [delay, timeoutRef, callbackRef]);

  return useMemo(() => [memoizedCallback], [memoizedCallback]);
};
