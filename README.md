# EpiRecipes Search Platform

## Project Description

The EpiRecipes Search Platform is a web application developed using React.js, Flask, and OpenSearch. This platform enables users to search for recipes, view detailed preparation directions, and see the list of ingredients required. Users can perform searches and filter results based on their preferences to retrieve relevant recipes.

## Features

- **Search Recipes**: Quickly find recipes by keywords or ingredients.
- **View Recipe Details**: Access directions and ingredients for each recipe.
- **Filtering Options**: Refine search results based on user preferences.
- **Responsive Design**: Optimized for various devices and screen sizes.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Flask
- **Search Engine**: OpenSearch

## Objective

The goal of this project is to develop a full-stack web application that leverages the "EpiRecipes" dataset to provide an efficient and user-friendly recipe search platform. The application achieves this by indexing the dataset into OpenSearch, allowing users to search and filter recipes based on their preferences.

The solution is designed to showcase the following key aspects:

- **Indexing and Search**: Utilize OpenSearch to index the "EpiRecipes" dataset, enabling fast and accurate search capabilities.
- **Frontend Development**: Implement a responsive and intuitive user interface using React.js, allowing users to easily search for recipes, view detailed preparation instructions, and see the required ingredients.
- **Backend Development**: Develop a robust backend using Flask to handle API requests, interact with OpenSearch, and manage application logic.
- **Version Control**: Employ GitHub for version control to track changes, manage collaboration, and maintain code quality.

This project demonstrates proficiency in integrating a search engine with a web application, designing an effective user interface, and managing backend operations efficiently.



## Install and Configure OpenSearch
### 1. Download OpenSearch

- Download the latest version of OpenSearch from the OpenSearch website.

### 2. Extract OpenSearch

- Extract the downloaded OpenSearch archive to a directory of your choice.

### 3. Configure OpenSearch

- Navigate to the config folder inside the OpenSearch directory.

- Open the opensearch.yml file in a text editor.

- Add the following line to the file to disable security features:

- plugins.security.disabled: true

### 4. Run OpenSearch

- In the OpenSearch directory, execute the installation script:

- opensearch-windows-install.bat

## Set Up the Backend

### 1. Navigate to the Backend Directory

- Go to the recipeBackend folder:

- cd recipeBackend

### 2. Create Index in OpenSearch

- Use the create_index.json file to create the index in OpenSearch. Execute the following curl command:

- curl -X PUT "localhost:9200/epirecipes" -H 'Content-Type: application/json' -d @create_index.json

### 3. Format and Ingest Data

- Format the epi_recipes.json file using the ingest.py script:

- python ingest.py

- This will create an epi_recipes_bulk.json file. Use the following curl command to feed this file to OpenSearch:

- curl -X POST "localhost:9200/epi_recipes/_bulk" -H 'Content-Type: application/json' --data-binary @epi_recipes_bulk.json

### 4. Update Index Settings

- Use the settings.json file to update the index settings. Execute the following curl command:

- curl -X PUT "localhost:9200/epi_recipes/_settings" -H 'Content-Type: application/json' -d @settings.json

### 5. Install Backend Dependencies

- Create a virtual environment (if not already created):

- python -m venv venv

### 6. Activate the virtual environment:

- source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
- Install the necessary Python modules:

- pip install -r requirements.txt

### 7. Run the Backend Server

- Start the backend server by running:

- python main.py


## Set Up the Frontend

### 1. Navigate to the Frontend Directory

- Go to the epirecipes-frontend folder:

- cd epirecipes-frontend

### 2. Install Frontend Dependencies

- Install the required npm packages:

- npm install

### 3. Run the Frontend

- Start the frontend development server:

- npm start
