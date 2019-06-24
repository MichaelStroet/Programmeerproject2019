// Name: Michael Stroet
// Student number: 11293284

function properDropdown() {
    /*
     * Creates a dropdown menu for selecting stars with proper names
     */
    // Select the div for the dropdown menu
    var properMenu = d3.select("#properDropdown")

    // Create the dropdown menu from the 'proper name' dataset
    properMenu.append("select")
        .selectAll("option")
        .data(Object.keys(properDataset).sort())
        .enter()
        .append("option")
        .attr("value", function (star) {
            return star;
        })
        .text(function (star) {
            return star;
        });

    // Highlight the selected star
    properMenu.on("change", function() {
            // Find which star was selected from the dropdown menu
            var starName = d3.select(this)
                .select("select")
                .property("value");

            highlightStar([starName, properDataset[starName]]);
        });
};
