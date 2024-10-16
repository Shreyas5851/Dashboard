from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Example data from a CSV (you can load this from a real dataset)
data = pd.read_csv("C:\\Users\\EWIN\\Desktop\\Assignment persist\\dashboard-backend\\dummy_sample.csv")

@app.route('/api/overview', methods=['GET'])
def overview():
    # Calculate total investments, fund information, etc.
    overview_data = {
        "total_capital": 81.62,
        "total_investments": 277,
        "underlying_companies": 13,
        "committed_by_fund": {
            "transformation_fund": 22.2,
            "orientation_fund": 21.8,
            "infrastructure_fund": 18.3,
            "rise_fund": 16.9,
            "partnership_fund": 15.6
        }
    }
    return jsonify(overview_data)

if __name__ == '__main__':
    app.run(debug=True, port=5001, host="0.0.0.0")
