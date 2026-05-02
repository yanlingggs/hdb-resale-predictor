import requests
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("DATA_GOV_API_KEY")

DATASET_ID = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc"
BASE_URL = "https://data.gov.sg/api/action/datastore_search"

def fetch_hdb_data():
    headers = {"x-api-key": API_KEY} if API_KEY else {}
    resp = requests.get(BASE_URL, params={
        "resource_id": DATASET_ID,
        "limit": 10000,
        "offset": 0,
        "sort": "month desc"
    }, headers=headers)
    result = resp.json()
    if "result" in result:
        records = result["result"]["records"]
        df = pd.DataFrame(records)
        df.to_csv("data/raw_hdb.csv", index=False)
        print(f"Done! Total rows: {len(df)}")
        print(f"Date range: {df['month'].min()} to {df['month'].max()}")
        return df
    else:
        raise Exception(f"API error: {result}")

if __name__ == "__main__":
    fetch_hdb_data()
