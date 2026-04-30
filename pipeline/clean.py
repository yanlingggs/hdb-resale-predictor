import pandas as pd

def clean_hdb(df):
    #Fix numeric types
    df["resale_price"] = pd.to_numeric(df["resale_price"])
    df["floor_area_sqm"] = pd.to_numeric(df["floor_area_sqm"])

    #Parse storey range to a single midpoint number
    #e.g. "10 TO 12" becomes 11.0
    df["storey_mid"] = df["storey_range"].apply(
        lambda x: (int(x[:2]) + int(x[-2]))/2
    )

    #Parse remaining lease to years as a number
    #e.g. "61 years 04 months" become 61.3
    df["remaining_lease_years"] = df["remaining_lease"].apply(parse_lease)

    #Parse month to datetime
    df["month"] = pd.to_datetime(df["month"])

    #drop columns we do not need
    df = df.drop(columns=["_id", "storey_range", "remaining_lease"])
    #drop any rows with missing values
    df = df.dropna()
    return df

def parse_lease(s):
    if pd.isna(s):
        return None
    parts = s.split()
    years = int(parts[0])
    months = int(parts[2]) if "month" in s else 0
    return round(years+months/12, 1)

if __name__ == "__main__":
    df = pd.read_csv("data/raw_hdb.csv")
    df = clean_hdb(df)
    df.to_csv("data/clean_hdb.csv", index=False)
    print(f"Clean data: {df.shape[0]} rows, {df.shape[1]} columns")
    print(df.head())


