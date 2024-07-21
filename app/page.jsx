"use client";

import React, { useState } from "react";

const Hero = () => {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("text");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        inputType === "text" ? "/api/detect-text" : "/api/detect-url";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError("API request failed");
      setResult(null);
    }
  };

  return (
    <div className="relative flex flex-col gap-4 items-center justify-center px-4">
      <div className="flex justify-center items-center">
        <h1 className="text-5xl text-center my-7">News Detection App</h1>
      </div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2">
          <input
            type={inputType === "url" ? "url" : "text"}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={`Enter ${inputType} here...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Detect
          </button>
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="inputType"
              value="text"
              checked={inputType === "text"}
              onChange={(e) => setInputType(e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">Text</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="inputType"
              value="url"
              checked={inputType === "url"}
              onChange={(e) => setInputType(e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">URL</span>
          </label>
        </div>
      </form>

      {result && (
        <div
          className={`mt-4 p-4 ${
            result.label === "Fake" ? "bg-red-100" : "bg-green-100"
          } rounded-md`}
        >
          <h2 className="text-xl font-semibold">Result</h2>
          <p>
            Label: <strong>{result.label}</strong>
          </p>
          <p>Authenticity Score: {result.score}</p>
          <p>Details: {result.details}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Hero;
