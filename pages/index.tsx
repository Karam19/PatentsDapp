import type { NextPage } from "next";
import Head from "next/head";
import HomeComponent from "../src/components/HomeComponent";

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Home</title>
      <meta name="description" content="Home page" />
    </Head>
    <h1>Here is the last uploaded patent</h1>
    <HomeComponent />
  </div>
);

export default Home;
