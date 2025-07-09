const BlockedInfo = () => (
  <div className="max-w-md mx-auto mt-16 bg-white border border-red-200 shadow-lg rounded-xl p-8 flex flex-col items-center">
    <div className="bg-red-100 rounded-full p-3 mb-4">
      <svg
        className="w-10 h-10 text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0ZM12 17h.01"
        />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-red-700 mb-2 text-center">
      Account Blocked
    </h2>
    <p className="text-gray-700 text-center mb-4">
      Your account has been{" "}
      <span className="font-semibold text-red-600">blocked by the admin</span>.
      <br />
      You cannot access dashboard features at this time.
    </p>
    <div className="text-sm text-gray-500 text-center">
      If you believe this is a mistake, please{" "}
      <a href="/contact" className="text-blue-600 underline">
        contact support
      </a>{" "}
      for assistance.
    </div>
  </div>
);

export default BlockedInfo;
