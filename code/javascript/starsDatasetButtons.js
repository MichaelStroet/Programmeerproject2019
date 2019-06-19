// Name: Michael Stroet
// Student number: 11293284

function datasetButtons() {
    /*
     *
     */

    // Create a dropdown menu for the stars
    var properDatasetButton = d3.select("#properDatasetButton");

    properDatasetButton.append("button")
        .attr("type", "button")
        .attr("class", "button")
        .on("click", function() {
            originalDataset = properDataset;
            updateGraphs();
        })
        .text("Bekende sterren");

    var allDatasetButton = d3.select("#allDatasetButton");

    allDatasetButton.append("button")
        .attr("type", "button")
        .attr("class", "button")
        .on("click", function() {
            originalDataset = allDataset;
            selections["distance"] = [0, 50]
            updateGraphs();
        })
        .text("100.000 sterren");
};
