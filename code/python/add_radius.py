# Name: Michael Stroet
# Student number: 11293284

import math

def calculate_radius(temperature, luminosity):
    '''
    Calculates the radius in meters with the Stefan-Boltzmann law
    '''
    SB_constant = 5.670374419E-8 # W m^-2 K^-4
    luminosity_sun = 3.828E26 # W

    return pow((luminosity * luminosity_sun) / (4 * math.pi * SB_constant * pow(temperature, 4)), 0.5)

def add_radius(df):
    '''
    Calculates the radius and adds it to the dataframe
    '''
    return df.assign(radius = calculate_radius(df["Teff"], df["lum"]))
