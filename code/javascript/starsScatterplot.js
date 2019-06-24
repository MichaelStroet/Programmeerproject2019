// Name: Michael Stroet
// Student number: 11293284

// Padding for the scatterplot
var colorLegendHeight = 30;
var scatterPadding = {
    top: 50,
    right: 50,
    bottom: 50 + colorLegendHeight,
    left: 75
};

function scatterPlot() {
    /*
     * Draws an interactive scatterplot of the stars' luminosities and temperatures
     */
    // Get the dimensions of the temperature histogram svg
    var svgWidth = document.getElementById("svgHRdiagram").clientWidth;
    var svgHeight = document.getElementById("svgHRdiagram").clientHeight;

    // Determine the dimensions of the scatterplot
    var scatterWidth = svgWidth - scatterPadding.left - scatterPadding.right;
    var scatterHeight = svgHeight - scatterPadding.top - scatterPadding.bottom;

    // Select the scatterplot svg
    var svgScatter = d3.select("#svgHRdiagram");

    // Select the tooltip div
    var tooltip = d3.select("#HR-diagramTip");

    // Define a "g" tag for the scatterplot
    var scatterPlot = svgScatter.append("g")
        .attr("class", "scatterplot")
        .attr("transform", `translate(${scatterPadding.left}, ${scatterPadding.top})`);

    var stars = Object.entries(originalDataset);
    var properties = Object.values(originalDataset);

    var maxTemperature = maxValue(properties, "Temperatuur");
    var minTemperature = minValue(properties, "Temperatuur");

    // Scaling function for the x-values
    var xScale = d3.scaleLinear()
        .range([0, scatterWidth])
        .domain([maxTemperature * 1.1, minTemperature * 0.9]);

    // Scaling function for the y-values
    var yScale = d3.scaleLog()
        .range([0, scatterHeight])
        .domain([maxValue(properties, "Lichtkracht") * 1.1, minValue(properties, "Lichtkracht") * 0.9]);

    // Draw x-axis
    scatterPlot.append("g")
        .call(d3.axisBottom(xScale)
            .ticks(6)
            .tickFormat(d3.format("d"))
        )
        .attr("class", "axis")
        .attr("id", "x")
        .attr("transform", `translate(0, ${scatterHeight + colorLegendHeight})`);

    // Draw x-label
    svgScatter.append("text")
        .attr("class", "label")
        .attr("x", scatterWidth / 2 + scatterPadding.left)
        .attr("y", scatterHeight + scatterPadding.top + scatterPadding.bottom / 1.05)
        .attr("text-anchor", "middle")
        .text("Effectieve temperatuur (K)");

    // Draw vertical gridlines
    scatterPlot.append("g")
        .attr("class", "grid")
        .attr("opacity", 0.15)
        .call(d3.axisBottom(xScale)
            .tickSize(scatterHeight, 0, 0)
            .tickFormat("")
    );

    // Draw y-axis
    scatterPlot.append("g").call(d3.axisLeft(yScale))
        .attr("class", "axis")
        .attr("id", "y");

    // Draw y-label
    svgScatter.append("text")
        .attr("class", "label")
        .attr("x", - (scatterHeight / 2) - scatterPadding.top)
        .attr("y", scatterPadding.left / 6)
        .attr("transform", "rotate(270)")
        .attr("text-anchor", "middle")
        .text("Lichtkracht (zonslichtkrachten)");

    // Draw horizontal gridlines
    scatterPlot.append("g")
        .attr("class", "grid")
        .attr("opacity", 0.15)
        .call(d3.axisRight(yScale)
            .tickSize(scatterWidth, 0, 0)
            .tickFormat("")
        );

    // Draw title
    svgScatter.append("text")
        .attr("class", "title")
        .attr("x", scatterWidth / 2 + scatterPadding.left)
        .attr("y", scatterPadding.top / 1.5)
        .attr("text-anchor", "middle")
        .text("Hertzsprung-Russell diagram");

    // Draw all stars in the scatterplot
    var points = scatterPlot.selectAll(".star")
        .data(stars)
        .enter()
        .append("circle")
            .attr("class", "star")
            .attr("id", star => {return "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '')})
            .attr("cx", function(star) {
                return xScale(star[1]["Temperatuur"]);
            })
            .attr("cy", function(star) {
                return yScale(star[1]["Lichtkracht"]);
            })
            .attr("fill", function(star) {
                return star[1]["Kleur"];
            })
            .attr("r", function(star) {
                return 2 + Math.pow(star[1]["Straal"], 1/3);
            })
            .on("click", function(star) {
                highlightStar(star);
            })
            .on("mousemove", function(star) {
                tooltip
                    .transition()
                    .duration(50)
                    .style("opacity", 0.9);
                tooltip
                    .html(`Ster: ${star[0]}<br>
                        Type: ${star[1]["Type"]}`)
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
            .on("mouseout", () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 0);
            });


    // Padding for the color legend
    var legendPadding = {
            top   : 2,
            right : 0,
            bottom: 0,
            left  : 0
        };

    // Append a "defs" tag to the scatterplot svg
    var defs = svgScatter.append("defs")
        .attr("class", "linearGradient");

    // Add a linearGradient element to the defs
    var linearGradient = defs.append("linearGradient")
        .attr("id", "scatterGradient");

    // Horizontal gradient from right to left
    linearGradient
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "0%");

    // Create a continuous color legend
    linearGradient.selectAll("stop")
        .data(createGradientData(minTemperature, maxTemperature))
        .enter()
        .append("stop")
        .attr("offset", function(data) {
            return data.offset;
        })
        .attr("stop-color", function(data) {
            return data.color;
        });

    // Define a "g" for the legend
    var legend = svgScatter.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${scatterPadding.left}, ${scatterPadding.top + scatterHeight})`)

    // Add the gradient to the legend
    legend.append("rect")
        .attr("x", legendPadding.left)
        .attr("y", legendPadding.top)
        .attr("width", scatterWidth - legendPadding.left - legendPadding.right)
        .attr("height", colorLegendHeight - legendPadding.top - legendPadding.bottom)
        .style("fill", "url(#scatterGradient)")
        .style("stroke", "black");
};

function updateHRDiagram(newDataset) {
    /*
     * Updates the scatterplot with the new dataset
     */
    // Get the dimensions of the temperature histogram svg
    var svgWidth = document.getElementById("svgHRdiagram").clientWidth;
    var svgHeight = document.getElementById("svgHRdiagram").clientHeight;

    // Determine the dimensions of the scatterplot
    var scatterWidth = svgWidth - scatterPadding.left - scatterPadding.right;
    var scatterHeight = svgHeight - scatterPadding.top - scatterPadding.bottom;

    // Select the scatterplot svg
    var svgScatter = d3.select("#svgHRdiagram");

    // select the scatterplot g
    var scatterPlot = svgScatter.select(".scatterplot")

    // Select the tooltip div
    var tooltip = d3.select("#HR-diagramTip");

    var stars = Object.entries(newDataset);
    var properties = Object.values(originalDataset);

    var maxTemperature = maxValue(properties, "Temperatuur");
    var minTemperature = minValue(properties, "Temperatuur");

    // Scaling function for x values
    var xScale = d3.scaleLinear()
        .range([0, scatterWidth])
        .domain([maxTemperature * 1.1, minTemperature * 0.9]);

    // Scaling function for y values
    var yScale = d3.scaleLog()
        .range([0, scatterHeight])
        .domain([maxValue(properties, "Lichtkracht") * 1.1, minValue(properties, "Lichtkracht") * 0.9]);

    // Update x-axis
    scatterPlot.select(".axis#x")
        .transition()
        .duration(transitionDuration)
        .call(d3.axisBottom(xScale)
            .ticks(6)
            .tickFormat(d3.format("d"))
        );

    // Update y-axis
    scatterPlot.select(".axis#y")
        .transition()
        .duration(transitionDuration)
        .call(d3.axisLeft(yScale));

    // Replace the old data with the new bins
    var points = scatterPlot.selectAll(".star")
        .data(stars)

    // Update the existing points with a new id, position, color and radius
    points.transition()
        .duration(transitionDuration)
        .attr("id", star => {return "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '')})
        .attr("cx", function(star) {
            return xScale(star[1]["Temperatuur"]);
        })
        .attr("cy", function(star) {
            return yScale(star[1]["Lichtkracht"]);
        })
        .attr("fill", function(star) {
            return star[1]["Kleur"];
        })
        .attr("r", function(star) {
            return 2 + Math.pow(star[1]["Straal"], 1/3);
        });

    // Create new points from the dataset
    points.enter()
        .append("circle")
            .attr("class", "star")
            .attr("id", function(star) {
                return "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '');
            })
            .attr("cx", function(star) {
                return xScale(star[1]["Temperatuur"]);
            })
            .attr("cy", function(star) {
                return yScale(star[1]["Lichtkracht"]);
            })
            .attr("fill", function(star) {
                return star[1]["Kleur"];
            })
            .attr("r", 0)
            .on("click", function(star) {
                highlightStar(star);
            })
            .on("mousemove", function(star) {
                tooltip
                    .transition()
                    .duration(50)
                    .style("opacity", 0.9);
                tooltip
                    .html(`Ster: ${star[0]}<br>
                        Type: ${star[1]["Type"]}`)
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
            .on("mouseout", () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .transition()
            .duration(transitionDuration)
            .attr("r", function(star) {
                return 2 + Math.pow(star[1]["Straal"], 1/3);
            });

    // Remove points no longer in the dataset
    points.exit()
        .transition()
        .duration(transitionDuration)
        .attr("r", 0)
        .remove();

    // Select the linear gradient
    var linearGradient = d3.select("#scatterGradient");

    // Update the legend with new colors
    linearGradient.selectAll("stop")
        .data(createGradientData(minTemperature, maxTemperature))
        .attr("offset", function(data) {
            return data.offset;
        })
        .attr("stop-color", function(data) {
            return data.color;
        });
};
