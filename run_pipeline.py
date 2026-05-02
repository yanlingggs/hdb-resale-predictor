from pipeline.fetch import fetch_hdb_data
from pipeline.clean import clean_hdb
from pipeline.load import load_to_db
from pipeline.train import train
import pandas as pd

print("Step 1: Fetching data...")
df = fetch_hdb_data()

print("Step 2: Cleaning data...")
df = clean_hdb(df)
df.to_csv("data/clean_hdb.csv", index=False)

print("Step 3: Loading to database...")
load_to_db()

print("Step 4: Training model...")
train()

print("Pipeline complete!")
