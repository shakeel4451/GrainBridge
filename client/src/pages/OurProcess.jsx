import React from "react";
import "./OurProcess.css";
import {
  FaSeedling,
  FaWater,
  FaIndustry,
  FaMicroscope,
  FaBoxOpen,
  FaGlobe,
} from "react-icons/fa";

const OurProcess = () => {
  const steps = [
    {
      icon: <FaSeedling />,
      title: "Ethical Sourcing",
      desc: "We partner with local farmers in the heart of Punjab, selecting only the finest long-grain paddy.",
    },
    {
      icon: <FaWater />,
      title: "Hygienic Cleaning",
      desc: "Multi-stage cleaning removes all impurities while maintaining the grain's natural moisture balance.",
    },
    {
      icon: <FaIndustry />,
      title: "Precision Milling",
      desc: "Our high-tech Japanese machinery de-husks and polishes rice without breaking the fragile grains.",
    },
    {
      icon: <FaMicroscope />,
      title: "AI Quality Check",
      desc: "Every batch is scanned by AI vision systems to ensure 99% purity and uniform length.",
    },
    {
      icon: <FaBoxOpen />,
      title: "Eco-Packaging",
      desc: "Rice is packed in moisture-resistant, food-grade materials to preserve aroma for months.",
    },
    {
      icon: <FaGlobe />,
      title: "Global Distribution",
      desc: "Our logistics network ensures fresh rice reaches your kitchen, whether you are local or abroad.",
    },
  ];

  return (
    <div className="process-page">
      <header className="process-hero">
        <h1>Our Farm-to-Table Journey</h1>
        <p>Advanced technology meets traditional agricultural expertise.</p>
      </header>

      <section className="process-content">
        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-card">
              <div className="process-index">{index + 1}</div>
              <div className="process-icon-box">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurProcess;
