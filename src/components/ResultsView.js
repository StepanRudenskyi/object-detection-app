import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Results.css";

const ORIGINAL_IMAGE_WIDTH = 640;
const ORIGINAL_IMAGE_HEIGHT = 480;

const ResultsView = ({ results, imageUri }) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef(null);

  const imageUrl =
    results && results.length > 0 && results[0].image_uri
      ? results[0].image_uri
      : imageUri;

  useEffect(() => {
    if (!imageUrl) return;

    const updateDimensions = () => {
      if (imageRef.current && imageLoaded) {
        setImageDimensions({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    const checkInitialDimensions = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(checkInitialDimensions);
    };
  }, [imageUrl, imageLoaded]);

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

  const currentResult = results[0];
  const detections = currentResult.detections;

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight,
      });
      setImageLoaded(true);
      setImageError(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    setImageDimensions({ width: 0, height: 0 });
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-title">Detection Results</h2>
      </div>
      <div className="results-content">
        <div className="results-grid">
          {/* Image with bounding boxes */}
          <div className="image-bounding-box-container">
            <div className="image-container">
              {!imageLoaded && !imageError && (
                <div className="image-placeholder-text">Loading image...</div>
              )}
              {imageError && (
                <div className="image-error-text">Failed to load image.</div>
              )}
              {!imageError && (
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Analyzed"
                  className="analyzed-image"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: imageLoaded ? "block" : "none" }}
                />
              )}
              {imageLoaded &&
                detections &&
                detections.length > 0 &&
                detections.map((detection, idx) => {
                  const {
                    xmin,
                    ymin,
                    xmax,
                    ymax,
                    class: className,
                    confidence,
                  } = detection;

                  const scaleX =
                    imageDimensions.width > 0
                      ? imageDimensions.width / ORIGINAL_IMAGE_WIDTH
                      : 0;
                  const scaleY =
                    imageDimensions.height > 0
                      ? imageDimensions.height / ORIGINAL_IMAGE_HEIGHT
                      : 0;

                  const style = {
                    left: `${xmin * scaleX}px`,
                    top: `${ymin * scaleY}px`,
                    width: `${(xmax - xmin) * scaleX}px`,
                    height: `${(ymax - ymin) * scaleY}px`,
                  };

                  return (
                    <div key={idx} style={style} className="bounding-box">
                      <div className="bounding-box-label">
                        {className} ({Math.round(confidence * 100)}%)
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Detections table */}
          <div className="table-container">
            <h3 className="table-title">Detected Objects</h3>
            {detections && detections.length > 0 ? (
              <div className="table-scroll-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Confidence</th>
                      <th>Bounding Box</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detections.map((detection, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="class-item">
                            <div className="class-color-dot"></div>
                            {detection.class}
                          </div>
                        </td>
                        <td>{(detection.confidence * 100).toFixed(2)}%</td>
                        <td className="bounding-box-coords">
                          x1y1: {detection.xmin}-{detection.ymin}, x2y2:{" "}
                          {detection.xmax}-{detection.ymax}
                        </td>
                      </tr>
                    ))}
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
              <Link to="/results-data" className="change-view-link">
                Table View
              </Link>
              <Link to="/" className="detect-new-image-link">
                Detect New Image
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
