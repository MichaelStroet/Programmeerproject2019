// Name: Michael Stroet
// Student number: 11293284

function resetButton() {
    /*
     * Creates several buttons which reset one or all of the current selections
     */
    // Create a button which resets all selections
    d3.select("#resetButton").append("button")
        .attr("type", "button")
        .attr("class", "resetButton")
        .on("click", function() {
            // Undo all selections and update the visualisation
            selections = {
                "distance" : false,
                "type" : false,
                "temperature" : false,
                "radius" : false
            };
            updateGraphs();
        })
        .text("Reset alle selecties");

    // Object for converting the selection names into dutch
    var selectionsDutch = {
        "distance" : "Afstand",
        "type" : "Type",
        "temperature" : "Temp.",
        "radius" : "Straal"
    };

    // Create a reset button for each selection
    Object.keys(selections).forEach(function(selection) {
        var row = d3.select(`.row#${selection}Reset`)

        // Create a button which resets one of the selections
        row.append("div")
            .attr("class", "col-sm-5")
            .append("button")
                .attr("type", "button")
                .attr("class", "selectionButton")
                .on("click", function() {
                    // Undo the selection and update the visualisation
                    selections[selection] = false;
                    updateGraphs();
                })
                .text(selectionsDutch[selection]);

        // Create a column for the selection value text
        var selectionValues = row.append("div")
            .attr("class", "col-sm-7 nopadding")
            .attr("id", selection);
    });
};

function updateSelections() {
    /*
     * Updates the selection value texts
     */
    // Update or remove the text for each selection
    Object.keys(selections).forEach(function(selection) {
        var selectionValue = d3.select(`#${selection}`);

        // If this selection has a value, write the value(s)
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
        // If this selection has no value, write an empty string
        else {
            selectionValue.html("");
        };
    });
};
