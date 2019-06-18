// Name: Michael Stroet
// Student number: 11293284

function pieChart() {
    /*
    Draws an interactive piechart of the types of stars
    */

    // Padding for the piechart
    var padding = {
        top: 20,
        right: 125,
        bottom: 30,
        left: 5
    };

    var svgWidth = document.getElementById("svgPiechart").clientWidth;
    var svgHeight = document.getElementById("svgPiechart").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    var radius = d3.min([chartWidth, chartHeight]) / 2

    // Select the "svg" for the piechart
    var svgPie = d3.select("#svgPiechart");

    // Select the "div" for the tooltip
    var tooltip = d3.select("#piechartTip");

    // Define a "g" for the piechart
    var pieChart = svgPie.append("g")
        .attr("class", "piechart")
        .attr("transform", `translate(${(chartWidth + padding.left) / 2}, ${(chartHeight + padding.top) / 2})`);

    // Create an empty object for the piechart data
    var stars = {
        "Rode_dwergen" : 0,
        "Hoofdreeks" : 0,
        "Reuzen" : 0,
        "Superreuzen" : 0,
        "Witte_dwergen" : 0
        }

    // Determine the occurence of each type of star
    Object.values(originalDataset).forEach(function(star) {
        stars[`${star["Type"]}`]++;
    });

    // Scaling function for the wedge colors
    var colorScale = d3.scaleOrdinal()
        .domain(Object.keys(stars))
        .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"])

    // Create a function for the pie data
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
        .data(pieFunction(Object.entries(stars)))
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

    var legendWidth = padding.right;
    var legendHeight = chartHeight;
    var legendPadding = {
        top: padding.top,
        right: 0,
        bottom: 0,
        left: (chartWidth + padding.left) + 10
    };

    // Define a "g" for the legend
    var legend = svgPie.append("g")
        .attr("class", "legend")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("transform", function() {
            var xTranslation = legendPadding.left;
            var yTranslation = legendPadding.top;
            return `translate(${xTranslation}, ${yTranslation})`;
        });

    var itemHeight = legendHeight / (Object.keys(stars).length + 1);
    var boxSize = 0.3 * itemHeight;
    var boxPadding = (itemHeight - boxSize);

    // Add a "g" for all star types to the legend
    legend.selectAll(".legendItem")
        .data(Object.entries(stars))
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
                .attr("class", "legendBox")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", boxSize)
                .attr("height", boxSize)
                .style("fill", type => {return colorScale(type[0])})
                .style("stroke", "black");

    var legendTexts = {
        "Rode_dwergen" : ["Rode", "dwergen"],
        "Hoofdreeks" : ["Hoofd-", "reeks"],
        "Reuzen" : ["Reuzen", ""],
        "Superreuzen" : ["Super-", "reuzen"],
        "Witte_dwergen" : ["Witte", "dwergen"]
        }

    legend.selectAll(".legendItem")
        .append("text")
            .attr("x", boxSize + 5)
            .attr("y", boxSize / 2.5)
            .style("font", "11px Verdana")
            .text(type => {return legendTexts[type[0]][0]})

    legend.selectAll(".legendItem")
        .append("text")
            .attr("x", boxSize + 5)
            .attr("y", boxSize + 5)
            .style("font", "11px Verdana")
            .text(type => {return legendTexts[type[0]][1]})
};

function updatePiechart(newDataset) {
    /*
    * Update the piechart with a new dataset
    */

    // Padding for the piechart
    var padding = {
        top: 20,
        right: 125,
        bottom: 30,
        left: 5
    };

    var svgWidth = document.getElementById("svgPiechart").clientWidth;
    var svgHeight = document.getElementById("svgPiechart").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    var radius = d3.min([chartWidth, chartHeight]) / 2

    // Select the piechart svg
    var svgPie = d3.select("#svgPiechart");

    // Create an empty object for the piechart data
    var stars = {
        "Rode_dwergen" : 0,
        "Hoofdreeks" : 0,
        "Reuzen" : 0,
        "Superreuzen" : 0,
        "Witte_dwergen" : 0
    };

    // Determine the occurence of each type of star
    Object.values(newDataset).forEach(function(star) {
        stars[`${star["Type"]}`]++;
    });

    // Create a function for the pie data
    var pieFunction = d3.pie()
        .value(function(data) {
            return data[1];
        })
        .sort(null);

    // Create a path function for the arc
    var arcFunction = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Update the piechart wedges
    var wedges = d3.selectAll(".wedge")
        .data(pieFunction(Object.entries(stars)))
        .attr("d", arcFunction);
};
