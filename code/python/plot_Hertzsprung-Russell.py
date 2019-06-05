# Name: Michael Stroet
# Student number: 11293284

"""
This script plots a Herzsprung-Russell diagram for determining the category borders
"""

import os

python_directory = os.path.dirname(os.path.realpath(__file__))
root_directory = os.path.dirname(os.path.dirname(python_directory))
data_directory = os.path.join(root_directory, "data")

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Global constants for the input csv
INPUT_CSV = os.path.join(data_directory, "temperature.csv")

WANTED_DATA = ["lum", "Teff"]

def open_csv():
    '''
    Opens a csv file and returns a pandas dataframe
    '''
    df = pd.read_csv(INPUT_CSV, usecols = WANTED_DATA)
    return(df)

def plot_HR(temperatures, luminosities):
    '''
    Plots a Hertzsprung-Russell scatterplot with logarithmic axes
    '''

    plt.figure("Hertzsprung-Russell diagram", figsize = (6,6))

    plt.scatter(temperatures, luminosities, 0.05)

    plt.title("Hertzsprung-Russell diagram all stars")

    plt.xlabel("Effective temperature (K)")
    plt.xlim(min(temperatures), max(temperatures))
    plt.xscale("log")

    plt.ylabel("Luminosity relative to sun")
    plt.ylim(min(luminosities), max(luminosities))
    plt.yscale("log")

    ax = plt.gca()
    ax.invert_xaxis()

    plt.show()

if __name__ == "__main__":

    # Open the csv and convert it to a pandas dataframe object
    df = open_csv()

    # Plot the Herzsprung-Russell diagram
    plot_HR(df["Teff"].tolist(), df["lum"].tolist())
