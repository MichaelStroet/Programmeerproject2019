// Name: Michael Stroet
// Student number: 11293284

function massRadiusHist(dataset) {
    /*
    Draws an interactive histogram of the stars' masses or radii
    */

    // Padding for the histogram
    var padding = {
        top: 30,
        right: 50,
        bottom: 50,
        left: 75
    };

    var svgWidth = document.getElementById("svgMassRadiusHist").clientWidth;
    var svgHeight = document.getElementById("svgTemperatureHist").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    // Select the "svg" for the histogram
    var svgHistogram = d3.select("#svgMassRadiusHist")

    // Select the "div" for the tooltip
    var tooltip = d3.select(".mass-radius-tooltip");

    // Define a "g" for the histogram
    var histogram = svgHistogram.append("g")
        .attr("class", "histogram")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    var stars = Object.values(dataset);

    // Scaling function for x values
    var xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([minValue(stars, "Straal"), maxValue(stars, "Straal")]);

    // Determine which values go into which bin
    var bins = d3.histogram()
        .value(function(star) {
            return star["Straal"];
        })
        .domain(xScale.domain())
        .thresholds(xScale.ticks(50))
        (stars)

    // Find the length of the longest array in bins
    var longestArray = 0;
    bins.forEach(function(bin) {
        if (bin.length > longestArray) {
            longestArray = bin.length;
        };
    });

    // Scaling function for y values
    var yScale = d3.scaleLinear()
        .range([0, chartHeight])
        .domain([longestArray * 1.1, 0]);

    // Draw x-axis
    histogram.append("g")
    .call(d3.axisBottom(xScale))
        .attr("class", "axis")
        .attr("transform", `translate(0, ${chartHeight})`);

    // Draw x label
    svgHistogram.append("text")
        .attr("class", "label")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", chartHeight + padding.top + padding.bottom / 1.5)
        .attr("text-anchor", "middle")
        .text("x label");

    // Draw y-axis
    histogram.append("g").call(d3.axisLeft(yScale))
        .attr("class", "axis");

    // Draw y label
    svgHistogram.append("text")
        .attr("class", "label")
        .attr("x", - (chartHeight / 2) - padding.top)
        .attr("y", padding.left / 6)
        .attr("transform", "rotate(270)")
        .attr("text-anchor", "middle")
        .text("y label)");

    // Draw horizontal gridlines
    histogram.append("g")
        .attr("class", "grid")
        .attr("opacity", 0.3)
        .call(d3.axisRight(yScale)
            .tickSize(chartWidth, 0, 0)
            .tickFormat("")
        );

    // Draw title
    svgHistogram.append("text")
        .attr("class", "title")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", padding.top / 2)
        .attr("text-anchor", "middle")
        .text("---------------title---------------");

    // Draw the histogram
    var bars = histogram.selectAll(".bar")
        .data(bins)
        .enter()
        .append("rect")
            .attr("class", "bar")
            .attr("x", function(bin) {
                return xScale(bin.x0) + 0.1 * Math.abs(xScale(bin.x0) - xScale(bin.x1));
            })
            .attr("y", function(bin) {
                return yScale(bin.length);
            })
            .attr("width", function(bin) {
                return Math.abs(xScale(bin.x0) - xScale(bin.x1)) * 0.9;
            })
            .attr("height", function(bin) {
                return Math.abs(yScale(0) - yScale(bin.length));
            });
};
