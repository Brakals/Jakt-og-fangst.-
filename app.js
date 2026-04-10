let data = JSON.parse(localStorage.getItem("data")) || {
  animals: ["Elg", "Hjort", "Rådyr", "Rev"],
  jakt: [],
  felle: []
};

function save() {
  localStorage.setItem("data", JSON.stringify(data));
}

function show(type) {
  let html = `
    <h2>${type.toUpperCase()}</h2>

    <select id="animal">
      ${data.animals.map(a => `<option>${a}</option>`).join("")}
    </select>

    <input id="text" placeholder="Hva skjedde?"/>
    <input id="place" placeholder="Sted"/>
    <input type="file" id="image"/>

    <button onclick="add('${type}')">Legg til</button>
  `;

  data[type].forEach((item, i) => {
    html += `
      <div class="card">
        <b>${item.animal}</b><br>
        ${item.text}<br>
        <small>${item.place} • ${item.date}</small><br>
        ${item.image ? `<img src="${item.image}">` : ""}
        <br>
        <button onclick="remove('${type}', ${i})">❌</button>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

function add(type) {
  let animal = document.getElementById("animal").value;
  let text = document.getElementById("text").value;
  let place = document.getElementById("place").value;
  let file = document.getElementById("image").files[0];

  if (!text) return;

  if (file) {
    let reader = new FileReader();
    reader.onload = function() {
      saveEntry(type, animal, text, place, reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveEntry(type, animal, text, place, null);
  }
}

function saveEntry(type, animal, text, place, image) {
  data[type].push({
    animal,
    text,
    place,
    image,
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

function addAnimal() {
  let val = document.getElementById("newAnimal").value;
  if (!val) return;
  data.animals.push(val);
  save();
  alert("Dyr lagt til!");
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
