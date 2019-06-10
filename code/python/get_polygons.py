# Name: Michael Stroet
# Student number: 11293284

import os

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

def polygon_coordinates(data_directory):
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
