import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="data">
      <h2 className="text-3xl font-bold">데이타 이지이다</h2>
    </Layout>
  );
};

export default Home;
