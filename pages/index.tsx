import type { NextPage } from "next";
import Head from "next/head";
import Heading from "../components/Heading";
import ValueCard from "../components/ValueCard";
import styles from "../styles/Home.module.css";
import { Source } from "../types";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Value of USD in LKR</title>
        <meta name="description" content="Quick tools by Ishan Madhusanka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading />

        <div className={styles.valueContainer}>
          <ValueCard source={Source.wise} />
          <ValueCard source={Source.sampath} size="small" />
          <ValueCard source={Source.google} size="small" />
        </div>
      </main>
      <footer className={styles.footer}>
        <p>by Ishan Madhusanka</p>
      </footer>
    </div>
  );
};

export default Home;
