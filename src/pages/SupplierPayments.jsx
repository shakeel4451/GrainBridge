import React from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierDashboard.css"; // Reusing dashboard styles for consistency
import {
  FaFileInvoiceDollar,
  FaDownload,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const SupplierPayments = () => {
  const payments = [
    {
      id: "PAY-8821",
      date: "2025-10-25",
      batch: "PBK-1020-004",
      weight: "3,400 kg",
      amount: 85000,
      status: "Paid",
    },
    {
      id: "PAY-8819",
      date: "2025-10-10",
      batch: "PBK-1010-003",
      weight: "2,500 kg",
      amount: 62500,
      status: "Paid",
    },
    {
      id: "PAY-8815",
      date: "2025-09-28",
      batch: "PBK-0925-001",
      weight: "5,000 kg",
      amount: 125000,
      status: "Processing",
    },
  ];

  return (
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <h1 className="page-title">
          <FaFileInvoiceDollar /> Payment History
        </h1>

        <div className="card">
          <table className="supplier-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date</th>
                <th>Batch Ref</th>
                <th>Total Weight</th>
                <th>Amount (PKR)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay.id}>
                  <td>{pay.id}</td>
                  <td>{pay.date}</td>
                  <td>{pay.batch}</td>
                  <td>{pay.weight}</td>
                  <td style={{ fontWeight: "bold", color: "#3e5235" }}>
                    Rs. {pay.amount.toLocaleString()}
                  </td>
                  <td>
                    {pay.status === "Paid" ? (
                      <span className="status delivered">
                        <FaCheckCircle /> Paid
                      </span>
                    ) : (
                      <span className="status processing">
                        <FaClock /> Processing
                      </span>
                    )}
                  </td>
                  <td>
                    <button className="action-btn">
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
