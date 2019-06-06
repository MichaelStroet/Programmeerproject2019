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

from matplotlib.patches import Polygon
from matplotlib.collections import PatchCollection

def open_csv(input_csv, wanted_data):
    '''
    Opens a csv file and returns a pandas dataframe
    '''
    df = pd.read_csv(input_csv, usecols = wanted_data)
    return(df)

def open_txt(input_txt):
    '''
    Reads a text file and returns the rows as a list
    '''
    # Opens the file as a list of strings and returns it
    with open(input_txt, "r") as file:
        file_content = file.read()
        file_lines = file_content.split()

    return file_lines

def convert_txt(input_txt):
    '''
    Parses a text file and returns a dictionary of the rows with
    the first row value as key
    '''
    # Get the line of the file
    lines = open_txt(input_txt)

    polygons = {}

    # For each line, add the polygon information to the dictionary
    for line in lines:
        elements = line.split(",")
        category = elements[0]
        del elements[0]
        points = list(map(int, elements))

        polygons[category] = points

    return polygons

def points_to_coords(coordinates, polygons):
    pass

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

def plot_polygons(coordinates, polygons):

    fig = plt.figure("Hertzsprung-Russell diagram", figsize = (6,6))


if __name__ == "__main__":

    # Open the temperature csv and convert it to a pandas dataframe object
    input = os.path.join(data_directory, "temperature.csv")
    data = ["Teff", "lum"]
    df_HR = open_csv(input, data)

    # # Open the polygon_connections txt and convert it to a dictionary of polygons
    # input = os.path.join(data_directory, "polygon_connections.txt")
    # polygons = convert_txt(input)
    # print(polygons)
    #
    # for category, points in polygons.items():
    #     print(category, points)
    #
    # # Open the polygon_points csv and convert it to a pandas dataframe object
    # input = os.path.join(data_directory, "polygon_points.csv")
    # data = ["Teff", "lum"]
    # df_pol = open_csv(input, data)
    #
    # polygons = points_to_coords(df_pol.values.tolist(), polygons)

    # Plot the Herzsprung-Russell diagram
    plot_HR(df_HR["Teff"].tolist(), df_HR["lum"].tolist())
    #
    # # Plot the polygons in the HR-diagram
    # plot_polygons(df_pol.values.tolist(), polygons)

    plt.show()
