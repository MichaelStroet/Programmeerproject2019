// Name: Michael Stroet
// Student number: 11293284

function resetButton() {
    /*
     *
     */
    // Create a dropdown menu for the stars
    var resetButton = d3.select("#resetButton")

    resetButton.append("button")
        .attr("type", "button")
        .on("click", function() {
            selections = {
                "distance" : false,
                "type" : false,
                "temperature" : false,
                "radius" : false
            };
            updateGraphs();
        })
        .text("Selectie reset");
};
