
async function fetchStateInfo() {
  const SPREADSHEET_ID = '15GhUos1SrxZrnPV0LgaLbL_YQuEAZ5hmYZlt_jmVU5E';
  const RANGE = 'Energy Project!A2:D'; // start at row 2 to skip header
  const API_KEY = 'AIzaSyCqwqvQ3ilLao55lUxMGp-HLS1RUxX4x68';

  const encoded = encodeURIComponent(RANGE).replace(/%21/g, '!');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encoded}?key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheets API error ${res.status}`);
  const data = await res.json();
  // data.values is an array of rows: [[state, name, capital, extra], ...]
  const stateInfo = {};
  (data.values || []).forEach(row => {
    const [stateId, name, capital, extra] = row;
    if (!stateId) return;
    stateInfo[stateId.trim().toLowerCase()] = `${name || ''} — Capital: ${capital || 'N/A'}${extra ? ' — ' + extra : ''}`;
  });
  console.log('Fetched state info:', stateInfo);
  return stateInfo;
}

window.addEventListener("DOMContentLoaded", () => {
  const obj = document.getElementById("usMapObject");
  const infoBox = document.getElementById("infoBox");

  obj.addEventListener("load", () => {
    const svgDoc = obj.contentDocument;
    if (!svgDoc) {
      console.error("Failed to load SVG document");
      return;
    }
    const states = svgDoc.querySelectorAll("path");

    const stateInfo = fetchStateInfo();
    states.forEach(path => {
      const id = path.getAttribute("class");
      if (!id) return;
      path.addEventListener("click", () => {
        const info = stateInfo[id] || `No info for ${id}`;
        infoBox.textContent = info;
        infoBox.style.display = "block";
      });
    });
  });
});
