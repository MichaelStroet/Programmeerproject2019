// Name: Michael Stroet
// Student number: 11293284

function datasetButtons() {
    /*
     * Creates two buttons for switching datasets
     */
    // Create a button for selecting the 'proper name' dataset
    d3.select("#properDatasetButton").append("button")
        .attr("type", "button")
        .attr("class", "button")
        .on("click", function() {
            originalDataset = properDataset;
            updateGraphs();
        })
        .html("Bekende sterren");

    // Create a button for selecting the 'all stars' dataset
    d3.select("#allDatasetButton").append("button")
        .attr("type", "button")
        .attr("class", "button")
        .on("click", function() {
            originalDataset = allDataset;
            updateGraphs();
        })
        .html("100.000 sterren");
};
