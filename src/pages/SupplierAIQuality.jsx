import React, { useState } from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierDashboard.css";
import {
  FaCamera,
  FaUpload,
  FaTimesCircle,
  FaCheckCircle,
  FaChartPie,
  FaSeedling,
  FaExclamationTriangle,
} from "react-icons/fa";

const SupplierAIQuality = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setAnalysisResult(null); // Clear previous result
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    // Simulate API call to the AI model (3-second simulation)
    setTimeout(() => {
      setLoading(false);

      // Simulated AI response logic
      const isGrain = selectedFile.name.toLowerCase().includes("grain");

      if (isGrain) {
        setAnalysisResult({
          type: "Grain Analysis (Mill Readiness)",
          score: "9.2 / 10",
          purity: "98.5%",
          broken: "1.5%",
          recommendation: "Export Grade A confirmed. Ready for milling.",
          color: "#3e5235", // Green for success
        });
      } else {
        setAnalysisResult({
          type: "Crop Health Analysis (Paddy)",
          score: "6.5 / 10",
          disease: "Possible Brown Spot",
          severity: "Moderate (5% affected)",
          recommendation:
            "Apply recommended fungicide within 72 hours. Consult extension services.",
          color: "#f57c00", // Orange for warning
        });
      }
    }, 3000);
  };

  return (
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <h1 className="page-title">
          <FaChartPie /> AI Quality & Health Scanner
        </h1>
        <p style={{ marginBottom: "20px", color: "#666" }}>
          Upload a clear photo of your rice sample (grain) or a crop leaf
          (health) for instant, predictive analysis.
        </p>

        <div
          className="dashboard-grid"
          style={{ gridTemplateColumns: "1fr 1.5fr" }}
        >
          {/* 1. Upload Widget */}
          <div className="card upload-card">
            <h3>
              <FaCamera /> Upload Image
            </h3>
            <input
              type="file"
              id="file-upload"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />

            <label htmlFor="file-upload" className="upload-label">
              <FaUpload /> Click here to select a Photo
            </label>

            {selectedFile && (
              <div className="file-preview">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <p>{selectedFile.name}</p>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="clear-btn"
                >
                  <FaTimesCircle /> Clear
                </button>
              </div>
            )}

            <button
              className="confirm-btn"
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              style={{ marginTop: "20px", width: "100%" }}
            >
              {loading ? "Analyzing..." : "Run AI Analysis"}
            </button>
          </div>

          {/* 2. Analysis Results */}
          <div className="card results-card">
            <h3>
              <FaChartPie /> Analysis Results
            </h3>

            {analysisResult && (
              <div
                className="result-box"
                style={{
                  borderLeft: `5px solid ${analysisResult.color}`,
                  padding: "15px",
                }}
              >
                <h4
                  style={{
                    color: analysisResult.color,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {analysisResult.color === "#3e5235" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaExclamationTriangle />
                  )}
                  {analysisResult.type}
                </h4>

                {analysisResult.broken && (
                  <p>
                    <strong>Purity:</strong> {analysisResult.purity} |{" "}
                    <strong>Broken Grain:</strong> {analysisResult.broken}
                  </p>
                )}
                {analysisResult.disease && (
                  <p>
                    <strong>Disease Detected:</strong> {analysisResult.disease}{" "}
                    | <strong>Severity:</strong> {analysisResult.severity}
                  </p>
                )}

                <p
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    background: "#f4f4f4",
                    borderRadius: "5px",
                  }}
                >
                  <FaSeedling style={{ marginRight: "8px" }} />
                  **Recommendation:** {analysisResult.recommendation}
                </p>
              </div>
            )}

            {!analysisResult && !loading && (
              <p
                style={{ color: "#999", textAlign: "center", padding: "50px" }}
              >
                Upload an image to start the process.
              </p>
            )}
            {loading && (
              <p
                style={{
                  textAlign: "center",
                  padding: "50px",
                  color: "#1976d2",
                }}
              >
                Running complex AI algorithms...
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierAIQuality;
