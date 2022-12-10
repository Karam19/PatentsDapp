import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer}>
        This project was done as part of the Block Chain Development course in{" "}
        <Link className={styles.a} href="https://innopolis.university/en/">
          Innopolis University
        </Link>
      </p>
    </footer>
  );
}
