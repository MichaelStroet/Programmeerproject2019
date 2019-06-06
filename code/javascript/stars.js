// Name: Michael Stroet
// Student number: 11293284

window.onload = function() {
    /*
     * Main function
     */
    var inputJSON = "../../data/stars.json";

    // Import the json and visualise its contents
    d3.json(inputJSON).then(function(dataset) {
        visualisationStars(dataset);
    });
};

function defineSVG(containerId, svgId, width, height) {

    var svg = d3.select(containerId)
        .append("svg")
        .attr("class", "container")
        .attr("id", svgId)
        .attr("width", width)
        .attr("height", height);

    return svg;
}

function visualisationStars(dataset) {

    var totalHeight = 600;

    var widthHRdiagram = document.getElementById("HRdiagram").clientWidth;
    var widthPiechart = document.getElementById("piechart").clientWidth;
    var widthTemperatureHist = document.getElementById("temperatureHist").clientWidth;
    var widthMassRadiusHist = document.getElementById("massRadiusHist").clientWidth;

    var body = d3.select("body")

    // Define a "div" for the HR-diagram tooltip
    body.append("div")
        .attr("class", "HR-tooltip")
        .style("opacity", 0);

    // Define a "div" for the piechart tooltip
    body.append("div")
        .attr("class", "pie-tooltip")
        .style("opacity", 0);

    // Define a "div" for the temperature histogram tooltip
    body.append("div")
        .attr("class", "temperature-tooltip")
        .style("opacity", 0);

    // Define a "div" for the mass-radius histogram tooltip
    body.append("div")
        .attr("class", "mass-radius-tooltip")
        .style("opacity", 0);

    // Define a "svg" for the HRdiagram
    var svgHRdiagram = d3.select("#HRdiagram")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgHRdiagram")
        .attr("width", widthHRdiagram)
        .attr("height", totalHeight);

    // Define a "svg" for the piechart
    var svgPiechart = d3.select("#piechart")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgPiechart")
        .attr("width", widthPiechart)
        .attr("height", totalHeight);

    // Define a "svg" for the temperature histogram
    var svgTemperatureHist = d3.select("#temperatureHist")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgTemperatureHist")
        .attr("width", widthTemperatureHist)
        .attr("height", totalHeight);

    // Define a "svg" for the mass-radius histogram
    var svgMassRadiusHist = d3.select("#massRadiusHist")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgMassRadiusHist")
        .attr("width", widthMassRadiusHist)
        .attr("height", totalHeight);

    // Draw a scatterplot of stars
    scatterPlot(dataset)
};

// window.onresize = resize;
//
// function resize() {
//     /*
//     * Resize the svg's when the window is resized (doesn't resize the actual figures)
//     */
//
//     var widthHRdiagram = document.getElementById("HRdiagram").clientWidth;
//     var widthPiechart = document.getElementById("piechart").clientWidth;
//     var widthTemperatureHist = document.getElementById("temperatureHist").clientWidth;
//     var widthMassRadiusHist = document.getElementById("massRadiusHist").clientWidth;
//
//     d3.select("#svgBarchart")
//         .attr('width', widthBarchart);
//     d3.select("#svgCalendar")
//         .attr('width', widthCalendar);
// };
