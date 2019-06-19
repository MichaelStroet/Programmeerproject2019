# Name: Michael Stroet
# Student number: 11293284

def calculate_temperature(color_index):
    '''
    Calculates the effective temperature in Kelvin from the color index
    '''
    return 4600 * (pow((0.92 * color_index + 1.7), -1) + pow((0.92 * color_index + 0.62), -1))

def add_temperature(df):
    '''
    Calculates the effective temperature and adds it to the dataframe
    '''
    return df.assign(Teff = calculate_temperature(df["ci"]))
