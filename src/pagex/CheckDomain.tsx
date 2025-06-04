import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Metadata } from "@/components/Metadata";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, CheckCircle, XCircle, Clock } from "lucide-react";

const CheckDomain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Filter blogs based on search query
  const [domainBase, setDomainBase] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkDomain = async () => {
    setLoading(true);
    if (!domainBase) {
      setResults([{ domain: "", message: "Please enter a domain base." }]);
      setLoading(false);
      return;
    }

    setResults([{ domain: "", message: "Checking..." }]);

    // Detect if user already entered an extension (e.g. example.com)
    const hasExtension = domainBase.includes(".");

    // If user entered `example.com`, split it
    const [base, inputExt] = domainBase.split(".");

    // Extensions to check
    const extensionsToCheck: string[] = hasExtension
      ? [inputExt, "com", "net", "org"] // use only the one entered
      : ["com", "net", "org"]; // default ones

    // Base name to build full domains
    const domainRoot = hasExtension ? base : domainBase;

    try {
      const checks = await Promise.all(
        extensionsToCheck.map(async (ext) => {
          const fullDomain = `${domainRoot}.${ext}`;
          try {
            const res = await fetch(`https://api.whois.vu/?q=${fullDomain}`);
            const data = await res.json();

            return {
              domain: fullDomain,
              available: data.available === "yes" ? true : false,
            };
          } catch (err) {
            return {
              domain: fullDomain,
              message: `⚠️ Failed to check ${fullDomain}`,
            };
          }
        })
      );

      setResults(checks);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setResults([{ domain: "", message: "Something went wrong." }]);
    }
  };
  useEffect(() => {
    const searchDomain = location.state?.domain;
    if (searchDomain) {
      setDomainBase(searchDomain);
    }
  }, [location.state?.domain]);

  useEffect(() => {
    if (!domainBase) return;
    const timeoutId = setTimeout(() => {
      checkDomain();
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [domainBase]);

  const checkoutDomain = (domain) => {
    navigate("/checkout", { state: { domain } });
  };
  return (
    <>
      <Metadata
        title="Domain Search - KahfWeb"
        description="Read the latest articles and guides about web hosting, domains, and website security."
      />
      <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-64px)]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Search Domain
        </h1>
        <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Secure your online identity with our premium domain registration and
          hosting services. Start building your dream website today!
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search domain name here..."
              value={domainBase}
              onChange={(e) => setDomainBase(e.target.value)}
              className="pr-10"
            />
            <div className="">
              <button
                onClick={checkDomain}
                className="w-[40px] h-[40px] inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded border border-transparent hover:bg-red-500 text-white bg-blue-700 "
              >
                <Search className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="">
          {results?.length == 0 ? (
            <div className="text-center pt-10 inline-flex justify-center items-center gap-2  w-full">
              <span>Search to check available</span>
              <Search className="h-5 w-5 text-green-500" />
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Search Results for "{domainBase}"
            </h2>
          )}
        </div>
        {loading ? (
          <h1 className="text-center text-lg">Loading....</h1>
        ) : (
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="p-6 backdrop-blur-sm bg-white/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg min-h-40"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold text-lg text-gray-800 truncate">
                    {result.domain}
                  </div>
                  {result.available ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>

                <div className="space-y-3">
                  <div
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      result?.available
                        ? "border-transparent bg-green-100 text-green-800 hover:bg-green-200"
                        : "border-transparent bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {result?.available ? "Available" : "Taken"}
                  </div>
                  {result?.available && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">$12.99/year</span>
                      <button
                        onClick={() => checkoutDomain(result.domain)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-9 rounded-md px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CheckDomain;
