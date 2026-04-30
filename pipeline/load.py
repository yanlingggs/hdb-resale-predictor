import pandas as pd
from sqlalchemy import create_engine

DB_URL = "postgresql://postgres@localhost:5432/hdb_predictor"

def load_to_db(csv_path="data/clean_hdb.csv"):
    df = pd.read_csv(csv_path)
    engine = create_engine(DB_URL)
    df.to_sql("resale_flats", engine, if_exists="replace", index=False)
    print(f"Loaded {len(df)} rows into resale_flats table.")

if __name__ == "__main__":
    load_to_db()
