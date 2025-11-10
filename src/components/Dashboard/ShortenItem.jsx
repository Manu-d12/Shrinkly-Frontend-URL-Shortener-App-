import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { FaMousePointer } from "react-icons/fa";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  return (
    <div className="w-full max-w-3xl bg-indigo-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 mb-3">
      {/* Short URL row */}
      <div className="flex items-center justify-between">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
        >
          {shortUrl}
          <FiExternalLink className="text-blue-600" />
        </a>
      </div>

      {/* Original URL */}
      <p className="text-gray-700 text-sm mt-1 truncate">{originalUrl}</p>

      {/* Click count + created date */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
          <FaMousePointer className="text-green-600" />
          <span>{clickCount} Click{clickCount !== 1 ? "s" : ""}</span>
        </div>

        {createdDate && (
          <span className="text-gray-400 text-xs">
            {new Date(createdDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ShortenItem;
