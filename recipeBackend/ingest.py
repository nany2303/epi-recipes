import json

input_file = 'epi_recipes.json'
output_file = 'epi_recipes_bulk.json'

with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
    data = json.load(infile)
    for i, record in enumerate(data):
        meta_data = {"index": {"_index": "epirecipes", "_id": str(i+1)}}
        json.dump(meta_data, outfile)
        outfile.write('\n')
        json.dump(record, outfile)
        outfile.write('\n')
