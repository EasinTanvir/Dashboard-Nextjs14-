import ChartData from "@/chart/ChartData";
import api from "@/utils/api";
import React from "react";
import { Search } from "../../types/type";
const Home = async ({ searchParams }: Search) => {
  let result;
  const searchQuery = searchParams?.days ? searchParams.days : 7;
  try {
    result = await api.get(`/api/user/?test=${searchQuery}`);
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="min-h-custom bg-white  p-4 ">
      <div className="sm:w-[900px] w-[350px] ">
        <ChartData result={result?.data} />
      </div>
    </div>
  );
};

export default Home;
