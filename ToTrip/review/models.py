import os

models_file_path = os.path.join(extract_dir, 'ToTrip-Backend/ToTrip/TripPlanner/models.py')

# Read the current content of models.py to check its structure
with open(models_file_path, 'r') as file:
    models_content = file.read()

# Display the beginning of the models.py file to locate where to add the Review model
models_content[:500]  # Showing only the first 500 characters for context
