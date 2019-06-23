// Name: Michael Stroet
// Student number: 11293284

function getNewDatasets() {
    /*
     * Filters the originalDataset with the current selections and returns a new dataset
     */
    // For each star, check if it has to be added to the dataset. If so, add it.
    var newDataset = {};
    var stars = Object.entries(originalDataset)
    stars.forEach(function(star) {
        if (addStar(star[1])) {
            newDataset[star[0]] = star[1];
        };
    });
    return newDataset
};

function addStar(star) {
    /*
     * A series of check to determine if the star will be added to the database
     */
    // Check if the star is within the selected distance range
    let selectDistance = selections["distance"];
    if (selectDistance) {
        let distance = star["Afstand"];
        if (distance < selectDistance[0] || distance > selectDistance[1]) {
            return false;
        };
    };

    // Check if the star is of the selected type
    let selectType = selections["type"];
    if (selectType) {
        let type = star["Type"];
        if (type != selectType) {
            return false;
        };
    };

    // Check if the star is within the selected temperature range
    let selectTemperature = selections["temperature"];
    if (selectTemperature) {
        let temperature = star["Temperatuur"];
        if (temperature < selectTemperature[0] || temperature > selectTemperature[1]) {
            return false;
        };
    };

    // Check if the star is within the selected radius range
    let selectRadius = selections["radius"];
    if (selectRadius) {
        let radius = star["Straal"];
        if (radius < selectRadius[0] || radius > selectRadius[1]) {
            return false;
        };
    };

    // Star will be included!
    return true;
};
