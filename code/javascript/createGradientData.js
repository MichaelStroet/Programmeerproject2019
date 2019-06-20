// Name: Michael Stroet
// Student number: 11293284

function createGradientData(minTemperature, maxTemperature) {
    /*
     *
     */
    var gradientData = [];

    for (var i = 0; i <= 100; i += 5) {
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
     *
     */
     return colorDataset[Math.floor(temperature / 100) * 100];
 };
