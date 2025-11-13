import React, { useState, useContext } from "react";
import { AppContext } from "../../contextApi/ContextApi";
import ShortenUrlList from "./ShortenUrlList";
import {
  useFetchTotalClicks,
  useFetchUrlSpecificClicks,
} from "../../components/hooks/userQuery";
import Graph from "./Graph";
import ShortenUrlModal from "./ShortUrlModal";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FadeLoader } from "react-spinners";

const Dashboard = () => {
  const navigate = useNavigate();
  const [shortenUrlPop, setShortenUrlPop] = useState(false);
  const { token } = useContext(AppContext);
  const { data, error, isLoading } = useFetchTotalClicks(token, onError);
  let {
    data: myShortUrls,
    isLoading: isLoadingShortUrls,
    error: isErrorInLoadingShortUrls,
    refetch,
  } = useFetchUrlSpecificClicks(token, onError);

  let isComponentLoading = isLoading || isLoadingShortUrls;
  if (isComponentLoading) {
    console.log("component still loading....");
  } else if (error) {
    console.log("need to handler");
  }

  function onError(e) {
    console.log("ERROR IN DATA FETCHING FROM BACKEND!!!");
    navigate("/error");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {isComponentLoading ? (
        <div className="flex items-center justify-center h-screen">
          <FadeLoader color="blue" size={60} />
        </div>
      ) : (
        <div className="flex flex-col items-center max-w-8xl py-8 px-4">
          <div style={{ width: "90%" }} className="w-full flex flex-col">
            <div className="relative w-full h-[350px] sm:h-[400px] md:h-[420px] lg:h-[450px] bg-white rounded-2xl shadow-sm p-4">
              <Graph data={data} />

              {data && data.length === 0 && (
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
                onClick={() => {
                  setShortenUrlPop(true);
                }}
                className="px-6 py-2 mb-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Short Link
              </button>
            </div>
          </div>
          <ShortenUrlModal
            refetch={refetch}
            open={shortenUrlPop}
            setOpen={setShortenUrlPop}
          ></ShortenUrlModal>
          <div className="w-full min-h-[200px] bg-transparent pb-15">
            {myShortUrls && myShortUrls.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-[200px] text-center">
                <p className="text-lg font-semibold text-gray-800">
                  No Short Links Yet
                </p>
                <p className="text-gray-600 mt-1">
                  Click “Create Short Link” to get started.
                </p>
              </div>
            ) : (
              <ShortenUrlList data={myShortUrls} />
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
