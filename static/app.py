from sentence_transformers import SentenceTransformer
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from astrapy import DataAPIClient
import os
from dotenv import load_dotenv

load_dotenv()


client = DataAPIClient(os.getenv("ASTRA_DB_APPLICATION_TOKEN"))
database = client.get_database(os.getenv("ASTRA_DB_API_ENDPOINT"))
collection = database.get_collection('amc_similarity_with_link')
app = Flask(__name__, static_folder='frontend')
CORS(app)
model = SentenceTransformer("all-MiniLM-L6-v2")

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/process', methods=['GET'])
def get_embedding():
    text_input = request.args.get('rawtext', '')

    if not text_input:
        return jsonify({'error': 'No input text provided'}), 400


    result = model.encode(text_input)
    result = [float(num) for num in result]

    search_results = collection.find(
        sort={"$vector": result},
        limit=10,
    )

    return [document for document in enumerate(search_results)]

if __name__ == "__main__":
    app.run(debug=True)