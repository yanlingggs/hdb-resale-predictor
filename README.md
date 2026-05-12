# HDB Resale Price Predictor

An end-to-end machine learning web app that predicts HDB resale flat prices in Singapore using public data from data.gov.sg.

## Live Demo
- Frontend: https://hdb-resale-frontend.onrender.com
- API: https://hdb-resale-api.onrender.com

## Model Performance
- Algorithm: XGBoost
- R²: 0.95
- RMSE: $46,987
- Training data: 10,000 HDB transactions (Dec 2025 - Apr 2026)

## Tech Stack
- Data: data.gov.sg public API
- Processing: Python, Pandas
- Storage: PostgreSQL
- ML: Scikit-learn, XGBoost
- Backend: Flask
- Frontend: React
- Deployment: Render

## Project Structure
- pipeline/fetch.py — pulls data from data.gov.sg API
- pipeline/clean.py — cleans and transforms raw data
- pipeline/load.py — loads cleaned data into PostgreSQL
- pipeline/train.py — trains and saves XGBoost model
- api/app.py — Flask API serving predictions
- frontend/ — React web app
- notebooks/ — EDA and model experiments
- run_pipeline.py — runs the full pipeline

## How to Run
pip install -r requirements.txt
python run_pipeline.py

## Backlog
See BACKLOG.md
