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
    Parses a text file and returns a dictionary with the first element as keys
    and the rest as a list
    '''
    # Get the lines of the text file
    lines = open_txt(input_txt)

    dictionary = {}

    # For each line, add the polygon information to the dictionary
    for line in lines:
        values = line.split(",")
        key = values[0]
        del values[0]

        dictionary[key] = values

    return dictionary

def polygon_coordinates():
    '''
    Convert the polygon text files to a list of polygons
    '''
    # Open the polygon_connections txt and convert it to a dictionary of polygons
    input = os.path.join(data_directory, "polygon_connections.txt")
    polygons = convert_txt(input)

    # Open the polygon_connections txt and convert it to a dictionary of coordinates
    input = os.path.join(data_directory, "polygon_points.txt")
    coordinates = convert_txt(input)

    # Replace each point in polygons with its coordinate
    for polygon in polygons:
        for i, point in enumerate(polygons[polygon]):
            polygons[polygon][i] = list(map(float, coordinates[point]))

    return polygons

def plot_HR(temperatures, luminosities, polygons):
    '''
    Plots a Hertzsprung-Russell scatterplot with logarithmic axes
    '''

    colors = ["blue", "red", "green", "orange", "purple"]

    plt.figure("Hertzsprung-Russell diagram", figsize = (6,6))

    for i, polygon in enumerate(polygons):
        L_x = []
        L_y = []

        for coordinate in polygons[polygon]:
            L_x.append(coordinate[0])
            L_y.append(coordinate[1])

        plt.plot(L_x, L_y, color = colors[i], label = polygon)

    plt.scatter(temperatures, luminosities, 0.05)

    plt.xlabel("Effective temperature (K)")
    plt.xlim(min(temperatures), max(temperatures))
    plt.xscale("log")

    plt.ylabel("Luminosity relative to sun")
    plt.ylim(min(luminosities), max(luminosities))
    plt.yscale("log")

    plt.title("Hertzsprung-Russell diagram all stars")
    plt.legend(loc = "upper right")

    ax = plt.gca()
    ax.invert_xaxis()

if __name__ == "__main__":

    # Open the temperature csv and convert it to a pandas dataframe object
    input = os.path.join(data_directory, "temperature.csv")
    data = ["Teff", "lum"]
    df_HR = open_csv(input, data)

    # Get the coordinates of each category polygon
    polygons = polygon_coordinates()

    # Plot the Herzsprung-Russell diagram
    plot_HR(df_HR["Teff"].tolist(), df_HR["lum"].tolist(), polygons)
    
    plt.show()
