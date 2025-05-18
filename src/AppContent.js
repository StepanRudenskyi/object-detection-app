import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DetectionForm from "./components/DetectionForm";
import ResultsView from "./components/ResultsView";
import ResultsTable from "./components/ResultsTable";
import apiService from "./services/apiService";
import Header from "./Header";

export default function AppContent() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getModels();
      setModels(data.models);
      setError(null);
    } catch (err) {
      setError("Failed to fetch models. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetectionSubmit = async (modelName, imageUri) => {
    setIsLoading(true);
    setError(null);
    setImageUri(imageUri);
    setSelectedModel(modelName);

    try {
      const data = await apiService.detectObjects(modelName, imageUri);
      if (data && data.results) {
        setDetectionResults(data.results);
        navigate("/results");
      } else {
        throw new Error("Invalid response format");
      }
    } catch {
      setError("Failed to process detection. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto p-4 mt-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <DetectionForm
                models={models}
                onSubmit={handleDetectionSubmit}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/results"
            element={
              <ResultsView results={detectionResults} imageUri={imageUri} />
            }
          />
          <Route
            path="/results-data"
            element={
              <ResultsTable
                modelName={selectedModel}
                results={detectionResults}
                imageUri={imageUri}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
