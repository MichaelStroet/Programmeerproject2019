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

    var transitionDuration = 1000;

    // Select the "svg" for the histogram
    var svgHistogram = d3.select("#svgMassRadiusHist")

    // Select the "div" for the tooltip
    var tooltip = d3.select("#mass-radiusTip");

    // Define a "g" for the histogram
    var histogram = svgHistogram.append("g")
        .attr("class", "histogram")
        .attr("id", "mass-radius")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    var stars = Object.values(dataset);

    // Scaling function for x values
    var xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([0, Math.ceil(maxValue(stars, "Straal") * 1.1)]);

    var bins = getMassRadiusBins(xScale, stars);

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
        .attr("id", "x")
        .attr("transform", `translate(0, ${chartHeight})`);

    // Draw x label
    svgHistogram.append("text")
        .attr("class", "Label")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", chartHeight + padding.top + padding.bottom / 1.5)
        .attr("text-anchor", "middle")
        .text("Straal (zonsstralen)");

    // Draw y-axis
    histogram.append("g").call(d3.axisLeft(yScale))
        .attr("class", "axis")
        .attr("id", "y");

    // Draw y label
    svgHistogram.append("text")
        .attr("class", "label")
        .attr("x", - (chartHeight / 2) - padding.top)
        .attr("y", padding.left / 6)
        .attr("transform", "rotate(270)")
        .attr("text-anchor", "middle")
        .text("Aantal sterren");

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
        .text("Verdeling van de straal van sterren relatief aan de zon");

    // Draw the histogram
    var bars = histogram.selectAll(".bar#mass-radius")
        .data(bins)
        .enter()
        .append("rect")
            .attr("class", "bar")
            .attr("id", "mass-radius")
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
                console.log(`Straal:\n    ${bin.x0} - ${bin.x1}\nAantal sterren:\n    ${bin.length}`);
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

function getMassRadiusBins(xScale, stars) {
    /*

    */

    var numberOfBins = 25;
    var binWidth = xScale.domain()[1] / numberOfBins;
    var thresholds = []

    for (var i = 0; i < numberOfBins; i++) {
        thresholds.push(parseFloat(parseFloat(i * binWidth).toFixed(2)));
    };

    // Determine which values go into which bin
    var bins = d3.histogram()
        .value(function(star) {
            return star["Straal"];
        })
        .domain(xScale.domain())
        .thresholds(thresholds)
        (stars)

    return bins;
};

function updateMassRadiusHist(newDataset) {
    /*

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

    var transitionDuration = 1000;

    // Select the "svg" of the histogram
    var svgHistogram = d3.select("#svgMassRadiusHist").transition()

    // Select the "div" for the tooltip
    var tooltip = d3.select("#mass-radiusTip");

    var newStars = Object.values(newDataset);

    // Scaling function for x values
    var xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([0, maxValue(newStars, "Straal") * 1.1]);

    // Determine which values go into which bin
    var newBins = getMassRadiusBins(xScale, newStars);

    // Find the length of the longest array in bins
    var longestArray = 0;
    newBins.forEach(function(bin) {
        if (bin.length > longestArray) {
            longestArray = bin.length;
        };
    });

    // Scaling function for y values
    var yScale = d3.scaleLinear()
        .range([0, chartHeight])
        .domain([longestArray * 1.1, 0]);

    // Draw x-axis
    svgHistogram.select(".axis#x")
        .duration(transitionDuration)
        .call(d3.axisBottom(xScale));

    // Draw x-axis
    svgHistogram.select(".axis#y")
        .duration(transitionDuration)
        .call(d3.axisLeft(yScale));

    // Replace the old data with the new bins
    d3.select("#svgMassRadiusHist").selectAll(".bar#mass-radius")
        .data(newBins)
        .enter()

    // Update the height of each bar
    var bars =  d3.select("#svgMassRadiusHist").selectAll(".bar#mass-radius").transition()

    bars.duration(transitionDuration)
        .attr("y", function(bin) {
            return yScale(bin.length);
        })
        .attr("height", function(bin) {
            return Math.abs(yScale(0) - yScale(bin.length));
        });
};
