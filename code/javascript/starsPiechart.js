// Name: Michael Stroet
// Student number: 11293284

// Padding for the piechart
var piePadding = {
    top: 10,
    right: 125,
    bottom: 30,
    left: 5
};

function pieChart() {
    /*
     * Draws an interactive piechart of the types of stars
     */

    // Get the dimensions of the piechart svg
    var svgWidth = document.getElementById("svgPiechart").clientWidth;
    var svgHeight = document.getElementById("svgPiechart").clientHeight;

    // Determine the dimensions of the piechart
    var chartWidth = svgWidth - piePadding.left - piePadding.right;
    var chartHeight = svgHeight - piePadding.top - piePadding.bottom;

    // Determine the radius of the piechart
    var radius = d3.min([chartWidth, chartHeight]) / 2

    // Select the piechart svg
    var svgPie = d3.select("#svgPiechart");

    // Select the tooltip div
    var tooltip = d3.select("#piechartTip");

    // Define a "g" tag for the piechart
    var pieChart = svgPie.append("g")
        .attr("class", "piechart")
        .attr("transform", `translate(${radius + piePadding.left}, ${radius + piePadding.top})`);

    // Create a object for counting star types
    var starData = {
        "Rode_dwergen" : 0,
        "Hoofdreeks" : 0,
        "Reuzen" : 0,
        "Superreuzen" : 0,
        "Witte_dwergen" : 0
        }

    // Determine the total occurence of each star type
    Object.values(originalDataset).forEach(function(star) {
        starData[`${star["Type"]}`]++;
    });

    // Scaling function for the wedge colors
    var colorScale = d3.scaleOrdinal()
        .domain(Object.keys(starData))
        .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"])

    // Create a function for the unsorted pie data
    var pieFunction = d3.pie()
        .value(function(data) {
            return data[1];
        })
        .sort(null);

    // Create a path function for the arc
    var arcFunction = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Draw each wedge of the piechart
    pieChart.selectAll(".wedge")
        .data(pieFunction(Object.entries(starData)))
        .enter()
        .append("path")
            .attr("class", "wedge")
            .attr("d", arcFunction)
            .attr("fill", function(wedge) {
                return(colorScale(wedge.data[0]));
            })
            .each(function(wedge) {
                this._current = wedge;
            })
            .on("click", function(wedge) {
                // Set the type selection to the clicked type and update the visualisation
                selections["type"] = wedge.data[0];
                updateGraphs();
            })
            .on("mousemove", function(wedge) {
                tooltip
                    .transition()
                    .duration(50)
                    .style("opacity", 0.9);
                tooltip
                    .html(`${wedge.data[0]}<br>Aantal sterren: ${wedge.data[1]}`)
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
            .on("mouseout", () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 0);
            });

    // Padding for the piechart legend
    var legendPadding = {
        top: piePadding.top,
        right: 0,
        bottom: 0,
        left: (chartWidth + piePadding.left) + 10
    };

    // Determine the dimensions of the piechart legend
    var legendWidth = piePadding.right;
    var legendHeight = chartHeight;

    // Define a "g" tag for the legend
    var legend = svgPie.append("g")
        .attr("class", "legend")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("transform", function() {
            var xTranslation = legendPadding.left;
            var yTranslation = legendPadding.top;
            return `translate(${xTranslation}, ${yTranslation})`;
        });

    // Determine the sizes for the legend items
    var itemHeight = legendHeight / (Object.keys(starData).length + 1);
    var boxSize = 0.3 * itemHeight;
    var boxPadding = (itemHeight - boxSize);

    // Create an interactive colored box for each star type
    legend.selectAll(".legendItem")
        .data(Object.entries(starData))
        .enter()
        .append("g")
            .attr("class", "legendItem")
            .attr("id", type => {return type[0]})
            .attr("width", legendWidth)
            .attr("height", itemHeight)
            .attr("transform", function(type, i) {
                var xTranslation = 0;
                var yTranslation = i * (boxSize + boxPadding) + legendPadding.top;
                return `translate(${xTranslation}, ${yTranslation})`;
            })
            .append("rect")
                .attr("class", "pieLegendBox")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", boxSize)
                .attr("height", boxSize)
                .style("fill", type => {return colorScale(type[0])})
                .style("stroke", "black")
                .on("click", function(wedgeData) {
                    // Set the type selection to the clicked type and update the visualisation
                    selections["type"] = wedgeData[0];
                    updateGraphs();
                })
                .on("mousemove", function(wedgeData) {
                    tooltip
                        .transition()
                        .duration(50)
                        .style("opacity", 0.9);
                    tooltip
                        .html(`${wedgeData[0]}<br>Aantal sterren: ${wedgeData[1]}`)
                        .style("left", (d3.event.pageX + 15) + "px")
                        .style("top", (d3.event.pageY - 15) + "px");
                })
                .on("mouseout", () => {
                    tooltip
                        .transition()
                        .duration(500)
                        .style("opacity", 0);
                });

    // Object for writing all star types on two lines
    var legendTexts = {
        "Rode_dwergen" : ["Rode", "dwergen"],
        "Hoofdreeks" : ["Hoofd-", "reeks"],
        "Reuzen" : ["Reuzen", ""],
        "Superreuzen" : ["Super-", "reuzen"],
        "Witte_dwergen" : ["Witte", "dwergen"]
        }

    // Write the first line
    legend.selectAll(".legendItem")
        .append("text")
            .attr("x", boxSize + 5)
            .attr("y", boxSize / 2.5)
            .style("font", "12px Verdana")
            .text(type => {return legendTexts[type[0]][0]})

    // Write the second line
    legend.selectAll(".legendItem")
        .append("text")
            .attr("x", boxSize + 5)
            .attr("y", boxSize + 5)
            .style("font", "12px Verdana")
            .text(type => {return legendTexts[type[0]][1]})
};

function updatePiechart(newDataset) {
    /*
    * Update the piechart with a new dataset
    */
    // Get the dimensions of the piechart svg
    var svgWidth = document.getElementById("svgPiechart").clientWidth;
    var svgHeight = document.getElementById("svgPiechart").clientHeight;

    // Determine the dimensions of the piechart
    var chartWidth = svgWidth - piePadding.left - piePadding.right;
    var chartHeight = svgHeight - piePadding.top - piePadding.bottom;

    // Determine the radius of the piechart
    var radius = d3.min([chartWidth, chartHeight]) / 2

    // Select the piechart svg
    var svgPie = d3.select("#svgPiechart");

    // Create a object for counting star types
    var starData = {
        "Rode_dwergen" : 0,
        "Hoofdreeks" : 0,
        "Reuzen" : 0,
        "Superreuzen" : 0,
        "Witte_dwergen" : 0
        }

    // Determine the total occurence of each star type
    Object.values(newDataset).forEach(function(star) {
        starData[`${star["Type"]}`]++;
    });

    // Create a function for the unsorted pie data
    var pieFunction = d3.pie()
        .value(function(data) {
            return data[1];
        })
        .sort(null);

    // Create a path function for the arc
    var arcFunction = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Update the piechart wedges with the new data
    var wedges = d3.selectAll(".wedge")
        .data(pieFunction(Object.entries(starData)))
        .attr("d", arcFunction);
};
