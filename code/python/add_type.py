# Name: Michael Stroet
# Student number: 11293284

import matplotlib.path

from get_polygons import polygon_coordinates

def find_type(polygons, temperature, luminosity):
    '''

    '''
    for type in polygons:
        polygon = polygons[type]

        polygon_path = matplotlib.path.Path(polygon, closed = True, readonly = True)

        star_in_polygon = polygon_path.contains_point([temperature, luminosity])

        if star_in_polygon:
            return type

    exit("Error: Star type not found.")

def add_type(df, data_directory):
    '''

    '''
    polygons = polygon_coordinates(data_directory)

    star_types = []

    for temperature, luminosity in zip(df["Teff"], df["lum"]):
        star_types.append(find_type(polygons, temperature, luminosity))

    df["type"] = star_types
    return df
