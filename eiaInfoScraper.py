import requests

params = {
    "frequency": "annual",
    "data[0]": "value",
    "start": "2019",
    "end": "2023",
    "offset": "0",
    "length": "5000",
    "api_key": "mdVcdSaFPwv9cmBQqN6aBqNvWsrI5iobLXSBwYjA"
}
url = "https://api.eia.gov/v2/total-energy/data/?frequency=monthly"
response = requests.get(url+"?", params=params)
data = response.json()
if int(data["response"]["total"]) > 5000:
    print("Warning: More than 5000 results, not all results may be shown.")
parsed_data = data["response"]["data"]

for entry in parsed_data:
        if(entry['unit'] == "Trillion Btu"):
          print("Year: " + entry["period"] + ", Meter Serial Number: " + entry["msn"] + ", Value: " + entry["value"] + " " + entry["unit"], end="\n")