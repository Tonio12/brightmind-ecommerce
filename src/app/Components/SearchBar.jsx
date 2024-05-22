"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      axios.get("/api/search?query=" + query).then((response) => {
        console.log(response.data);
        setSuggestions(response.data);
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, [query]);

  const getProduct = (e) => {
    e.preventDefault();
    router.push("/product/" + id);
  };

  return (
    <div className="flex justify-center">
      <header className="bg-gray-100 dark:bg-gray-800 py-4 w-screen">
        <div className="container mx-0 px-4 md:px-6">
          <div className="flex items-center justify-center">
            <form className="w-full max-w-lg flex items-center">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
                <Input
                  className="w-full bg-white dark:bg-gray-950 rounded-l-md pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-300"
                  placeholder="Search products..."
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button
                className="rounded-r-md bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 px-6 py-2.5 font-medium"
                onClick={(e) => {
                  getProduct(e);
                }}
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </header>
      {suggestions.length > 0 && (
        <ul className="absolute z-50 mt-20 flex flex-col justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md w-52 shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => {
                setId(suggestion._id);
                setQuery(suggestion.title);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-900"
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
