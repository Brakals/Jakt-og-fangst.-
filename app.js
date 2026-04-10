let data = JSON.parse(localStorage.getItem("data")) || {
  jakt: [],
  felle: []
};

function save() {
  localStorage.setItem("data", JSON.stringify(data));
}

function show(type) {
  let html = `
    <h2>${type.toUpperCase()}</h2>

    <input id="text" placeholder="Hva skjedde?"/>
    <input id="place" placeholder="Sted"/>
    <button onclick="add('${type}')">Legg til</button>
  `;

  data[type].forEach((item, i) => {
    html += `
      <div class="card">
        <b>${item.text}</b><br>
        <span class="small">${item.place} • ${item.date}</span><br>
        <button onclick="remove('${type}', ${i})">❌</button>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

function add(type) {
  let text = document.getElementById("text").value;
  let place = document.getElementById("place").value;

  if (!text) return;

  data[type].push({
    text,
    place,
    date: new Date().toLocaleString()
  });

  save();
  show(type);
}

function remove(type, index) {
  data[type].splice(index, 1);
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
