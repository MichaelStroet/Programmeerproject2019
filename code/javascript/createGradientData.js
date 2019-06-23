// Name: Michael Stroet
// Student number: 11293284

function createGradientData(minTemperature, maxTemperature) {
    /*
     *  Creates the data for the linear color gradient and returns it
     */
    var gradientData = [];
    var percentage = 5;
    for (var i = 0; i <= 100; i += percentage) {
        gradientData.push(
            {
                offset: `${i}%`,
                color: `${pickColour(minTemperature + (i / 100) * maxTemperature)}`
            }
        );
    };

    return gradientData;
};

function pickColour(temperature) {
    /*
     * Turns a temperature into a color value and returns it
     */
     return colorDataset[Math.floor(temperature / 100) * 100];
 };
