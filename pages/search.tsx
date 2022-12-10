import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Search() {
  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search for a patent" />
      </Head>

      <div className="text-column">
        <h1>Search for a patent</h1>

        <p>Here you can search for a patent</p>
      </div>
    </>
  );
}
