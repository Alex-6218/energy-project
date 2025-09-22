import requests
import urllib.parse

SPREADSHEET_ID = "15GhUos1SrxZrnPV0LgaLbL_YQuEAZ5hmYZlt_jmVU5E"
RANGE = "Energy Project!A1:E7"
API_KEY = "AIzaSyCqwqvQ3ilLao55lUxMGp-HLS1RUxX4x68"

encoded_range = urllib.parse.quote(RANGE, safe="!")
url = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{encoded_range}?key={API_KEY}"

response = requests.get(url)

print(response.status_code)
print(response.text)
