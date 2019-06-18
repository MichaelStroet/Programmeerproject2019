// Name: Michael Stroet
// Student number: 11293284

function properDropdown() {
    /*
    Creates an interactive dropdown menu for selecting stars with proper names
    */

    // Get all stars with proper names from the dataset
    var properStarArray = [];

    Object.keys(properDataset).forEach(function(star) {
        if (isNaN(star)) {
            properStarArray.push(star)
        };
    });

    // Create a dropdown menu for the stars
    var properMenu = d3.select("#properDropdown")

    properMenu.append("select")
        .selectAll("option")
        .data(properStarArray.sort())
        .enter()
        .append("option")
        .attr("value", function (star) {
            return star;
        })
        .text(function (star) {
            return star;
        });

    //
    properMenu.on("change", function() {

            // Find which star was selected from the dropdown menu
            var star = d3.select(this)
                .select("select")
                .property("value");

            var starEntry = [star, properDataset[star]];
            showStarInfo(starEntry);
            highlightStar(starEntry);
        });
};
