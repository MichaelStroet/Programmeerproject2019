// Name: Michael Stroet
// Student number: 11293284

function temperatureHist(dataset) {
    /*
    Draws an interactive barchart of the given data
    */

    // Padding for the barchart
    var padding = {
        top: 50,
        right: 50,
        bottom: 25,
        left: 75
    };

    var svgWidth = document.getElementById("svgTemperatureHist").clientWidth;
    var svgHeight = document.getElementById("svgTemperatureHist").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    // Select the "svg" for the barchart
    var svgHistogram = d3.select("#svgTemperatureHist")

    // Select the "div" for the tooltip
    var tooltip = d3.select(".temperature-tooltip");

    // Define a "g" for the barchart
    var histogram = svgHistogram.append("g")
        .attr("class", "barchart")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    // Scaling function for x values
    var xScale = d3.scaleBand()
        .range([0, chartWidth])
        .domain(["1", "2", "3", "4", "5"])
        .padding(0.2);

    // Scaling function for y values
    var yScale = d3.scaleLinear()
        .range([0, chartHeight])
        .domain([10, 0]);

    // Draw x-axis
    histogram.append("g").call(d3.axisBottom(xScale))
        .attr("class", "axis")
        .attr("transform", `translate(0, ${chartHeight})`);

    // Draw x label
    svgHistogram.append("text")
        .attr("class", "label")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", padding.top / 1.5)
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
        .attr("y", padding.top / 4)
        .attr("text-anchor", "middle")
        .text("titel");

    // // Draw bars with tooltips and updating the calendar when pressed
    // var bars = histogram.selectAll(".bar")
    //     .data(Object.entries(datasetBar))
    //     .enter()
    //     .append("rect")
    //     .attr("class", "bar")
    //     .attr("x", function(data) {
    //         return 0;
    //     })
    //     .attr("y", function(data) {
    //         return yScale(data[0]);
    //     })
    //     .attr("height", yScale.bandwidth())
    //     .attr("width", function(data) {
    //         return xScale(data[1]);
    //     })
    //
};
