// Name: Michael Stroet
// Student number: 11293284

function maxValue(stars, valueName) {
    /*
     * Determines the maximum value of a specific column of data
     */
    return d3.max(stars, function(star) {
        return star[valueName];
    });
};

function minValue(stars, valueName) {
    /*
     * Determines the minimum value of a specific column of data
     */
    return d3.min(stars, function(star) {
        return star[valueName];
    });
};
