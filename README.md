# HDB Resale Price Predictor

An end-to-end machine learning web app that predicts HDB resale flat prices in Singapore using public data from data.gov.sg.

## Tech Stack
- **Data**: data.gov.sg public API
- **Processing**: Python, Pandas
- **Storage**: SQLite
- **ML**: Scikit-learn, XGBoost (coming in Week 3)
- **Frontend**: React (coming in Week 5)
- **Deployment**: AWS (coming in Week 7)

## Project Structure
hdb-resale-predictor/
├── data/              # raw and cleaned datasets
├── notebooks/         # EDA and model experiments
├── pipeline/
│   ├── fetch.py       # pulls data from data.gov.sg API
│   ├── clean.py       # cleans and transforms raw data
│   └── load.py        # loads cleaned data into SQLite
└── run_pipeline.py    # runs the full pipeline

## How to Run
```bash
# Install dependencies
pip install -r requirements.txt

# Run the full pipeline
python run_pipeline.py
```

## Progress
- [x] Week 1 — Data pipeline
- [ ] Week 2 — Data exploration
- [ ] Week 3 — ML model
- [ ] Week 4 — Model refinement
- [ ] Week 5 — React frontend
- [ ] Week 6 — Frontend polish
- [ ] Week 7 — Deployment
- [ ] Week 8 — Final polish
