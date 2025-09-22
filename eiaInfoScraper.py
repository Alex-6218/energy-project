import requests

url = "https://api.eia.gov/v2/seds/data/?frequency=annual&data[0]=value&start=2019&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&key=mdVcdSaFPwv9cmBQqN6aBqNvWsrI5iobLXSBwYjA"
response = requests.get(url)
data = response.json()
print(data)