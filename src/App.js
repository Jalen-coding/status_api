import "./App.css";
import axios from "axios";
import { useState } from "react";

function CardPopup({ cardData, isOpen, onClose }) {
  if (!isOpen) return null;
  const textcolor = cardData.status === "operational" ? "green": "red"
  return (
    <div className="overlay">
      <div className="card">
        <button onClick={onClose}>X</button>
        <img src={cardData.logo_url} alt="Logo of service searched" />
        <h2>{cardData.name}</h2>
        <p className="textstyle">
          category: {cardData.category}<br/>
          status: <span style={{color: textcolor}}>{cardData.status}</span>
        </p>
      </div>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState(null);

  const openPopup = (card) => {
    setIsOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://isitdownstatus.com/api/v1/status/${website.toLowerCase()}`,
      );
      setStatus(response.data.data);
      openPopup();
      setWebsite("");
    } catch (err) {
      setError("Error fetching data:", err);
      alert(error);
    }
  };

  return (
    <div className="info">
      <input
        className="inputbar"
        type="text"
        placeholder="Search a service or enter a website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <button type="submit" className="btn" onClick={fetchData}>
        <strong>Search</strong>
      </button>
      {status ? (
        <CardPopup
          cardData={status}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default App;

// name, status, logo_url, category,
