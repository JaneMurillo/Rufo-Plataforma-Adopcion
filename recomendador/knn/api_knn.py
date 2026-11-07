from flask import Flask, request, jsonify
from sklearn.neighbors import NearestNeighbors
import numpy as np
import pandas as pd
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CORS(app, origins=['http://localhost:5000'])
# Load dataset
dataset = pd.read_csv('knndataset.csv', engine='python', index_col=0)
perros = dataset.values

# Create the KNN model
knn = NearestNeighbors(n_neighbors=20)
knn.fit(perros)

# Example perro_usuario data
perro_usuario = None

def fetch_perro_usuario():
    global perro_usuario
    try:
        # Make a GET request to the external API to fetch perro_usuario data
        response = requests.get('https://example.com/perro_usuario_data')
        if response.status_code == 200:
            # Extract the perro_usuario data from the response
            perro_usuario_data = response.json()
            # Assuming the perro_usuario data is in a specific format in the response
            perro_usuario = np.array(perro_usuario_data)
        else:
            # Handle the case when the request to the external API fails
            print('Failed to fetch perro_usuario data from the external API:', response.text)
    except Exception as e:
        print('An error occurred while fetching perro_usuario data:', e)

# Fetch perro_usuario data on application startup
fetch_perro_usuario()



@app.route('/evaluate', methods=['POST'])
def evaluate_perro():
    try:
        # Get perro data from request
        data = request.json
        #perro_usuario = np.array([data['perro_usuario']])
        perro_usuario = np.array([[0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0]])
        # Perform KNN search
        distancias, indices = knn.kneighbors(perro_usuario)
        print(indices)
        # Return recommendation
        return jsonify({
            'indices_recomendados': indices.tolist(),
            #'distancias': distancias.tolist()
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Change the port to your desired port number, for example, 5001
    app.run(host='127.0.0.1',debug=True, port=5012)




