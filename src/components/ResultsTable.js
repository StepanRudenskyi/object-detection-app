import React from "react";
import { Link } from "react-router-dom";
import "../styles/Results.css";

const ResultsTable = ({ modelName, results, imageUri }) => {
  // Early return for missing results
  if (
    !results ||
    results.length === 0 ||
    !results[0] ||
    !results[0].detections
  ) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          No Detection Results Available
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          Please submit an image for object detection first.
        </p>
        <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>
          Go to Detection Form
        </Link>
      </div>
    );
  }
  const detections = results[0].detections;

  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-title">Detection Results</h2>
      </div>
      <div className="results-content">
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <span style={{ fontWeight: "500" }}>Model:</span>{" "}
              {modelName || "Unknown model"}
            </div>
            <div>
              <span style={{ fontWeight: "500" }}>Objects Detected:</span>{" "}
              {detections.length}
            </div>
          </div>
        </div>

        <div className="table-container">
          <h3 className="table-title">Complete Detection Data</h3>

          {detections && detections.length > 0 ? (
            <div className="table-scroll-container">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Confidence</th>
                    <th>X Min</th>
                    <th>Y Min</th>
                    <th>X Max</th>
                    <th>Y Max</th>
                    <th>Width</th>
                    <th>Height</th>
                  </tr>
                </thead>
                <tbody>
                  {detections.map((detection, idx) => {
                    const width = detection.xmax - detection.xmin;
                    const height = detection.ymax - detection.ymin;

                    return (
                      <tr key={idx}>
                        <td>
                          <div className="class-item">
                            <div className="class-color-dot"></div>
                            {detection.class}
                          </div>
                        </td>
                        <td>{(detection.confidence * 100).toFixed(2)}%</td>
                        <td>{detection.xmin}</td>
                        <td>{detection.ymin}</td>
                        <td>{detection.xmax}</td>
                        <td>{detection.ymax}</td>
                        <td>{width}</td>
                        <td>{height}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-objects-message">
              No objects detected in this image.
            </p>
          )}

          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
            }}
          >
            <Link to="/results" className="change-view-link">
              Visualization View
            </Link>

            <Link to="/" className="detect-new-image-link">
              Detect New Image
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
