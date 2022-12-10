import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Review() {
  return (
    <>
      <Head>
        <title>Review</title>
        <meta name="description" content="Review a patent" />
      </Head>

      <div className="text-column">
        <h1>Review a patent</h1>

        <p>Here you can review a patent</p>
      </div>
    </>
  );
}
