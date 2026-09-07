import json
import secrets

from flask import (
    Flask,
    jsonify,
    request,
    session,
    send_from_directory,
    redirect,
    url_for,
    render_template,
)
from flask_cors import CORS
from pysteamsignin.steamsignin import SteamSignIn
import requests

app = Flask(__name__, template_folder="../CODE", static_folder="../static")
app.secret_key = secrets.token_hex()
CORS(app, supports_credentials=True)

steamLogin = SteamSignIn()


@app.route("/")
def landing():
    return render_template("landing.html")


@app.route("/main")
def main():
    return render_template("index.html")


@app.route("/login")
def login():
    return steamLogin.RedirectUser(
        steamLogin.ConstructURL("https://steam-web.onrender.com/process_login")
    )


@app.route("/process_login")
def processLogin():
    steam_id = steamLogin.ValidateResults(dict(request.args))
    if steam_id:
        session["steam_id"] = steam_id
        return redirect(url_for("main"))
    else:
        return jsonify({"message": "login filed"})


@app.route("/api/games")
def get_games():
    steam_id = session.get("steam_id")
    if not steam_id:
        return jsonify({"message": "no steam id"}), 401
    valus = {
        "include_appinfo": "1",
        "include_played_free_game": "1",
        "key": "8BE54D4857972D66B2ACF48EBDA4F64C",
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


@app.route("/api/names")
def names():
    steam_id = session.get("steam_id")
    if not steam_id:
        return jsonify({"message": "no steam id"}), 401

    args = {
        "key": "8BE54D4857972D66B2ACF48EBDA4F64C",
        "steamids": steam_id,
        "formate": "json",
    }

    p = requests.get(
        "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002", params=args
    )

    player = p.json()

    new_player_string = json.dumps(player, indent=2)
    new_player = json.loads(new_player_string)

    player_name =new_player["response"]["players"][0]["personname"]
    return  jsonify({"name": player_name})


if __name__ == "__main__":
    app.run(port=5000)
