// select the main div tag
const main = document.getElementById("main");
// use a loop to automaticly add rows and cal from json
async function populate() {
  const URL = "/api/games";
  const reques = new Request(URL);

  const response = await fetch(reques);
  const gamesText = await response.text();
  const games = JSON.parse(gamesText);

  // namse
  const name_url = "/api/names";
  const r = new Request(name_url);

  const re = await fetch(r);
  const nameText = await re.text();
  const names = JSON.parse(nameText);

  populateGames(games);
  populateName(names);
}

function populateGames(obj) {
  for (const gamesName of obj) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.style.width = "100px";
    cell.style.height = "80px";
    cell.style.backgroundColor = "#c7c8dd";
    cell.style.borderRadius = "3px";
    cell.style.margin = "5px";
    cell.style.boxShadow = "5px #00000049";

    col1.textContent = gamesName.name;
    col2.textContent = Math.round(gamesName.playtime_forever / 60);

    cell.appendChild(col1);
    cell.appendChild(col2);
  }
}

function populateName(obj) {
  const header = document.querySelector(".username");
  header.textContent = obj.name;
  document.title = obj.name + " - Steam Web";
}

populate();
