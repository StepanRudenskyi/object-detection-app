import axios from "axios";

// Environment flag to toggle between mock and real API
const USE_MOCK_API = true;

const MOCK_MODELS = {
  models: [
    {
      name: "yolov5",
      description: "Fast and accurate object detection model",
    },
    {
      name: "faster-rcnn",
      description: "High accuracy object detection with region proposals",
    },
    {
      name: "ssd-mobilenet",
      description: "Lightweight model optimized for mobile devices",
    },
  ],
};

const MOCK_DETECTION_RESULTS = {
  results: [
    {
      image_uri:
        "https://media.istockphoto.com/id/2198220933/pl/zdj%C4%99cie/best-friends.jpg?s=1024x1024&w=is&k=20&c=9QxYFL5j9LDq8eXq7nlVABotfRbF2D0aIsUthaJpMeQ=",
      detections: [
        {
          xmin: 34,
          ymin: 60,
          xmax: 120,
          ymax: 200,
          class: "object1",
          confidence: 0.98,
        },
        {
          xmin: 150,
          ymin: 80,
          xmax: 230,
          ymax: 170,
          class: "object2",
          confidence: 0.95,
        },
        {
          xmin: 250,
          ymin: 120,
          xmax: 350,
          ymax: 220,
          class: "object3",
          confidence: 0.87,
        },
      ],
    },
  ],
};

/**
 * API service for object detection
 */
const apiService = {
  /**
   * Get available models for object detection
   */
  getModels: async () => {
    if (USE_MOCK_API) {
      // Return mock data immediately, no delay
      return MOCK_MODELS;
    }
    // Real API call
    const response = await axios.get("/models");
    return response.data;
  },

  /**
   * Submit detection request
   * @param {string} model - The selected model name
   * @param {string} imageUri - The image URI to analyze
   */
  detectObjects: async (model, imageUri) => {
    if (USE_MOCK_API) {
      // Create a copy of mock results and update the image URI
      const results = JSON.parse(JSON.stringify(MOCK_DETECTION_RESULTS));

      // Update the image URI in the response to match what was submitted
      if (results.results && results.results.length > 0) {
        results.results[0].image_uri = imageUri;
      }

      // Return mock data immediately, no delay
      return results;
    }

    // Real API call
    const response = await axios.post("/detect", {
      model: model,
      image_uri: imageUri,
    });

    return response.data;
  },
};

export default apiService;
