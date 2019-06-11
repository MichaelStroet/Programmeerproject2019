// Name: Michael Stroet
// Student number: 11293284

function scatterPlot(dataset) {
    /*
    Draws an interactive scatterplot of the star data
    */

    // Padding for the HRdiagram
    var padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 75
    };

    var svgWidth = document.getElementById("svgHRdiagram").clientWidth;
    var svgHeight = document.getElementById("svgHRdiagram").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    // Select the "svg" for the HRdiagram
    var svgScatter = d3.select("#svgHRdiagram");

    // Select the "div" for the tooltip
    var tooltip = d3.select(".HR-tooltip");

    // Define a "g" for the HRdiagram
    var scatterPlot = svgScatter.append("g")
        .attr("class", "scatterplot")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    var stars = Object.values(dataset);

    // Scaling function for x values
    var xlinScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([maxValue(stars, "Temperatuur") * 1.1, minValue(stars, "Temperatuur") * 0.9]);

    // Scaling function for x values
    var xScale = d3.scaleLog()
        .range([0, chartWidth])
        .domain([maxValue(stars, "Temperatuur") * 1.1, minValue(stars, "Temperatuur") * 0.9]);

    // Scaling function for y values
    var yScale = d3.scaleLog()
        .range([0, chartHeight])
        .domain([maxValue(stars, "Lichtkracht") * 1.1, minValue(stars, "Lichtkracht") * 0.9]);

    // Draw x-axis
    scatterPlot.append("g")
        .call(d3.axisBottom(xScale)
            .tickValues([3700, 5200, 6000, 7500, 10000, 30000]) // M K G F A B O
            .tickFormat(d3.format("d"))
        )
        .attr("class", "axis")
        .attr("transform", `translate(0, ${chartHeight})`);

    // Draw x label
    svgScatter.append("text")
        .attr("class", "label")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", chartHeight + padding.top + padding.bottom / 1.25)
        .attr("text-anchor", "middle")
        .text("Effectieve temperatuur (K)");

    // // Draw vertical gridlines
    // scatterPlot.append("g")
    //     .attr("class", "grid")
    //     .attr("opacity", 0.3)
    //     .call(d3.axisBottom(xScale)
    //         .tickSize(chartHeight, 0, 0)
    //         .tickFormat("")
    // );

    // Draw y-axis
    scatterPlot.append("g").call(d3.axisLeft(yScale))
        .attr("class", "axis");

    // Draw y label
    svgScatter.append("text")
        .attr("class", "label")
        .attr("x", - (chartHeight / 2) - padding.top)
        .attr("y", padding.left / 6)
        .attr("transform", "rotate(270)")
        .attr("text-anchor", "middle")
        .text("Lichtkracht (zon = 1)");

    // // Draw horizontal gridlines
    // scatterPlot.append("g")
    //     .attr("class", "grid")
    //     .attr("opacity", 0.3)
    //     .call(d3.axisRight(yScale)
    //         .tickSize(chartWidth, 0, 0)
    //         .tickFormat("")
    //     );

    // Draw title
    svgScatter.append("text")
        .attr("class", "title")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", padding.top / 1.5)
        .attr("text-anchor", "middle")
        .text("Hertzsprung-Russell diagram");

    // Draw all stars in the scatterplot
    var points = scatterPlot.selectAll(".star")
        .data(stars)
        .enter()
        .append("circle")
            .attr("class", "star")
            .attr("cx", function(star) {
            return xScale(star["Temperatuur"]);
            })
            .attr("cy", function(star) {
            return yScale(star["Lichtkracht"]);
            })
            .attr("fill", function(star) {
            return star["Kleur"];
            });
};

function maxValue(stars, valueName) {
    /*
     * Determines the maximum value
     */

    return d3.max(stars, function(star) {
        return star[valueName];
    });
};

function minValue(stars, valueName) {
    /*
     * Determines the minimum value
     */

    return d3.min(stars, function(star) {
        return star[valueName];
    });
};
