
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

    const stateInfo = {
      ca: "California — Capital: Sacramento",
      tx: "Texas — Capital: Austin",
      ny: "New York — Capital: Albany",
      fl: "Florida — Capital: Tallahassee",
      il: "Illinois — Capital: Springfield"
      // Add more states here if desired
    };

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
