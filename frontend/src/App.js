import { useState } from "react";
import "./index.css";

const TOWNS = ["ANG MO KIO", "BEDOK", "BISHAN", "BUKIT BATOK", "BUKIT MERAH", "BUKIT PANJANG", "BUKIT TIMAH", "CENTRAL AREA", "CHOA CHU KANG", "CLEMENTI", "GEYLANG", "HOUGANG", "JURONG EAST", "JURONG WEST", "KALLANG/WHAMPOA", "MARINE PARADE", "PASIR RIS", "PUNGGOL", "QUEENSTOWN", "SEMBAWANG", "SENGKANG", "SERANGOON", "TAMPINES", "TOA PAYOH", "WOODLANDS", "YISHUN"];
const FLAT_TYPES = ["1 ROOM", "2 ROOM", "3 ROOM", "4 ROOM", "5 ROOM", "EXECUTIVE", "MULTI-GENERATION"];
const FLAT_MODELS = ["Improved", "New Generation", "Model A", "Standard", "Simplified", "Apartment", "Maisonette", "DBSS", "Premium Apartment"];

export default function App() {
  const [form, setForm] = useState({
    town: "ANG MO KIO",
    flat_type: "4 ROOM",
    flat_model: "Improved",
    floor_area_sqm: 90,
    storey_mid: 8,
    lease_commence_date: 1990,
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: ["town", "flat_type", "flat_model"].includes(name) ? value : Number(value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("https://hdb-resale-api.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setPrediction(data.predicted_price);
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="badge">✦ ML Powered</div>
        <h1>HDB Resale Price Predictor</h1>
        <p>Predict Singapore HDB resale prices instantly using a machine learning model trained on 2025–2026 transaction data.</p>
      </div>

      <div className="card">
        <p className="card-title">Enter Flat Details</p>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Town</label>
            <select name="town" value={form.town} onChange={handleChange}>
              {TOWNS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Flat Type</label>
            <select name="flat_type" value={form.flat_type} onChange={handleChange}>
              {FLAT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Flat Model</label>
            <select name="flat_model" value={form.flat_model} onChange={handleChange}>
              {FLAT_MODELS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Floor Area (sqm)</label>
            <input type="number" name="floor_area_sqm" value={form.floor_area_sqm} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Storey (midpoint)</label>
            <input type="number" name="storey_mid" value={form.storey_mid} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <label>Lease Commence Year</label>
            <input type="number" name="lease_commence_date" value={form.lease_commence_date} onChange={handleChange} />
          </div>
        </div>

        <button className="predict-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Predicting..." : "Predict Price →"}
        </button>

        {prediction && (
          <div className="result">
            <p className="result-label">Estimated Resale Price</p>
            <p className="result-price">${Math.round(prediction).toLocaleString()}</p>
            <p className="result-note">Based on recent 2025–2026 HDB transactions</p>
            <div className="stats-row">
              <div className="stat">
                <p className="stat-value">94%</p>
                <p className="stat-label">Model R²</p>
              </div>
              <div className="stat">
                <p className="stat-value">$46k</p>
                <p className="stat-label">Avg Error</p>
              </div>
              <div className="stat">
                <p className="stat-value">10k</p>
                <p className="stat-label">Transactions</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
