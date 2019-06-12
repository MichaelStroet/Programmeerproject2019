// Name: Michael Stroet
// Student number: 11293284

function pieChart(dataset) {
    /*
    Draws an interactive piechart of the types of stars
    */

    // Padding for the piechart
    var padding = {
        top: 20,
        right: 30,
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
    var tooltip = d3.select(".pie-tooltip");

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
    Object.values(dataset).forEach(function(star) {
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
                console.log(`Type:\n    ${wedge.data[0]}\nAantal sterren:\n    ${wedge.data[1]}`);
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
};

function updatePiechart(newDataset) {
    /*
    * Update the piechart with a new dataset
    */

    // Padding for the piechart
    var padding = {
        top: 20,
        right: 30,
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
