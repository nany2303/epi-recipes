from itertools import count

from flask import Flask, jsonify, request
from opensearchpy import OpenSearch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

es = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    timeout=30
)

@app.route('/recipes', methods=['GET'])
def get_recipes():
    try:
        page = int(request.args.get("page", 1))
        size = int(request.args.get("size", 20))
        start = (page - 1) * size

        count_response = es.count(index='epirecipes', body={"query": {"match_all": {}}})
        total_hits = count_response['count']

        if start >= total_hits:
            return jsonify({'hits': []})

        response = es.search(
            index='epirecipes',
            body={
                "query": {
                    "match_all": {}
                },
                "from": start,
                "size": size
            }
        )

        hits = response["hits"]["hits"]
        return jsonify({"hits" : hits})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/search", methods=['GET'])
def search_recipes():
    try:
        data = request.get_json()
        title = data.get("title", '')
        page = int(data.get("page", 1))
        size = int(data.get("size", 20))

        if not title:
            return jsonify({"error" : "Title is required to search."}), 400
        if page < 1 or size < 1:
            return jsonify({"error" : "Page number and page size should  be positive."}), 400

        start = (page - 1)*size
        count_response = es.count(index='epirecipes', body={"query": {"match": { "title" : title}}})
        total_hits = count_response["count"]

        if start >= total_hits:
            return jsonify({"hits" : []})

        response = es.search(
            index = "epirecipes",
            body = {
                "query" :{
                    "match" : {
                        "title" : title
                    }
                },
                "from" : start,
                "size" : size
            }
        )

        hits = response["hits"]["hits"]
        return jsonify({"hits": hits})
    except Exception as e:
        return jsonify({"error" : str(e)}),500

@app.route("/search_by_category", methods=['POST'])
def search_recipes_by_category():
    try:
        data = request.get_json()
        categories = data.get('categories', [])
        page = int(data.get('page', 1))
        size = int(data.get('size', 20))

        if not categories:
            return jsonify({"error" : "Categories are required"}), 400

        start = (page - 1) * size

        count_response = es.count(
            index = "epirecipes",
            body = {
                "query" : {
                    "bool" : {
                        "should" : [
                            {"match" : {"categories" : category}} for category in categories
                        ],
                        "minimum_should_match" : 1
                    }
                }
            }
        )
        total_count = count_response["count"]
        if start >= total_count:
            return jsonify({"hits" : []})

        search_response = es.search(
            index = "epirecipes",
            body = {
                "query" : {
                    "bool" : {
                        "should" : [
                            {"match" : {"categories" : category}} for category in categories
                        ]
                    }
                },
                "from" : start,
                "size" : size
            }
        )

        hits = search_response['hits']['hits']
        recipes = [hit['_source'] for hit in hits]
        return jsonify({"hits" : recipes})
    except Exception as e:
        return jsonify({"error" : str(e)}), 500


@app.route("/search_recipes", methods=['POST'])
def search_recipes_adv():
    try:
        data = request.get_json()

        # Extracting parameters from the request body
        title = data.get('title', None)
        categories = data.get('categories', [])
        sort_by = data.get('sort_by', None)  # Can be 'protein', 'calorie', 'sodium', 'fat'
        sort_order = data.get('sort_order', 'desc')  # Sorting order: 'asc' or 'desc'
        page = int(data.get('page', 1))
        size = int(data.get('size', 20))

        if page < 1 or size < 1:
            return jsonify({"error": "Page number and size should be positive."}), 400

        start = (page - 1) * size

        # Build the base query
        query = {
            "bool": {
                "must": [],
                "should": [],
                "minimum_should_match": 0  # Default no match is required in 'should'
            }
        }

        # Add title filter if provided
        if title:
            query["bool"]["must"].append({
                "match": {"title": title}
            })

        # Add categories filter if provided
        if categories:
            query["bool"]["should"] = [
                {"match": {"categories": category}} for category in categories
            ]
            query["bool"]["minimum_should_match"] = 1  # Ensure at least one category matches

        # Build the search body with pagination and sorting
        search_body = {
            "query": query,
            "from": start,
            "size": size
        }

        # Handle sorting by different nutritional values
        if sort_by:
            if sort_by in ['protein', 'calories', 'sodium', 'fat', 'rating']:
                search_body["sort"] = [
                    {sort_by: {"order": sort_order}}  # Sort by the given field and order
                ]
            else:
                return jsonify({"error": "Invalid sort_by value."}), 400

        # Get the total count for pagination (but do this before retrieving the sorted data)
        count_response = es.count(
            index='epirecipes',
            body={"query": query}
        )
        total_hits = count_response['count']

        # Perform the search query (with sorting and pagination)
        response = es.search(
            index='epirecipes',
            body=search_body
        )

        hits = response['hits']['hits']
        recipes = [hit for hit in hits]

        return jsonify({
            "hits": recipes,
            "total": total_hits,
            "page": page,
            "size": size
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)