"use client";

import React, { useState } from "react";
const Hero = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `./api/classify`;
      console.log("Endpoint:", endpoint);
      setloading(true);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError("API request failed");
      setResult(null);
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center px-4"
      style={{ height: "100vh", backgroundColor: "#1F2937" }}
    >
      <div
        className="flex items-center flex-col"
        style={{ margin: "5% auto 0 auto" }}
      >
        <h1 className="text-5xl text-center my-7" style={{ color: "white" }}>
          TruthGuard - AI Powered Fake News Detection App
        </h1>

        <p style={{ fontSize: "1.5rem", color: "white" }}>
          Your ultimate tool for identifying misinformation using advanced
          artificial intelligence!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 mt-10">
        <div className="flex flex-col items-center ">
          <textarea
            className=" p-2 border border-gray-300 rounded-md"
            style={{
              width: "60%",
              backgroundColor: "#1F2937",
              color: "white",
            }}
            placeholder="Enter text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10} // Adjust the number of rows for desired size
          />

          <button
            style={{ marginTop: "10px" }}
            disabled={loading}
            type="submit"
            className=" md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {loading ? "Detecting..." : "Detect"}
          </button>
        </div>
      </form>

      {result && (
        <div
          className={`mt-4 p-4  rounded-md`}
          style={{
            width: "50vw",
            margin: "0 auto",
            backgroundColor: result.response === "Fake" ? "#fee2e2" : "#f5f5f5",
            textAlign: "center",
          }}
        >
          <h2 className="text-xl font-semibold" style={{ color: "black" }}>
            Result
          </h2>
          <p>
            <span style={{ color: "black" }}>News Status:</span>
            <strong
              className="ms-2"
              style={{
                color: result.response === "Fake" ? "red" : "green",
              }}
            >
              {result.classification}
            </strong>
          </p>
        </div>
      )}
      {error && (
        <div
          className="mt-4 p-4 bg-red-100 rounded-md"
          style={{
            width: "50vw",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p style={{ color: "black", textAlign: "center" }}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Hero;
