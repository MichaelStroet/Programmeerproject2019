// Name: Michael Stroet
// Student number: 11293284

function getNewDatasets() {
    /*

    */
    var newDataset = {};
    var highlightDataset = {};
    var dimDataset = {};

    var stars = Object.entries(originalDataset)
    console.log(selections);

    stars.forEach(function(star) {

        if (addStar(star[1])) {
            newDataset[star[0]] = star[1];
            highlightDataset[star[0]] = star[1];
        }
        else {
            dimDataset[star[0]] = star[1];
        };

    });

    return [newDataset, highlightDataset, dimDataset]
};

function addStar(star) {

    var includeStar = true;

    let selectDistance = selections["distance"];

    if (selectDistance) {
        let distance = star["Afstand"];
        if (distance < selectDistance[0] && distance > selectDistance[1]) {
            includeStar = false;
        };
    };

    let selectType = selections["type"];
    if (selectType) {
        let type = star["Type"];
        if (type != selectType) {
            includeStar = false;
        };
    };

    let selectTemperature = selections["temperature"];
    if (selectTemperature) {
        let temperature = star["Temperatuur"];
        if (temperature < selectTemperature[0] && temperature > selectTemperature[1]) {
            includeStar = false;
        };
    };

    let selectRadius = selections["radius"];
    if (selectRadius) {
        let radius = star["Straal"];
        if (radius < selectRadius[0] && radius > selectRadius[1]) {
            includeStar = false;
        };
    };

    return includeStar;
};
