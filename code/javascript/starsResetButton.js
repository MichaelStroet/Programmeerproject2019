// Name: Michael Stroet
// Student number: 11293284

function resetButton() {
    /*
     *
     */
    // Create a
    var resetButton = d3.select("#resetButton")

    resetButton.append("button")
        .attr("type", "button")
        .attr("class", "resetButton")
        .on("click", function() {
            selections = {
                "distance" : false,
                "type" : false,
                "temperature" : false,
                "radius" : false
            };
            updateGraphs();
        })
        .text("Reset alle selecties");

    var selectionsDutch = {
        "distance" : "Afstand",
        "type" : "Type",
        "temperature" : "Temp.",
        "radius" : "Straal"
    };

    Object.keys(selections).forEach(function(selection) {
        var row = d3.select(`.row#${selection}Reset`)

        row.append("div")
            .attr("class", "col-sm-5")
            .append("button")
                .attr("type", "button")
                .attr("class", "selectionButton")
                .on("click", function() {
                    selections[selection] = false;
                    updateGraphs();
                })
                .text(selectionsDutch[selection]);

        var selectionValues = row.append("div")
            .attr("class", "col-sm-7 nopadding")
            .attr("id", selection);
    });
};

function updateSelections() {
    /*
     *
     */

    Object.keys(selections).forEach(function(selection) {
        var selectionValue = d3.select(`#${selection}`);

        if (selections[selection]) {
            if (selection == "type") {
                selectionValue.html(selections[selection]);
            }
            else {
                var minValue = d3.min(selections[selection]);
                var maxValue = d3.max(selections[selection])
                selectionValue.html(`${minValue} - ${maxValue}`);
            };
        }
        else {
            selectionValue.html("");
        };
    });
};
