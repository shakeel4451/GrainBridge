import React, { useState } from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierPayments.css";
import {
  FaFileInvoiceDollar,
  FaDownload,
  FaCheckCircle,
  FaClock,
  FaWallet,
  FaHourglassHalf,
  FaHistory,
} from "react-icons/fa";

const SupplierPayments = () => {
  const [filter, setFilter] = useState("All");

  // Mock data - In the future, this will be: const [payments, setPayments] = useState([]);
  const payments = [
    {
      id: "PAY-8821",
      date: "2026-01-15",
      batch: "PBK-1020-004",
      weight: "3,400 kg",
      amount: 85000,
      status: "Paid",
    },
    {
      id: "PAY-8819",
      date: "2026-01-10",
      batch: "PBK-1010-003",
      weight: "2,500 kg",
      amount: 62500,
      status: "Paid",
    },
    {
      id: "PAY-8815",
      date: "2025-12-28",
      batch: "PBK-0925-001",
      weight: "5,000 kg",
      amount: 125000,
      status: "Processing",
    },
    {
      id: "PAY-8812",
      date: "2025-12-15",
      batch: "SKB-1215-009",
      weight: "1,200 kg",
      amount: 48000,
      status: "Paid",
    },
  ];

  const filteredPayments =
    filter === "All" ? payments : payments.filter((p) => p.status === filter);

  // Calculate Totals
  const totalEarned = payments
    .filter((p) => p.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "Processing")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <h1 className="page-title">
          <FaFileInvoiceDollar /> Financial Ledger
        </h1>

        {/* 1. FINANCIAL STATS CARDS */}
        <div className="dashboard-grid payment-stats">
          <div className="card stat-card earned">
            <div className="stat-icon">
              <FaWallet />
            </div>
            <div className="stat-info">
              <p>Total Paid Out</p>
              <h2>Rs. {totalEarned.toLocaleString()}</h2>
            </div>
          </div>
          <div className="card stat-card pending">
            <div className="stat-icon">
              <FaHourglassHalf />
            </div>
            <div className="stat-info">
              <p>Pending Clearance</p>
              <h2>Rs. {totalPending.toLocaleString()}</h2>
            </div>
          </div>
        </div>

        {/* 2. FILTER & TABLE SECTION */}
        <div className="card payment-table-card">
          <div className="table-header">
            <h3>
              <FaHistory /> Transaction History
            </h3>
            <div className="filter-group">
              {["All", "Paid", "Processing"].map((cat) => (
                <button
                  key={cat}
                  className={filter === cat ? "active" : ""}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <table className="admin-table supplier-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Batch Reference</th>
                <th>Net Weight</th>
                <th>Total (PKR)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((pay) => (
                <tr key={pay.id}>
                  <td>
                    <strong>{pay.id}</strong>
                  </td>
                  <td>{pay.date}</td>
                  <td className="batch-ref">{pay.batch}</td>
                  <td>{pay.weight}</td>
                  <td className="amount-cell">
                    Rs. {pay.amount.toLocaleString()}
                  </td>
                  <td>
                    <span className={`status-pill ${pay.status.toLowerCase()}`}>
                      {pay.status === "Paid" ? <FaCheckCircle /> : <FaClock />}{" "}
                      {pay.status}
                    </span>
                  </td>
                  <td>
                    <button className="download-btn">
                      <FaDownload /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SupplierPayments;
