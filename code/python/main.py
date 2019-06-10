# Name: Michael Stroet
# Student number: 11293284

"""
This script converts a csv file into a JSON file
"""

import os

python_directory = os.path.dirname(os.path.realpath(__file__))
root_directory = os.path.dirname(os.path.dirname(python_directory))
data_directory = os.path.join(root_directory, "data")

import json
import numpy as np
import pandas as pd

from add_temperature import add_temperature, add_radius
# Global constants for in and out put files and the required columns
INPUT_CSV = os.path.join(data_directory, "hygdata_v3.csv")
OUTPUT_JSON = os.path.join(data_directory, "stars.json")

WANTED_DATA = ["proper", "dist", "ci", "lum"]

def open_csv():
    '''
    Opens a csv file and returns a pandas dataframe
    '''
    df = pd.read_csv(INPUT_CSV, usecols = WANTED_DATA)
    return(df)

def clean_data(df):
    '''
    Remove missing or invalid data
    '''
    # Replace all invalid distance values with NaN
    df.loc[df["dist"] >= 100000, "dist"] = np.nan

    # Remove all rows with missing and/or invalid data
    df.dropna(subset = ["dist", "ci", "lum"], inplace = True)

    return df

def prepare_data(df):
    '''
    Converts the data frame into a dictionary in which each star is an entry.
    '''
    star_dictionary = {}

    for index, row in df.iterrows():

        if index % 1000 == 0:
            print(f"index: {index}")

        type = row["type"]
        proper = row["proper"]
        properties = {
            "Type" : row["type"],
            "Temperatuur" : row["Teff"],
            "Lichtkracht" : row["lum"],
            "Afstand" : row["dist"],
            "Kleur" : row["color"],
            "Massa" : row["mass"],
            "Straal" : row["radius"]
        }

        if isinstance(proper, str):
            star_dictionary[proper] = properties
        else:
            star_dictionary[index] = properties

    return star_dictionary

def save_json(dict):
    '''
    Output a JSON file of the given dictionary
    '''
    # Convert the dictionary to a json string
    data_json = json.dumps(dict)

    with open(OUTPUT_JSON, 'w') as outfile:
        outfile.write(data_json)

if __name__ == "__main__":

    # Open the csv and convert it to a pandas dataframe object
    dataframe = open_csv()

    # Remove invalid or missing data from the dataframe
    dataframe = clean_data(dataframe)

    # Assign an effective temperature to each star with the color index
    dataframe = add_temperature(dataframe)

    # Assign a color to each star by turning the color index into a RGB color value (3x 0-255 or hex?)

    # Assign a radius to each star with the temperature and luminosity
    dataframe = add_radius(dataframe)
    print(dataframe)

    # Assign a category to each star based on predetermined polygons

    # Assign a mass to each star with the category and the mass-luminosity relation

    # RANDOM DATA
    categories = ["Rode dwergen", "Hoofdreeks", "Reuzen", "Superreuzen", "Witte dwergen"]
    dataframe["type"] = np.random.choice(categories, dataframe.shape[0])

    dataframe["color"] = "#4169e1"

    dataframe["mass"] = np.random.randint(0, 70, dataframe.shape[0])

    # Convert the data into a useful dictionary
    data_dict = prepare_data(dataframe)

    # Save the data as a json file
    save_json(data_dict)
