import requests
import pandas as pd
import time

DATASET_ID = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc"
BASE_URL = "https://data.gov.sg/api/action/datastore_search"

def fetch_hdb_data():
    for attempt in range(3):
        resp = requests.get(BASE_URL, params={
            "resource_id": DATASET_ID,
            "limit": 10000,
            "offset": 0
        })
        result = resp.json()
        if "result" in result:
            records = result["result"]["records"]
            df = pd.DataFrame(records)
            df.to_csv("data/raw_hdb.csv", index=False)
            print(f"Done! Total rows: {len(df)}")
            return df
        else:
            print(f"Rate limited, waiting 15 seconds... (attempt {attempt + 1}/3)")
            time.sleep(15)

    raise Exception("Failed after 3 attempts. Try again in a minute.")

if __name__ == "__main__":
    fetch_hdb_data()
