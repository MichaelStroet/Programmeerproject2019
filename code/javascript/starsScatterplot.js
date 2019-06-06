// Name: Michael Stroet
// Student number: 11293284

function scatterPlot(dataset) {
    /*
    Draws an interactive scatterplot of the star data
    */

    // Padding for the HRdiagram
    var padding = {
        top: 50,
        right: 25,
        bottom: 50,
        left: 75
    };

    var svgWidth = document.getElementById("svgHRdiagram").clientWidth;
    var svgHeight = document.getElementById("svgHRdiagram").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    // Select the "svg" for the HRdiagram
    var svgScatter = d3.select("#svgHRdiagram")

    // Select the "div" for the tooltip
    var tooltip = d3.select(".HR-tooltip");

    // Define a "g" for the HRdiagram
    var scatterPlot = svgScatter.append("g")
        .attr("class", "scatterplot")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    var stars = Object.values(dataset);

    // Scaling function for x values
    var xScale = d3.scaleLog()
        .range([0, chartWidth])
        .domain([maxValue(stars, "Temperatuur") * 1.1, minValue(stars, "Temperatuur") * 0.9]);

    // Scaling function for y values
    var yScale = d3.scaleLog()
        .range([0, chartHeight])
        .domain([maxValue(stars, "Lichtkracht") * 1.1, minValue(stars, "Lichtkracht") * 0.9]);

    // Draw x-axis
    scatterPlot.append("g").call(d3.axisBottom(xScale))
        .attr("class", "axis")
        .attr("transform", `translate(0, ${chartHeight})`);

    // Draw x label
    svgScatter.append("text")
        .attr("class", "label")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", chartHeight + padding.top + padding.bottom / 1.1)
        .attr("text-anchor", "middle")
        .text("Effectieve temperatuur (K)");

    // Draw vertical gridlines
    scatterPlot.append("g")
        .attr("class", "grid")
        .attr("opacity", 0.3)
        .call(d3.axisBottom(xScale)
            .tickSize(chartHeight, 0, 0)
            .tickFormat("")
    );

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

    // Draw horizontal gridlines
    scatterPlot.append("g")
        .attr("class", "grid")
        .attr("opacity", 0.3)
        .call(d3.axisRight(yScale)
            .tickSize(chartWidth, 0, 0)
            .tickFormat("")
    );
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

    // // Draw bars with tooltips and updating the calendar when pressed
    // var bars = barChart.selectAll(".bar")
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
    //     .on("click", function(values) {
    //         return updateCalendar(datasets["calendar"], values[0], firstYear, lastYear, colourInterpolator);
    //     })
    //     .on("mousemove", function(data) {
    //         tooltip
    //             .transition()
    //             .duration(50)
    //             .style("opacity", 0.9);
    //         tooltip
    //             .html(data[0] + "<br/>" + data[1] + " talks")
    //             .style("left", (d3.event.pageX + 15) + "px")
    //             .style("top", (d3.event.pageY - 15) + "px");
    //         })
    //     .on("mouseout", () => {
    //         tooltip
    //             .transition()
    //             .duration(500)
    //             .style("opacity", 0);
    // });
    //
    // // Update the order of the barchart with the chosen order
 	// orderMenu.on("change", function(){
    //
 	// 	// Find which order was selected from the dropdown menu
 	// 	var order = d3.select(this)
    //         .select("select")
    //         .property("value")
    //
    //     // Update the barchart
    //     updateBarchart(datasetBar, order, orderedTags, chartHeight)
    // });

};

// function updateBarchart(datasetBar, order, orderedTags, chartHeight) {
//     /*
//     * Updates the barchart with the new order
//     */
//
//     var transDuration = 500;
//
//     // Select the "svg" for the HRdiagram
//     var svgBarchart = d3.select("#svgBarchart").transition();
//
//     // Create the new tag scale for the y axis
//     var newTagScale = d3.scaleBand()
//         .range([0, chartHeight])
//         .domain(orderedTags[order])
//
//     // Update all bars
//     svgBarchart.selectAll(".bar")
//         .duration(transDuration)
//         .attr("y", function(data) {
//             return newTagScale(data[0]);
//         });
//
//     // Select all y-axis ticks
//     var tagTicks = svgBarchart.select("#tags").selectAll(".tick")
//
//     // Update the y-axis ticks
//     tagTicks.duration(transDuration)
//         .attr("transform", function(data) {
//             return `translate(0, ${newTagScale(data) + newTagScale.bandwidth() / 2})`;
//         });
//
// };

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
