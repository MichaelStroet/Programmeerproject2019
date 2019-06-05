# Name: Michael Stroet
# Student number: 11293284

def calc_temp(color_index):
    '''
    Calculates the effective temperature in Kelvin of a star from it's (B-V) color index
    '''

    # Calculate the temperature
    return 4600 * (pow((0.92 * color_index + 1.7), -1) + pow((0.92 * color_index + 0.62), -1))

if __name__ == "__main__":

    ci_sol = 0.656

    # Effective temperatur of the sun = 5777 Kelvin
    print(calc_temp(ci_sol))
