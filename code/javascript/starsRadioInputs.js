// Name: Michael Stroet
// Student number: 11293284

function radioInputs() {
    /*
     *
     */
    // Create a dropdown menu for the stars
    var radioInputs = d3.select("#radioInputs")

    radioInputs.append("input")
        .attr("type", "radio")
        .on("click", function() {
            console.log("pressed");
        })
        .text("All");

    radioInputs.append("input")
        .attr("type", "radio")
        .on("click", function() {
            console.log("pressed");
        })
        .text("Proper");
};
