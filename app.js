let data = JSON.parse(localStorage.getItem("data")) || {
  jakt: [],
  felle: []
};

function save() {
  localStorage.setItem("data", JSON.stringify(data));
}

function show(type) {
  let html = `<h2>${type}</h2>
    <input id="input" placeholder="Skriv noe"/>
    <button onclick="add('${type}')">Legg til</button>
    <ul>`;

  data[type].forEach(item => {
    html += `<li>${item}</li>`;
  });

  html += "</ul>";
  document.getElementById("content").innerHTML = html;
}

function add(type) {
  let val = document.getElementById("input").value;
  data[type].push(val);
  save();
  show(type);
}

function exportData() {
  let blob = new Blob([JSON.stringify(data)], {type: "application/json"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "backup.json";
  a.click();
}

function importData(event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function() {
    data = JSON.parse(reader.result);
    save();
    alert("Importert!");
  };
  reader.readAsText(file);
}
