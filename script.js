// select the main div tag
const gameNameId = document.getElementById("game-name");
const playTimeId = document.getElementById("play-time");
// use a loop to automaticly add rows and cal from json
async function populate() {
  const URL = "http://steam-web.onrender.com/api/games";
  const reques = new Request(URL);

  const response = await fetch(reques);
  const gamesText = await response.text();
  const games = JSON.parse(gamesText);

  populateGames(games);
}

function populateGames(obj) {
  for (const gamesName of obj) {
    // make 2 col, one for name, one for time
    // might fix later cus i wanna make them col1 and col2,
    // using i
    //for (let i = 1; i <= 2; i++) {
    // const i = document.createElement(div);
    //i.className = "col";
    //}
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

populate();
