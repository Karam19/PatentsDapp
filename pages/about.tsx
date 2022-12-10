import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About this app" />
      </Head>

      <div className="text-column">
        <h1>About this app</h1>

        <p>
          This is a patents dapp, it creates, reviews and search for patents
        </p>

        <p>
          Contributers:
          <ul>
            <li>
              Karam Shbeb. <Link href="https://github.com/Karam19">Github</Link>
            </li>
          </ul>
        </p>
      </div>
    </>
  );
}
