# Name: Michael Stroet
# Student number: 11293284

"""
This script converts a txt file with colors into two jsons
"""

import os

# Find the data directory
python_directory = os.path.dirname(os.path.realpath(__file__))
root_directory = os.path.dirname(os.path.dirname(python_directory))
data_directory = os.path.join(root_directory, "data")

import json

# In- and output files
INPUT_TXT = os.path.join(data_directory, "bbr_color.txt")
OUTPUT_2DEG = os.path.join(data_directory, "bbr_color_2deg.json")
OUTPUT_10DEG = os.path.join(data_directory, "bbr_color_10deg.json")

def get_color_dicts():
    '''
    Converts a txt file into two dictionaries
    '''
    with open(INPUT_TXT, "r") as file:
        # Split the file into a list of lines
        file_lines = file.readlines()

        # Add each (uncommented) line to their designated dictionary
        dict_2deg = {}
        dict_10deg = {}
        for line in file_lines:
            if not line[0] == "#":
                # Split the line into a list
                line_list = []
                for element in line.split(" "):
                    if not element == "":
                        line_list.append(element)

                # Isolate the temperature and color from the line
                temperature = line_list[0]
                color_hex = line_list[-1][:-1]

                if line_list[2] == "2deg":
                    dict_2deg[temperature] = color_hex

                else:
                    dict_10deg[temperature] = color_hex

        return dict_2deg, dict_10deg

def save_json(output_json, dict):
    '''
    Output a JSON file of the given dictionary
    '''
    # Convert the dictionary to a json string
    data_json = json.dumps(dict)

    with open(output_json, 'w') as outfile:
        outfile.write(data_json)

if __name__ == "__main__":

    # Get the color dictionaries from the txt file
    dict_2deg, dict_10deg = get_color_dicts()

    # Write the dictionaries to two json files
    save_json(OUTPUT_2DEG, dict_2deg)
    save_json(OUTPUT_10DEG, dict_10deg)
