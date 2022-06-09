import { useCallback, useEffect } from "react";

const eventTarget = new EventTarget();

export enum AppEvent {
  ValueCardHovered = "AppEvent.ValueCardHovered",
}

export const dispatchAppEvent = <T>(event: AppEvent, data: T) => {
  eventTarget.dispatchEvent(new CustomEvent(event, { detail: data }));
};

export const useEventListener = <T>(
  event: AppEvent,
  callback: (payload: T) => void,
) => {
  const handleCallback = useCallback((event: CustomEvent) => {
    return callback(event.detail as T);
  }, []);

  useEffect(() => {
    eventTarget.addEventListener(event, handleCallback as EventListener);

    return () => {
      eventTarget.removeEventListener(event, handleCallback as EventListener);
    };
  }, [event]);
};
