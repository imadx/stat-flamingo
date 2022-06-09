import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Heading from "../components/Heading";
import ValueCard from "../components/ValueCard";
import styles from "../styles/Home.module.css";

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
        <ValueCard />
      </main>
      <footer className={styles.footer}>
        <p>created by Ishan Madhusanka</p>
      </footer>
    </div>
  );
};

export default Home;
