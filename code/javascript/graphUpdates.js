// Name: Michael Stroet
// Student number: 11293284

function updateGraphs() {
    /*
     *
     */
    unHighlightStar();

    var newDataset = getNewDatasets();

    updateHRDiagram(newDataset);

    updatePiechart(newDataset);

    updateTemperatureHist(newDataset);

    updateMassRadiusHist(newDataset);
};
