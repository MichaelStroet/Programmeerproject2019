// Name: Michael Stroet
// Student number: 11293284

// Padding for the histogram
var radiusPadding = {
    top: 30,
    right: 50,
    bottom: 50,
    left: 75
};

function radiusHist() {
    /*
     * Draws an interactive histogram of the stars' radii
     */
    // Get the dimensions of the radius histogram svg
    var svgWidth = document.getElementById("svgRadiusHist").clientWidth;
    var svgHeight = document.getElementById("svgTemperatureHist").clientHeight;

    // Determine the dimensions of the histogram
    var histogramWidth = svgWidth - radiusPadding.left - radiusPadding.right;
    var histogramHeight = svgHeight - radiusPadding.top - radiusPadding.bottom;

    // Select the histogram svg
    var svgHistogram = d3.select("#svgRadiusHist")

    // Select the tooltip div
    var tooltip = d3.select("#radiusTip");

    // Define a "g" tag for the histogram
    var histogram = svgHistogram.append("g")
        .attr("class", "histogram")
        .attr("id", "radius")
        .attr("transform", `translate(${radiusPadding.left}, ${radiusPadding.top})`);

    // Get the x and y scales and the bin ranges and values
    var scalesAndBins = getRadiusScalesAndBins(originalDataset, histogramWidth, histogramHeight);
    var xScale = scalesAndBins[0];
    var yScale = scalesAndBins[1];
    var bins = scalesAndBins[2];

    // Draw x-axis
    histogram.append("g")
    .call(d3.axisBottom(xScale))
        .attr("class", "axis")
        .attr("id", "x")
        .attr("transform", `translate(0, ${histogramHeight})`);

    // Draw x-label
    svgHistogram.append("text")
        .attr("class", "Label")
        .attr("x", histogramWidth / 2 + radiusPadding.left)
        .attr("y", histogramHeight + radiusPadding.top + radiusPadding.bottom / 1.5)
        .attr("text-anchor", "middle")
        .text("Straal (zonsstralen)");

    // Draw y-axis
    histogram.append("g").call(d3.axisLeft(yScale))
        .attr("class", "axis")
        .attr("id", "y");

    // Draw y-label
    svgHistogram.append("text")
        .attr("class", "label")
        .attr("x", - (histogramHeight / 2) - radiusPadding.top)
        .attr("y", radiusPadding.left / 6)
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
        .attr("x", histogramWidth / 2 + radiusPadding.left)
        .attr("y", radiusPadding.top / 2)
        .attr("text-anchor", "middle")
        .text("Verdeling van de straal van sterren relatief aan de zon");

    // Draw the histogram
    var bars = histogram.selectAll(".bar#radius")
        .data(bins)
        .enter()
        .append("rect")
            .attr("class", "bar")
            .attr("id", "radius")
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
            })
            .on("click", function(bin) {
                // Set the radius selection to the clicked range and update the visualisation
                selections["radius"] = [bin.x0, bin.x1];
                updateGraphs();
            })
            .on("mousemove", function(bin) {
                tooltip
                    .transition()
                    .duration(50)
                    .style("opacity", 0.9);
                tooltip
                    .html(`Straal: ${bin.x0} - ${bin.x1}<br>Aantal sterren: ${bin.length}`)
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
            .on("mouseout", () => {
                tooltip
                    .transition()
                    .duration(transitionDuration)
                    .style("opacity", 0);
            });
};

function getRadiusBins(xScale, stars) {
    /*
     * Creates a d3 histogram bins object and adds each star to the correct bin
     */
    // Variables for the bins
    var numberOfBins = 20;
    var lowestValue = d3.min(xScale.domain());
    var highestValue = d3.max(xScale.domain());
    var binWidth = Math.abs(highestValue - lowestValue) / numberOfBins;
    var thresholds = []

    // Determine the thresholds for all bins, rounded to three decimal places
    for (var i = 0; i < numberOfBins; i++) {
        thresholds.push(parseFloat(parseFloat(i * binWidth + lowestValue).toFixed(3)));
    };

    // Create the bins anto the correct bind add all stars
    var bins = d3.histogram()
        .value(function(star) {
            return star["Straal"];
        })
        .domain(xScale.domain())
        .thresholds(thresholds)
        (stars)

    return bins;
};

function getRadiusScalesAndBins(dataset, width, height) {
    /*
     * Creates scaling functions for the x and y values and gets the bin ranges and values
     */
    var stars = Object.values(dataset);

    // Scaling function for the x values
    var xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, Math.ceil(maxValue(stars, "Straal") * 1.1)]);

    // Get the bin ranges and values for the histogram
    var bins = getRadiusBins(xScale, stars);

    // Find the length of the longest array in bins
    var longestArray = 0;
    bins.forEach(function(bin) {
        if (bin.length > longestArray) {
            longestArray = bin.length;
        };
    });

    // Scaling function for the y values
    var yScale = d3.scaleLinear()
        .range([0, height])
        .domain([longestArray * 1.1, 0]);

    return [xScale, yScale, bins]
};

function updateRadiusHist(newDataset) {
    /*
     * Updates the radius barchart with the new dataset
     */
    // Get the dimensions of the radius histogram svg
    var svgWidth = document.getElementById("svgRadiusHist").clientWidth;
    var svgHeight = document.getElementById("svgTemperatureHist").clientHeight;

    // Determine the dimensions of the histogram
    var histogramWidth = svgWidth - radiusPadding.left - radiusPadding.right;
    var histogramHeight = svgHeight - radiusPadding.top - radiusPadding.bottom;

    // Select the histogram svg
    var svgHistogram = d3.select("#svgRadiusHist").transition()

    var newStars = Object.values(newDataset);

    // Get the x and y scales and the bin ranges and values
    var scalesAndBins = getRadiusScalesAndBins(newStars, histogramWidth, histogramHeight);
    var xScale = scalesAndBins[0];
    var yScale = scalesAndBins[1];
    var newBins = scalesAndBins[2];

    // Draw x-axis
    svgHistogram.select(".axis#x")
        .duration(transitionDuration)
        .call(d3.axisBottom(xScale));

    // Draw x-axis
    svgHistogram.select(".axis#y")
        .duration(transitionDuration)
        .call(d3.axisLeft(yScale));

    // Replace the old data with the new bins
    d3.select("#svgRadiusHist").selectAll(".bar#radius")
        .data(newBins)
        .enter()

    // Update the y-value and height of each bar
    var bars =  d3.select("#svgRadiusHist").selectAll(".bar#radius")
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
