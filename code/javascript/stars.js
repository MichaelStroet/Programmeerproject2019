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

    var addFigureSvg = function(divId, svgWidth, svgHeight, svgId) {
        d3.select(divId)
            .append("svg")
                .attr("class", "container")
                .attr("id", svgId)
                .attr("width", svgWidth)
                .attr("height", svgHeight);
    };

    // Define "svg"s for all figures and the slider
    addFigureSvg("#HRdiagram", widthHRdiagram, heightHRdiagram, "svgHRdiagram");
    addFigureSvg("#distanceSlider", widthSlider, heightSlider, "svgDistanceSlider");
    addFigureSvg("#piechart", widthPiechart, heightPiechart, "svgPiechart");
    addFigureSvg("#temperatureHist", widthTemperatureHist, heightTemperatureHist, "svgTemperatureHist");
    addFigureSvg("#massRadiusHist", widthMassRadiusHist, heightMassRadiusHist, "svgMassRadiusHist");

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
