import requests
import json
from flask import Flask, session, jsonify
from flask_cors import CORS
from pysteamsignin.steamsignin import SteamSignIn
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex()
CORS(app, supports_credentials=True)

steamLogin = SteamSignIn()


@app.route("/login")

def login():
    return steamLogin.RedirectUser(steamLogin.ConstructURL('https://127.0.0.1:5000/process_login'))

@app.route("/process_login")
def processLogin():
    steam_id = steamLogin.ValidateResults(dict(request.args))
    if steam_id:
        session['steam_id'] = steam_id
        return jsonify({"message": "Login successful!", "steam_id": steam_id})
    else:
        return jsonify({"message": "login filed"})

@app.route("/api/games")
def get_games():
    steam_id = session.get('steam_id')
    if not steam_id:
        return jsonify({"message": "no steam id"}), 401
    valus = {
        "include_appinfo": "1",
        "include_played_free_game": "1",
        "key": "CC2136761B91FAA0ABA6F3D253751226",
        "steamid": steam_id,
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
