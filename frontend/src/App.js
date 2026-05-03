import { useState } from "react";

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
    setForm({ ...form, [e.target.name]: e.target.name === "town" || e.target.name === "flat_type" || e.target.name === "flat_model" ? e.target.value : Number(e.target.value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:5001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setPrediction(data.predicted_price);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "60px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>HDB Resale Price Predictor</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>Predict Singapore HDB resale prices using machine learning.</p>

      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <label>Town</label>
          <select name="town" value={form.town} onChange={handleChange} style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}>
            {TOWNS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label>Flat Type</label>
          <select name="flat_type" value={form.flat_type} onChange={handleChange} style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}>
            {FLAT_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label>Flat Model</label>
          <select name="flat_model" value={form.flat_model} onChange={handleChange} style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}>
            {FLAT_MODELS.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label>Floor Area (sqm)</label>
          <input type="number" name="floor_area_sqm" value={form.floor_area_sqm} onChange={handleChange} style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div>
          <label>Storey (midpoint)</label>
          <input type="number" name="storey_mid" value={form.storey_mid} onChange={handleChange} style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div>
          <label>Lease Commence Year</label>
          <input type="number" name="lease_commence_date" value={form.lease_commence_date} onChange={handleChange} style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <button onClick={handleSubmit} style={{ padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 16 }}>
          {loading ? "Predicting..." : "Predict Price"}
        </button>
      </div>

      {prediction && (
        <div style={{ marginTop: 32, padding: 24, background: "#f0fdf4", borderRadius: 8, textAlign: "center" }}>
          <p style={{ color: "#166534", fontSize: 16, marginBottom: 8 }}>Estimated Resale Price</p>
          <p style={{ fontSize: 36, fontWeight: "bold", color: "#166534" }}>
            ${prediction.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
