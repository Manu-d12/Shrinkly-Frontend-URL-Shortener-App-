import React, { useState } from "react";
import { MdAnalytics, MdContentCopy } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import AnalyticsModal from "./AnalyticsModal";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

const ShortenUrlTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [shortUrl, setShortUrl] = useState(null);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const copyUrlHandler = (e) => {
    const shortUrl = e.target.getAttribute("data-id");
    navigator.clipboard
      .writeText(import.meta.env.VITE_SHRINKLY_SUBDOMAIN_URL + "/" + shortUrl)
      .then(() => {
        toast.success("Copied Successfully");
      });
  };

  const analyticsHandler = (e) => {
    const shortUrl = e.target.getAttribute("data-id");
    setShortUrl(shortUrl);
  };

  return (
    <>
      {" "}
      <div
        style={{ width: "90%" }}
        className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Short URL</th>
                <th className="px-4 py-3 font-semibold">Original URL</th>
                <th className="px-4 py-3 font-semibold"> Total Clicks</th>
                <th className="px-4 py-3 font-semibold">Created Date</th>
                <th className="px-4 py-3 font-semibold"> </th>
                <th className="px-4 py-3 font-semibold"> </th>
              </tr>
            </thead>

            <tbody
              className="bg-white divide-y divide-gray-100"
              style={{ minHeight: "300px" }}
            >
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-indigo-50 transition">
                    <td className="px-4 py-3 text-blue-600 font-medium">
                      <div className="flex items-center">
                        <span className="mr-2">{item.shortUrl}</span>
                        <a target="_blank" href={import.meta.env.VITE_SHRINKLY_SUBDOMAIN_URL + '/' + item.shortUrl}><FaExternalLinkAlt /></a>
                      </div>
                    </td>
                    <td className="px-4 py-3 truncate max-w-xs">
                      {item.originalUrl}
                    </td>
                    <td className="px-4 py-3 text-center text-green-600 font-medium">
                      {item.clickCount}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(item.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <button
                        style={{ cursor: "pointer" }}
                        data-id={item.shortUrl}
                        onClick={copyUrlHandler}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-100 active:scale-95 transition"
                      >
                        <MdContentCopy className="text-indigo-500 text-base" />
                        Copy
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <button
                        data-id={item.shortUrl}
                        className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 transition"
                        onClick={analyticsHandler}
                        disabled={item.clickCount === 0}
                        style={{
                          cursor: "pointer",
                          background: item.clickCount == 0 ? "red" : "",
                        }}
                      >
                        <MdAnalytics className="text-blue-500 text-base" />
                        Analytics
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 py-16 text-base"
                  >
                    No short links available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              Previous
            </button>

            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {shortUrl && (
        <AnalyticsModal
          shortUrl={shortUrl}
          setShortUrl={setShortUrl}
        ></AnalyticsModal>
      )}
    </>
  );
};

export default ShortenUrlTable;
