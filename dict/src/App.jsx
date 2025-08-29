import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState(null);
  const [error, setError] = useState("");

  const searchWord = async () => {
    if (!word) return;
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setMeaning(res.data[0]);
      setError("");
    } catch (err) {
      setMeaning(null);
      setError("❌ Word not found. Try another!");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">📖 Dictionary App</h1>
      
      <div className="search-box">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
        />
        <button onClick={searchWord}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {meaning && (
        <div className="result-card">
          <h2>{meaning.word}</h2>
          {meaning.meanings.map((m, i) => (
            <div key={i} className="meaning">
              <p className="part">{m.partOfSpeech}</p>
              <ul>
                {m.definitions.map((d, j) => (
                  <li key={j}>{d.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
