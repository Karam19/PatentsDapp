import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const { pathname } = useRouter();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <svg className={styles.svg} viewBox="0 0 2 3" aria-hidden="true">
          <path className={styles.path} d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
        </svg>
        <ul className={styles.ul}>
          <li
            className={
              (pathname === "/" ? `${styles.active} ` : "") + styles.li
            }
          >
            <Link className={styles.a} href="/">
              Home
            </Link>
          </li>
          <li
            className={
              (pathname === "/search" ? `${styles.active} ` : "") + styles.li
            }
          >
            <Link className={styles.a} href="/search">
              Search
            </Link>
          </li>
          <li
            className={
              (pathname === "/submit" ? `${styles.active} ` : "") + styles.li
            }
          >
            <Link className={styles.a} href="/submit">
              Submit
            </Link>
          </li>
          <li
            className={
              (pathname === "/review" ? `${styles.active} ` : "") + styles.li
            }
          >
            <Link className={styles.a} href="/review">
              Add reviewer
            </Link>
          </li>
          <li
            className={
              (pathname === "/about" ? `${styles.active} ` : "") + styles.li
            }
          >
            <Link className={styles.a} href="/about">
              About
            </Link>
          </li>
        </ul>
        <svg className={styles.svg} viewBox="0 0 2 3" aria-hidden="true">
          <path className={styles.path} d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
        </svg>
      </nav>
    </header>
  );
}
