import requests
import pandas as pd

DATASET_ID = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc"
BASE_URL = "https://data.gov.sg/api/action/datastore_search"

def fetch_hdb_data():
    resp = requests.get(BASE_URL, params={
        "resource_id": DATASET_ID,
        "limit": 10000,
        "offset": 0
    })
    data = resp.json()["result"]
    records = data["records"]

    df = pd.DataFrame(records)
    df.to_csv("data/raw_hdb.csv", index=False)
    print(f"Done! Total rows: {len(df)}")
    return df

if __name__ == "__main__":
    fetch_hdb_data()
