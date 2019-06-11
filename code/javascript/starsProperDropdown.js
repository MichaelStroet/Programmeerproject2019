// Name: Michael Stroet
// Student number: 11293284

function properDropdown(dataset) {
    /*
    Creates an interactive dropdown menu for selecting stars with proper names
    */

    // Get all stars with proper names from the dataset
    var properStarArray = [];

    Object.keys(dataset).forEach(function(star) {
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
            console.log(`Selected star:\n${star}`)
            return star;
        })
        .text(function (star) {
            return star;
        });
};
