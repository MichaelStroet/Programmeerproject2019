// Name: Michael Stroet
// Student number: 11293284

window.onload = function() {
    /*
     * Main function
     */
    // var inputJSON = "../../data/stars.json";
    var inputJSON = "../../data/properStars.json";

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
    /*

    */

    var widthHRdiagram = document.getElementById("HRdiagram").clientWidth;
    var heightHRdiagram = widthHRdiagram;

    var widthSlider = document.getElementById("distanceSlider").clientWidth;
    var heightSlider = heightHRdiagram;

    var widthPiechart = document.getElementById("piechart").clientWidth;
    var heightPiechart = widthPiechart;

    var widthTemperatureHist = document.getElementById("temperatureHist").clientWidth;
    var heightTemperatureHist = widthTemperatureHist / 1.5;

    var widthMassRadiusHist = document.getElementById("massRadiusHist").clientWidth;
    var heightMassRadiusHist = widthMassRadiusHist / 1.5;

    var body = d3.select("body");

    var addTooltipDiv = function(className) {
        body.append("div")
            .attr("class", "tooltip")
            .attr("id", `${className}`)
            .style("opacity", 0);
    };
    // Define "div"s of tooltips for all figures
    addTooltipDiv("HR-diagramTip");
    addTooltipDiv("piechartTip");
    addTooltipDiv("temperatureTip");
    addTooltipDiv("mass-radiusTip");

    // Define a "svg" for the HRdiagram
    var svgHRdiagram = d3.select("#HRdiagram")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgHRdiagram")
        .attr("width", widthHRdiagram)
        .attr("height", heightHRdiagram);

    var svgDistanceSlider = d3.select("#distanceSlider")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgDistanceSlider")
        .attr("width", widthSlider)
        .attr("height", heightSlider)

    // Define a "svg" for the piechart
    var svgPiechart = d3.select("#piechart")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgPiechart")
        .attr("width", widthPiechart)
        .attr("height", heightPiechart);

    // Define a "svg" for the temperature histogram
    var svgTemperatureHist = d3.select("#temperatureHist")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgTemperatureHist")
        .attr("width", widthTemperatureHist)
        .attr("height", heightTemperatureHist);

    // Define a "svg" for the mass-radius histogram
    var svgMassRadiusHist = d3.select("#massRadiusHist")
        .append("svg")
        .attr("class", "container")
        .attr("id", "svgMassRadiusHist")
        .attr("width", widthMassRadiusHist)
        .attr("height", heightMassRadiusHist);

    // Create the dropdown menu for the stars with proper names
    properDropdown(dataset)

    // Create the distance slider
    distanceSlider(dataset)

    // Draw a scatterplot of stars
    scatterPlot(dataset)

    // Draw a piechart of star types
    pieChart(dataset)

    // Draw a histogram of the stars' effective temperatures
    temperatureHist(dataset)

    // Draw a histogram of the stars' masses or radii
    massRadiusHist(dataset)


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
