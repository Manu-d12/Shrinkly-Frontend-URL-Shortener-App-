import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-center px-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 tracking-wider">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or an unexpected error has occurred.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-200 shadow-md"
      >
        Go Home
      </button>

      <div className="mt-10 text-sm text-gray-500">
        Error Code: <span className="font-semibold">404_NOT_FOUND</span>
      </div>
    </div>
  );
}
