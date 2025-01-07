// src/CustomApiComponent.jsx

import React, { useState } from 'react';

const CustomApiComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const res = await fetch(
        "http://localhost:7860/api/v1/run/d832a360-889d-472e-8af0-4d8449aee075?stream=false",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer <TOKEN>",
            "Content-Type": "application/json",
            "x-api-key": "<your api key>"
          },
          body: JSON.stringify({
            input_value: inputValue,
            output_type: "text",
            input_type: "text",
            tweaks: {
              "AstraDB-cJ2Ig": {},
              "MistalAIEmbeddings-5T180": {},
              "CustomComponent-6xoV4": {},
              "TextInput-LCzTH": {}
            }
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Custom API Integration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your input"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CustomApiComponent;
