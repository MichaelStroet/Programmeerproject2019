// Name: Michael Stroet
// Student number: 11293284


function distanceSlider(dataset) {
    /*

    */

    // DROPDOWN MENU SO SOMETHING IS PLACED IN THE DIV

    // Create a dropdown menu for the different stars with proper names
    var properMenu = d3.select("#distanceSlider")

    properMenu.append("select")
        .selectAll("option")
        .data(Object.keys(dataset).sort())
        .enter()
        .append("option")
        .attr("value", function (star) {
            return star;
        })
        .text(function (star) {
            return star;
        });
};
