import type { NextPage } from "next";
import HomeComponent from "../src/components/HomeComponent";

const Home: NextPage = () => (
  <div>
    <h1>Welcome to Patents dapp!</h1>
    <HomeComponent />
  </div>
);

export default Home;
