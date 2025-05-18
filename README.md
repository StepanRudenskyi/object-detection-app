# Object Detection Frontend Application

This is a simple React application designed to interact with an object detection backend. It allows users to submit an image URI and a selected model to perform object detection and display the results.

## Prerequisites

Before you can run this application, you need to have a few things installed on your computer:

1.  **Node.js and npm:** Node.js is a JavaScript runtime environment, and npm (Node Package Manager) comes bundled with it. We will use npm to install the project's dependencies and run the application.

    - **How to Install Node.js and npm:**
      - Go to the official Node.js website: [https://nodejs.org/](https://nodejs.org/)
      - Download the recommended LTS (Long-Term Support) version for your operating system.
      - Run the installer and follow the prompts.
      - To verify the installation, open your terminal or command prompt and run:
        ```bash
        node -v
        npm -v
        ```
        You should see the installed versions printed.

2.  **A Code Editor:** You'll need a code editor to view and potentially modify the code. Popular free options include VS Code, Atom, or Sublime Text.

## Getting Started

Follow these steps to get the application up and running on your local machine:

1.  **Clone the Repository (if using Git):**
    Open your terminal or command prompt and navigate to the directory where you want to save the project. Then run:

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

    Replace `<repository_url>` with the actual URL of your Git repository and `<repository_name>` with the name of the project folder.

2.  **Download the Code (if not using Git):**
    If the code is provided as a zip file or similar, download it and extract the contents to a folder on your computer. Open your terminal or command prompt and navigate into this folder.

3.  **Install Dependencies:**
    Once you are in the project folder in your terminal, run either npm or yarn to install the required libraries:

    ```bash
    npm install
    ```

    This will read the `package.json` file and download all the necessary packages.

4.  **Run the Application:**
    After the dependencies are installed, you can start the development server:

    ```bash
    npm start
    ```

    This will compile the React code and open the application in your web browser, usually at `http://localhost:3000/`. The development server will automatically reload the page if you make any changes to the code.

## Understanding the MOCK Flag (`USE_MOCK_API`)

The application is configured to work with either a real backend API or a mock API for development and testing purposes. This is controlled by the `USE_MOCK_API` flag in the [`src/services/apiService.js`](src/services/apiService.js) file.

```javascript
// Environment flag to toggle between mock and real API
const USE_MOCK_API = true; // Set to true to use mock data, false for real API
```
