import React from "react";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-6xl font-bold text-gray-900">401</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-gray-600">
          Oops! You don't have permission to view this page. Please check with
          your administrator or try logging in again.
        </p>
        <div className="mt-6">
          <a
            href="/login"
            className="inline-block rounded-lg bg-[#F1861B] px-6 py-3 text-white hover:bg-[#d27418] focus:outline-none focus:ring-4 focus:ring-[#F1861B]/50"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
