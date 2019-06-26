// Name: Michael Stroet
// Student number: 11293284

// Global variables for the datasets
var originalDataset;
var allDataset;
var properDataset;
var colorDataset;

// Global variable for keeping track of the selections for filtering stars from the datasets
var selections = {
    "distance" : false,
    "type" : false,
    "temperature" : false,
    "radius" : false
};

// Other global variables
var highlightedStar = false;
var transitionDuration = 1500;

window.onload = function() {
    /*
     * When the page is loaded, loads the data and visualises it
     */
    // path to the json files
    var allJSON = "../../data/stars.json";
    var properJSON = "../../data/properStars.json";
    var colorJSON = "../../data/bbr_color_2deg.json";

    // Load all json files into seperate datasets and visualise the stars
    Promise.all([d3.json(allJSON), d3.json(properJSON), d3.json(colorJSON)])
        .then(function(datasets) {
            allDataset = datasets[0];
            properDataset = datasets[1];
            colorDataset = datasets[2];

            // Set the currently used dataset to be the proper name dataset
            originalDataset = properDataset;

            // Visualise the dataset
            visualisationStars();
        })
        .catch(function(error) {
            throw(error);
        });
};

function visualisationStars() {
    /*
     * Initialises the visualisation of stars with four figures and several interactive elements
     */
    // Create the extra html tags required for the visualisations
    var body = d3.select("body");
    createTooltipDivs(body);
    createFigureSvgs(body);

    // Create the dropdown menu for the stars with proper names
    properDropdown();

    // Create a distance slider
    distanceSlider();

    // Create buttons for selecting the dataset to be used
    datasetButtons();

    // Create reset buttons for the selections
    resetButton();

    // Draw a scatterplot of stars
    scatterPlot();

    // Draw a piechart of star types
    pieChart();

    // Draw a histogram of the stars' effective temperatures
    temperatureHist();

    // Draw a histogram of the stars' radii
    radiusHist();
};

function createTooltipDivs(body) {
    /*
     * Creates div tags for all tooltips to be used in the visualisation
     */
    // Adds a div of class tooltip with a specific id
    var addTooltipDiv = function(idName) {
        body.append("div")
            .attr("class", "tooltip")
            .attr("id", `${idName}`)
            .style("opacity", 0);
    };

    // Define "div"s for tooltips for all figures
    addTooltipDiv("HR-diagramTip");
    addTooltipDiv("piechartTip");
    addTooltipDiv("temperatureTip");
    addTooltipDiv("radiusTip");
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

    // Get the dimensions for the radius histogram
    var widthRadiusHist = document.getElementById("radiusHist").clientWidth;
    var heightRadiusHist = widthRadiusHist / ((1 + Math.sqrt(5)) / 2);

    // Adds an svg of class container with a specific id and dimensions
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
    addFigureSvg("#radiusHist", widthRadiusHist, heightRadiusHist, "svgRadiusHist");
};
