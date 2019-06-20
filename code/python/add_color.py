# Name: Michael Stroet
# Student number: 11293284

import json
import numpy as np

def open_json(json_path):
    '''
    Calculates the effective temperature in Kelvin from the color index
    '''
    with open(json_path, "r") as file:
        json_file = file.read()
        json_dict = json.loads(json_file)

        return json_dict

def get_color(temperature, temperature_dictionary):
     '''

     '''
     temperature_key = str(int(np.floor(temperature / 100) * 100))
     return temperature_dictionary[temperature_key]

def add_color(df, json_path):
    '''
    Calculates the effective temperature and adds it to the dataframe
    '''
    temperature_dictionary = open_json(json_path)
    star_colors = []

    for temperature in df["Teff"]:
        star_colors.append(get_color(temperature, temperature_dictionary))

    df["color"] = star_colors
    return df
