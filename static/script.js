// select the main div tag
const gameNameId = document.getElementById("game-name");
const playTimeId = document.getElementById("play-time");
const UsernameId = document.getElementById("username");
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
    const col1 = document.createElement("div");
    col1.className = "col";
    const col2 = document.createElement("div");
    col2.className = "col";

    col1.textContent = gamesName.name;
    col2.textContent = Math.round(gamesName.playtime_forever / 60);

    gameNameId.appendChild(col1);
    playTimeId.appendChild(col2);
  }
}

function populateName(obj) {
  const header = document.getElementById("username");
  header.textContent = obj;
}

populate();
