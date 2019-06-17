// Name: Michael Stroet
// Student number: 11293284

// Global variables for the original dataset and selection criteria
var originalDataset;
var selections = {
    "distance" : false,
    "type" : false,
    "temperature" : false,
    "radius" : false
}

window.onload = function() {
    /*
     * When the page is loaded, loads the data and visualises it
     */
    // path to the data file
    // var inputJSON = "../../data/stars.json";
    var inputJSON = "../../data/properStars.json";

    // Import the json and visualise its contents
    d3.json(inputJSON).then(function(dataset) {
        originalDataset = dataset;
        visualisationStars(dataset);
    });
};

function visualisationStars(dataset) {
    /*
     * Initialises the visualisation with the given dataset
     */
    // Create the html tags required for the visualisations
    var body = d3.select("body");
    createTooltipDivs(body);
    createFigureSvgs(body);

    // Create the dropdown menu for the stars with proper names
    properDropdown(dataset);

    // Create a distance slider
    distanceSlider(dataset);

    // Create a reset button
    resetButton();

    // Draw a scatterplot of stars
    scatterPlot(dataset);

    // Draw a piechart of star types
    pieChart(dataset);

    // Draw a histogram of the stars' effective temperatures
    temperatureHist(dataset);

    // Draw a histogram of the stars' masses or radii
    massRadiusHist(dataset);
};

function updateGraphs() {
    /*
     *
     */

    newData = getNewDatasets();

    var newDataset = newData[0];
    var highlightDataset = newData[1];
    var dimDataset = newData[2];

    highlightHRDiagram(highlightDataset, dimDataset);

    updatePiechart(newDataset);

    updateTemperatureHist(newDataset);

    updateMassRadiusHist(newDataset);
};

function createTooltipDivs(body) {
    /*
     * Creates div tags for all tooltips to be used in the visualisation
     */
    // Adds a div of class tooltip with a specific id
    var addTooltipDiv = function(className) {
        body.append("div")
            .attr("class", "tooltip")
            .attr("id", `${className}`)
            .style("opacity", 0);
    };

    // Define "div"s for tooltips for all figures
    addTooltipDiv("HR-diagramTip");
    addTooltipDiv("piechartTip");
    addTooltipDiv("temperatureTip");
    addTooltipDiv("mass-radiusTip");
};

function createFigureSvgs(body) {
    /*
     * Creates svg tags for all figures to be used in the visualisation
     */
    // Get the dimensions for the Hertzsprung-Russell diagram
    var widthHRdiagram = document.getElementById("HRdiagram").clientWidth;
    var heightHRdiagram = widthHRdiagram;

    // Get the dimensions for the distance slider
    var widthSlider = document.getElementById("distanceSlider").clientWidth;
    var heightSlider = heightHRdiagram;

    // Get the dimensions for the piechart
    var widthPiechart = document.getElementById("piechart").clientWidth;
    var heightPiechart = widthPiechart;

    // Get the dimensions for the temperature histogram
    var widthTemperatureHist = document.getElementById("temperatureHist").clientWidth;
    var heightTemperatureHist = widthTemperatureHist / ((1 + Math.sqrt(5)) / 2);

    // Get the dimensions for the mass/radius histogram
    var widthMassRadiusHist = document.getElementById("massRadiusHist").clientWidth;
    var heightMassRadiusHist = widthMassRadiusHist / ((1 + Math.sqrt(5)) / 2);

    // Adds a svg of class container with a specific id and dimensions
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
};

// window.onresize = resize;
//
// function resize() {
//     /*
//      * Resize the svg's when the window is resized (doesn't resize the actual figures)
//      */
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
