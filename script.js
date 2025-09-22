const stateInfo = {};
async function fetchStateInfo() {
  const SPREADSHEET_ID = '15GhUos1SrxZrnPV0LgaLbL_YQuEAZ5hmYZlt_jmVU5E';
  const RANGE = 'Energy Project!A2:Z'; // start at row 2 to skip header
  const API_KEY = 'AIzaSyCqwqvQ3ilLao55lUxMGp-HLS1RUxX4x68';

  const encoded = encodeURIComponent(RANGE).replace(/%21/g, '!');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encoded}?key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheets API error ${res.status}`);
  const data = await res.json();
  (data.values || []).forEach(row => {
    const [stateId, name, transportEnergyUsage, industrialEnergyUsage, domesticEnergyUsage, EnergyProduction] = row;
    if (!stateId) return;
    stateInfo[stateId.trim().toLowerCase()] = {
      name: name || '',
      transportEnergyUsage: transportEnergyUsage || 'N/A',
      industrialEnergyUsage: industrialEnergyUsage || 'N/A',
      domesticEnergyUsage: domesticEnergyUsage || 'N/A',
      EnergyProduction: EnergyProduction || 'N/A'
    };
  });
  console.log('Fetched state info:', stateInfo);
  console.log(stateInfo['ca']);
  return stateInfo;
}

window.addEventListener("DOMContentLoaded", () => {
  fetchStateInfo();
  const obj = document.getElementById("usMapObject");
  const infoBox = document.getElementById("infoBox");

  obj.addEventListener("load", () => {
    const svgDoc = obj.contentDocument;
    if (!svgDoc) {
      console.error("Failed to load SVG document");
      return;
    }
    const states = svgDoc.querySelectorAll("path");
    states.forEach(path => {
      const id = path.getAttribute("class");
      if (!id) return;
      path.addEventListener("click", () => {
        const info = stateInfo[id.toString()] || `No info for ${id}`;
        console.log(`Clicked on ${id}: ${stateInfo[id.toString()]}`);
        infoBox.textContent = JSON.stringify(info, null, 2);
        infoBox.style.display = "block";
      });
    });
    console.log(stateInfo['ca']);
  });
});
