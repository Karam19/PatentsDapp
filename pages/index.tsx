import type { NextPage } from "next";
import HomeComponent from "../src/components/HomeComponent";

const Home: NextPage = () => (
  <div>
    <h1>Here is the last uploaded patent</h1>
    <HomeComponent />
  </div>
);

export default Home;
