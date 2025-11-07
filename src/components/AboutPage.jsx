import React from "react";
import { FaLink, FaChartPie, FaShieldAlt, FaBolt } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        About Shrinkly
      </h1>
      <p className="text-gray-600 mb-12 leading-relaxed max-w-3xl">
        Shrinkly is your go-to platform for simplifying long URLs, empowering
        individuals and businesses to create, manage, and track shortened links
        effortlessly. With analytics, real-time tracking, and enterprise-level
        security, Shrinkly helps you grow smarter and share faster.
      </p>

      {/* Features Section */}
      <div className="space-y-10">
        {/* Simple Shortening */}
        <div className="flex items-start space-x-4 hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
          <div className="text-blue-500 text-3xl">
            <FaLink />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Quick & Simple Shortening</h3>
            <p className="text-gray-600">
              Turn any long, cluttered link into a sleek, shareable Shrinkly URL
              in seconds. Our minimal interface keeps you focused and efficient.
            </p>
          </div>
        </div>

        {/* Analytics */}
        <div className="flex items-start space-x-4 hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
          <div className="text-green-500 text-3xl">
            <FaChartPie />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Smart Link Analytics</h3>
            <p className="text-gray-600">
              Track your performance with detailed analytics — including click
              rates, geographic locations, and referral sources — to optimize your
              audience engagement.
            </p>
          </div>
        </div>

        {/* Security */}
        <div className="flex items-start space-x-4 hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
          <div className="text-purple-500 text-3xl">
            <FaShieldAlt />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Enterprise-Grade Security</h3>
            <p className="text-gray-600">
              Every Shrinkly link is encrypted and protected with advanced
              security protocols, keeping your data and your users’ trust intact.
            </p>
          </div>
        </div>

        {/* Speed */}
        <div className="flex items-start space-x-4 hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
          <div className="text-red-500 text-3xl">
            <FaBolt />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Fast. Reliable. Always On.</h3>
            <p className="text-gray-600">
              Powered by a globally distributed network, Shrinkly ensures lightning-fast
              redirects and 99.99% uptime — your links are always available, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
