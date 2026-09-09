// select the main div tag
const main = document.getElementById("main");
// use a loop to automaticly add rows and cal from json
async function populate() {
  const URL = "/api/games";
  const reques = new Request(URL);

  const response = await fetch(reques);
  const gamesText = await response.text();
  const games = JSON.parse(gamesText);
  // names
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

    cell.style.width = "200px";
    cell.style.height = "200px";
    cell.style.backgroundCoor = "#313461";
    cell.style.borderRadius = "3px";
    cell.style.margin = "5px";
    cell.style.boxShadow = "5px #00000049";
    cell.style.alignContent = "end";

    const textBox = document.createElement("div");

    textBox.style.margin = "0";
    textBox.style.backgroundColor = "rgba(33, 48, 131, 0.36)";
    textBox.style.padding = "5px";
    textBox.style.fontFamily = "Arial, sans-serif";

    const game = document.createElement("h3");
    const time = document.createElement("p");

    game.textContent = gamesName.name;
    time.textContent = Math.round(gamesName.playtime_forever / 60) + " hrs";
    if (gamesName.playtime_forever % 60 !== 0) {
      time.textContent += " " + (gamesName.playtime_forever % 60) + " mins";
    }
    // icon
    const icon = document.createElement("div");
    icon.className = "icon";
    const url = gamesName.img_icon_url;
    const appId = gamesName.appid;
    icon.setAttribute(
      "src",
      `https://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${url}.jpg`,
    );

    textBox.appendChild(game);
    textBox.appendChild(time);
    textBox.appendChild(icon);

    cell.appendChild(textBox);

    main.appendChild(cell);
  }
}

function populateName(obj) {
  const header = document.querySelector(".username");
  header.textContent = obj.name;
  header.style.fontSize = "30px";
  header.style.letterSpacing = "3px";

  const hr = document.createElement("hr");
  hr.color = "white";
  hr.width = "400px";
  hr.size = "2px";

  header.appendChild(hr);

  document.title = obj.name + " - Steam Web";
}

populate();
