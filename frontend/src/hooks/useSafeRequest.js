import { useCallback, useEffect, useRef } from 'react';
import { isAbortError } from '../services/api.js';

export function useSafeRequest() {
  const controllers = useRef(new Set());

  useEffect(() => {
    const live = controllers.current;
    return () => {
      live.forEach((controller) => controller.abort());
      live.clear();
    };
  }, []);

  return useCallback(async (task) => {
    const controller = new AbortController();
    controllers.current.add(controller);
    try {
      return await task(controller.signal);
    } catch (error) {
      if (isAbortError(error)) return null;
      throw error;
    } finally {
      controllers.current.delete(controller);
    }
  }, []);
}
