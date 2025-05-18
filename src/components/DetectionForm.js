import React, { useState } from "react";
import "../styles/DetectionForm.css";

const DetectionForm = ({ models, onSubmit, isLoading }) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [imageUri, setImageUri] = useState("");

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleImageUriChange = (e) => {
    setImageUri(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedModel) {
      alert("Please select a model");
      return;
    }

    if (!imageUri) {
      alert("Please enter an image URI");
      return;
    }

    // Pass back to parent; parent will handle success/failure and navigation
    onSubmit(selectedModel, imageUri);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Object Detection</h2>
      <form onSubmit={handleSubmit}>
        {/* Model Selection */}
        <div className="form-group">
          <label className="form-label" htmlFor="model-select">
            Select Model
          </label>
          <select
            id="model-select"
            className="form-select"
            value={selectedModel}
            onChange={handleModelChange}
            disabled={isLoading || models.length === 0}
            required
          >
            <option value="">-- Select a model --</option>
            {models.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name} – {model.description}
              </option>
            ))}
          </select>
          {models.length === 0 && !isLoading && (
            <p className="form-error">No models available</p>
          )}
        </div>

        {/* Image URI Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="image-uri">
            Image URI
          </label>
          <input
            id="image-uri"
            type="text"
            className="form-uri-input"
            value={imageUri}
            onChange={handleImageUriChange}
            placeholder="Enter image URI"
            disabled={isLoading}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="form-submit-button"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Detect Objects"}
        </button>
      </form>
    </div>
  );
};

export default DetectionForm;
