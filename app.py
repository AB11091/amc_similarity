import sys
from decimal import Decimal
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from astrapy import DataAPIClient
from astrapy.constants import VectorMetric
from dotenv import load_dotenv
import os
import json

load_dotenv()
print(sys.path)
client = DataAPIClient(os.getenv("ASTRA_DB_APPLICATION_TOKEN"))
database = client.get_database(os.getenv("ASTRA_DB_API_ENDPOINT"))
collection = database.get_collection('amc_similarity_nvidia_embeddings')
app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/process', methods=['GET'])
def get_embedding():
    text_input = request.args.get('rawtext', '')

    if not text_input:
        return jsonify({'error': 'No input text provided'}), 400

    search_results = collection.find(
        sort={"$vectorize": text_input},
        limit=10,
        projection={"$vectorize": True},
    )

    return [document for document in enumerate(search_results)]

if __name__ == "__main__":
    app.run()
