import pandas as pd
import sqlite3

def load_to_db(csv_path="data/clean_hdb.csv"):
    df = pd.read_csv(csv_path)
    conn = sqlite3.connect("data/hdb_predictor.db")
    df.to_sql("resale_flats", conn, if_exists="replace", index=False)
    conn.close()
    print(f"Loaded {len(df)} rows into resale_flats table.")

if __name__ == "__main__":
    load_to_db()
