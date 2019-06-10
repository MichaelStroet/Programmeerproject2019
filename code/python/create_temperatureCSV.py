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
INPUT_CSV = os.path.join(data_directory, "hygdata_v3.csv")
OUTPUT_CSV = os.path.join(data_directory, "temperature.csv")

WANTED_DATA = ["id", "proper", "dist", "ci", "lum"]

def open_csv():
    '''
    Opens a csv file and returns a pandas dataframe
    '''
    df = pd.read_csv(INPUT_CSV, usecols = WANTED_DATA)
    return(df)

def calc_temp(color_index):
    '''
    Calculates the effective temperature in Kelvin of a star from it's (B-V) color index
    '''
    # Calculate the temperature
    return 4600 * (pow((0.92 * color_index + 1.7), -1) + pow((0.92 * color_index + 0.62), -1))

def preprocess_data(df):
    '''
    Preprocesses the data
    '''

    # Replace all invalid distance values with NaN
    df.loc[df["dist"] >= 100000, "dist"] = np.nan

    # Remove all rows with missing and/or invalid data
    df.dropna(subset = ["dist", "ci", "lum"], inplace = True)

    # calculate the effective temperature from the color index and create a new column
    df = df.assign(Teff = calc_temp(df["ci"]))

    return df

if __name__ == "__main__":

    # Open the csv and convert it to a pandas dataframe object
    dataframe = open_csv()
    print(dataframe)

    # Preprocess the dataframe
    processed_df = preprocess_data(dataframe)
    print(processed_df)

    # Save the preprocessed dataframe as a new csv file
    processed_df.to_csv(OUTPUT_CSV)
