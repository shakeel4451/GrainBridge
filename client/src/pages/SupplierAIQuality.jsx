import React, { useState, useEffect } from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierAIQuality.css";
import {
  FaCamera,
  FaUpload,
  FaTimesCircle,
  FaCheckCircle,
  FaChartPie,
  FaSeedling,
  FaExclamationTriangle,
  FaMicroscope,
  FaRobot,
} from "react-icons/fa";

const SupplierAIQuality = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState("");

  // Clean up preview URL to prevent memory leaks
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setAnalysisResult(null);
    } else {
      alert("Please upload a high-quality image of the grain sample.");
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;

    setLoading(true);
    setAnalysisResult(null);

    // Simulated AI Processing Steps
    const steps = [
      "Normalizing Image...",
      "Detecting Grain Boundaries...",
      "Analyzing Color Spectrums...",
      "Calculating Average Length...",
      "Finalizing Quality Grade...",
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setProcessingStep(step);
      }, (index + 1) * 600);
    });

    // Final result calculation
    setTimeout(() => {
      setLoading(false);
      const isGrain =
        selectedFile.name.toLowerCase().includes("grain") ||
        selectedFile.name.toLowerCase().includes("rice");

      if (isGrain) {
        setAnalysisResult({
          type: "Grain Quality Report",
          variety: "Super Kernel Basmati (Predicted)",
          score: 9.4,
          metrics: {
            purity: "99.2%",
            moisture: "12.5%",
            broken: "1.2%",
            chalky: "0.8%",
          },
          recommendation:
            "Premium Export Grade. Minimum price per maund: Rs. 8,500.",
          status: "success",
          color: "#3e5235",
        });
      } else {
        setAnalysisResult({
          type: "Crop Health Diagnostic",
          disease: "Bacterial Leaf Blight",
          severity: "Low (Early Stage)",
          score: 6.2,
          recommendation:
            "Immediate application of Copper-based bactericide recommended. Isolate affected patch.",
          status: "warning",
          color: "#8c734b",
        });
      }
    }, 4000);
  };

  return (
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <h1 className="page-title">
          <FaRobot /> AI Grain & Crop Analyzer
        </h1>
        <p className="subtitle">
          Predictive quality grading using computer vision technology.
        </p>

        <div className="ai-container">
          {/* LEFT: UPLOAD SECTION */}
          <div className="card upload-section">
            <div className="upload-header">
              <h3>
                <FaCamera /> Sample Input
              </h3>
              {selectedFile && (
                <button
                  className="clear-link"
                  onClick={() => setSelectedFile(null)}
                >
                  <FaTimesCircle /> Reset
                </button>
              )}
            </div>

            <div className={`drop-zone ${preview ? "has-preview" : ""}`}>
              {preview ? (
                <img src={preview} alt="Sample" className="preview-img" />
              ) : (
                <label htmlFor="file-upload" className="upload-placeholder">
                  <FaUpload className="up-icon" />
                  <p>Drop sample image here or click to browse</p>
                  <span>Supported: JPG, PNG (Min 2MB for accuracy)</span>
                </label>
              )}
              <input
                type="file"
                id="file-upload"
                hidden
                onChange={handleFileChange}
              />
            </div>

            <button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
            >
              {loading ? (
                <>
                  <FaMicroscope className="spin" /> Processing...
                </>
              ) : (
                "Start AI Inspection"
              )}
            </button>
          </div>

          {/* RIGHT: RESULTS SECTION */}
          <div className="card results-section">
            <h3>
              <FaChartPie /> Analysis Dashboard
            </h3>

            {!analysisResult && !loading && (
              <div className="empty-results">
                <FaMicroscope className="ghost-icon" />
                <p>Awaiting high-resolution sample for processing...</p>
              </div>
            )}

            {loading && (
              <div className="processing-state">
                <div className="loader-bar"></div>
                <p className="step-text">{processingStep}</p>
                <span className="ai-notice">
                  Neural networks are analyzing pixel data...
                </span>
              </div>
            )}

            {analysisResult && (
              <div className="result-fade-in">
                <div
                  className="result-header-box"
                  style={{ backgroundColor: analysisResult.color }}
                >
                  <h4>{analysisResult.type}</h4>
                  <div className="grade-circle">{analysisResult.score}</div>
                </div>

                <div className="metrics-grid">
                  {analysisResult.metrics ? (
                    Object.entries(analysisResult.metrics).map(
                      ([key, value]) => (
                        <div className="metric-item" key={key}>
                          <span className="label">{key.toUpperCase()}</span>
                          <span className="val">{value}</span>
                        </div>
                      )
                    )
                  ) : (
                    <div className="metric-item full">
                      <span className="label">DIAGNOSIS</span>
                      <span className="val">{analysisResult.disease}</span>
                    </div>
                  )}
                </div>

                <div className="recommendation-box">
                  <h5>
                    <FaSeedling /> Expert Recommendation:
                  </h5>
                  <p>{analysisResult.recommendation}</p>
                </div>

                <button className="download-report">
                  Download Lab Certificate (PDF)
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierAIQuality;
