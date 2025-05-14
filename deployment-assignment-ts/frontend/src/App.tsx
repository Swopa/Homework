// frontend/src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';

// IMPORTANT: This will be replaced with your EC2 public IP later
const BACKEND_URL: string = 'http://localhost:3001'; // For local testing

interface ApiResponse {
  data: string;
}

function App() {
  const [answer, setAnswer] = useState<string>('Loading...');

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/get-answer`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setAnswer(result.data || "Failed to load data or no data yet.");
      } catch (error) {
        console.error("Could not fetch answer:", error);
        if (error instanceof Error) {
          setAnswer(`Error fetching data: ${error.message}`);
        } else {
          setAnswer("An unknown error occurred while fetching data.");
        }
      }
    };

    fetchAnswer();
    const intervalId = setInterval(fetchAnswer, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h1>Deployment Assignment (TypeScript)</h1>
      <p>The most recent data received by the backend is:</p>
      <span id="answer">{answer}</span>
      <p style={{marginTop: "20px", fontSize: "0.8em"}}>
        To test, send a POST request to <code>{BACKEND_URL}/api/create-answer</code>
        with JSON body: <code>{`{ "data": "your new text" }`}</code>.
        Then refresh this page or wait for it to auto-update.
      </p>
    </>
  );
}

export default App;