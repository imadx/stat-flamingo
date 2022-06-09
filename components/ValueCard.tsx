import { useEffect } from "react";
import { useFetch } from "../hooks";
import { Source } from "../types";
import { getFormattedNumber } from "../utils";
import styles from "./ValueCard.module.css";

interface Props {
  source: Source;
  size?: "small" | "normal";
}

const ValueCard = ({ source, size = "normal" }: Props) => {
  const { data, error, isLoading, trigger } = useFetch<{
    buying: string | null;
    selling: string | null;
  }>(`/api/quotes?source=${source}`);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const getClassNameForValue = () => {
    return [
      styles.value,
      !data?.buying || isLoading ? styles.loading : undefined,
      !data?.buying || isLoading ? "loading" : undefined,
      error ? styles.error : undefined,
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className={[styles.container, styles[size]].join(" ")}>
      <p className={getClassNameForValue()}>
        <>1 USD = {getFormattedNumber(data?.buying)} LKR</>
        {data?.selling && <> / {getFormattedNumber(data?.selling)} LKR</>}
      </p>
      <p className={styles.source}>{source.toUpperCase()}</p>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default ValueCard;
