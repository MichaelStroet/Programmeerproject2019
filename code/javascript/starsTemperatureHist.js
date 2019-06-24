// Name: Michael Stroet
// Student number: 11293284

// Padding for the temperature histogram
var temperaturePadding = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 75
};

function temperatureHist() {
    /*
     * Draws an interactive histogram of the stars' temperatures
     */
    // Get the dimensions of the temperature histogram svg
    var svgWidth = document.getElementById("svgTemperatureHist").clientWidth;
    var svgHeight = document.getElementById("svgTemperatureHist").clientHeight;

    // Determine the dimensions of the histogram
    var histogramWidth = svgWidth - temperaturePadding.left - temperaturePadding.right;
    var histogramHeight = svgHeight - temperaturePadding.top - temperaturePadding.bottom;

    // Select the histogram svg
    var svgHistogram = d3.select("#svgTemperatureHist");

    // Select the tooltip div
    var tooltip = d3.select("#temperatureTip");

    // Define a "g" tag for the histogram
    var histogram = svgHistogram.append("g")
        .attr("class", "histogram")
        .attr("transform", `translate(${temperaturePadding.left}, ${temperaturePadding.top})`);

    // Get the x and y scales and the bin ranges and values
    var scalesAndBins = getTemperatureScalesAndBins(originalDataset, histogramWidth, histogramHeight);
    var xScale = scalesAndBins[0];
    var yScale = scalesAndBins[1];
    var bins = scalesAndBins[2];

    // Draw x-axis
    histogram.append("g")
        .call(d3.axisBottom(xScale)
            .ticks(8)
            .tickFormat(d3.format("d"))
        )
        .attr("class", "axis")
        .attr("id", "x")
        .attr("transform", `translate(0, ${histogramHeight})`);

    // Draw x-label
    svgHistogram.append("text")
        .attr("class", "label")
        .attr("x", histogramWidth / 2 + temperaturePadding.left)
        .attr("y", histogramHeight + temperaturePadding.top + temperaturePadding.bottom / 1.5)
        .attr("text-anchor", "middle")
        .text("Effectieve temperatuur (K)");

    // Draw y-axis
    histogram.append("g").call(d3.axisLeft(yScale))
        .attr("class", "axis")
        .attr("id", "y");

    // Draw y-label
    svgHistogram.append("text")
        .attr("class", "label")
        .attr("x", - (histogramHeight / 2) - temperaturePadding.top)
        .attr("y", temperaturePadding.left / 6)
        .attr("transform", "rotate(270)")
        .attr("text-anchor", "middle")
        .text("Aantal sterren");

    // Draw horizontal gridlines
    histogram.append("g")
        .attr("class", "grid")
        .attr("opacity", 0.3)
        .call(d3.axisRight(yScale)
            .tickSize(histogramWidth, 0, 0)
            .tickFormat("")
        );

    // Draw title
    svgHistogram.append("text")
        .attr("class", "title")
        .attr("x", histogramWidth / 2 + temperaturePadding.left)
        .attr("y", temperaturePadding.top / 2)
        .attr("text-anchor", "middle")
        .text("Verdeling van de effectieve temperatuur van sterren");

    // Draw the histogram
    var bars = histogram.selectAll(".bar#temperature")
        .data(bins)
        .enter()
        .append("rect")
            .attr("class", "bar")
            .attr("id", "temperature")
            .attr("x", function(bin) {
                return xScale(bin.x1) + 0.1 * Math.abs(xScale(bin.x1) - xScale(bin.x0));
            })
            .attr("y", function(bin) {
                return yScale(bin.length);
            })
            .attr("width", function(bin) {
                return Math.abs(xScale(bin.x1) - xScale(bin.x0)) * 0.9;
            })
            .attr("height", function(bin) {
                return Math.abs(yScale(0) - yScale(bin.length));
            })
            .on("click", function(bin) {
                selections["temperature"] = [bin.x0, bin.x1];
                updateGraphs();
            })
            .on("mousemove", function(bin) {
                tooltip
                    .transition()
                    .duration(50)
                    .style("opacity", 0.9);
                tooltip
                    .html(`Temperatuur: ${bin.x0} - ${bin.x1}<br>Aantal sterren: ${bin.length}`)
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

function getTemperatureBins(xScale, stars) {
    /*
     * Creates a d3 histogram bins object and adds each star to the correct bin
     */
    // Variables for the bins
    var numberOfBins = 20;
    var lowestValue = d3.min(xScale.domain());
    var highestValue = d3.max(xScale.domain());
    var binWidth = Math.abs(highestValue - lowestValue) / numberOfBins;
    var thresholds = [];

    // Determine the thresholds for all bins, rounded to three decimal places
    for (var i = 0; i < numberOfBins; i++) {
        thresholds.push(parseFloat(parseFloat(i * binWidth + lowestValue).toFixed(3)));
    };

    // Create the bins anto the correct bind add all stars
    var bins = d3.histogram()
        .value(function(star) {
            return star["Temperatuur"];
        })
        .domain(xScale.domain().reverse())
        .thresholds(thresholds)
        (stars);

    return bins;
};

function getTemperatureScalesAndBins(dataset, width, height) {
    /*
     * Creates scaling functions for the x and y values and gets the bin ranges and values
     */
    var stars = Object.values(dataset);

    // Scaling function for the x-values
    var xScale = d3.scaleLinear()
        .range([0, width])
        .domain([Math.ceil(maxValue(stars, "Temperatuur")), Math.floor(minValue(stars, "Temperatuur"))]);

    // Get the bin ranges and values for the histogram
    var bins = getTemperatureBins(xScale, stars);

    // Find the length of the longest array in bins
    var longestArray = 0;
    bins.forEach(function(bin) {
        if (bin.length > longestArray) {
            longestArray = bin.length;
        };
    });

    // Scaling function for the y-values
    var yScale = d3.scaleLinear()
        .range([0, height])
        .domain([longestArray * 1.1, 0]);

    return [xScale, yScale, bins]
};

function updateTemperatureHist(newDataset) {
    /*
     * Updates the temperature histogram with the new dataset
     */
     // Get the dimensions of the temperature histogram svg
     var svgWidth = document.getElementById("svgTemperatureHist").clientWidth;
     var svgHeight = document.getElementById("svgTemperatureHist").clientHeight;

     // Determine the dimensions of the histogram
     var histogramWidth = svgWidth - temperaturePadding.left - temperaturePadding.right;
     var histogramHeight = svgHeight - temperaturePadding.top - temperaturePadding.bottom;

    // Select the histogram svg
    var svgHistogram = d3.select("#svgTemperatureHist");

    // Get the x and y scales and the bin ranges and values
    var scalesAndBins = getTemperatureScalesAndBins(newDataset, histogramWidth, histogramHeight);
    var xScale = scalesAndBins[0];
    var yScale = scalesAndBins[1];
    var newBins = scalesAndBins[2];

    // Update x-axis
    svgHistogram.select(".axis#x")
        .transition()
        .duration(transitionDuration)
        .call(d3.axisBottom(xScale)
            .ticks(8)
            .tickFormat(d3.format("d"))
        );

    // Update y-axis
    svgHistogram.select(".axis#y")
        .transition()
        .duration(transitionDuration)
        .call(d3.axisLeft(yScale));

    // Replace the old data with the new bins
    d3.select("#svgTemperatureHist").selectAll(".bar#temperature")
        .data(newBins)
        .enter()

    // Update the y-value and height of each bar
    var bars = d3.select("#svgTemperatureHist").selectAll(".bar#temperature")
    bars.transition()
        .duration(transitionDuration)
        .attr("y", function(bin) {
            return yScale(bin.length);
        })
        .attr("height", function(bin) {
            return Math.abs(yScale(0) - yScale(bin.length));
        });

    // Remove excess bars
    bars.exit().remove();
};
