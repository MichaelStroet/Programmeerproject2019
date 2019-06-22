# Name: Michael Stroet
# Student number: 11293284

import json
import numpy as np

def open_json(json_path):
    '''
    Reads a json file and returns a dictionary of its contents
    '''
    with open(json_path, "r") as file:
        json_file = file.read()
        json_dict = json.loads(json_file)

        return json_dict

def get_color(temperature, temperature_dictionary):
     '''
     Determine the color of a star with a specific temperature
     '''
     # Convert the temperature into the nearest hundredth and return the associated color
     temperature_key = str(int(np.floor(temperature / 100) * 100))
     return temperature_dictionary[temperature_key]

def add_color(df, json_path):
    '''
    Determines the color of each star and adds them to the dataframe
    '''
    # Get a dictionary of temperatures and colors from one of the color jsons
    temperature_dictionary = open_json(json_path)

    # Assign each star a color
    star_colors = []
    for temperature in df["Teff"]:
        star_colors.append(get_color(temperature, temperature_dictionary))

    # Add a color column to the dictionary
    df["color"] = star_colors
    return df
