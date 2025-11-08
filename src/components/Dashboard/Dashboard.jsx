// src/components/Dashboard.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../../contextApi/ContextApi";
import { useFetchTotalClicks } from "../../components/hooks/userQuery";
import Graph from "./Graph";
import ShortenUrlModal from "./ShortUrlModal";

const Dashboard = () => {
  const refetech = false;
  const[shortenUrlPop, setShortenUrlPop] = useState(false);
  const { token } = useContext(AppContext);
  const { data, error, isLoading } = useFetchTotalClicks(token, onError);

  if (isLoading) {
    console.log("component still loading....");
  } else if (error) {
    console.log("need to handler");
  } 

  const setOpenHandler = () => {
    
  }

  function onError(e) {
    console.log("ERROR IN DATA FETCHING FROM BACKEND!!!");
  }

  return (
    <>
      {/* Chart Section */}
      <div className="flex flex-col items-center max-w-8xl py-8 px-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ width: "90%" }} className="w-full flex flex-col">
            <div className="relative w-full h-[350px] sm:h-[400px] md:h-[420px] lg:h-[450px] bg-white rounded-2xl shadow-sm p-4">
              <Graph data={data} />

              {data.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl">
                  <p className="text-black text-lg sm:text-xl font-semibold">
                    No analytics data available for last 90 days
                  </p>
                  <p className="text-gray-700 text-base sm:text-lg mt-2 text-center px-6">
                    Share your link to start tracking clicks and engagement over
                    time.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {debugger; setShortenUrlPop(true)}}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Short Link
              </button>
            </div>
          </div>
        )}
      </div>
      <ShortenUrlModal refetech={false} open={shortenUrlPop} setOpen={setOpenHandler}></ShortenUrlModal>
      <div className="w-full h-[200px] bg-transparent"></div>
    </>
  );
};

export default Dashboard;
