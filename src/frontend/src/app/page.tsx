"use client";

import { useState } from "react";

export default function Home() {
  // Kita gunakan tipe 'any' biar TypeScript tidak rewel dulu
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch ke API Backend
      const res = await fetch("http://api.local.test/api/data");
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Frontend Next.js (Docker)</h1>
      <button 
        onClick={fetchData}
        style={{ padding: "10px", cursor: "pointer", background: "blue", color: "white" }}
      >
        {loading ? "Loading..." : "Ambil Data Backend"}
      </button>

      {data && (
        <pre style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}