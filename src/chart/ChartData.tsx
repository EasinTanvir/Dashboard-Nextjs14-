"use client";
import { Alegreya } from "next/font/google";
const alegreya = Alegreya({
  subsets: ["cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
});
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
);

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ChartData = ({ result }: { result: any }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const days = searchParams.get("days") ? searchParams.get("days") : "7";

  const labels = result?.resultForLastThreeDays.map(
    (item: any, i: any) => `Day ${i + 1}`
  );
  const userPerDaya = result?.resultForLastThreeDays.map(
    (item: any) => item.data.length
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Users",
        data: userPerDaya,
        backgroundColor: "#1D2327",
        borderColor: "#1D2327",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {},
    },
  };

  const onChangeHandler = (event: any) => {
    console.log(event.target.value);

    params.set("days", event.target.value);
    router.push(`${pathname}?${params}`);
  };

  return (
    <div className=" ">
      <div className="my-3 flex items-center justify-between">
        <h1 className={`text-2xl  font-semibold  ${alegreya.className}`}>
          User Analaysis
        </h1>
        <select
          //@ts-ignore
          value={days}
          style={{ background: "#1D2327" }}
          className="border px-4 py-2  text-white rounded-sm font-serif "
          onChange={onChangeHandler}
          name=""
          id=""
        >
          <option value="3">Last 3 Days</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last Month</option>
        </select>
      </div>
      <hr className="text-slate-800 py-3" />
      <div className="">
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};

export default ChartData;