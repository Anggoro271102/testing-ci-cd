"use client"; // Wajib ada karena kita pakai useState/useEffect

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch ke Backend (Domain Lokal)
      const res = await fetch("http://api.local.test/api/data");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const jsonData = await res.json();
      setData(jsonData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#0070f3" }}>Frontend Next.js</h1>
        <p>Aplikasi ini dibangun dengan React & Next.js</p>

        <button
          onClick={fetchData}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px"
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Ambil Data API"}
        </button>

        <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "15px", borderRadius: "5px" }}>
          <strong>Hasil Response:</strong>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!data && !error && <p style={{ color: "#666" }}>Belum ada data.</p>}
          {data && (
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}