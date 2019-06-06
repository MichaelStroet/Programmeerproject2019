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

# Global constants for in and out put files and the required columns
INPUT_CSV = os.path.join(data_directory, "stars.csv")
OUTPUT_JSON = os.path.join(data_directory, "stars.json")

def open_csv():
    '''
    Opens a csv file and returns a pandas dataframe
    '''
    df = pd.read_csv(INPUT_CSV)
    return(df)

def prepare_data(df):
    '''

    '''
    dictionary = {
        "Rode dwergen" : {},
        "Hoofdreeks" : {},
        "Reuzen" : {},
        "Superreuzen" : {},
        "Witte dwergen" : {}
    }

    for index, row in df.iterrows():

        if index % 1000 == 0:
            print(f"index: {index}")

        type = row["type"]
        proper = row["proper"]
        properties = {
            "Temperatuur" : row["Teff"],
            "Lichtkracht" : row["lum"],
            "Afstand" : row["dist"],
            "Kleur" : row["color"],
            "Massa" : row["mass"],
            "Straal" : row["radius"]
        }

        if isinstance(proper, str):
            dictionary[type][proper] = properties
        else:
            dictionary[type][index] = properties

    return dictionary


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
    print(dataframe)

    # Convert the data into a useful dictionary
    data_dict = prepare_data(dataframe)

    # Save the data as a json file
    save_json(data_dict)
