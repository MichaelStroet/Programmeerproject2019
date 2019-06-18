// Name: Michael Stroet
// Student number: 11293284

function temperatureHist() {
    /*
    Draws an interactive histogram of the stars' temperatures
    */

    // Padding for the histogram
    var padding = {
        top: 30,
        right: 30,
        bottom: 50,
        left: 75
    };

    var svgWidth = document.getElementById("svgTemperatureHist").clientWidth;
    var svgHeight = document.getElementById("svgTemperatureHist").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    // Select the "svg" for the histogram
    var svgHistogram = d3.select("#svgTemperatureHist")

    // Select the "div" for the tooltip
    var tooltip = d3.select("#temperatureTip");

    // Define a "g" for the histogram
    var histogram = svgHistogram.append("g")
        .attr("class", "histogram")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);


    var stars = Object.values(originalDataset);

    // Scaling function for x values
    var xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([maxValue(stars, "Temperatuur") * 1.1, minValue(stars, "Temperatuur") * 0.9]);

    // Determine which values go into which bin
    var bins = getTemperatureBins(xScale, stars);

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
        //     .ticks(6)//Values([3700, 5200, 6000, 7500, 10000, 30000])
        //     .tickFormat(d3.format("d"))
        // )
        .attr("class", "axis")
        .attr("id", "x")
        .attr("transform", `translate(0, ${chartHeight})`);

    // Draw x label
    svgHistogram.append("text")
        .attr("class", "label")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", chartHeight + padding.top + padding.bottom / 1.5)
        .attr("text-anchor", "middle")
        .text("Effectieve temperatuur (K)");

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
        .text("Verdeling van de effectieve temperatuur van sterren");

    var totalStars = Object.keys(originalDataset).length

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

    */

    var numberOfBins = 25;
    var binWidth = Math.abs(xScale.domain()[0] - xScale.domain()[1]) / numberOfBins;
    var thresholds = []

    for (var i = 0; i < numberOfBins; i++) {
        // thresholds.push(Math.round(i * binWidth));
        thresholds.push(parseFloat(parseFloat(i * binWidth).toFixed(2)))
    };

    // Determine which values go into which bin
    var bins = d3.histogram()
        .value(function(star) {
            return star["Temperatuur"];
        })
        .domain(xScale.domain().reverse())
        .thresholds(thresholds)
        (stars)

    return bins;
};

function updateTemperatureHist(newDataset) {
    /*

    */

    // Padding for the histogram
    var padding = {
        top: 30,
        right: 30,
        bottom: 50,
        left: 75
    };

    var svgWidth = document.getElementById("svgTemperatureHist").clientWidth;
    var svgHeight = document.getElementById("svgTemperatureHist").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    // Select the "svg" for the histogram
    var svgHistogram = d3.select("#svgTemperatureHist").transition()

    // Select the "div" for the tooltip
    var tooltip = d3.select("#temperatureTip");

    var oldStars = Object.values(originalDataset)
    var newStars = Object.values(newDataset);

    // Scaling function for x values
    var xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([maxValue(newStars, "Temperatuur") * 1.1, minValue(newStars, "Temperatuur") * 0.9]);

    // Determine which values go into which bin
    var newBins = getTemperatureBins(xScale, newStars);

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
    d3.select("#svgTemperatureHist").selectAll(".bar#temperature")
        .data(newBins)
        .enter()

    // Update the height of each bar
    var bars =  d3.select("#svgTemperatureHist").selectAll(".bar#temperature").transition()

    bars.duration(transitionDuration)
        .attr("y", function(bin) {
            return yScale(bin.length);
        })
        .attr("height", function(bin) {
            return Math.abs(yScale(0) - yScale(bin.length));
        });
};
