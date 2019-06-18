// Name: Michael Stroet
// Student number: 11293284

function radioInputs() {
    /*
     *
     */

    // Create a dropdown menu for the stars
    var radioInputs = d3.select("#radioInputs")

    radioInputs.append("button")
        .attr("type", "button")
        .on("click", function() {
            originalDataset = properDataset;
            selections["distance"] = [0, 100];
            updateGraphs();
        })
        .text("Bekende sterren");

    radioInputs.append("button")
        .attr("type", "button")
        .on("click", function() {
            originalDataset = allDataset;
            selections["distance"] = [0, 100];
            updateGraphs();
        })
        .text("100.000 sterren");
};
