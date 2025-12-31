"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mengambil URL dari Environment Docker
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Simulasi delay sedikit biar loading spinner kelihatan keren (opsional)
      await new Promise(resolve => setTimeout(resolve, 500));

      const res = await fetch(`${API_URL}/api/data`);
      
      if (!res.ok) {
        throw new Error(`Server Error (${res.status})`);
      }

      const jsonData = await res.json();
      setData(jsonData);
    } catch (err: any) {
      setError(err.message || "Gagal terhubung ke backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.badgeSuccess}>CI/CD: ACTIVE ✅</div>
          <h1 style={styles.title}>Docker Fullstack App</h1>
          <p style={styles.subtitle}>
            Frontend Next.js terhubung ke Backend Python
          </p>
        </div>

        {/* Info Section */}
        <div style={styles.infoBox}>
          <span style={{fontWeight: 'bold'}}>🔌 Endpoint Target:</span>
          <code style={styles.codeSnippet}>{API_URL}/api/data</code>
        </div>

        {/* Action Section */}
        <button 
          onClick={fetchData} 
          disabled={loading}
          style={loading ? styles.buttonDisabled : styles.buttonPrimary}
        >
          {loading ? (
            <span>🔄 Menghubungkan...</span>
          ) : (
            <span>🚀 Ambil Data dari Server</span>
          )}
        </button>

        {/* Result Section */}
        <div style={styles.resultContainer}>
          {error && (
            <div style={styles.errorBox}>
              <strong>❌ Error:</strong> {error}
            </div>
          )}

          {data && (
            <div style={styles.successBox}>
              <div style={styles.successHeader}>
                <span style={{marginRight: '8px'}}>🟢</span> 
                <strong>Status: 200 OK</strong>
              </div>
              <pre style={styles.jsonBlock}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}

          {!data && !loading && !error && (
            <p style={styles.placeholderText}>
              Klik tombol di atas untuk menguji koneksi antar container.
            </p>
          )}
        </div>
      </div>
      
      <p style={styles.footer}>
        Dibuat otomatis oleh CI/CD Pipeline • {new Date().getFullYear()}
      </p>
    </div>
  );
}

// --- STYLING OBJECTS (CSS-in-JS) ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // Light Gray Background
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "480px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", // Modern Soft Shadow
    padding: "32px",
    border: "1px solid #e5e7eb",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  badgeSuccess: {
    display: "inline-block",
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "12px",
    border: "1px solid #bbf7d0",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111827",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  infoBox: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "13px",
    color: "#374151",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  codeSnippet: {
    fontFamily: "monospace",
    backgroundColor: "#e5e7eb",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#000",
  },
  buttonPrimary: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#2563eb", // Royal Blue
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
    boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
  },
  buttonDisabled: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#93c5fd",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
  resultContainer: {
    marginTop: "24px",
    minHeight: "100px",
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#991b1b",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
  },
  successBox: {
    border: "1px solid #bbf7d0",
    borderRadius: "8px",
    overflow: "hidden",
  },
  successHeader: {
    backgroundColor: "#f0fdf4",
    padding: "8px 12px",
    borderBottom: "1px solid #bbf7d0",
    fontSize: "13px",
    color: "#166534",
    display: "flex",
    alignItems: "center",
  },
  jsonBlock: {
    margin: 0,
    padding: "16px",
    backgroundColor: "#1f2937", // Dark theme for code
    color: "#34d399", // Green code text
    fontSize: "13px",
    overflowX: "auto",
    fontFamily: "monospace",
  },
  placeholderText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "14px",
    marginTop: "20px",
  },
  footer: {
    marginTop: "32px",
    color: "#9ca3af",
    fontSize: "12px",
    textAlign: "center",
  },
};