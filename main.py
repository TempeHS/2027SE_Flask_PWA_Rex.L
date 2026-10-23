from flask import Flask
from flask import render_template
from flask import request
import database_manager as dbHandler

app = Flask(__name__)


@app.route("/index.html", methods=["GET"])  # Only GET - just viewing
@app.route("/", methods=["POST", "GET"])  # Both GET and POST - can handle forms
def index():
    data = dbHandler.listExtension()
    return render_template("/index.html", content=data)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
