import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Submit() {
  return (
    <>
      <Head>
        <title>Submit</title>
        <meta name="description" content="Submit a patent" />
      </Head>

      <div className="text-column">
        <h1>Submit a patent</h1>

        <p>Here you can submit a patent</p>
      </div>
    </>
  );
}
