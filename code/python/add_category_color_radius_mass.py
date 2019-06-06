# Name: Michael Stroet
# Student number: 11293284

"""
This script converts a csv file into a JSON file
"""

import os

python_directory = os.path.dirname(os.path.realpath(__file__))
root_directory = os.path.dirname(os.path.dirname(python_directory))
data_directory = os.path.join(root_directory, "data")

import numpy as np
import pandas as pd

# Global constants for in and out put files and the required columns
INPUT_CSV = os.path.join(data_directory, "temperature.csv")
OUTPUT_CSV = os.path.join(data_directory, "stars.csv")

def open_csv():
    '''
    Opens a csv file and returns a pandas dataframe
    '''
    df = pd.read_csv(INPUT_CSV)
    return(df)

def calc_temp(color_index):
    '''
    Calculates the effective temperature in Kelvin of a star from it's (B-V) color index
    '''
    # Calculate the temperature
    return 4600 * (pow((0.92 * color_index + 1.7), -1) + pow((0.92 * color_index + 0.62), -1))

def add_variables(df):
    '''
    Adds the category, color and mass columns to the dataframe
    '''

    # RANDOM FOR NOW
    categories = ["Rode dwergen", "Hoofdreeks", "Reuzen", "Superreuzen", "Witte dwergen"]
    df["type"] = np.random.choice(categories, df.shape[0])

    df["color"] = "#4169e1"

    df["radius"] = np.random.randint(0, 2000, df.shape[0])

    df["mass"] = np.random.randint(0, 70, df.shape[0])

    return df

if __name__ == "__main__":

    # Open the csv and convert it to a pandas dataframe object
    dataframe = open_csv()
    print(dataframe)

    # Preprocess the dataframe
    complete_df = add_variables(dataframe)
    print(complete_df)

    # Save the preprocessed dataframe as a new csv file
    complete_df.to_csv(OUTPUT_CSV)
