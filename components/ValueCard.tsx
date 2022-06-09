import { useEffect } from "react";
import { useFetch } from "../hooks";
import styles from "./ValueCard.module.css";

export default () => {
  const { data, error, isLoading, trigger } = useFetch<{ value: number }>(
    "/api/quotes",
  );

  useEffect(() => {
    trigger();
  }, []);

  const getClassNameForValue = () => {
    return [
      styles.value,
      !data?.value || isLoading ? styles.loading : undefined,
      error ? styles.error : undefined,
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className={styles.container}>
      <p className={getClassNameForValue()}>
        <>1 USD = {data?.value || "###"} LKR</>
      </p>
      <p className={styles.source}>WISE</p>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
