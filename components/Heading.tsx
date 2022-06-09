import Image from "next/image";
import styles from "./Heading.module.css";

import Logo from "../public/logo.svg";

const Heading = () => {
  return (
    <div className={styles.heading}>
      <div className={styles.logo}>
        <Image src={Logo} width={64} height={64} />
      </div>
      <div>
        <h1 className={styles.h1}>Value of USD in LKR</h1>
        <h2 className={styles.h2}>Stat fLAMINGO</h2>
      </div>
    </div>
  );
};

export default Heading;
