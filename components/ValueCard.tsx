import { useEffect, useRef, useState } from "react";
import { useFetch, useMouseHover } from "../hooks";
import { AppEvent, dispatchAppEvent, useEventListener } from "../hooks/events";
import { Source } from "../types";
import { getFormattedNumber } from "../utils";
import RefreshButton from "./RefreshButton";
import styles from "./ValueCard.module.css";

interface Props {
  source: Source;
  size?: "small" | "normal";
}

const ValueCard = ({ source, size = "normal" }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const hovered = useMouseHover(elementRef);

  const { data, error, isLoading, trigger } = useFetch<{
    buying: string | null;
    selling: string | null;
  }>(`/api/quotes?source=${source}`);

  const handleOnExternalValueCardHovered = (payload: Source) => {
    if (payload !== source) {
      setIsHovered(false);
    }
  };

  useEventListener<Source>(
    AppEvent.ValueCardHovered,
    handleOnExternalValueCardHovered,
  );

  useEffect(() => {
    if (hovered) {
      setIsHovered(true);
      dispatchAppEvent(AppEvent.ValueCardHovered, source);
    }
  }, [hovered]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const getClassNameForValue = () => {
    const _isLoading = !data?.buying || isLoading;

    return [
      styles.value,
      _isLoading ? styles.loading : undefined,
      _isLoading ? "loading" : undefined,
      error ? styles.error : undefined,
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div
      ref={elementRef}
      className={[styles.container, styles[size]].join(" ")}
      style={{ zIndex: isHovered ? 1 : "" }}
    >
      <p className={getClassNameForValue()}>
        <>1 USD = {getFormattedNumber(data?.buying)} LKR</>
        {data?.selling && <> / {getFormattedNumber(data?.selling)} LKR</>}
      </p>
      <p className={styles.source}>{source.toUpperCase()}</p>
      {error && (
        <>
          <p className={styles.errorMessage}>
            {error}
            <RefreshButton onClick={trigger} />
          </p>
        </>
      )}
    </div>
  );
};

export default ValueCard;
