import React, { useContext } from 'react';
import Card from './Card';

const LandingPage = () => {

     const handleClick = (e) => {
        const dataId = e.target.getAttribute('data-id')
        if(dataId === 'create-short-link') {
            console.log(1);
        } else {
            console.log(2);
        }
     }

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 text-gray-800">
      <section className="flex flex-col md:flex-row items-center justify-center md:justify-between px-8 md:px-16 py-20 bg-white">
        {/* Left content */}
        <div className="md:basis-3/5 max-w-2xl md:mr-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-indigo-600">Shrinkly</span> — The Smarter,
            Faster, & Secure Way to{" "}
            <span className="text-indigo-500">Shorten URLs</span>.
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Shrinkly makes link sharing effortless — create short, trackable
            URLs in seconds. Simplify your workflow, analyze link performance,
            and share with confidence using Shrinkly’s modern, reliable
            platform.
          </p>

          <div className="flex gap-4">
            <button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all"
              onClick={handleClick}
            >
              Create Short Link
            </button>
            <button
              className="px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-xl transition-all"
              onClick={handleClick}
            >
              Manage Links
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="relative mt-12 md:mt-0 md:-ml-10">
          <img
            src="src\assets\Shrinkly3.png"
            alt="Shrinkly 3D Logo"
            className="sm:w-[520px] w-[440px] object-contain drop-shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose <span className="text-indigo-600">Shrinkly?</span>
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <Card
            borderclass="border-indigo-500"
            title="⚡ Instant Shortening"
            description="Create clean, memorable short URLs in seconds using our lightning-fast API and intuitive dashboard."
          />
          <Card
            borderclass="border-pink-500"
            title="📊 Real-Time Analytics"
            description="Track clicks, locations, and engagement trends instantly to optimize your content performance."
          />
          <Card
            borderclass="border-green-500"
            title="🔒 Secure & Reliable"
            description="Enjoy industry-grade encryption and 99.99% uptime to ensure your links are always protected and accessible."
          />
          <Card
            borderclass="border-yellow-500"
            title="🚀 Custom Domains"
            description="Boost your brand with personalized short links using your own custom domain name."
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
