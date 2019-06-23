// Name: Michael Stroet
// Student number: 11293284

function updateGraphs() {
    /*
     * Main update function from which all other update functions are called.
     */

    // If a star is currently highlighted, return it to normal
    unHighlightStar();

    // Update the selections text
    updateSelections();

    // Get a new dataset with the current selections
    var newDataset = getNewDatasets();

    // Update the four figures with the new dataset
    updateHRDiagram(newDataset);
    updatePiechart(newDataset);
    updateTemperatureHist(newDataset);
    updateMassRadiusHist(newDataset);
};
