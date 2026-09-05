import requests
import json
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/games")
def get_games():

    valus = {
        "include_appinfo": "1",
        "include_played_free_game": "1",
        "key": "CC2136761B91FAA0ABA6F3D253751226",
        "steamid": "76561199143940092",
        "format": "json",
    }
    r = requests.get(
        "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001", params=valus
    )
    # print(r.url)
    datas = r.json()

    # convert the data into a pyton dict
    new_data_string = json.dumps(datas, indent=2)
    new_data = json.loads(new_data_string)

    real_game = []
    for games in range(len(new_data["response"]["games"])):
        real_game.append(new_data["response"]["games"][games])

    return json.dumps(real_game)


# this return the array as a string of json

if __name__ == "__main__":
    app.run(port=5000)
